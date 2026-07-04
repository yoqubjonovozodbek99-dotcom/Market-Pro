import { Router } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from './prisma.js'
import { getAuthHeaderValue, signToken, verifyToken, sanitizeUser } from './utils.js'
import { requireAuth, requireSiteAuth, type SiteAuthRequest, type AuthRequest } from './middleware.js'
import { sendWelcomeEmail, sendPasswordResetEmail } from './email.js'
import {
  createSiteSession,
  isSessionActive,
  revokeSession,
  validateSiteCredentials,
} from './siteAuth'

const router = Router()

router.post('/auth/site-login', async (req, res) => {
  try {
    const { login, password } = req.body
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      'unknown'
    const userAgent = req.headers['user-agent'] || 'unknown'

    if (!login || !password) {
      return res.status(400).json({ error: 'Login va parol talab qilinadi' })
    }

    if (!validateSiteCredentials(login, password)) {
      return res.status(401).json({ error: 'Login yoki parol noto\'g\'ri' })
    }

    const sessionId = createSiteSession(login, ipAddress, userAgent)
    const token = signToken(
      { sessionId, type: 'site' },
      process.env.JWT_SECRET!,
      process.env.JWT_EXPIRE || '24h'
    )

    res.json({
      token,
      login,
      message: 'Muvaffaqiyatli kirdingiz',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kirish amalga oshmadi' })
  }
})

router.post('/auth/site-logout', requireSiteAuth, async (req: SiteAuthRequest, res) => {
  try {
    revokeSession(req.sessionId)
    res.json({ message: 'Chiqildi' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Chiqish amalga oshmadi' })
  }
})

router.get('/auth/site-session', requireSiteAuth, async (req: SiteAuthRequest, res) => {
  res.json({ valid: true, sessionId: req.sessionId })
})

router.get('/auth/site-check', async (req, res) => {
  try {
    const token = getAuthHeaderValue(req.headers.authorization as string | undefined)
    if (!token) {
      return res.status(401).json({ valid: false, code: 'NO_TOKEN' })
    }

    const payload = verifyToken<{ sessionId: string; type: string }>(token, process.env.JWT_SECRET!)
    if (!payload?.sessionId || payload.type !== 'site') {
      return res.status(401).json({ valid: false, code: 'INVALID_TOKEN' })
    }

    if (!isSessionActive(payload.sessionId)) {
      return res.status(401).json({
        valid: false,
        code: 'SESSION_REVOKED',
        message: 'Boshqa qurilmadan kirildi. Siz tizimdan chiqarildingiz.',
      })
    }

    res.json({ valid: true })
  } catch {
    return res.status(401).json({ valid: false, code: 'INVALID_TOKEN' })
  }
})

router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, language } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        language: language === 'ru' ? 'RU' : 'UZ',
      },
    })

    await sendWelcomeEmail(email, name)

    const token = signToken({ userId: user.id }, process.env.JWT_SECRET!, process.env.JWT_EXPIRE || '15m')
    const refreshToken = signToken({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, process.env.JWT_REFRESH_EXPIRE || '30d')

    res.status(201).json({ user: sanitizeUser(user), token, refreshToken })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown'
    const userAgent = req.headers['user-agent'] || 'unknown'
    const deviceId = req.body.deviceId || crypto.randomBytes(16).toString('hex')

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    if (user.isBlocked) {
      return res.status(403).json({ error: 'User account is blocked' })
    }

    await prisma.userSession.upsert({
      where: { userId_deviceId: { userId: user.id, deviceId } },
      create: {
        userId: user.id,
        ipAddress,
        userAgent,
        deviceId,
      },
      update: {
        ipAddress,
        userAgent,
        lastSeenAt: new Date(),
        isActive: true,
      },
    })

    const token = signToken({ userId: user.id }, process.env.JWT_SECRET!, process.env.JWT_EXPIRE || '15m')
    const refreshToken = signToken({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, process.env.JWT_REFRESH_EXPIRE || '30d')

    res.json({ user: sanitizeUser(user), token, refreshToken, deviceId })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.post('/auth/logout', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const { deviceId } = req.body

    if (deviceId) {
      await prisma.userSession.updateMany({
        where: { userId, deviceId },
        data: { isActive: false },
      })
    }

    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Logout failed' })
  }
})

router.post('/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' })
    }

    const payload = verifyToken<{ userId: string }>(refreshToken, process.env.JWT_REFRESH_SECRET!)
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' })
    }

    const token = signToken({ userId: user.id }, process.env.JWT_SECRET!, process.env.JWT_EXPIRE || '15m')
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Invalid refresh token' })
  }
})

router.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Store hashed token in database (ideally with expiration)
    // For now, we'll just send the token
    await sendPasswordResetEmail(email, resetToken)

    res.json({ message: 'Password reset email sent' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send reset email' })
  }
})

router.post('/auth/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body

    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: 'Email, token, and new password are required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    })

    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Password reset failed' })
  }
})

