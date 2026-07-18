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

type WrittenTrack = 'uzum' | 'yandex'
type UserWrittenAccessMap = Record<number, { uzum: number; yandex: number }>

const WRITTEN_ACCESS_PREFIX = 'written-access:'
const WRITTEN_PROGRESS_PREFIX = 'written-progress:'
const VIDEO_PROGRESS_PREFIX = 'video-progress:'

const WRITTEN_TOTAL_LESSONS = 84
const VIDEO_TOTAL_LESSONS = 82
const WRITTEN_PLATFORM_TOTAL = { uzum: 42, yandex: 42 }
const VIDEO_PLATFORM_TOTAL = { uzum: 41, yandex: 41 }

function toWrittenTrack(input: unknown): WrittenTrack | null {
  return input === 'uzum' || input === 'yandex' ? input : null
}

function buildWrittenAccessKey(userId: string, moduleNum: number, track: WrittenTrack) {
  return `${WRITTEN_ACCESS_PREFIX}${userId}:m${moduleNum}:${track}`
}

function parseWrittenAccessKey(lessonKey: string): { userId: string; moduleNum: number; track: WrittenTrack } | null {
  if (!lessonKey.startsWith(WRITTEN_ACCESS_PREFIX)) return null
  const body = lessonKey.slice(WRITTEN_ACCESS_PREFIX.length)
  const parts = body.split(':')
  if (parts.length !== 3) return null
  const [userId, modulePart, trackPart] = parts
  const track = toWrittenTrack(trackPart)
  if (!track || !modulePart.startsWith('m')) return null
  const moduleNum = Number(modulePart.slice(1))
  if (!Number.isFinite(moduleNum) || moduleNum < 1) return null
  return { userId, moduleNum: Math.floor(moduleNum), track }
}

function clampOpenLessons(raw: unknown) {
  const n = Number(raw)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(50, Math.floor(n)))
}

function buildWrittenProgressKey(userId: string, lessonKey: string) {
  return `${WRITTEN_PROGRESS_PREFIX}${userId}:${lessonKey}`
}

function buildVideoProgressKey(userId: string, lessonKey: string) {
  return `${VIDEO_PROGRESS_PREFIX}${userId}:${lessonKey}`
}

function getProgressPlatformFromLessonKey(lessonKey: string): 'uzum' | 'yandex' | null {
  if (lessonKey.includes('-u') || lessonKey.includes('uzum')) return 'uzum'
  if (lessonKey.includes('-y') || lessonKey.includes('yandex')) return 'yandex'
  return null
}

function parseProgressRowKey(lessonKey: string, userId: string, prefix: string) {
  const fullPrefix = `${prefix}${userId}:`
  if (!lessonKey.startsWith(fullPrefix)) return null
  return lessonKey.slice(fullPrefix.length)
}

async function getWrittenAccessMapForUser(userId: string): Promise<UserWrittenAccessMap> {
  const rows = await prisma.lessonDayConfig.findMany({
    where: { lessonKey: { startsWith: `${WRITTEN_ACCESS_PREFIX}${userId}:` } },
  })

  const map: UserWrittenAccessMap = {}
  for (const row of rows) {
    const parsed = parseWrittenAccessKey(row.lessonKey)
    if (!parsed || parsed.userId !== userId) continue
    if (!map[parsed.moduleNum]) {
      map[parsed.moduleNum] = { uzum: 0, yandex: 0 }
    }
    map[parsed.moduleNum][parsed.track] = Math.max(0, Number(row.availableDay) || 0)
  }
  return map
}

