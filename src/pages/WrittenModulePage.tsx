import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { getWrittenModule } from '../data/writtenLessons'

const platformBadge = {
  uzum: 'Uzum Market',
  yandex: 'Yandex Market',
  both: 'Umumiy',
}

export function WrittenModulePage() {
  const { moduleSlug } = useParams<{ moduleSlug: string }>()
  const { t, lang } = useLanguage()
  const mod = moduleSlug ? getWrittenModule(moduleSlug) : undefined

  if (!mod || !mod.available) {
    return (
      <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500">{t.lessonsHub.notFound}</p>
          <Link to="/darslar/yozma" className="text-uzum mt-4 inline-block">
            {t.lessonsHub.backToWritten}
          </Link>
        </div>
      </div>
    )
  }

  const title = lang === 'uz' ? mod.title : mod.titleRu
  const desc = lang === 'uz' ? mod.desc : mod.descRu

  return (
    <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <Link
          to="/darslar/yozma"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-uzum dark:hover:text-blue-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.lessonsHub.backToWritten}
        </Link>

      <div className="mb-10">
        <span className="text-sm font-bold text-uzum dark:text-blue-400">
          {mod.num}-modul
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{desc}</p>
        <p className="text-sm text-gray-400 mt-2">
          {mod.lessonCount} {t.lessonsHub.lessonWord} • ~{mod.hours}{' '}
          {lang === 'uz' ? 'soat' : 'ч.'}
        </p>
      </div>

      <div className="space-y-3">
        {mod.lessons.map((lesson, index) => {
          const lessonTitle = lang === 'uz' ? lesson.title : lesson.titleRu
          const badge = platformBadge[lesson.platform]

          return (
            <Link
              key={lesson.id}
              to={`/darslar/yozma/${mod.slug}/${lesson.id}`}
              className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-uzum/50 dark:hover:border-blue-500/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-uzum/10 dark:bg-blue-500/15 flex items-center justify-center shrink-0 font-bold text-uzum dark:text-blue-400 text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {badge}
                </span>
                <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-uzum dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {lessonTitle}
                </h2>
                <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  {lesson.readTime}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-uzum shrink-0" />
            </Link>
          )
        })}
      </div>
      </div>
    </div>
  )
}
