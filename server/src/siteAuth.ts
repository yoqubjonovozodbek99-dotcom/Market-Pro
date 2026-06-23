import crypto from 'crypto'

export interface ActiveSiteSession {
  sessionId: string
  login: string
  ipAddress: string
  userAgent: string
  createdAt: Date
}

let activeSession: ActiveSiteSession | null = null

export function getActiveSession() {
  return activeSession
}

export function createSiteSession(login: string, ipAddress: string, userAgent: string) {
  const sessionId = crypto.randomBytes(32).toString('hex')
  activeSession = {
    sessionId,
    login,
    ipAddress,
    userAgent,
    createdAt: new Date(),
  }
  return sessionId
}

export function isSessionActive(sessionId: string) {
  return activeSession?.sessionId === sessionId
}

export function revokeSession(sessionId?: string) {
  if (!sessionId || activeSession?.sessionId === sessionId) {
    activeSession = null
  }
}

export function validateSiteCredentials(login: string, password: string) {
  const expectedLogin = process.env.SITE_LOGIN || 'admin'
  const expectedPassword = process.env.SITE_PASSWORD || 'marketpro2025'
  return login === expectedLogin && password === expectedPassword
}
