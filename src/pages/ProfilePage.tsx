import {
  Mail,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle2,
  Video,
  ShieldCheck,
  Clock3,
  LogOut,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { fetchMe, fetchMyProgress, type ApiSubscription, type ApiUser, type ProgressSummary } from '../api'

export function ProfilePage() {
  const { t, lang } = useLanguage()
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const [profileUser, setProfileUser] = useState<ApiUser | null>(null)
  const [subscription, setSubscription] = useState<ApiSubscription | null>(null)
  const [progress, setProgress] = useState<ProgressSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    Promise.all([
      fetchMe(),
      fetchMyProgress().catch(() => null),
    ])
      .then(([me, progressData]) => {
        if (!mounted) return
        setProfileUser(me.user)
        setSubscription(me.subscription)
        setProgress(progressData)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err instanceof Error ? err.message : 'Profil ma\'lumotini yuklab bo\'lmadi')
      })
      .finally(() => {
        if (!mounted) return
        setIsLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const currentUser = profileUser ?? user
  const initials = useMemo(() => {
    if (!currentUser?.name) return 'U'
    return currentUser.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
  }, [currentUser?.name])

  const memberSince = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU')
    : '-'

  const progressPercent = progress?.progressPercent ?? 0
  const participationPercent = progress?.participationPercent ?? progressPercent
  const certificateEligible = progress?.certificateEligible ?? false
  const completedLessons = progress?.completedLessons ?? 0
  const totalLessons = progress?.totalLessons ?? 0
  const watchedHours = Math.round(((progress?.watchedSeconds ?? 0) / 3600) * 10) / 10
  const recentActivity = progress?.recentActivity ?? []

  const roleLabel = currentUser?.role === 'ADMIN'
    ? 'Admin'
    : currentUser?.role === 'MENTOR'
      ? 'Mentor'
      : lang === 'uz'
        ? 'Talaba'
        : 'Студент'

  const subscriptionLabel = subscription
    ? subscription.plan === 'THREE_MONTHS'
      ? (lang === 'uz' ? '3 oylik obuna' : 'Подписка на 3 месяца')
      : (lang === 'uz' ? '1 oylik obuna' : 'Подписка на 1 месяц')
    : (lang === 'uz' ? 'Obuna mavjud emas' : 'Нет активной подписки')

  const subscriptionDaysLeft = subscription?.endDate
    ? Math.max(
        Math.ceil((new Date(subscription.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        0,
      )
    : 0

  const handleLogout = async () => {
    await logout()
    navigate('/kirish')
  }

  const statCards = [
    { icon: CheckCircle2, label: t.profile.stats.lessonsDone, value: completedLessons, color: 'text-uzum' },
    { icon: ShieldCheck, label: lang === 'uz' ? 'Rol' : 'Роль', value: roleLabel, color: 'text-green-500' },
    { icon: Clock3, label: t.profile.watchedHours, value: watchedHours, color: 'text-purple-500' },
  ]

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <p className="text-gray-700 dark:text-gray-300">Yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {t.profile.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        {error || (lang === 'uz' ? 'Ma\'lumotlar backenddan yuklandi' : 'Данные загружены с backend')}
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left — User info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl gradient-brand flex items-center justify-center text-3xl font-bold text-white mb-4">
                {initials}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentUser?.name ?? '-'}</h2>
              <span className="mt-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-medium">
                {currentUser?.isBlocked ? (lang === 'uz' ? 'Bloklangan' : 'Заблокирован') : t.profile.active}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { icon: Mail, value: currentUser?.email ?? '-' },
                { icon: Phone, value: currentUser?.phone ?? '-' },
                { icon: Calendar, value: `${t.profile.memberSince}: ${memberSince}` },
                {
                  icon: CreditCard,
                  value: subscriptionLabel,
                },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Icon className="w-4 h-4 shrink-0 text-gray-400" />
                  <span className="truncate">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              {lang === 'uz' ? 'Chiqish' : 'Выход'}
            </button>
          </div>

          {/* Subscription details */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-yandex-dark dark:text-yellow-400" />
              {lang === 'uz' ? 'Obuna holati' : 'Статус подписки'}
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>
                {lang === 'uz' ? 'Reja:' : 'План:'} <span className="font-medium">{subscriptionLabel}</span>
              </div>
              <div>
                {lang === 'uz' ? 'Faol:' : 'Активна:'}{' '}
                <span className="font-medium">
                  {subscription?.isActive ? (lang === 'uz' ? 'Ha' : 'Да') : (lang === 'uz' ? 'Yo\'q' : 'Нет')}
                </span>
              </div>
              {subscription?.endDate && (
                <div>
                  {lang === 'uz' ? 'Tugash sanasi:' : 'Дата окончания:'}{' '}
                  <span className="font-medium">
                    {new Date(subscription.endDate).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU')}
                  </span>
                </div>
              )}
              {subscription?.startDate && (
                <div>
                  {lang === 'uz' ? 'Boshlangan sanasi:' : 'Дата начала:'}{' '}
                  <span className="font-medium">
                    {new Date(subscription.startDate).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU')}
                  </span>
                </div>
              )}
              {subscription?.isActive && (
                <div>
                  {lang === 'uz' ? 'Qolgan kunlar:' : 'Осталось дней:'}{' '}
                  <span className="font-medium">{subscriptionDaysLeft}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right — Progress & activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress bar */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">{t.profile.progress}</h3>
              <span className="text-2xl font-black text-uzum dark:text-blue-400">{participationPercent}%</span>
            </div>
            <div className="h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-6">
              <div
                className="h-full gradient-brand rounded-full transition-all duration-500"
                style={{ width: `${participationPercent}%` }}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-uzum/5 dark:bg-blue-500/5 border border-uzum/20 dark:border-blue-500/20">
                <div className="text-sm text-gray-500 mb-1">{t.profile.completed}</div>
                <div className="text-2xl font-bold text-uzum dark:text-blue-400">
                  {completedLessons}{' '}
                  <span className="text-base font-normal text-gray-400">/ {totalLessons}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-yandex/10 dark:bg-yellow-500/5 border border-yandex/30 dark:border-yellow-500/20">
                <div className="text-sm text-gray-500 mb-1">{t.profile.remaining}</div>
                <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                  {Math.max(totalLessons - completedLessons, 0)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="text-sm text-gray-500 mb-1">{t.profile.watchedHours}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {watchedHours}{' '}
                  <span className="text-base font-normal text-gray-400">soat</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="text-sm text-gray-500 mb-1">{t.profile.lastActivity}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {recentActivity[0]
                    ? new Date(recentActivity[0].completedAt).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU')
                    : (lang === 'uz' ? 'Faollik hali yo\'q' : 'Активности пока нет')}
                </div>
              </div>
            </div>

            <div className={`mt-5 p-4 rounded-xl border ${certificateEligible ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-500/10' : 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-500/10'}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {lang === 'uz' ? 'Sertifikat mezoni (85%+)' : 'Критерий сертификата (85%+)'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {lang === 'uz'
                      ? `Ishtirok: ${participationPercent}%. Sertifikat uchun kamida 85% kerak.`
                      : `Участие: ${participationPercent}%. Для сертификата нужно минимум 85%.`}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${certificateEligible ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300'}`}>
                  {certificateEligible
                    ? (lang === 'uz' ? 'Sertifikatga mos' : 'Подходит для сертификата')
                    : (lang === 'uz' ? 'Hali yetarli emas' : 'Пока недостаточно')}
                </span>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statCards.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center"
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-uzum dark:text-blue-400" />
              {t.profile.recentActivity}
            </h3>
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-uzum" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {lang === 'uz' ? activity.lessonTitleUz : activity.lessonTitleRu}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(activity.completedAt).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                  {lang === 'uz' ? 'Faollik hali yo\'q' : 'Активности пока нет'}
                </p>
              )}
            </div>
          </div>

          {/* Platform progress */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 border-uzum/30 bg-uzum/5 dark:bg-blue-500/5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-uzum dark:text-blue-400">Uzum Market</span>
                <span className="text-sm font-medium">
                  {progress?.uzum.completed ?? 0} / {progress?.uzum.total ?? 0}
                </span>
              </div>
              <div className="h-2 rounded-full bg-uzum/20 overflow-hidden">
                <div
                  className="h-full bg-uzum rounded-full"
                  style={{
                    width: `${progress?.uzum.total ? ((progress?.uzum.completed ?? 0) / progress.uzum.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div className="p-5 rounded-2xl border-2 border-yandex/40 bg-yandex/10 dark:bg-yellow-500/5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-yellow-700 dark:text-yellow-400">Yandex Market</span>
                <span className="text-sm font-medium">
                  {progress?.yandex.completed ?? 0} / {progress?.yandex.total ?? 0}
                </span>
              </div>
              <div className="h-2 rounded-full bg-yandex/30 overflow-hidden">
                <div
                  className="h-full bg-yandex rounded-full"
                  style={{
                    width: `${progress?.yandex.total ? ((progress?.yandex.completed ?? 0) / progress.yandex.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
