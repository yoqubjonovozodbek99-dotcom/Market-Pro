import {
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Trophy,
  Flame,
  CheckCircle2,
  Video,
  ClipboardCheck,
  Radio,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { demoProfile } from '../data/content'

export function ProfilePage() {
  const { t, lang } = useLanguage()
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const student = demoProfile
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU')
    : student.memberSince

  const handleLogout = async () => {
    await logout()
    navigate('/kirish')
  }

  const statCards = [
    { icon: CheckCircle2, label: t.profile.stats.lessonsDone, value: student.completedLessons, color: 'text-uzum' },
    { icon: ClipboardCheck, label: t.profile.stats.testsPassed, value: student.testsPassed, color: 'text-green-500' },
    { icon: Radio, label: t.profile.stats.liveAttended, value: student.liveAttended, color: 'text-purple-500' },
    { icon: Flame, label: t.profile.stats.streak, value: `${student.streak} ${lang === 'uz' ? 'kun' : 'дн.'}`, color: 'text-orange-500' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {t.profile.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">{t.profile.demoNote}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left — User info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl gradient-brand flex items-center justify-center text-3xl font-bold text-white mb-4">
                {student.avatar}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{student.name}</h2>
              <span className="mt-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-medium">
                {t.profile.active}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { icon: Mail, value: student.email },
                { icon: Phone, value: student.phone },
                { icon: Calendar, value: `${t.profile.memberSince}: ${memberSince}` },
                {
                  icon: CreditCard,
                  value: lang === 'uz' ? student.subscriptionPlan : student.subscriptionPlanRu,
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

          {/* Achievements */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yandex-dark dark:text-yellow-400" />
              {t.profile.achievements}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {student.achievements.length > 0 ? (
                student.achievements.map((a) => (
                  <div
                    key={a.title}
                    className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center"
                  >
                    <div className="text-2xl mb-1">{a.icon}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                      {lang === 'uz' ? a.title : a.titleRu}
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                  {lang === 'uz' ? 'Hali yutuq yo\'q' : 'Пока нет достижений'}
                </p>
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
              <span className="text-2xl font-black text-uzum dark:text-blue-400">{student.progress}%</span>
            </div>
            <div className="h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-6">
              <div
                className="h-full gradient-brand rounded-full transition-all duration-500"
                style={{ width: `${student.progress}%` }}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-uzum/5 dark:bg-blue-500/5 border border-uzum/20 dark:border-blue-500/20">
                <div className="text-sm text-gray-500 mb-1">{t.profile.completed}</div>
                <div className="text-2xl font-bold text-uzum dark:text-blue-400">
                  {student.completedLessons}{' '}
                  <span className="text-base font-normal text-gray-400">/ {student.totalLessons}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-yandex/10 dark:bg-yellow-500/5 border border-yandex/30 dark:border-yellow-500/20">
                <div className="text-sm text-gray-500 mb-1">{t.profile.remaining}</div>
                <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                  {student.totalLessons - student.completedLessons}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="text-sm text-gray-500 mb-1">{t.profile.watchedHours}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {student.watchedHours}{' '}
                  <span className="text-base font-normal text-gray-400">/ {student.totalHours} soat</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="text-sm text-gray-500 mb-1">{t.profile.lastActivity}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {lang === 'uz' ? student.lastActivity : student.lastActivityRu}
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              {student.recentActivity.length > 0 ? (
                student.recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-uzum" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {lang === 'uz' ? activity.action : activity.actionRu}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
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
                  {student.uzumCompleted} / {student.uzumTotal}
                </span>
              </div>
              <div className="h-2 rounded-full bg-uzum/20 overflow-hidden">
                <div
                  className="h-full bg-uzum rounded-full"
                  style={{
                    width: `${student.uzumTotal ? (student.uzumCompleted / student.uzumTotal) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div className="p-5 rounded-2xl border-2 border-yandex/40 bg-yandex/10 dark:bg-yellow-500/5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-yellow-700 dark:text-yellow-400">Yandex Market</span>
                <span className="text-sm font-medium">
                  {student.yandexCompleted} / {student.yandexTotal}
                </span>
              </div>
              <div className="h-2 rounded-full bg-yandex/30 overflow-hidden">
                <div
                  className="h-full bg-yandex rounded-full"
                  style={{
                    width: `${student.yandexTotal ? (student.yandexCompleted / student.yandexTotal) * 100 : 0}%`,
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