async function getWrittenAccessMapForUsers(userIds: string[]): Promise<Record<string, UserWrittenAccessMap>> {
  const userSet = new Set(userIds)
  const rows = await prisma.lessonDayConfig.findMany({
    where: { lessonKey: { startsWith: WRITTEN_ACCESS_PREFIX } },
  })

  const byUser: Record<string, UserWrittenAccessMap> = {}
  for (const userId of userIds) {
    byUser[userId] = {}
  }

  for (const row of rows) {
    const parsed = parseWrittenAccessKey(row.lessonKey)
    if (!parsed || !userSet.has(parsed.userId)) continue

    const map = byUser[parsed.userId]
    if (!map[parsed.moduleNum]) {
      map[parsed.moduleNum] = { uzum: 0, yandex: 0 }
    }
    map[parsed.moduleNum][parsed.track] = Math.max(0, Number(row.availableDay) || 0)
  }

  return byUser
}

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

    const existingSession = await prisma.userSession.findFirst({
      where: { userId: user.id, deviceId },
      select: { id: true },
    })

    if (existingSession) {
      await prisma.userSession.update({
        where: { id: existingSession.id },
        data: {
          ipAddress,
          userAgent,
          lastSeenAt: new Date(),
          isActive: true,
        },
      })
    } else {
      await prisma.userSession.create({
        data: {
          userId: user.id,
          ipAddress,
          userAgent,
          deviceId,
          isActive: true,
        },
      })
    }

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
    const writtenAccess = await getWrittenAccessMapForUser(user.id)

    res.json({
      user: sanitizeUser(user),
      subscription,
      accessDays,
      writtenAccess,
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
      writtenRows,
      videoRows,
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
      prisma.lessonDayConfig.findMany({
        where: {
          lessonKey: { startsWith: `${WRITTEN_PROGRESS_PREFIX}${userId}:` },
        },
      }),
      prisma.lessonDayConfig.findMany({
        where: {
          lessonKey: { startsWith: `${VIDEO_PROGRESS_PREFIX}${userId}:` },
        },
      }),
    ])

    const completedWrittenKeys = writtenRows
      .filter((r) => Number(r.availableDay) > 0)
      .map((r) => parseProgressRowKey(r.lessonKey, userId, WRITTEN_PROGRESS_PREFIX))
      .filter((v): v is string => Boolean(v))

    const completedVideoKeys = videoRows
      .filter((r) => Number(r.availableDay) > 0)
      .map((r) => parseProgressRowKey(r.lessonKey, userId, VIDEO_PROGRESS_PREFIX))
      .filter((v): v is string => Boolean(v))

    const dbTotal = lessons.length
    const dbCompleted = completedLessons
    const writtenCompleted = completedWrittenKeys.length
    const videoCompleted = completedVideoKeys.length

    const totalLessons = dbTotal + WRITTEN_TOTAL_LESSONS + VIDEO_TOTAL_LESSONS
    const completedAll = dbCompleted + writtenCompleted + videoCompleted
    const progressPercent = totalLessons > 0 ? Math.round((completedAll / totalLessons) * 100) : 0
    const participationPercent = progressPercent
    const certificateEligible = participationPercent >= 85

    const totalUzum =
      lessons.filter((l) => l.module.course.platform === 'UZUM' || l.module.course.platform === 'BOTH').length +
      WRITTEN_PLATFORM_TOTAL.uzum +
      VIDEO_PLATFORM_TOTAL.uzum
    const totalYandex =
      lessons.filter((l) => l.module.course.platform === 'YANDEX' || l.module.course.platform === 'BOTH').length +
      WRITTEN_PLATFORM_TOTAL.yandex +
      VIDEO_PLATFORM_TOTAL.yandex

    const completedUzumDb = completedProgress.filter(
      (p) => p.lesson.module.course.platform === 'UZUM' || p.lesson.module.course.platform === 'BOTH'
    ).length
    const completedYandexDb = completedProgress.filter(
      (p) => p.lesson.module.course.platform === 'YANDEX' || p.lesson.module.course.platform === 'BOTH'
    ).length

    const completedUzumWritten = completedWrittenKeys.filter((k) => getProgressPlatformFromLessonKey(k) === 'uzum').length
    const completedYandexWritten = completedWrittenKeys.filter((k) => getProgressPlatformFromLessonKey(k) === 'yandex').length
    const completedUzumVideo = completedVideoKeys.filter((k) => getProgressPlatformFromLessonKey(k) === 'uzum').length
    const completedYandexVideo = completedVideoKeys.filter((k) => getProgressPlatformFromLessonKey(k) === 'yandex').length

    const completedUzum = completedUzumDb + completedUzumWritten + completedUzumVideo
    const completedYandex = completedYandexDb + completedYandexWritten + completedYandexVideo

    const mergedRecentActivity = [
      ...recentCompleted.map((entry) => ({
        lessonTitleUz: entry.lesson.titleUz,
        lessonTitleRu: entry.lesson.titleRu,
        completedAt: entry.completedAt?.toISOString() || new Date().toISOString(),
      })),
      ...writtenRows
        .filter((r) => Number(r.availableDay) > 0)
        .map((r) => ({
          lessonTitleUz: `Yozma dars: ${parseProgressRowKey(r.lessonKey, userId, WRITTEN_PROGRESS_PREFIX) ?? ''}`,
          lessonTitleRu: `Письменный урок: ${parseProgressRowKey(r.lessonKey, userId, WRITTEN_PROGRESS_PREFIX) ?? ''}`,
          completedAt: r.updatedAt.toISOString(),
        })),
      ...videoRows
        .filter((r) => Number(r.availableDay) > 0)
        .map((r) => ({
          lessonTitleUz: `Video dars: ${parseProgressRowKey(r.lessonKey, userId, VIDEO_PROGRESS_PREFIX) ?? ''}`,
          lessonTitleRu: `Видео урок: ${parseProgressRowKey(r.lessonKey, userId, VIDEO_PROGRESS_PREFIX) ?? ''}`,
          completedAt: r.updatedAt.toISOString(),
        })),
    ]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 10)

    res.json({
      totalLessons,
      completedLessons: completedAll,
      progressPercent,
      participationPercent,
      certificateEligible,
      watchedSeconds: watchedAggregate._sum.watchedSec ?? 0,
      writtenCompleted,
      writtenTotal: WRITTEN_TOTAL_LESSONS,
      videoCompleted,
      videoTotal: VIDEO_TOTAL_LESSONS,
      completedWrittenKeys,
      completedVideoKeys,
      uzum: {
        total: totalUzum,
        completed: completedUzum,
      },
      yandex: {
        total: totalYandex,
        completed: completedYandex,
      },
      recentActivity: mergedRecentActivity,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load progress' })
  }
})

