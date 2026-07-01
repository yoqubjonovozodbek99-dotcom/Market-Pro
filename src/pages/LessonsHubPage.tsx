import { Link } from 'react-router-dom'
import { FileText, Video, BookOpen, Clock, ArrowRight, Lock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { writtenModules } from '../data/writtenLessons'

export function LessonsHubPage() {
  const { t } = useLanguage()
  const module1 = writtenModules[0]
  const availableWritten = writtenModules.filter((m) => m.available).length

  return (
    <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t.lessonsHub.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t.lessonsHub.subtitle}</p>
        </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Link
          to="/darslar/yozma"
          className="group rounded-3xl border-2 border-uzum/30 hover:border-uzum p-8 bg-white dark:bg-gray-900 transition-all hover:shadow-lg"
        >
          <div className="w-14 h-14 rounded-2xl bg-uzum/10 dark:bg-blue-500/15 flex items-center justify-center mb-6">
            <FileText className="w-7 h-7 text-uzum dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t.lessonsHub.writtenTitle}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {t.lessonsHub.writtenDesc}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {availableWritten} / 8 {t.stats.modules.toLowerCase()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {module1.lessonCount} {t.lessonsHub.lessonsInModule1}
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-uzum dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
            {t.lessonsHub.openWritten}
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>

        <Link
          to="/video-darslar"
          className="group rounded-3xl border-2 border-yandex/40 hover:border-yandex p-8 bg-white dark:bg-gray-900 transition-all hover:shadow-lg"
        >
          <div className="w-14 h-14 rounded-2xl bg-yandex/20 dark:bg-yellow-500/15 flex items-center justify-center mb-6">
            <Video className="w-7 h-7 text-yellow-700 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t.lessonsHub.videoTitle}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {t.lessonsHub.videoDesc}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <Video className="w-4 h-4" />
              82 {t.stats.videos.toLowerCase()}
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-yellow-700 dark:text-yellow-400 font-semibold group-hover:gap-3 transition-all">
            {t.lessonsHub.openVideo}
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>

      <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-400" />
          {t.lessonsHub.protectedNote}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.lessonsHub.protectedDesc}</p>
      </div>
      </div>
    </div>
  )
}
