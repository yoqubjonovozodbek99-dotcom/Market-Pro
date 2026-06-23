import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

export function LoginPage() {
  const { login, sessionRevoked, clearSessionRevoked } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string })?.from || '/'

  const [loginName, setLoginName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const t = {
    title: language === 'UZ' ? 'Kirish' : 'Войти',
    login: language === 'UZ' ? 'Login' : 'Логин',
    password: language === 'UZ' ? 'Parol' : 'Пароль',
    btn: language === 'UZ' ? 'Kirish' : 'Войти',
    loading: language === 'UZ' ? 'Yuklanmoqda...' : 'Загрузка...',
    revoked:
      language === 'UZ'
        ? 'Boshqa qurilmadan kirildi. Faqat bitta odam bir vaqtda kira oladi.'
        : 'Вход с другого устройства. Только один пользователь может войти одновременно.',
    hint:
      language === 'UZ'
        ? 'Parolsiz faqat bosh sahifa ko\'rinadi'
        : 'Без пароля доступна только главная страница',
  }

  useEffect(() => {
    if (sessionStorage.getItem('session_revoked')) {
      sessionStorage.removeItem('session_revoked')
      setError(t.revoked)
    } else if (sessionRevoked) {
      setError(t.revoked)
      clearSessionRevoked()
    }
  }, [sessionRevoked, clearSessionRevoked, t.revoked])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(loginName, password)
      navigate(from, { replace: true })
    } catch {
      setError(
        language === 'UZ' ? 'Login yoki parol noto\'g\'ri' : 'Неверный логин или пароль'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2">
            <span style={{ color: 'var(--text-primary)' }}>Market</span>
            <span style={{ color: '#3b82f6' }}>Pro</span>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Academy</p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t.title}
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            {t.hint}
          </p>

          {error && (
            <div
              className="mb-4 p-3 rounded-lg text-sm"
              style={{
                background: error.includes('qurilmadan') || error.includes('устройства') ? '#fef3c7' : '#fee2e2',
                color: error.includes('qurilmadan') || error.includes('устройства') ? '#92400e' : '#dc2626',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.login}
              </label>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                placeholder="admin"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: loading ? '#6b7280' : '#3b82f6' }}
            >
              {loading ? t.loading : t.btn}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
