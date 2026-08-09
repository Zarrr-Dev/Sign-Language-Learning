import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'
import { quizService, type QuizAttempt } from '../services/quizService'

export const ProfilePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [history, setHistory] = useState<QuizAttempt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchHistory()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const data = await quizService.getUserQuizHistory(user!.id)
      setHistory(data)
    } catch (err) {
      console.error('Error fetching user quiz history:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      navigate('/login')
    } catch (err) {
      console.error('Gagal keluar sesi:', err)
    }
  }

  // Perhitungan Statistik
  const totalQuizzes = history.length
  const totalCorrect = history.reduce((acc, curr) => acc + curr.score, 0)
  const totalQuestions = history.reduce((acc, curr) => acc + curr.total_questions, 0)
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* User Header Profile Card */}
      <div className="bg-surface-container-low border-2 border-primary rounded-2xl p-6 shadow-hard relative overflow-hidden">
        {/* Tape Decor */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary-container/80 border border-primary/30 -rotate-1" />

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
          {/* Avatar Icon */}
          <div className="w-20 h-20 rounded-2xl bg-secondary-container border-2 border-primary flex items-center justify-center text-3xl font-bold font-headline text-on-secondary-container shadow-hard shrink-0">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left flex-1">
            <span className="inline-block px-3 py-0.5 rounded-full bg-surface border border-primary text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
              Pelajar Aktif
            </span>
            <h1 className="font-headline text-2xl font-bold text-primary">
              {user?.user_metadata?.full_name || 'Pengguna HandTalk'}
            </h1>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              {user?.email}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-surface text-tertiary border-2 border-tertiary rounded-xl font-bold text-xs uppercase tracking-wider shadow-hard-sm hover:bg-tertiary-container/20 active:translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Grid Rekap Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border-2 border-primary rounded-xl p-4 shadow-hard flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary-container border border-primary flex items-center justify-center text-primary shadow-hard-sm">
            <span className="material-symbols-outlined text-xl">quiz</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
              Total Kuis
            </span>
            <span className="font-headline text-xl font-bold text-primary">{totalQuizzes} Sesi</span>
          </div>
        </div>

        <div className="bg-surface border-2 border-primary rounded-xl p-4 shadow-hard flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary-container border border-primary flex items-center justify-center text-primary shadow-hard-sm">
            <span className="material-symbols-outlined text-xl">check_circle</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
              Jawaban Benar
            </span>
            <span className="font-headline text-xl font-bold text-primary">{totalCorrect} Soal</span>
          </div>
        </div>

        <div className="bg-surface border-2 border-primary rounded-xl p-4 shadow-hard flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary-container border border-primary flex items-center justify-center text-primary shadow-hard-sm">
            <span className="material-symbols-outlined text-xl">verified</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
              Rata-rata Akurasi
            </span>
            <span className="font-headline text-xl font-bold text-primary">{accuracy}%</span>
          </div>
        </div>
      </div>

      {/* Tabel Histori Kuis */}
      <div className="bg-surface border-2 border-primary rounded-2xl p-6 shadow-hard space-y-4">
        <div className="flex items-center justify-between border-b border-primary/20 pb-3">
          <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">history</span>
            Riwayat Percobaan Kuis
          </h3>
          <span className="text-xs font-bold text-on-surface-variant">
            {history.length} Catatan
          </span>
        </div>

        {loading ? (
          <p className="text-xs text-on-surface-variant p-4 text-center">Memuat riwayat kuis...</p>
        ) : history.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-low border border-primary/20 rounded-xl">
            <span className="material-symbols-outlined text-3xl text-primary/40 mb-1">assignment_late</span>
            <p className="text-xs font-bold text-on-surface-variant">Belum ada riwayat kuis yang tersimpan.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center justify-between p-4 bg-surface-container-low border border-primary/30 rounded-xl text-xs hover:border-primary transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-sm">Latihan Tebak Isyarat</span>
                    <span className="px-2 py-0.5 bg-surface border border-primary/30 rounded text-[10px] font-bold text-on-surface-variant">
                      Selesai
                    </span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant block">
                    {item.completed_at
                      ? new Date(item.completed_at).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })
                      : 'Baru saja'}
                  </span>
                </div>

                <div className="px-3.5 py-1.5 bg-secondary-container border border-primary rounded-xl font-bold text-on-secondary-container shadow-hard-sm text-center">
                  <span className="text-sm block">{item.score} / {item.total_questions}</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-80">
                    Akurasi {Math.round((item.score / item.total_questions) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}