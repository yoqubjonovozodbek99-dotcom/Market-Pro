import { NavLink, useLocation } from 'react-router-dom'
import { Home, BookOpen, User, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

function isLessonsPath(path: string) {
  return path.startsWith('/darslar') || path.startsWith('/video-darslar')
}

export function BottomNav() {
  const { t } = useLanguage()
  const location = useLocation()
  const { user } = useAuth()

  const links = [
    { to: '/', label: t.nav.home, icon: Home, end: true },
    { to: '/darslar', label: t.nav.lessons, icon: BookOpen, end: false },
    ...(user ? [{ to: '/profil', label: t.nav.profile, icon: User, end: false }] : []),
    ...(user?.role === 'ADMIN' ? [{ to: '/admin', label: t.nav.admin, icon: ShieldCheck, end: false }] : []),
  ]

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-bottom">
      <div className={`grid ${links.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {links.map(({ to, label, icon: Icon, end }) => {
          const isActive = to === '/darslar' ? isLessonsPath(location.pathname) : (
            end ? location.pathname === '/' : location.pathname.startsWith(to)
          )

          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1 min-h-[60px] transition-colors ${
                isActive
                  ? 'text-uzum dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium leading-tight text-center line-clamp-2">
                {label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
