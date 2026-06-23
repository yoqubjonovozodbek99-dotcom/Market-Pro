const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
const ACCESS_TOKEN_KEY = 'marketpro_access_token'

export interface SiteAuthUser {
  login: string
}

interface SiteLoginResponse {
  token: string
  login: string
  message: string
}

interface SiteCheckResponse {
  valid: boolean
  code?: string
  message?: string
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

function buildHeaders(contentType = true) {
  const headers: Record<string, string> = {}
  const token = getAccessToken()

  if (contentType) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

async function request<T>(path: string, options: RequestInit = {}) {
  const init: RequestInit = {
    ...options,
    headers: {
      ...buildHeaders(options.body ? true : false),
      ...(options.headers ?? {}),
    },
  }

  const response = await fetch(`${API_BASE}${path}`, init)
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(body?.error ?? body?.message ?? response.statusText) as Error & {
      code?: string
    }
    error.code = body?.code
    throw error
  }

  return body as T
}

async function requestAllow401<T>(path: string, options: RequestInit = {}) {
  const init: RequestInit = {
    ...options,
    headers: {
      ...buildHeaders(false),
      ...(options.headers ?? {}),
    },
  }

  const response = await fetch(`${API_BASE}${path}`, init)
  const body = await response.json().catch(() => null)
  return { ok: response.ok, status: response.status, body: body as T }
}

export async function siteLogin(data: { login: string; password: string }) {
  const result = await request<SiteLoginResponse>('/api/auth/site-login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  setToken(result.token)
  return result
}

export async function siteLogout() {
  try {
    await request<{ message: string }>('/api/auth/site-logout', { method: 'POST' })
  } catch {
    // sessiya allaqachon bekor qilingan bo'lishi mumkin
  } finally {
    clearTokens()
  }
}

export async function checkSiteSession(): Promise<SiteCheckResponse & { revoked?: boolean }> {
  const token = getAccessToken()
  if (!token) {
    return { valid: false, code: 'NO_TOKEN' }
  }

  const { ok, body } = await requestAllow401<SiteCheckResponse>('/api/auth/site-check')
  if (!ok) {
    return {
      valid: false,
      code: body?.code,
      message: body?.message,
      revoked: body?.code === 'SESSION_REVOKED',
    }
  }
  return { valid: true }
}

export async function getCourses() {
  return request<{ courses: unknown[] }>('/api/courses')
}

export { getAccessToken }
