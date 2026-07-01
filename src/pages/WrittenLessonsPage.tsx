import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Lock, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { writtenModules } from '../data/writtenLessons'

export function WrittenLessonsPage() {
  const { t, lang } = useLanguage()

  return (
    <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <Link
          to="/darslar"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-uzum dark:hover:text-blue-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.lessonsHub.backToHub}
        </Link>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {t.lessonsHub.writtenTitle}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{t.lessonsHub.writtenPageDesc}</p>
      </div>

      <div className="space-y-4">
        {writtenModules.map((mod) => {
          const title = lang === 'uz' ? mod.title : mod.titleRu
          const desc = lang === 'uz' ? mod.desc : mod.descRu

          if (!mod.available) {
            return (
              <div
                key={mod.slug}
                className="flex items-center gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-60"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">{mod.num}-modul</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500">
                      {t.lessonsHub.comingSoon}
                    </span>
                  </div>
                  <h2 className="font-bold text-gray-700 dark:text-gray-300 truncate">{title}</h2>
                  <p className="text-sm text-gray-400 truncate">{desc}</p>
                </div>
              </div>
            )
          }

          return (
            <Link
              key={mod.slug}
              to={`/darslar/yozma/${mod.slug}`}
              className="flex items-center gap-4 p-6 rounded-2xl border-2 border-uzum/30 hover:border-uzum bg-white dark:bg-gray-900 transition-all hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-uzum/10 dark:bg-blue-500/15 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-uzum dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-uzum dark:text-blue-400">
                    {mod.num}-modul
                  </span>
                  <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-3 h-3" />
                    {t.lessonsHub.available}
                  </span>
                </div>
                <h2 className="font-bold text-gray-900 dark:text-white group-hover:text-uzum dark:group-hover:text-blue-400 transition-colors">
                  {title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-400">
                  <span>{mod.lessonCount} {t.lessonsHub.lessonWord}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />~{mod.hours} {lang === 'uz' ? 'soat' : 'ч.'}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
