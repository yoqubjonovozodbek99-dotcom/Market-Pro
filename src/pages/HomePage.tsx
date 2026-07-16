import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/AnimatedSection'
import {
  Play,
  Users,
  Video,
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Shield,
  MessageCircle,
  FileText,
  Radio,
  Send,
  Mail,
  Phone,
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { teachers } from '../data/content'
import { siteConfig } from '../data/site'
import { UzumLogo, YandexLogo } from '../components/Logo'

const featureIcons = [Radio, Video, FileText, CheckCircle2, MessageCircle, Shield]

const ZOOM_LINK = 'https://meet.google.com/cvi-padf-faf'

export function HomePage() {
  const { t, lang } = useLanguage()

  const stats = [
    { value: siteConfig.targetStudents, label: t.stats.students, icon: Users },
    { value: '82', label: t.stats.videos, icon: Video },
    { value: '8', label: t.stats.modules, icon: BookOpen },
    { value: '3', label: t.stats.months, icon: Clock },
  ]

  const formatPrice = (n: number) => n.toLocaleString('uz-UZ')

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="absolute inset-0 gradient-brand opacity-[0.04] dark:opacity-[0.08]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-uzum/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-yandex/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-uzum/10 text-uzum dark:text-blue-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link
                to="/darslar"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 gradient-brand text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={siteConfig.telegramContact}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#229ED9] hover:bg-[#1d8bc4] text-white rounded-xl font-semibold shadow-lg shadow-sky-500/25 transition-colors w-full sm:w-auto"
              >
                <Send className="w-5 h-5" />
                {t.hero.telegram}
              </a>
              <a
                href="#kurs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <UzumLogo className="w-full sm:w-auto justify-center" />
              <YandexLogo className="w-full sm:w-auto justify-center" />
            </div>
          </div>
        </div>
        </section>

      {/* Stats */}
      <AnimatedSection className="border-y border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-uzum dark:text-blue-400" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* JONLI DARS */}
      <AnimatedSection className="py-12 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
            <Radio className="w-4 h-4" />
            {lang === 'uz' ? 'Jonli darsga kirish' : 'Вход на живой урок'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {lang === 'uz'
              ? 'Kunlik jonli darslar shu yerda'
              : 'Ежедневные живые уроки здесь'}
          </h2>
          <p className="text-white/80 mb-8 text-sm md:text-base">
            {lang === 'uz'
              ? 'Har kuni o‘tiladigan jonli darslarga ushbu tugma orqali to‘g‘ridan-to‘g‘ri kirasiz.'
              : 'Через эту кнопку вы входите на ежедневные живые уроки.'}
          </p>

          <a href={ZOOM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Play className="w-6 h-6 text-purple-600" />
            <span className="font-bold text-purple-600 text-lg">
              {lang === 'uz' ? 'Jonli darsga kirish' : 'Войти на живой урок'}
            </span>
          </a>

          <div className="mt-6">
            <a
              href={siteConfig.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/40 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              <Send className="w-4 h-4" />
              {lang === 'uz' ? 'Dars jadvali (Telegram)' : 'Расписание уроков (Telegram)'}
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* About */}
      <AnimatedSection className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.about.title}
            </h2>
            <p className="text-uzum dark:text-blue-400 font-medium mb-4">{t.about.subtitle}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.about.description}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Course */}
      <AnimatedSection id="kurs" className="py-16 md:py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t.course.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{t.course.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[t.course.duration, t.course.format, t.course.live].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
              >
                <CheckCircle2 className="w-5 h-5 text-uzum shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
            8 {t.course.modules}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.map((mod) => (
              <div
                key={mod.num}
                className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-uzum/50 dark:hover:border-blue-500/50 transition-colors group"
              >
                <span className="text-2xl font-black text-uzum/20 dark:text-blue-500/30 group-hover:text-uzum/40 transition-colors">
                  {mod.num}
                </span>
                <h4 className="font-semibold text-gray-900 dark:text-white mt-2 mb-2 text-sm leading-snug">
                  {mod.name}
                </h4>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>{mod.lessons}</span>
                  <span>•</span>
                  <span>{mod.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Teachers */}
      <AnimatedSection className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t.teachers.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{t.teachers.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teachers.map((teacher) => {
              const isUzum = teacher.platform === 'uzum'
              return (
                <div
                  key={teacher.id}
                  className={`rounded-2xl border-2 overflow-hidden ${
                    isUzum
                      ? 'border-uzum/30 dark:border-blue-500/30'
                      : 'border-yandex/50 dark:border-yellow-500/30'
                  }`}
                >
                  <div
                    className={`p-6 ${isUzum ? 'gradient-uzum' : 'gradient-yandex'} ${isUzum ? 'text-white' : 'text-gray-900'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                          isUzum ? 'bg-white/20' : 'bg-gray-900/10'
                        }`}
                      >
                        {teacher.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {lang === 'uz' ? teacher.name : teacher.nameRu}
                        </h3>
                        <p className={`text-sm ${isUzum ? 'text-white/80' : 'text-gray-700'}`}>
                          {lang === 'uz' ? teacher.role : teacher.roleRu}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {lang === 'uz' ? teacher.bio : teacher.bioRu}
                    </p>
                    <div className="flex gap-6 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500 block">{t.teachers.experience}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {lang === 'uz' ? teacher.experience : teacher.experienceRu}
                        </span>
                      </div>
                      {teacher.students > 0 && (
                        <div>
                          <span className="text-gray-500 block">{t.teachers.students}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {teacher.students}+
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {t.teachers.specialty}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(lang === 'uz' ? teacher.specialties : teacher.specialtiesRu).map((s) => (
                          <span
                            key={s}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isUzum
                                ? 'bg-uzum/10 text-uzum dark:bg-blue-500/15 dark:text-blue-400'
                                : 'bg-yandex/20 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400'
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="py-16 md:py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t.features.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((item, i) => {
              const Icon = featureIcons[i]
              return (
                <div
                  key={item.title}
                  className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
                >
                  <Icon className="w-10 h-10 text-uzum dark:text-blue-400 mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection className="py-16 md:py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t.pricing.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{t.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
            <div className="p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <h3 className="font-bold text-lg mb-2">{t.pricing.monthly}</h3>
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-1">
                {formatPrice(siteConfig.pricing.monthly)}
              </div>
              <div className="text-gray-500 text-sm mb-6">{t.pricing.perMonth}</div>
            </div>
            <div className="p-8 rounded-2xl border-2 border-uzum bg-uzum/5 dark:bg-blue-500/5 relative">
              <span className="absolute -top-3 right-4 px-3 py-1 bg-yandex text-gray-900 text-xs font-bold rounded-full">
                {siteConfig.pricing.quarterlySavePercent}% {t.pricing.save}
              </span>
              <h3 className="font-bold text-lg mb-2">{t.pricing.quarterly}</h3>
              <div className="text-4xl font-black text-uzum dark:text-blue-400 mb-1">
                {formatPrice(siteConfig.pricing.quarterly)}
              </div>
              <div className="text-gray-500 text-sm mb-6">{t.pricing.oneTime}</div>
            </div>
          </div>

          <ul className="max-w-xl mx-auto space-y-3">
            {t.pricing.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-uzum shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection id="aloqa" className="py-16 md:py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t.contact.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            {t.contact.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={siteConfig.telegramContact}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#229ED9] hover:bg-[#1d8bc4] text-white rounded-2xl font-bold text-lg shadow-xl shadow-sky-500/25 transition-colors w-full sm:w-auto"
            >
              <Send className="w-6 h-6" />
              {t.contact.telegram}
            </a>
            <a
              href={siteConfig.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#229ED9] text-[#229ED9] dark:text-sky-400 rounded-2xl font-bold text-lg hover:bg-[#229ED9]/10 transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-6 h-6" />
              {t.contact.telegramChannel}
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t.contact.telegramDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-uzum dark:hover:text-blue-400 transition-colors">
              <Mail className="w-4 h-4" />
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-uzum dark:hover:text-blue-400 transition-colors">
              <Phone className="w-4 h-4" />
              {siteConfig.phone}
            </a>
            <a href={siteConfig.telegramContact} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#229ED9] font-medium hover:underline">
              <Send className="w-4 h-4" />
              {siteConfig.telegramContactHandle}
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection className="py-16 md:py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            {t.faq.title}
          </h2>
          <div className="space-y-4">
            {t.faq.items.map((item) => (
              <details key={item.q} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 dark:text-white list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-uzum group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="gradient-brand rounded-3xl p-10 md:p-14 text-white shadow-2xl shadow-blue-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/darslar"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-uzum rounded-xl font-bold hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5" />
                {t.cta.button}
              </Link>
              <a
                href={siteConfig.telegramContact}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#229ED9] hover:bg-[#1d8bc4] text-white rounded-xl font-bold transition-colors w-full sm:w-auto justify-center"
              >
                <Send className="w-5 h-5" />
                {t.hero.telegram}
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}