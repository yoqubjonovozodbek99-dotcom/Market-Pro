import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  getLocalSession,
  isLocalSessionValid,
  localLogin,
  localLogout,
  onSessionChange,
  wasSessionRevoked,
} from '../lib/siteAuthLocal'

interface AuthContextType {
  user: { login: string } | null
  isLoading: boolean
  isAuthenticated: boolean
  sessionRevoked: boolean
  login: (login: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearSessionRevoked: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ login: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionRevoked, setSessionRevoked] = useState(false)

  const syncUser = useCallback(() => {
    if (wasSessionRevoked()) {
      localLogout()
      sessionStorage.setItem('session_revoked', '1')
      setSessionRevoked(true)
      setUser(null)
      return
    }

    const session = getLocalSession()
    setUser(session ? { login: session.login } : null)
  }, [])

  useEffect(() => {
    syncUser()
    setIsLoading(false)

    return onSessionChange((revoked) => {
      if (revoked) {
        sessionStorage.setItem('session_revoked', '1')
        setSessionRevoked(true)
      }
      setUser(null)
    })
  }, [syncUser])

  const login = async (loginName: string, password: string) => {
    const session = localLogin(loginName, password)
    setSessionRevoked(false)
    setUser({ login: session.login })
  }

  const logout = async () => {
    localLogout()
    setUser(null)
    setSessionRevoked(false)
  }

  const clearSessionRevoked = () => setSessionRevoked(false)

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user && isLocalSessionValid(),
        sessionRevoked,
        login,
        logout,
        clearSessionRevoked,
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
