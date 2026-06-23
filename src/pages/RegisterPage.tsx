import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

export function RegisterPage() {
  const { register } = useAuth()
  const { language } = useLanguage()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const t = {
    title:    language === 'UZ' ? 'Ro\'yxatdan o\'tish' : 'Регистрация',
    name:     language === 'UZ' ? 'Ism Familiya'        : 'Имя Фамилия',
    email:    language === 'UZ' ? 'Email'               : 'Email',
    phone:    language === 'UZ' ? 'Telefon raqam'       : 'Номер телефона',
    password: language === 'UZ' ? 'Parol'               : 'Пароль',
    btn:      language === 'UZ' ? 'Ro\'yxatdan o\'tish' : 'Зарегистрироваться',
    hasAcc:   language === 'UZ' ? 'Hisob bormi?'        : 'Есть аккаунт?',
    login:    language === 'UZ' ? 'Kirish'              : 'Войти',
    loading:  language === 'UZ' ? 'Yuklanmoqda...'      : 'Загрузка...',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ name, email, phone, password, language: language.toLowerCase() as 'uz' | 'ru' })
      navigate('/')
    } catch (err) {
      setError((err as Error).message || (language === 'UZ' ? 'Xatolik yuz berdi' : 'Произошла ошибка'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
         style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2">
            <span style={{ color: 'var(--text-primary)' }}>Market</span>
            <span style={{ color: '#3b82f6' }}>Pro</span>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Academy</p>
        </div>

        {/* Karta */}
        <div className="rounded-2xl p-8"
             style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>

          <h1 className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}>
            {t.title}
          </h1>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm"
                 style={{ background: '#fee2e2', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Ism */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--text-secondary)' }}>
                {t.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Ism Familiya"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--text-secondary)' }}>
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="email@gmail.com"
              />
            </div>

            {/* Telefon */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--text-secondary)' }}>
                {t.phone}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="+998 90 123 45 67"
              />
            </div>

            {/* Parol */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--text-secondary)' }}>
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="••••••••"
              />
            </div>

            {/* Tugma */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: loading ? '#6b7280' : '#3b82f6' }}>
              {loading ? t.loading : t.btn}
            </button>
          </form>

          {/* Login havolasi */}
          <p className="text-center mt-4 text-sm"
             style={{ color: 'var(--text-secondary)' }}>
            {t.hasAcc}{' '}
            <Link to="/kirish" style={{ color: '#3b82f6', fontWeight: 600 }}>
              {t.login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}