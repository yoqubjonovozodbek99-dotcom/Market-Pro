import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { getAccessToken, loginUser, logoutUser, registerUser, fetchMe, type ApiUser, clearTokens } from '../api'

interface AuthContextType {
  user: ApiUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { name: string; email: string; phone?: string; password: string; language?: 'uz' | 'ru' }) => Promise<string>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null)
      return
    }
    try {
      const { user } = await fetchMe()
      setUser(user)
    } catch {
      clearTokens()
      setUser(null)
    }
  }, [])

  useEffect(() => {
    loadUser().finally(() => setIsLoading(false))
  }, [loadUser])

  const login = async (email: string, password: string) => {
    const result = await loginUser({ email, password })
    setUser(result.user)
  }

  const register = async (data: { name: string; email: string; phone?: string; password: string; language?: 'uz' | 'ru' }) => {
    const result = await registerUser(data)
    return result.message
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
