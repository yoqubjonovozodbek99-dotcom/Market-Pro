import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, ShieldAlert, CalendarDays, Save, BookOpen, CreditCard, Clock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
  fetchPendingUsers,
  fetchAdminUsers,
  approveUser,
  rejectUser,
  deleteAdminUser,
  fetchLessonDayConfigs,
  saveLessonDayConfigs,
  fetchAdminPayments,
  confirmPayment,
  rejectPayment,
  saveAdminUserAccessDays,
  type ApiUser,
  type AdminStudent,
  type AdminPayment,
} from '../api'
import { writtenModules } from '../data/writtenLessons'

type Tab = 'users' | 'payments' | 'lessonDays'

export function AdminPage() {
  const MONTHLY_PRICE = 510000
  const LESSONS_PER_MONTH = 12
  const STUDY_DAYS_PER_WEEK = 3
  const CALENDAR_DAYS_PER_WEEK = 7

  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('users')

  // --- Foydalanuvchilar tab ---
  const [pending, setPending] = useState<ApiUser[]>([])
  const [allStudents, setAllStudents] = useState<AdminStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [accessDaysMap, setAccessDaysMap] = useState<Record<string, number>>({})
  const [paymentAmountMap, setPaymentAmountMap] = useState<Record<string, number>>({})
  const [accessDaysSavingId, setAccessDaysSavingId] = useState<string | null>(null)
  const [accessDaysMsg, setAccessDaysMsg] = useState('')

  const calcSuggestedAccessDaysByAmount = (amount: number) => {
    const lessonPrice = MONTHLY_PRICE / LESSONS_PER_MONTH
    const lessonCount = amount / lessonPrice
    const calendarDays = lessonCount * (CALENDAR_DAYS_PER_WEEK / STUDY_DAYS_PER_WEEK)
    return Math.max(0, Math.min(365, Math.floor(calendarDays)))
  }

  const load = () => {
    setLoading(true)
    Promise.all([fetchPendingUsers(), fetchAdminUsers()])
      .then(([pendingRes, allRes]) => {
        setPending(pendingRes.users)
        setAllStudents(allRes.users)
        setAccessDaysMap(Object.fromEntries(allRes.users.map((u) => [u.id, u.accessDays])))
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Xatolik yuz berdi'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  // --- Dars kunlari tab ---
  // dayMap: lessonKey -> availableDay (lokal tahrirlash uchun)
  const [dayMap, setDayMap] = useState<Record<string, number>>({})
  const [daysLoading, setDaysLoading] = useState(false)
  const [daysSaving, setDaysSaving] = useState(false)
  const [daysMsg, setDaysMsg] = useState('')

  const loadDays = () => {
    setDaysLoading(true)
    fetchLessonDayConfigs()
      .then((res) => setDayMap(res.configs))
      .catch(() => setDayMap({}))
      .finally(() => setDaysLoading(false))
  }

  useEffect(() => {
    if (activeTab === 'lessonDays') loadDays()
  }, [activeTab])

  // --- To'lovlar tab ---
  const [payments, setPayments] = useState<AdminPayment[]>([])
  const [paymentsLoading, setPaymentsLoading] = useState(false)
  const [paymentBusy, setPaymentBusy] = useState<string | null>(null)
  const [paymentMsg, setPaymentMsg] = useState('')
  const [startDates, setStartDates] = useState<Record<string, string>>({})
  const [durationDays, setDurationDays] = useState<Record<string, number>>({})

  const loadPayments = () => {
    setPaymentsLoading(true)
    fetchAdminPayments()
      .then((res) => setPayments(res.payments))
      .catch(() => {})
      .finally(() => setPaymentsLoading(false))
  }

  useEffect(() => {
    if (activeTab === 'payments') loadPayments()
  }, [activeTab])

  const handleConfirmPayment = async (id: string) => {
    setPaymentBusy(id)
    setPaymentMsg('')
    try {
      const res = await confirmPayment(id, startDates[id] || undefined, durationDays[id])
      setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: 'CONFIRMED' } : p))
      setPaymentMsg(`✓ Tasdiqlandi. ${res.durationDays} kun: ${new Date(res.startDate).toLocaleDateString()} – ${new Date(res.endDate).toLocaleDateString()}`)
    } catch (err) {
      setPaymentMsg(err instanceof Error ? err.message : 'Xatolik')
    } finally {
      setPaymentBusy(null)
    }
  }

  const handleRejectPayment = async (id: string) => {
    if (!confirm('Bu to\'lovni rad etmoqchimisiz?')) return
    setPaymentBusy(id)
    try {
      await rejectPayment(id)
      setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: 'REJECTED' } : p))
    } catch (err) {
      setPaymentMsg(err instanceof Error ? err.message : 'Xatolik')
    } finally {
      setPaymentBusy(null)
    }
  }

  const handleDayChange = (lessonKey: string, value: number) => {
    setDayMap((prev) => ({ ...prev, [lessonKey]: Math.max(1, Math.min(365, value)) }))
  }

  const handleSaveDays = async () => {
    setDaysSaving(true)
    setDaysMsg('')
    try {
      const configs = writtenModules.flatMap((mod) =>
        mod.lessons.map((lesson) => ({
          lessonKey: lesson.id,
          availableDay: dayMap[lesson.id] ?? 1,
        }))
      )
      const res = await saveLessonDayConfigs(configs)
      setDaysMsg(`${res.saved} ta dars konfiguratsiyasi saqlandi ✓`)
    } catch (err) {
      setDaysMsg(err instanceof Error ? err.message : 'Saqlashda xatolik')
    } finally {
      setDaysSaving(false)
    }
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <ShieldAlert className="w-10 h-10 mx-auto mb-4 text-red-500" />
        <p className="text-gray-700 dark:text-gray-300">Bu sahifaga faqat administrator kira oladi.</p>
      </div>
    )
  }

  const handleApprove = async (id: string) => {
    setBusyId(id)
    try {
      await approveUser(id)
      setPending((prev) => prev.filter((u) => u.id !== id))
      setAllStudents((prev) => prev.map((u) => (u.id === id ? { ...u, isVerified: true } : u)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
    } finally {
      setBusyId(null)
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm("Bu foydalanuvchini rad etib, o'chirmoqchimisiz?")) return
    setBusyId(id)
    try {
      await rejectUser(id)
      setPending((prev) => prev.filter((u) => u.id !== id))
      setAllStudents((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
    } finally {
      setBusyId(null)
    }
  }

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Bu o'quvchini butunlay o'chirmoqchimisiz?")) return
    setBusyId(id)
    try {
      await deleteAdminUser(id)
      setPending((prev) => prev.filter((u) => u.id !== id))
      setAllStudents((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'O\'chirishda xatolik yuz berdi')
    } finally {
      setBusyId(null)
    }
  }

  const handleSaveAccessDays = async (id: string) => {
    setAccessDaysSavingId(id)
    setAccessDaysMsg('')
    try {
      const accessDays = Math.max(0, Math.min(365, accessDaysMap[id] ?? 0))
      const res = await saveAdminUserAccessDays(id, accessDays)
      setAllStudents((prev) => prev.map((u) => (u.id === id ? res.user : u)))
      setAccessDaysMap((prev) => ({ ...prev, [id]: res.user.accessDays }))
      setAccessDaysMsg(`${res.user.name} uchun ${res.user.accessDays} kun saqlandi`)
    } catch (err) {
      setAccessDaysMsg(err instanceof Error ? err.message : 'Saqlashda xatolik')
    } finally {
      setAccessDaysSavingId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 md:py-16 pb-24 md:pb-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Admin panel</h1>

      {/* Tab navigatsiya */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-uzum text-uzum dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Foydalanuvchilar
          {pending.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-red-500 text-white">
              {pending.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('lessonDays')}
          className={`flex items-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'lessonDays'
              ? 'border-uzum text-uzum dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          Dars kunlari
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`flex items-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'payments'
              ? 'border-uzum text-uzum dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          To'lovlar
          {payments.filter((p) => p.status === 'PENDING').length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-yellow-500 text-white">
              {payments.filter((p) => p.status === 'PENDING').length}
            </span>
          )}
        </button>
        </div>
      </div>

      {/* ====== FOYDALANUVCHILAR TAB ====== */}
      {activeTab === 'users' && (
        <>
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-6">
            Yangi ro'yxatdan o'tgan o'quvchilar shu yerda ko'rinadi. Tasdiqlaganingizdan so'ng ular tizimga kira oladi.
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
            Har bir o'quvchi uchun dars ochilish kunini qo'lda kiriting va saqlang. Xohlasangiz to'lov summasi bo'yicha avtomatik hisoblab ham qo'yishingiz mumkin.
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-lg text-sm bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-gray-800 dark:text-gray-200">Yuklanmoqda...</p>
          ) : pending.length === 0 ? (
            <p className="text-gray-800 dark:text-gray-200">Hozircha tasdiqlashni kutayotgan hech kim yo'q.</p>
          ) : (
            <div className="space-y-4">
              {pending.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{u.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{u.email}</div>
                    {u.phone && <div className="text-sm text-gray-500 dark:text-gray-400">{u.phone}</div>}
                    <div className="text-xs text-gray-400 mt-1">
                      Ro'yxatdan o'tgan: {new Date(u.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      disabled={busyId === u.id}
                      onClick={() => handleApprove(u.id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 text-sm font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Tasdiqlash
                    </button>
                    <button
                      disabled={busyId === u.id}
                      onClick={() => handleReject(u.id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-sm font-medium"
                    >
                      <XCircle className="w-4 h-4" /> Rad etish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Barcha ro'yxatdan o'tgan o'quvchilar ({allStudents.length})
            </h2>

            {accessDaysMsg && (
              <div className={`mb-3 p-2 rounded-lg text-xs ${accessDaysMsg.includes('saqlandi') ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                {accessDaysMsg}
              </div>
            )}

            {loading ? (
              <p className="text-gray-800 dark:text-gray-200">Yuklanmoqda...</p>
            ) : allStudents.length === 0 ? (
              <p className="text-gray-800 dark:text-gray-200">Hozircha ro'yxatdan o'tgan o'quvchilar yo'q.</p>
            ) : (
              <div className="space-y-3">
                {allStudents.map((u) => (
                  <div
                    key={u.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{u.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{u.email}</div>
                      {u.phone && <div className="text-sm text-gray-500 dark:text-gray-400">{u.phone}</div>}
                      <div className="text-xs text-gray-400 mt-1">
                        A'zo bo'lgan sana: {new Date(u.createdAt).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Darsga kirish: {u.accessDays > 0 ? `${u.accessDays} kun` : 'Yopiq'}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          step={1000}
                          value={paymentAmountMap[u.id] ?? ''}
                          onChange={(e) => setPaymentAmountMap((prev) => ({ ...prev, [u.id]: Math.max(0, parseInt(e.target.value) || 0) }))}
                          placeholder="To'lov so'm"
                          className="w-28 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const amount = paymentAmountMap[u.id] ?? 0
                            setAccessDaysMap((prev) => ({ ...prev, [u.id]: calcSuggestedAccessDaysByAmount(amount) }))
                          }}
                          className="px-2 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-medium"
                        >
                          Hisoblash
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={365}
                          value={accessDaysMap[u.id] ?? u.accessDays}
                          onChange={(e) => setAccessDaysMap((prev) => ({ ...prev, [u.id]: Math.max(0, Math.min(365, parseInt(e.target.value) || 0)) }))}
                          placeholder="Kun"
                          className="w-20 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button
                          disabled={accessDaysSavingId === u.id}
                          onClick={() => handleSaveAccessDays(u.id)}
                          className="px-3 py-1.5 rounded-lg bg-uzum text-white hover:bg-uzum/90 text-xs font-medium disabled:opacity-50"
                        >
                          {accessDaysSavingId === u.id ? '...' : 'Saqlash'}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full ${u.isVerified ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'}`}>
                          {u.isVerified ? 'Tasdiqlangan' : 'Kutilmoqda'}
                        </span>
                        {u.isBlocked && (
                          <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">
                            Bloklangan
                          </span>
                        )}
                      </div>
                      <button
                        disabled={busyId === u.id}
                        onClick={() => handleDeleteStudent(u.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-xs font-medium disabled:opacity-50"
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ====== DARS KUNLARI TAB ====== */}
      {activeTab === 'lessonDays' && (
        <div>
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-6">
            Har bir dars uchun <strong>"Nechanchi kunda ochiladi"</strong> raqamini belgilang (1–365).
            Talaba faqat obuna boshlanganidan shu kun o'tgandan keyin darsni ko'ra oladi.
          </p>

          {daysLoading ? (
            <p className="text-gray-800 dark:text-gray-200">Yuklanmoqda...</p>
          ) : (
            <div className="space-y-8">
              {writtenModules.map((mod) => (
                <div key={mod.slug}>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-uzum dark:text-blue-400" />
                    <h2 className="font-bold text-gray-900 dark:text-white">
                      {mod.num}-modul: {mod.title}
                    </h2>
                    <span className="text-xs text-gray-400">({mod.lessons.length} dars)</span>
                  </div>
                  <div className="space-y-2">
                    {mod.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 px-3 sm:px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                      >
                        <span className="w-6 text-center text-xs font-bold text-gray-400 shrink-0">
                          {idx + 1}
                        </span>
                        <span className="flex-1 text-sm text-gray-900 dark:text-gray-100 min-w-0 break-words">
                          {lesson.title}
                        </span>
                        <div className="flex items-center justify-between sm:justify-start gap-2 shrink-0 w-full sm:w-auto">
                          <label className="text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Kun raqami:
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={365}
                            value={dayMap[lesson.id] ?? 1}
                            onChange={(e) => handleDayChange(lesson.id, parseInt(e.target.value) || 1)}
                            className="w-16 px-2 py-1 text-sm text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-uzum/40"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <button
              onClick={handleSaveDays}
              disabled={daysSaving || daysLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-uzum text-white hover:bg-uzum/90 disabled:opacity-50 font-medium text-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              {daysSaving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
            {daysMsg && (
              <span className={`text-sm ${daysMsg.includes('✓') ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                {daysMsg}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ====== TO'LOVLAR TAB ====== */}
      {activeTab === 'payments' && (
        <div>
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-6">
            Foydalanuvchilar tomonidan yuborilgan to'lov so'rovlari. Tasdiqlashda obuna avtomatik yaratiladi.
          </p>

          {paymentMsg && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${paymentMsg.includes('✓') ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
              {paymentMsg}
            </div>
          )}

          {paymentsLoading ? (
            <p className="text-gray-800 dark:text-gray-200">Yuklanmoqda...</p>
          ) : payments.length === 0 ? (
            <p className="text-gray-800 dark:text-gray-200">Hozircha to'lov so'rovlari yo'q.</p>
          ) : (
            <div className="space-y-4">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border bg-white dark:bg-gray-900 ${
                    p.status === 'PENDING'
                      ? 'border-yellow-300 dark:border-yellow-600'
                      : p.status === 'CONFIRMED'
                      ? 'border-green-300 dark:border-green-700 opacity-70'
                      : 'border-red-200 dark:border-red-800 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">{p.user.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                          : p.status === 'CONFIRMED' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}>
                          {p.status === 'PENDING' ? 'Kutmoqda' : p.status === 'CONFIRMED' ? 'Tasdiqlangan' : 'Rad etilgan'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{p.user.email}</div>
                      {p.user.phone && <div className="text-sm text-gray-500 dark:text-gray-400">{p.user.phone}</div>}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {p.amount.toLocaleString()} so'm
                        </span>
                        <span className="text-gray-500">
                          {p.plan === 'THREE_MONTHS' ? '3 oylik' : '1 oylik'}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {p.note && <div className="text-xs text-gray-400 mt-1">Izoh: {p.note}</div>}
                      {p.screenshot && (
                        <a href={p.screenshot} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-uzum dark:text-blue-400 underline mt-1 inline-block">
                          Chek ko'rish
                        </a>
                      )}
                    </div>

                    {p.status === 'PENDING' && (
                      <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto sm:min-w-[180px]">
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">Obuna boshlanish sanasi:</label>
                          <input
                            type="date"
                            value={startDates[p.id] ?? new Date().toISOString().slice(0, 10)}
                            onChange={(e) => setStartDates((prev) => ({ ...prev, [p.id]: e.target.value }))}
                            className="w-full px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-uzum/40"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">Kirish kunlari:</label>
                          <input
                            type="number"
                            min={1}
                            max={365}
                            value={durationDays[p.id] ?? (p.plan === 'THREE_MONTHS' ? 90 : 30)}
                            onChange={(e) => setDurationDays((prev) => ({ ...prev, [p.id]: Math.max(1, Math.min(365, parseInt(e.target.value) || 1)) }))}
                            className="w-full px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-uzum/40"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            disabled={paymentBusy === p.id}
                            onClick={() => handleConfirmPayment(p.id)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 text-sm font-medium disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Tasdiqlash
                          </button>
                          <button
                            disabled={paymentBusy === p.id}
                            onClick={() => handleRejectPayment(p.id)}
                            className="min-w-[44px] flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-sm font-medium disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}