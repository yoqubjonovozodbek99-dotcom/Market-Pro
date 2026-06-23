import { NavLink } from 'react-router-dom'
import { MarketProLogo, UzumLogo, YandexLogo } from './Logo'
import { ThemeToggle, LanguageToggle } from './ThemeLanguageToggle'
import { useLanguage } from '../contexts/LanguageContext'

export function Header() {
  const { t } = useLanguage()

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/darslar', label: t.nav.lessons },
    { to: '/video-darslar', label: t.nav.videos },
    { to: '/profil', label: t.nav.profile },
  ]

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-uzum/10 text-uzum dark:text-blue-400 dark:bg-blue-500/15'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
    }`

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 safe-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Platform logos — desktop top row */}
        <div className="hidden sm:flex items-center justify-end gap-3 py-2 border-b border-gray-100 dark:border-gray-800/50">
          <UzumLogo className="text-xs scale-90 origin-right" />
          <YandexLogo className="text-xs scale-90 origin-right" />
        </div>

        <div className="flex items-center justify-between gap-2 h-14 sm:h-16">
          <NavLink to="/" className="shrink-0 min-w-0">
            <MarketProLogo size="sm" />
          </NavLink>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile platform logos — always visible like desktop */}
        <div className="flex sm:hidden items-center justify-center gap-2 pb-2">
          <UzumLogo className="text-[10px] px-2 py-1 flex-1 justify-center max-w-[48%]" />
          <YandexLogo className="text-[10px] px-2 py-1 flex-1 justify-center max-w-[48%]" />
        </div>
      </div>
    </header>
  )
}
