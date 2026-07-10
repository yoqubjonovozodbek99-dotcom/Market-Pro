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

export { getAccessToken }

function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem('marketpro_device_id') // Device ID-ni ham o'chir
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
  // Cache busting uchun timestamp qo'shami
  const sep = path.includes('?') ? '&' : '?'
  const fullPath = `${path}${sep}_t=${Date.now()}`
  
  const init: RequestInit = {
    ...options,
    headers: {
      ...buildHeaders(options.body ? true : false),
      ...(options.headers ?? {}),
    },
  }

  const response = await fetch(`${API_BASE}${fullPath}`, init)
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

// ===== STUDENT AUTH =====
export interface ApiUser {
  id: string
  name: string
  email: string
  phone?: string | null
  role: 'STUDENT' | 'MENTOR' | 'ADMIN'
  language: 'UZ' | 'RU'
  isVerified: boolean
  isBlocked: boolean
  createdAt: string
}

export interface ApiSubscription {
  id: string
  plan: 'MONTHLY' | 'THREE_MONTHS'
  startDate: string
  endDate: string
  isActive: boolean
}

export async function registerUser(data: {
  name: string
  email: string
  phone?: string
  password: string
  language?: 'uz' | 'ru'
}) {
  return request<{ user: ApiUser; message: string; pendingApproval: boolean }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function loginUser(data: { email: string; password: string }) {
  const result = await request<{ user: ApiUser; token: string; refreshToken: string; deviceId?: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  setToken(result.token)
  return result
}

export async function logoutUser() {
  try {
    await request('/api/auth/logout', { method: 'POST' })
  } catch {
    // token allaqachon eskirgan bo'lishi mumkin
  } finally {
    clearTokens()
  }
}

export async function fetchMe() {
  return request<{ user: ApiUser; subscription: ApiSubscription | null; isSubscribed: boolean }>('/api/me')
}

export interface ProgressSummary {
  totalLessons: number
  completedLessons: number
  progressPercent: number
  watchedSeconds: number
  uzum: { total: number; completed: number }
  yandex: { total: number; completed: number }
  recentActivity: { lessonTitleUz: string; lessonTitleRu: string; completedAt: string }[]
}

export async function fetchMyProgress() {
  return request<ProgressSummary>('/api/me/progress')
}

// ===== PAYMENTS =====
export async function submitPayment(data: { amount: number; plan: 'MONTHLY' | 'THREE_MONTHS'; screenshot?: string; note?: string }) {
  return request<{ payment: { id: string } }>('/api/payments', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export interface AdminPayment {
  id: string
  userId: string
  user: ApiUser
  amount: number
  plan: 'MONTHLY' | 'THREE_MONTHS'
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED'
  screenshot?: string | null
  note?: string | null
  createdAt: string
}

export async function fetchAdminPayments() {
  return request<{ payments: AdminPayment[] }>('/api/admin/payments')
}

export async function confirmPayment(id: string, startDate?: string) {
  return request<{ startDate: string; endDate: string }>('/api/admin/payments/' + id + '/confirm', {
    method: 'POST',
    body: JSON.stringify({ startDate }),
  })
}

export async function rejectPayment(id: string) {
  return request('/api/admin/payments/' + id + '/reject', { method: 'POST' })
}

// ===== ADMIN USERS =====
export async function fetchPendingUsers() {
  return request<{ users: ApiUser[] }>('/api/admin/users/pending')
}

export async function approveUser(userId: string) {
  return request('/api/admin/users/' + userId + '/approve', { method: 'POST' })
}

export async function rejectUser(userId: string) {
  return request('/api/admin/users/' + userId + '/reject', { method: 'POST' })
}

// ===== LESSON DAY CONFIGS =====
export async function fetchLessonDayConfigs() {
  return request<{ configs: Record<string, number> }>('/api/lesson-day-configs')
}

export async function saveLessonDayConfigs(configs: Array<{ lessonKey: string; availableDay: number }>) {
  return request<{ saved: number }>('/api/admin/lesson-day-configs/bulk', {
    method: 'POST',
    body: JSON.stringify({ configs }),
  })
}
