import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, ShieldAlert, CreditCard, Clock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
  fetchPendingUsers,
  fetchAdminUsers,
  approveUser,
  rejectUser,
  deleteAdminUser,
  fetchAdminPayments,
  confirmPayment,
  rejectPayment,
  saveAdminUserWrittenAccess,
  type ApiUser,
  type AdminStudent,
  type AdminPayment,
} from '../api'
import { writtenModules } from '../data/writtenLessons'

type Tab = 'users' | 'payments'
type Track = 'uzum' | 'yandex'

const moduleLimits = writtenModules
  .map((mod) => ({
    moduleNum: mod.num,
    uzumMax: mod.lessons.filter((l) => l.platform === 'uzum').length,
    yandexMax: mod.lessons.filter((l) => l.platform === 'yandex').length,
  }))
  .sort((a, b) => a.moduleNum - b.moduleNum)

const accessKey = (userId: string, moduleNum: number, track: Track) => `${userId}:${moduleNum}:${track}`

export function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('users')

  // --- Foydalanuvchilar tab ---
  const [pending, setPending] = useState<ApiUser[]>([])
  const [allStudents, setAllStudents] = useState<AdminStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [writtenAccessMap, setWrittenAccessMap] = useState<Record<string, number>>({})
  const [moduleSavingId, setModuleSavingId] = useState<string | null>(null)
  const [accessDaysMsg, setAccessDaysMsg] = useState('')

  const load = () => {
    setLoading(true)
    Promise.all([fetchPendingUsers(), fetchAdminUsers()])
      .then(([pendingRes, allRes]) => {
        setPending(pendingRes.users)
        setAllStudents(allRes.users)
        const nextMap: Record<string, number> = {}
        allRes.users.forEach((u) => {
          moduleLimits.forEach((m) => {
            const moduleAccess = (u.writtenAccess as any)?.[m.moduleNum] ?? { uzum: 0, yandex: 0 }
            nextMap[accessKey(u.id, m.moduleNum, 'uzum')] = Math.max(0, Math.min(m.uzumMax, Number(moduleAccess.uzum) || 0))
            nextMap[accessKey(u.id, m.moduleNum, 'yandex')] = Math.max(0, Math.min(m.yandexMax, Number(moduleAccess.yandex) || 0))
          })
        })
        setWrittenAccessMap(nextMap)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Xatolik yuz berdi'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

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

  const setTrackAccessValue = (userId: string, moduleNum: number, track: Track, value: number) => {
    const max = moduleLimits.find((m) => m.moduleNum === moduleNum)?.[track === 'uzum' ? 'uzumMax' : 'yandexMax'] ?? 0
    const safe = Math.max(0, Math.min(max, Math.floor(value || 0)))
    setWrittenAccessMap((prev) => ({
      ...prev,
      [accessKey(userId, moduleNum, track)]: safe,
    }))
  }

  const handleQuickSet = (userId: string, moduleNum: number, track: Track, preset: 5 | 10 | 'all') => {
    const limits = moduleLimits.find((m) => m.moduleNum === moduleNum)
    const max = (track === 'uzum' ? limits?.uzumMax : limits?.yandexMax) ?? 0
    const value = preset === 'all' ? max : Math.min(preset, max)
    setTrackAccessValue(userId, moduleNum, track, value)
  }

  const handleSaveModuleAccess = async (userId: string, moduleNum: number) => {
    const saveId = `${userId}:${moduleNum}`
    setModuleSavingId(saveId)
    setAccessDaysMsg('')
    try {
      const uzum = writtenAccessMap[accessKey(userId, moduleNum, 'uzum')] ?? 0
      const yandex = writtenAccessMap[accessKey(userId, moduleNum, 'yandex')] ?? 0

      const [resUzum, resYandex] = await Promise.all([
        saveAdminUserWrittenAccess(userId, moduleNum, 'uzum', uzum),
        saveAdminUserWrittenAccess(userId, moduleNum, 'yandex', yandex),
      ])

      const mergedWrittenAccess = resYandex.writtenAccess ?? resUzum.writtenAccess
      setAllStudents((prev) => prev.map((u) => (u.id === userId ? { ...u, writtenAccess: mergedWrittenAccess } : u)))

      const studentName = allStudents.find((u) => u.id === userId)?.name ?? 'O‘quvchi'
      setAccessDaysMsg(`${studentName}: ${moduleNum}-modul saqlandi (Uzum ${uzum}, Yandex ${yandex})`)
    } catch (err) {
      setAccessDaysMsg(err instanceof Error ? err.message : 'Saqlashda xatolik')
    } finally {
      setModuleSavingId(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-16 pb-24 md:pb-16">
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
            Har bir o'quvchi uchun modul kesimida Uzum/Yandex darslarining nechta qismi ochiq bo'lishini belgilang (masalan 5, 10 yoki hammasi).
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
                    className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:items-start p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{u.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{u.email}</div>
                      {u.phone && <div className="text-sm text-gray-500 dark:text-gray-400">{u.phone}</div>}
                      <div className="text-xs text-gray-400 mt-1">
                        A'zo bo'lgan sana: {new Date(u.createdAt).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Modul bo'yicha kirish: Uzum/Yandex alohida boshqariladi
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                        {moduleLimits.map((m) => {
                          const uzumKey = accessKey(u.id, m.moduleNum, 'uzum')
                          const yandexKey = accessKey(u.id, m.moduleNum, 'yandex')
                          const uzumVal = writtenAccessMap[uzumKey] ?? 0
                          const yandexVal = writtenAccessMap[yandexKey] ?? 0
                          const saveId = `${u.id}:${m.moduleNum}`

                          return (
                            <div key={m.moduleNum} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 h-full">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                  {m.moduleNum}-modul (Uzum 1..{m.uzumMax}, Yandex 1..{m.yandexMax})
                                </div>
                                <button
                                  disabled={moduleSavingId === saveId}
                                  onClick={() => handleSaveModuleAccess(u.id, m.moduleNum)}
                                  className="px-2 py-1 rounded-md bg-uzum text-white text-xs font-medium disabled:opacity-50"
                                >
                                  {moduleSavingId === saveId ? 'Saqlanmoqda...' : 'Saqlash'}
                                </button>
                              </div>

                              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="font-medium text-gray-600 dark:text-gray-300">Uzum</span>
                                  <input
                                    type="number"
                                    min={0}
                                    max={m.uzumMax}
                                    value={uzumVal}
                                    onChange={(e) => setTrackAccessValue(u.id, m.moduleNum, 'uzum', parseInt(e.target.value) || 0)}
                                    className="w-16 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                  />
                                  <button onClick={() => handleQuickSet(u.id, m.moduleNum, 'uzum', 5)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">5</button>
                                  <button onClick={() => handleQuickSet(u.id, m.moduleNum, 'uzum', 10)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">10</button>
                                  <button onClick={() => handleQuickSet(u.id, m.moduleNum, 'uzum', 'all')} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">Hammasi</button>
                                </div>

                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="font-medium text-gray-600 dark:text-gray-300">Yandex</span>
                                  <input
                                    type="number"
                                    min={0}
                                    max={m.yandexMax}
                                    value={yandexVal}
                                    onChange={(e) => setTrackAccessValue(u.id, m.moduleNum, 'yandex', parseInt(e.target.value) || 0)}
                                    className="w-16 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                  />
                                  <button onClick={() => handleQuickSet(u.id, m.moduleNum, 'yandex', 5)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">5</button>
                                  <button onClick={() => handleQuickSet(u.id, m.moduleNum, 'yandex', 10)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">10</button>
                                  <button onClick={() => handleQuickSet(u.id, m.moduleNum, 'yandex', 'all')} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">Hammasi</button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-xs lg:justify-start">
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