import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Video, User } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export function BottomNav() {
  const { t } = useLanguage()

  const links = [
    { to: '/', label: t.nav.home, icon: Home, end: true },
    { to: '/darslar', label: t.nav.lessons, icon: BookOpen, end: false },
    { to: '/video-darslar', label: t.nav.videos, icon: Video, end: false },
    { to: '/profil', label: t.nav.profile, icon: User, end: false },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-bottom">
      <div className="grid grid-cols-4">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 px-1 min-h-[60px] transition-colors ${
                isActive
                  ? 'text-uzum dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] font-medium leading-tight text-center line-clamp-2">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