router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.user
    if (!user) return res.status(404).json({ error: 'User not found' })

    const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } })

    res.json({
      user: sanitizeUser(user),
      subscription,
      isSubscribed: subscription?.isActive && new Date() < subscription.endDate,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to fetch user' })
  }
})

router.get('/check-subscription', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const subscription = await prisma.subscription.findUnique({ where: { userId } })

    const isActive = subscription?.isActive && new Date() < subscription.endDate

    res.json({
      hasSubscription: !!subscription,
      isSubscriptionActive: isActive,
      subscription: isActive ? subscription : null,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to check subscription' })
  }
})

router.get('/courses', async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: { lessons: true },
        },
      },
      orderBy: { order: 'asc' },
    })
    res.json({ courses })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch courses' })
  }
})

router.post('/lessons/:lessonId/progress', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { lessonId } = req.params
    const { isCompleted, watchedSec } = req.body
    const userId = req.userId!

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        isCompleted: Boolean(isCompleted),
        watchedSec: Number(watchedSec) || 0,
        completedAt: isCompleted ? new Date() : null,
      },
      update: {
        isCompleted: Boolean(isCompleted),
        watchedSec: Number(watchedSec) || 0,
        completedAt: isCompleted ? new Date() : undefined,
      },
    })

    res.json({ progress })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update lesson progress' })
  }
})

router.post('/payments', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { amount, plan, screenshot, note } = req.body
    const userId = req.userId!

    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: Number(amount),
        plan: plan === 'THREE_MONTHS' ? 'THREE_MONTHS' : 'MONTHLY',
        screenshot,
        note,
      },
    })

    res.status(201).json({ payment })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create payment' })
  }
})

router.get('/payments', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const payments = await prisma.payment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    res.json({ payments })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load payments' })
  }
})

router.post('/subscriptions', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { plan, startDate, endDate } = req.body
    const userId = req.userId!

    const subscription = await prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        plan: plan === 'THREE_MONTHS' ? 'THREE_MONTHS' : 'MONTHLY',
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      update: {
        plan: plan === 'THREE_MONTHS' ? 'THREE_MONTHS' : 'MONTHLY',
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: true,
      },
    })

    res.status(201).json({ subscription })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create subscription' })
  }
})

router.get('/subscriptions', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const subscription = await prisma.subscription.findUnique({ where: { userId } })
    res.json({ subscription })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load subscription' })
  }
})

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' })
    }

    const systemPrompt = `Sen MarketPro Academy kursi bo'yicha yordamchi botisan. Faqat quyidagi aniq ma'lumotlar asosida javob ber. Hech qachon narx, muddat yoki boshqa raqamlarni o'zingdan to'qib chiqarma.

KURS HAQIDA:
- Nomi: MarketPro Academy — Uzum Market va Yandex Market bo'yicha savdo kursi
- Davomiyligi: 3 oy (2 oy nazariy + 1 oy amaliy savdo)
- Format: Haftada 3 kun jonli dars (har biri 2 soat), darslar yozib olinadi va istalgan vaqtda qayta ko'rish mumkin
- Jami: 8 modul, 82 ta dars

MODULLAR:
1. Marketplace asoslari (8 dars, 3 soat)
2. Mahsulot tanlash / Niche research (12 dars, 5 soat)
3. Kartochka va SEO optimizatsiya (10 dars, 4 soat)
4. Narx va raqobat strategiyasi (9 dars, 4 soat)
5. Reklama va traffic (14 dars, 6 soat)
6. Logistika va omborxona (8 dars, 3 soat)
7. Tahlil va o'sish / Analytics (11 dars, 5 soat)
8. Biznesni kengaytirish (10 dars, 4 soat)

NARXLAR:
- Oylik obuna: 510,000 so'm/oy
- 3 oylik (bir yo'la to'lov): 1,377,000 so'm (10% chegirma bilan)

KURSGA KIRADI:
- 82 ta HD video dars
- Haftada 3 marta jonli vebinar
- PDF konspekt va cheat-sheet
- Modul testlari va mentor yordami
- Shaxsiy kabinet va progress kuzatuv
- Ikki tilli interfeys (O'zbek/Rus)

MENTOR BILAN BOG'LANISH:
- Telefon: +998 97 372 70 06
- Telegram: @Market_Pro_academiy

QOIDALAR:
- Faqat yuqoridagi ma'lumotlar asosida javob ber
- Agar savol shu ro'yxatda yo'q narsaga tegishli bo'lsa, telefon raqami va Telegram orqali mentorga murojaat qilishni tavsiya qil
- Hech qachon noaniq yoki taxminiy raqam bermang
- O'zbek va Rus tillarida javob ber, foydalanuvchi qaysi tilda yozsa shu tilda javob ber
- Javoblar qisqa va aniq bo'lsin (maksimum 150 so'z)`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq API error:', error)
      return res.status(response.status).json({ error: 'API request failed' })
    }

    const data = await response.json() as any
    const reply = data?.choices?.[0]?.message?.content || 'Javob tayyorlanmadi'

    res.json({ reply })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Failed to process message' })
  }
})

export default router
