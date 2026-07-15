import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { getAccessToken, loginUser, logoutUser, registerUser, fetchMe, type ApiUser, clearTokens } from '../api'

export class ApiError extends Error {
  code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.code = code
  }
}

interface AuthContextType {
  user: ApiUser | null
  accessDays: number
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { name: string; email: string; phone?: string; password: string; language?: 'uz' | 'ru' }) => Promise<string>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function deriveAccessDays(me: { accessDays?: number; subscription?: { startDate?: string; endDate?: string; isActive?: boolean } | null }) {
  const direct = Number(me.accessDays ?? 0)
  if (Number.isFinite(direct) && direct > 0) return direct

  const sub = me.subscription
  if (!sub || sub.isActive === false) return 0
  const start = new Date(sub.startDate ?? '').getTime()
  const end = new Date(sub.endDate ?? '').getTime()
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return 0
  return Math.floor((end - start) / 86400000) + 1
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [accessDays, setAccessDays] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null)
      setAccessDays(0)
      return
    }
    try {
      const me = await fetchMe()
      setUser(me.user)
      setAccessDays(deriveAccessDays(me as any))
    } catch {
      clearTokens()
      setUser(null)
      setAccessDays(0)
    }
  }, [])

  useEffect(() => {
    loadUser().finally(() => setIsLoading(false))
  }, [loadUser])

  const login = async (email: string, password: string) => {
    // Account switch holatida oldingi token/user osilib qolmasligi uchun
    clearTokens()
    setUser(null)

    try {
      const result = await loginUser({ email, password })

      // Avval login javobidan user qo'yamiz, keyin /me bilan yakuniy sinxron qilamiz
      setUser(result.user)
      try {
        const me = await fetchMe()
        setUser(me.user)
        setAccessDays(deriveAccessDays(me as any))
      } catch {
        // Agar /me vaqtincha xato bersa ham login javobidagi user bilan davom etamiz
        setAccessDays(0)
      }
    } catch (err) {
      clearTokens()
      setUser(null)
      setAccessDays(0)
      if (err instanceof Error) {
        const error = new ApiError(err.message, (err as any).code)
        throw error
      }
      throw err
    }
  }

  const register = async (data: { name: string; email: string; phone?: string; password: string; language?: 'uz' | 'ru' }) => {
    const result = await registerUser(data)
    return result.message
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
    setAccessDays(0)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessDays,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
