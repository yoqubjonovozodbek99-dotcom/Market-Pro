import { Link } from 'react-router-dom'
import { BookOpen, Video, Clock, Radio, CheckCircle2, ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { UzumLogo, YandexLogo } from '../components/Logo'

export function LessonsPage() {
  const { t } = useLanguage()

  const courses = [
    {
      key: 'uzum' as const,
      data: t.lessons.uzum,
      Logo: UzumLogo,
      gradient: 'gradient-uzum',
      borderColor: 'border-uzum/40 hover:border-uzum',
      iconBg: 'bg-uzum/10 text-uzum dark:bg-blue-500/15 dark:text-blue-400',
      linkClass: 'bg-uzum hover:bg-uzum-dark text-white',
    },
    {
      key: 'yandex' as const,
      data: t.lessons.yandex,
      Logo: YandexLogo,
      gradient: 'gradient-yandex',
      borderColor: 'border-yandex/50 hover:border-yandex',
      iconBg: 'bg-yandex/20 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400',
      linkClass: 'bg-yandex hover:bg-yandex-dark text-gray-900',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {t.lessons.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{t.lessons.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {courses.map(({ key, data, Logo, gradient, borderColor, iconBg, linkClass }) => (
          <div
            key={key}
            className={`rounded-3xl border-2 ${borderColor} overflow-hidden bg-white dark:bg-gray-900 transition-colors`}
          >
            <div className={`${gradient} p-8 ${key === 'uzum' ? 'text-white' : 'text-gray-900'}`}>
              <Logo className="mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{data.title}</h2>
              <p className={`text-sm leading-relaxed ${key === 'uzum' ? 'text-white/85' : 'text-gray-800'}`}>
                {data.desc}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: BookOpen, label: data.modules },
                  { icon: Video, label: data.videos },
                  { icon: Clock, label: data.duration },
                  { icon: Radio, label: data.liveSessions },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className={`p-2 rounded-lg ${iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{label}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                {key === 'uzum' ? 'Uzum Market' : 'Yandex Market'} — {t.teachers.specialty}
              </h3>
              <ul className="space-y-2 mb-8">
                {data.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${key === 'uzum' ? 'text-uzum' : 'text-yandex-dark dark:text-yellow-400'}`} />
                    {topic}
                  </li>
                ))}
              </ul>

              <Link
                to="/video-darslar"
                state={{ platform: key }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${linkClass}`}
              >
                {t.lessons.enter}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Combined overview */}
      <div className="mt-12 p-8 rounded-2xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t.course.title} — {t.course.subtitle}
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-uzum dark:text-blue-400">82</div>
            <div className="text-sm text-gray-500 mt-1">{t.stats.videos}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-yandex-dark dark:text-yellow-400">36</div>
            <div className="text-sm text-gray-500 mt-1">{t.lessons.uzum.liveSessions.split('(')[0].trim()}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900 dark:text-white">3</div>
            <div className="text-sm text-gray-500 mt-1">{t.stats.months}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
