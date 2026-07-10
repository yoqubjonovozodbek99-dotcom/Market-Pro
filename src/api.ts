const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
const ACCESS_TOKEN_KEY = 'marketpro_access_token'
const REFRESH_TOKEN_KEY = 'marketpro_refresh_token'

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

interface AuthResponse {
  user: ApiUser
  token: string
  refreshToken: string
  deviceId?: string
}

interface RegisterResponse {
  user: ApiUser
  pendingApproval: true
  message: string
}

export class ApiError extends Error {
  code?: string
  status: number
  constructor(message: string, status: number, code?: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function setTokens(token: string, refreshToken?: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem('marketpro_device_id') // Device ID-ni ham o'chir
}

function buildHeaders(hasBody: boolean) {
  const headers: Record<string, string> = {}
  const token = getAccessToken()
  if (hasBody) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // Cache busting uchun timestamp qo'shami
  const sep = path.includes('?') ? '&' : '?'
  const fullPath = `${path}${sep}_t=${Date.now()}`
  
  const init: RequestInit = {
    ...options,
    headers: {
      ...buildHeaders(Boolean(options.body)),
      ...(options.headers ?? {}),
    },
  }

  const response = await fetch(`${API_BASE}${fullPath}`, init)
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(body?.error ?? body?.message ?? response.statusText, response.status, body?.code)
  }

  return body as T
}

export async function registerUser(data: {
  name: string
  email: string
  phone?: string
  password: string
  language?: 'uz' | 'ru'
}) {
  return request<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function loginUser(data: { email: string; password: string }) {
  const deviceId = getOrCreateDeviceId()
  const result = await request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ ...data, deviceId }),
  })
  setTokens(result.token, result.refreshToken)
  return result
}

export async function logoutUser() {
  try {
    const deviceId = localStorage.getItem('marketpro_device_id')
    await request('/api/auth/logout', { method: 'POST', body: JSON.stringify({ deviceId }) })
  } catch {
    // token allaqachon eskirgan bo'lishi mumkin, baribir tozalaymiz
  } finally {
    clearTokens()
  }
}

export interface ApiSubscription {
  id: string
  plan: 'MONTHLY' | 'THREE_MONTHS'
  startDate: string
  endDate: string
  isActive: boolean
}

export async function fetchMe() {
  return request<{ user: ApiUser; subscription: ApiSubscription | null; isSubscribed: boolean }>('/api/me')
}

export async function submitPayment(data: { amount: number; plan: 'MONTHLY' | 'THREE_MONTHS'; screenshot?: string; note?: string }) {
  return request<{ payment: { id: string } }>('/api/payments', {
    method: 'POST',
    body: JSON.stringify(data),
  })
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

// ---- Admin ----

export async function fetchPendingUsers() {
  return request<{ users: ApiUser[] }>('/api/admin/users?status=pending')
}

export async function fetchAllUsers() {
  return request<{ users: ApiUser[] }>('/api/admin/users?status=all')
}

export async function approveUser(id: string) {
  return request<{ user: ApiUser }>(`/api/admin/users/${id}/approve`, { method: 'POST' })
}

export async function rejectUser(id: string) {
  return request<{ message: string }>(`/api/admin/users/${id}/reject`, { method: 'POST' })
}

// ---- Dars kunlari konfiguratsiyasi ----

export async function fetchLessonDayConfigs() {
  return request<{ configs: Record<string, number> }>('/api/lesson-day-configs')
}

export interface LessonDayConfigItem {
  lessonKey: string
  availableDay: number
}

export async function saveLessonDayConfigs(configs: LessonDayConfigItem[]) {
  return request<{ saved: number }>('/api/admin/lesson-day-configs/bulk', {
    method: 'POST',
    body: JSON.stringify({ configs }),
  })
}

// ---- Admin: to'lovlar ----

export interface AdminPayment {
  id: string
  amount: number
  plan: 'MONTHLY' | 'THREE_MONTHS'
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED'
  screenshot?: string | null
  note?: string | null
  createdAt: string
  confirmedAt?: string | null
  user: { id: string; name: string; email: string; phone?: string | null }
}

export async function fetchAdminPayments() {
  return request<{ payments: AdminPayment[] }>('/api/admin/payments')
}

export async function confirmPayment(id: string, startDate?: string) {
  return request<{ message: string; startDate: string; endDate: string }>(
    `/api/admin/payments/${id}/confirm`,
    { method: 'POST', body: JSON.stringify({ startDate }) }
  )
}

export async function rejectPayment(id: string) {
  return request<{ message: string }>(`/api/admin/payments/${id}/reject`, { method: 'POST' })
}

function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem('marketpro_device_id')
  if (!deviceId) {
    deviceId = crypto.randomUUID()
    localStorage.setItem('marketpro_device_id', deviceId)
  }
  return deviceId
}

export { getAccessToken }