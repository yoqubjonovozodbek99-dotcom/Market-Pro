import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from './prisma.js'
import { getAuthHeaderValue, verifyToken } from './utils.js'
import { isSessionActive } from './siteAuth.js'

export interface AuthRequest extends Request {
  userId?: string
  user?: Awaited<ReturnType<typeof prisma.user.findUnique>>
}

export interface SiteAuthRequest extends Request {
  sessionId?: string
}

export async function requireSiteAuth(req: SiteAuthRequest, res: Response, next: NextFunction) {
  try {
    const token = getAuthHeaderValue(req.headers.authorization as string | undefined)
    if (!token) {
      return res.status(401).json({ error: 'Authorization required', code: 'NO_TOKEN' })
    }

    const payload = verifyToken<{ sessionId: string; type: string }>(token, process.env.JWT_SECRET!)
    if (!payload?.sessionId || payload.type !== 'site') {
      return res.status(401).json({ error: 'Invalid token', code: 'INVALID_TOKEN' })
    }

    if (!isSessionActive(payload.sessionId)) {
      return res.status(401).json({
        error: 'Session revoked',
        code: 'SESSION_REVOKED',
        message: 'Boshqa qurilmadan kirildi. Siz tizimdan chiqarildingiz.',
      })
    }

    req.sessionId = payload.sessionId
    next()
  } catch (error) {
    console.error('Site auth error:', error)
    return res.status(401).json({ error: 'Unauthorized', code: 'INVALID_TOKEN' })
  }
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = getAuthHeaderValue(req.headers.authorization as string | undefined)
    if (!token) {
      return res.status(401).json({ error: 'Authorization required' })
    }

    const payload = verifyToken<{ userId: string }>(token, process.env.JWT_SECRET!)
    if (!payload?.userId) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid token user' })
    }

    req.userId = user.id
    req.user = user
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
