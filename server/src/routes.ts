import { Router } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from './prisma.js'
import { getAuthHeaderValue, signToken, verifyToken, sanitizeUser } from './utils.js'
import { requireAuth, requireAdmin, requireSiteAuth, type SiteAuthRequest, type AuthRequest } from './middleware.js'
import { sendWelcomeEmail, sendPasswordResetEmail } from './email.js'
import {
  createSiteSession,
  isSessionActive,
  revokeSession,
  validateSiteCredentials,
} from './siteAuth.js'

const router = Router()

function addDays(date: Date, days: number) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

function calcSubscriptionDurationDays(subscription: { startDate: Date; endDate: Date; isActive: boolean } | null) {
  if (!subscription) return 0
  const ms = subscription.endDate.getTime() - subscription.startDate.getTime()
  if (!Number.isFinite(ms) || ms < 0) return 0
  return Math.floor(ms / 86400000) + 1
}

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

    res.status(201).json({
      user: sanitizeUser(user),
      message: 'Hisobingiz yaratildi. Administrator tasdiqlashini kuting.',
      pendingApproval: true,
    })
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
      return res.status(403).json({ error: 'User account is blocked', code: 'BLOCKED' })
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: 'User account is pending admin approval',
        code: 'PENDING_APPROVAL',
      })
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
    const accessDays = calcSubscriptionDurationDays(subscription)

    res.json({
      user: sanitizeUser(user),
      subscription,
      accessDays,
      isSubscribed: Boolean(subscription?.isActive),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to fetch user' })
  }
})

router.get('/me/progress', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!

    const [
      lessons,
      completedProgress,
      completedLessons,
      watchedAggregate,
      recentCompleted,
    ] = await Promise.all([
      prisma.lesson.findMany({
        select: {
          id: true,
          module: {
            select: {
              course: {
                select: { platform: true },
              },
            },
          },
        },
      }),
      prisma.lessonProgress.findMany({
        where: { userId, isCompleted: true },
        select: {
          lessonId: true,
          lesson: {
            select: {
              module: {
                select: {
                  course: {
                    select: { platform: true },
                  },
                },
              },
            },
          },
        },
      }),
      prisma.lessonProgress.count({ where: { userId, isCompleted: true } }),
      prisma.lessonProgress.aggregate({
        where: { userId },
        _sum: { watchedSec: true },
      }),
      prisma.lessonProgress.findMany({
        where: { userId, isCompleted: true, completedAt: { not: null } },
        orderBy: { completedAt: 'desc' },
        take: 10,
        select: {
          completedAt: true,
          lesson: {
            select: {
              titleUz: true,
              titleRu: true,
            },
          },
        },
      }),
    ])

    const totalLessons = lessons.length
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    const totalByPlatform = {
      uzum: lessons.filter((lesson) => {
        const platform = lesson.module.course.platform
        return platform === 'UZUM' || platform === 'BOTH'
      }).length,
      yandex: lessons.filter((lesson) => {
        const platform = lesson.module.course.platform
        return platform === 'YANDEX' || platform === 'BOTH'
      }).length,
    }

    const completedByPlatform = {
      uzum: completedProgress.filter((progress) => {
        const platform = progress.lesson.module.course.platform
        return platform === 'UZUM' || platform === 'BOTH'
      }).length,
      yandex: completedProgress.filter((progress) => {
        const platform = progress.lesson.module.course.platform
        return platform === 'YANDEX' || platform === 'BOTH'
      }).length,
    }

    res.json({
      totalLessons,
      completedLessons,
      progressPercent,
      watchedSeconds: watchedAggregate._sum.watchedSec ?? 0,
      uzum: {
        total: totalByPlatform.uzum,
        completed: completedByPlatform.uzum,
      },
      yandex: {
        total: totalByPlatform.yandex,
        completed: completedByPlatform.yandex,
      },
      recentActivity: recentCompleted.map((item) => ({
        lessonTitleUz: item.lesson.titleUz,
        lessonTitleRu: item.lesson.titleRu,
        completedAt: item.completedAt?.toISOString() ?? new Date().toISOString(),
      })),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load progress' })
  }
})

router.get('/lesson-day-configs', async (_req, res) => {
  try {
    const configs = await prisma.lessonDayConfig.findMany()
    res.json({
      configs: Object.fromEntries(configs.map((config) => [config.lessonKey, config.availableDay])),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load lesson day configs' })
  }
})

router.get('/admin/users/pending', requireAuth, requireAdmin, async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isVerified: false },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ users: users.map(sanitizeUser) })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load pending users' })
  }
})

