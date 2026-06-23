import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Language } from '../i18n/translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (typeof translations)['uz']
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language | null
    return saved === 'ru' ? 'ru' : 'uz'
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
