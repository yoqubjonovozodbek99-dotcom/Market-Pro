import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, ShieldAlert } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { fetchPendingUsers, approveUser, rejectUser, type ApiUser } from '../api'

export function AdminPage() {
  const { user } = useAuth()
  const [pending, setPending] = useState<ApiUser[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    fetchPendingUsers()
      .then((res) => setPending(res.users))
      .catch((err) => setError(err instanceof Error ? err.message : 'Xatolik yuz berdi'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  if (user && user.role !== 'ADMIN') {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tasdiqlash kutayotgan foydalanuvchilar</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Yangi ro'yxatdan o'tgan o'quvchilar shu yerda ko'rinadi. Tasdiqlaganingizdan so'ng ular tizimga kira oladi.
      </p>

      {error && (
        <div className="mb-6 p-3 rounded-lg text-sm bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Yuklanmoqda...</p>
      ) : pending.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Hozircha tasdiqlashni kutayotgan hech kim yo'q.</p>
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
              <div className="flex gap-2 shrink-0">
                <button
                  disabled={busyId === u.id}
                  onClick={() => handleApprove(u.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 text-sm font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" /> Tasdiqlash
                </button>
                <button
                  disabled={busyId === u.id}
                  onClick={() => handleReject(u.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-sm font-medium"
                >
                  <XCircle className="w-4 h-4" /> Rad etish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}