router.post('/written-lessons/:lessonKey/progress', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const lessonKey = String(req.params.lessonKey || '').trim()
    const isCompleted = Boolean(req.body?.isCompleted)

    if (!lessonKey) {
      return res.status(400).json({ error: 'lessonKey required' })
    }

    const key = buildWrittenProgressKey(userId, lessonKey)
    await prisma.lessonDayConfig.upsert({
      where: { lessonKey: key },
      create: { lessonKey: key, availableDay: isCompleted ? 1 : 0 },
      update: { availableDay: isCompleted ? 1 : 0 },
    })

    res.json({ lessonKey, isCompleted })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update written progress' })
  }
})

router.post('/video-lessons/:lessonKey/progress', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!
    const lessonKey = String(req.params.lessonKey || '').trim()
    const isCompleted = Boolean(req.body?.isCompleted)

    if (!lessonKey) {
      return res.status(400).json({ error: 'lessonKey required' })
    }

    const key = buildVideoProgressKey(userId, lessonKey)
    await prisma.lessonDayConfig.upsert({
      where: { lessonKey: key },
      create: { lessonKey: key, availableDay: isCompleted ? 1 : 0 },
      update: { availableDay: isCompleted ? 1 : 0 },
    })

    res.json({ lessonKey, isCompleted })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update video progress' })
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

    const writtenAccessByUser = await getWrittenAccessMapForUsers(users.map((u) => u.id))

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
          writtenAccess: writtenAccessByUser[user.id] ?? {},
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

router.post('/admin/users/:userId/written-access', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params
    const moduleNum = Math.max(1, Math.min(20, Math.floor(Number(req.body?.moduleNum) || 0)))
    const track = toWrittenTrack(req.body?.track)
    const openLessons = clampOpenLessons(req.body?.openLessons)

    if (!moduleNum || !track) {
      return res.status(400).json({ error: 'moduleNum va track (uzum|yandex) talab qilinadi' })
    }

    const targetUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!targetUser || targetUser.role !== 'STUDENT') {
      return res.status(404).json({ error: 'Student not found' })
    }

    const lessonKey = buildWrittenAccessKey(userId, moduleNum, track)

    await prisma.lessonDayConfig.upsert({
      where: { lessonKey },
      create: {
        lessonKey,
        availableDay: openLessons,
      },
      update: {
        availableDay: openLessons,
      },
    })

    const writtenAccess = await getWrittenAccessMapForUser(userId)

    res.json({
      userId,
      moduleNum,
      track,
      openLessons,
      writtenAccess,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to save written lesson access' })
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
