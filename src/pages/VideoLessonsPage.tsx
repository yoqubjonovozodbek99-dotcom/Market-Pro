import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Play, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { videoLessons, type Platform } from '../data/content'
import { fetchMyProgress, markVideoLessonProgress } from '../api'

type Filter = 'all' | Platform

export function VideoLessonsPage() {
  const { t, lang } = useLanguage()
  const location = useLocation()
  const initialFilter = (location.state as { platform?: Platform })?.platform ?? 'all'
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const [completedKeys, setCompletedKeys] = useState<Set<string>>(new Set())
  const [savingKey, setSavingKey] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetchMyProgress()
      .then((p) => {
        if (!mounted) return
        setCompletedKeys(new Set(p.completedVideoKeys ?? []))
      })
      .catch(() => {
        if (mounted) setCompletedKeys(new Set())
      })
    return () => {
      mounted = false
    }
  }, [])

  const makeVideoLessonKey = (video: (typeof videoLessons)[number]) =>
    `m${video.moduleNum}-${video.platform}-${video.id}`

  const completedCount = useMemo(() => completedKeys.size, [completedKeys])

  const filtered =
    filter === 'all' ? videoLessons : videoLessons.filter((v) => v.platform === filter)

  const filters: { value: Filter; label: string; color?: string }[] = [
    { value: 'all', label: t.videos.filterAll },
    { value: 'uzum', label: t.videos.filterUzum, color: 'bg-uzum' },
    { value: 'yandex', label: t.videos.filterYandex, color: 'bg-yandex text-gray-900' },
  ]

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
          {t.videos.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{t.videos.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f.value
                ? f.color
                  ? `${f.color} text-white ${f.value === 'yandex' ? '!text-gray-900' : ''}`
                  : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((video) => {
          const isUzum = video.platform === 'uzum'
          const title = lang === 'uz' ? video.title : video.titleRu

          return (
            <div
              key={video.id}
              className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
            >
              <div
                className={`relative aspect-video flex items-center justify-center ${
                  isUzum
                    ? 'bg-gradient-to-br from-uzum/20 to-uzum-dark/30'
                    : 'bg-gradient-to-br from-yandex/30 to-yandex-dark/20'
                }`}
              >
                <div
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    isUzum
                      ? 'bg-uzum text-white'
                      : 'bg-yandex text-gray-900'
                  }`}
                >
                  {video.lessonNum}-{t.videos.lesson}
                </div>
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all ${
                    isUzum ? 'bg-uzum text-white' : 'bg-yandex text-gray-900'
                  }`}
                >
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/60 text-white text-xs">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isUzum
                        ? 'bg-uzum/10 text-uzum dark:bg-blue-500/15 dark:text-blue-400'
                        : 'bg-yandex/20 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400'
                    }`}
                  >
                    {isUzum ? 'Uzum' : 'Yandex'} • {video.moduleNum}-modul
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-snug line-clamp-2">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={async () => {
                    const lessonKey = makeVideoLessonKey(video)
                    const next = !completedKeys.has(lessonKey)
                    setSavingKey(lessonKey)
                    try {
                      await markVideoLessonProgress(lessonKey, next)
                      setCompletedKeys((prev) => {
                        const nextSet = new Set(prev)
                        if (next) nextSet.add(lessonKey)
                        else nextSet.delete(lessonKey)
                        return nextSet
                      })
                    } finally {
                      setSavingKey(null)
                    }
                  }}
                  disabled={savingKey === makeVideoLessonKey(video)}
                  className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 ${
                    completedKeys.has(makeVideoLessonKey(video))
                      ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
                      : 'bg-uzum text-white hover:bg-uzum/90'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {savingKey === makeVideoLessonKey(video)
                    ? (lang === 'uz' ? 'Saqlanmoqda...' : 'Сохранение...')
                    : completedKeys.has(makeVideoLessonKey(video))
                      ? (lang === 'uz' ? 'Ko\'rib bo\'ldim (bekor qilish)' : 'Просмотрено (отменить)')
                      : (lang === 'uz' ? 'Ko\'rib bo\'ldim' : 'Просмотрено')}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-sm text-gray-400 mt-10">
        {filtered.length} / {videoLessons.length} {t.stats.videos.toLowerCase()} • {lang === 'uz' ? 'Tugatilgan' : 'Завершено'}: {completedCount}
      </p>
      </div>
    </div>
  )
}
