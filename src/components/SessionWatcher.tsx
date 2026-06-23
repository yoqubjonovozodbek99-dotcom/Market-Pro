import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PUBLIC_PATHS = ['/', '/kirish']

export function SessionWatcher() {
  const { isAuthenticated, sessionRevoked } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate('/kirish', { replace: true, state: { from: location.pathname } })
    }
  }, [isAuthenticated, location.pathname, navigate])

  useEffect(() => {
    if (sessionRevoked && location.pathname !== '/kirish') {
      navigate('/kirish', { replace: true })
    }
  }, [sessionRevoked, location.pathname, navigate])

  return null
}
