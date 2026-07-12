import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth, ApiError } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

type Mode = 'login' | 'register'

export function LoginPage() {
  const { login, register } = useAuth()
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string })?.from || '/'

  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pendingMessage, setPendingMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const t = {
    loginTitle: lang === 'uz' ? 'Kirish' : 'Войти',
    registerTitle: lang === 'uz' ? "Ro'yxatdan o'tish" : 'Регистрация',
    name: lang === 'uz' ? 'Ism' : 'Имя',
    email: 'Email',
    phone: lang === 'uz' ? 'Telefon' : 'Телефон',
    password: lang === 'uz' ? 'Parol' : 'Пароль',
    loginBtn: lang === 'uz' ? 'Kirish' : 'Войти',
    registerBtn: lang === 'uz' ? "Ro'yxatdan o'tish" : 'Зарегистрироваться',
    loadingText: lang === 'uz' ? 'Yuklanmoqda...' : 'Загрузка...',
    switchToRegister: lang === 'uz' ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" : 'Нет аккаунта? Зарегистрируйтесь',
    switchToLogin: lang === 'uz' ? 'Hisobingiz bormi? Kiring' : 'Уже есть аккаунт? Войдите',
    pendingBack: lang === 'uz' ? "Kirish sahifasiga qaytish" : 'Вернуться на страницу входа',
    invalid: lang === 'uz' ? "Email yoki parol noto'g'ri" : 'Неверный email или пароль',
    blocked: lang === 'uz' ? 'Hisobingiz bloklangan' : 'Ваш аккаунт заблокирован',
    pendingLoginAttempt:
      lang === 'uz'
        ? "Hisobingiz hali administrator tomonidan tasdiqlanmagan. Iltimos, tasdiqlanishini kuting."
        : 'Ваш аккаунт ещё не подтверждён администратором. Пожалуйста, дождитесь подтверждения.',
  }

  const resetMessages = () => {
    setError('')
    setPendingMessage('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    resetMessages()
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiError && err.code === 'PENDING_APPROVAL') {
        setPendingMessage(t.pendingLoginAttempt)
      } else if (err instanceof ApiError && err.code === 'BLOCKED') {
        setError(t.blocked)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(t.invalid)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    resetMessages()
    setLoading(true)
    try {
      const message = await register({ name, email, phone, password, language: lang })
      setPendingMessage(message)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.invalid)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
      style={{ background: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), var(--bg-primary)' }}
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
          {pendingMessage ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">⏳</div>
              <h1 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {lang === 'uz' ? 'Kutilmoqda' : 'Ожидание'}
              </h1>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                {pendingMessage}
              </p>
              <button
                onClick={() => {
                  resetMessages()
                  setMode('login')
                }}
                className="w-full py-3 rounded-xl font-semibold text-white"
                style={{ background: '#3b82f6' }}
              >
                {t.pendingBack}
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                {mode === 'login' ? t.loginTitle : t.registerTitle}
              </h1>

              {error && (
                <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fee2e2', color: '#dc2626' }}>
                  {error}
                </div>
              )}

              <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
                {mode === 'register' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {t.name}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl outline-none"
                      style={inputStyle}
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={inputStyle}
                    placeholder="you@example.com"
                  />
                </div>

                {mode === 'register' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl outline-none"
                      style={inputStyle}
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {t.password}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={inputStyle}
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white"
                  style={{ background: loading ? '#6b7280' : '#3b82f6' }}
                >
                  {loading ? t.loadingText : mode === 'login' ? t.loginBtn : t.registerBtn}
                </button>
              </form>

              <button
                onClick={() => {
                  resetMessages()
                  setMode(mode === 'login' ? 'register' : 'login')
                }}
                className="w-full mt-4 text-sm text-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                {mode === 'login' ? t.switchToRegister : t.switchToLogin}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}