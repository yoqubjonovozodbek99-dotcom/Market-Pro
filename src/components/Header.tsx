import { NavLink, useLocation } from 'react-router-dom'
import { MarketProLogo, UzumLogo, YandexLogo } from './Logo'
import { ThemeToggle, LanguageToggle } from './ThemeLanguageToggle'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

function isLessonsPath(path: string) {
  return path.startsWith('/darslar') || path.startsWith('/video-darslar')
}

export function Header() {
  const { t } = useLanguage()
  const location = useLocation()
  const { user } = useAuth()

  const links = [
    { to: '/', label: t.nav.home, end: true as const },
    { to: '/darslar', label: t.nav.lessons, end: false as const },
    ...(user ? [{ to: '/profil', label: t.nav.profile, end: false as const }] : []),
    ...(user?.role === 'ADMIN' ? [{ to: '/admin', label: t.nav.admin, end: false as const }] : []),
  ]

  const navClass = (to: string) =>
    ({ isActive }: { isActive: boolean }) => {
      const active = to === '/darslar' ? isLessonsPath(location.pathname) : isActive
      return `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-uzum/10 text-uzum dark:text-blue-400 dark:bg-blue-500/15'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
      }`
    }

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 safe-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="hidden sm:flex items-center justify-end gap-3 py-2 border-b border-gray-100 dark:border-gray-800/50">
          <UzumLogo className="text-xs scale-90 origin-right" />
          <YandexLogo className="text-xs scale-90 origin-right" />
        </div>

        <div className="flex items-center justify-between gap-2 h-14 sm:h-16">
          <NavLink to="/" className="shrink-0 min-w-0">
            <MarketProLogo size="sm" />
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass(link.to)} end={link.end}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex sm:hidden items-center justify-center gap-2 pb-2">
          <UzumLogo className="text-[10px] px-2 py-1 flex-1 justify-center max-w-[48%]" />
          <YandexLogo className="text-[10px] px-2 py-1 flex-1 justify-center max-w-[48%]" />
        </div>
      </div>
    </header>
  )
}
