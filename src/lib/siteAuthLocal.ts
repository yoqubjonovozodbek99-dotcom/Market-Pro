const SESSION_KEY = 'marketpro_site_session'
const ACTIVE_SESSION_KEY = 'marketpro_active_session_id'

const EXPECTED_LOGIN = import.meta.env.VITE_SITE_LOGIN || 'admin'
const EXPECTED_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || 'marketpro2025'

export interface LocalSession {
  login: string
  sessionId: string
  createdAt: number
}

function readSession(): LocalSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as LocalSession
  } catch {
    return null
  }
}

export function isLocalSessionValid(): boolean {
  const session = readSession()
  const activeId = localStorage.getItem(ACTIVE_SESSION_KEY)
  if (!session || !activeId) return false
  return session.sessionId === activeId
}

export function getLocalSession(): LocalSession | null {
  if (!isLocalSessionValid()) return null
  return readSession()
}

export function localLogin(login: string, password: string): LocalSession {
  if (login !== EXPECTED_LOGIN || password !== EXPECTED_PASSWORD) {
    throw new Error('Login yoki parol noto\'g\'ri')
  }

  const sessionId = crypto.randomUUID()
  const session: LocalSession = {
    login,
    sessionId,
    createdAt: Date.now(),
  }

  localStorage.setItem(ACTIVE_SESSION_KEY, sessionId)
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function localLogout() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(ACTIVE_SESSION_KEY)
}

export function wasSessionRevoked(): boolean {
  const session = readSession()
  const activeId = localStorage.getItem(ACTIVE_SESSION_KEY)
  if (!session) return false
  return !!activeId && session.sessionId !== activeId
}

export function onSessionChange(callback: (revoked: boolean) => void) {
  const handler = (event: StorageEvent) => {
    if (event.key !== ACTIVE_SESSION_KEY && event.key !== SESSION_KEY) return

    if (wasSessionRevoked()) {
      localStorage.removeItem(SESSION_KEY)
      callback(true)
      return
    }

    if (!isLocalSessionValid()) {
      callback(false)
    }
  }

  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}