router.get('/admin/users', requireAuth, requireAdmin, async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      orderBy: { createdAt: 'desc' },
    })

    const usersWithSubscription = await Promise.all(
      users.map(async (user) => {
        const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } })
        const accessDays = calcSubscriptionDurationDays(subscription)
        const subscriptionDaysLeft = subscription?.isActive && new Date() < subscription.endDate
          ? Math.max(Math.ceil((subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)), 0)
          : 0

        return {
          ...sanitizeUser(user),
          subscription,
          accessDays,
          subscriptionDaysLeft,
        }
      })
    )

    res.json({ users: usersWithSubscription })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load users' })
  }
})

router.post('/admin/users/:userId/access-days', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params
    const raw = Number(req.body?.accessDays)
    if (!Number.isFinite(raw)) {
      return res.status(400).json({ error: 'accessDays raqam bo\'lishi kerak' })
    }

    const accessDays = Math.max(0, Math.min(365, Math.floor(raw)))
    const targetUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!targetUser || targetUser.role !== 'STUDENT') {
      return res.status(404).json({ error: 'Student not found' })
    }

    let subscription = await prisma.subscription.findUnique({ where: { userId } })

    if (accessDays === 0) {
      if (subscription) {
        await prisma.subscription.delete({ where: { userId } })
        subscription = null
      }
    } else {
      const startDate = new Date()
      const endDate = addDays(startDate, accessDays - 1)
      const plan = accessDays >= 90 ? 'THREE_MONTHS' : 'MONTHLY'
      subscription = await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          plan,
          startDate,
          endDate,
          isActive: true,
        },
        update: {
          plan,
          startDate,
          endDate,
          isActive: true,
        },
      })
    }

    const subscriptionDaysLeft = subscription?.isActive && new Date() < subscription.endDate
      ? Math.max(Math.ceil((subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)), 0)
      : 0

    res.json({
      user: {
        ...sanitizeUser(targetUser),
        subscription,
        accessDays,
        subscriptionDaysLeft,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to save access days' })
  }
})

router.post('/admin/users/:userId/approve', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    })

    res.json({ user: sanitizeUser(user) })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to approve user' })
  }
})

router.post('/admin/users/:userId/reject', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params
    await prisma.user.delete({ where: { id: userId } })
    res.json({ message: 'User rejected and removed' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to reject user' })
  }
})

router.delete('/admin/users/:userId', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params
    await prisma.user.delete({ where: { id: userId } })
    res.json({ message: 'User removed' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to remove user' })
  }
})

router.get('/admin/payments', requireAuth, requireAdmin, async (_req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ payments })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load payments' })
  }
})

router.post('/admin/payments/:id/confirm', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const { startDate, durationDays } = req.body as { startDate?: string; durationDays?: number }

    const payment = await prisma.payment.findUnique({ where: { id } })
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    const start = startDate ? new Date(startDate) : new Date()
    const defaultDays = payment.plan === 'THREE_MONTHS' ? 90 : 30
    const days = Number.isFinite(Number(durationDays)) ? Math.max(1, Math.min(365, Math.floor(Number(durationDays)))) : defaultDays
    const end = addDays(start, days)

    await prisma.$transaction([
      prisma.payment.update({
        where: { id },
        data: {
          status: 'CONFIRMED',
          confirmedBy: req.userId,
          confirmedAt: new Date(),
        },
      }),
      prisma.subscription.upsert({
        where: { userId: payment.userId },
        create: {
          userId: payment.userId,
          plan: payment.plan,
          startDate: start,
          endDate: end,
          isActive: true,
        },
        update: {
          plan: payment.plan,
          startDate: start,
          endDate: end,
          isActive: true,
        },
      }),
    ])

    res.json({ startDate: start.toISOString(), endDate: end.toISOString(), durationDays: days })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to confirm payment' })
  }
})

router.post('/admin/payments/:id/reject', requireAuth, requireAdmin, async (_req, res) => {
  try {
    const { id } = _req.params
    await prisma.payment.update({
      where: { id },
      data: { status: 'REJECTED' },
    })

    res.json({ message: 'Payment rejected' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to reject payment' })
  }
})

router.post('/admin/lesson-day-configs/bulk', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const configs = Array.isArray(req.body?.configs) ? req.body.configs : []

    await Promise.all(
      configs.map((config: { lessonKey: string; availableDay: number }) =>
        prisma.lessonDayConfig.upsert({
          where: { lessonKey: config.lessonKey },
          create: {
            lessonKey: config.lessonKey,
            availableDay: Number(config.availableDay) || 1,
          },
          update: {
            availableDay: Number(config.availableDay) || 1,
          },
        })
      )
    )

    res.json({ saved: configs.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to save lesson day configs' })
  }
})

router.get('/check-subscription', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const subscription = await prisma.subscription.findUnique({ where: { userId } })

    const isActive = Boolean(subscription?.isActive)

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

router.post('/subscriptions', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const subscription = await prisma.subscription.findUnique({ where: { userId } })
    res.json({ subscription })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load subscription' })
  }
})

export default router
