import { Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import type { Language } from '../i18n/translations'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Dark mode' : 'Light mode'}
      className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-600" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  )
}

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  const toggle = () => setLang(lang === 'uz' ? 'ru' : 'uz')

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium touch-manipulation"
    >
      <Globe className="w-4 h-4" />
      {lang === 'uz' ? 'UZ' : 'RU'}
    </button>
  )
}

export function LanguageSelect() {
  const { lang, setLang } = useLanguage()

  const options: { value: Language; label: string }[] = [
    { value: 'uz', label: "O'zbek" },
    { value: 'ru', label: 'Русский' },
  ]

  return (
    <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLang(opt.value)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            lang === opt.value
              ? 'bg-uzum text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
