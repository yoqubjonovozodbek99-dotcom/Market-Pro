import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PUBLIC_PATHS = ['/', '/kirish']

export function SessionWatcher() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate('/kirish', { replace: true, state: { from: location.pathname } })
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate])

  return null
}