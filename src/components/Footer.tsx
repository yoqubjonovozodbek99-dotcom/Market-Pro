import { Send, Mail, MessageCircle, Phone, User } from 'lucide-react'
import { MarketProLogo, UzumLogo, YandexLogo } from './Logo'
import { useLanguage } from '../contexts/LanguageContext'
import { siteConfig } from '../data/site'

export function Footer() {
  const { t, lang } = useLanguage()
  const founderName = lang === 'uz' ? siteConfig.founder.name : siteConfig.founder.nameRu

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 mt-auto pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <MarketProLogo size="sm" variant="light" />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">{t.footer.description}</p>
            <div className="mt-4 flex items-start gap-2 text-sm text-gray-300">
              <User className="w-4 h-4 shrink-0 mt-0.5 text-uzum dark:text-blue-400" />
              <span>
                <span className="text-gray-500">{t.footer.technicalLead}:</span>{' '}
                <span className="font-medium text-white">{founderName}</span>
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-500 block mb-0.5">{t.footer.telegramAdmin}</span>
                <a
                  href={siteConfig.telegramContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#229ED9] hover:text-[#5bc0f0] transition-colors font-medium"
                >
                  <Send className="w-4 h-4" />
                  {siteConfig.telegramContactHandle}
                </a>
              </li>
              <li>
                <span className="text-gray-500 block mb-0.5">{t.footer.telegramChannel}</span>
                <a
                  href={siteConfig.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  {siteConfig.telegramChannelHandle}
                </a>
              </li>
              <li>
                <span className="text-gray-500 block mb-0.5">{t.footer.email}</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="text-gray-500 block mb-0.5">{t.footer.phone}</span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">{t.footer.platforms}</h4>
            <div className="flex flex-col gap-2 items-start">
              <UzumLogo />
              <YandexLogo />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}.
        </div>
      </div>
    </footer>
  )
}
