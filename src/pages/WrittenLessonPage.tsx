import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { fetchMe } from '../api'
import { getWrittenLesson, getWrittenModule } from '../data/writtenLessons'
import { LessonContent } from '../components/LessonContent'

export function WrittenLessonPage() {
  const { moduleSlug, lessonId } = useParams<{ moduleSlug: string; lessonId: string }>()
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [allowed, setAllowed] = useState<boolean>(true)
  const [checking, setChecking] = useState<boolean>(true)

  const mod = moduleSlug ? getWrittenModule(moduleSlug) : undefined
  const lesson = moduleSlug && lessonId ? getWrittenLesson(moduleSlug, lessonId) : undefined

  if (!mod || !lesson) {
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

  const title = lang === 'uz' ? lesson.title : lesson.titleRu
  const lessonIndex = mod.lessons.findIndex((l) => l.id === lesson.id)
  const prev = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null
  const next = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null

  useEffect(() => {
    let mounted = true

    const checkAccess = async () => {
      if (user?.role === 'ADMIN') {
        if (mounted) {
          setAllowed(true)
          setChecking(false)
        }
        return
      }

      if (!lessonId) {
        if (mounted) {
          setAllowed(false)
          setChecking(false)
        }
        return
      }

      try {
        const me = await fetchMe()

        const requiredDay = lesson.lessonNum || 1
        const accessDays = Number(me.accessDays ?? 0)
        const canOpen = Number.isFinite(accessDays) && accessDays >= requiredDay

        if (mounted) {
          setAllowed(canOpen)
        }
      } catch {
        if (mounted) {
          setAllowed(false)
        }
      } finally {
        if (mounted) {
          setChecking(false)
        }
      }
    }

    checkAccess()

    return () => {
      mounted = false
    }
  }, [lessonId, user?.role])

  if (checking) {
    return (
      <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Lock className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {lang === 'uz' ? 'Bu dars hali siz uchun ochilmagan.' : 'Этот урок пока недоступен для вас.'}
          </p>
          <Link to={`/darslar/yozma/${mod.slug}`} className="text-uzum dark:text-blue-400 underline">
            {lang === 'uz' ? 'Modulga qaytish' : 'Вернуться к модулю'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <Link
          to={`/darslar/yozma/${mod.slug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-uzum dark:hover:text-blue-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'uz' ? mod.title : mod.titleRu}
        </Link>

      <header className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
        <span className="text-sm font-medium text-uzum dark:text-blue-400">
          {mod.num}-modul • {t.lessonsHub.lessonWord} {lesson.lessonNum}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4 leading-tight">
          {title}
        </h1>
        <span className="text-sm text-gray-400 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {lesson.readTime}
        </span>
      </header>

      <LessonContent blocks={lesson.blocks} />

      <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 grid sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            to={`/darslar/yozma/${mod.slug}/${prev.id}`}
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-uzum/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs text-gray-400">{t.lessonsHub.prevLesson}</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {lang === 'uz' ? prev.title : prev.titleRu}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={`/darslar/yozma/${mod.slug}/${next.id}`}
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-uzum/50 transition-colors sm:text-right sm:flex-row-reverse"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs text-gray-400">{t.lessonsHub.nextLesson}</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {lang === 'uz' ? next.title : next.titleRu}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </nav>
      </div>
    </div>
  )
}
