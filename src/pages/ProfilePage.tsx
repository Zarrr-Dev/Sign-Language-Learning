import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

  const totalQuizzes = history.length
  const totalCorrect = history.reduce((acc, curr) => acc + curr.score, 0)
  const totalQuestions = history.reduce((acc, curr) => acc + curr.total_questions, 0)
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 text-[#1e1b14] select-none">
      
      {/* Header Profile Banner (Luas) */}
      <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#004349] flex flex-col md:flex-row items-center justify-between gap-6 relative">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-24 h-24 rounded-full bg-[#ffbe4f] border-2 border-[#004349] flex items-center justify-center text-4xl font-bold font-serif text-[#724d00] shadow-[4px_4px_0px_0px_#004349] shrink-0">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className="space-y-1">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#fff9ee] border border-[#004349] text-[10px] font-bold text-[#004349] uppercase tracking-wider">
              Pelajar Aktif
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-[#004349]">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna HandTalk'}
            </h1>
            <p className="text-xs text-[#3f484a] font-medium">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-3 bg-[#ba1a1a] text-white border-2 border-[#004349] rounded-2xl font-bold text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#004349] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 self-center md:self-auto"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span>Keluar Sesi</span>
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-5 shadow-[5px_5px_0px_0px_#004349] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffbe4f] border border-[#004349] flex items-center justify-center text-[#004349]">
            <span className="material-symbols-outlined text-2xl">quiz</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3f484a] block">
              Total Sesi Kuis
            </span>
            <span className="font-serif text-xl font-extrabold text-[#004349]">{totalQuizzes} Sesi</span>
          </div>
        </div>

        <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-5 shadow-[5px_5px_0px_0px_#004349] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffbe4f] border border-[#004349] flex items-center justify-center text-[#004349]">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3f484a] block">
              Jawaban Benar
            </span>
            <span className="font-serif text-xl font-extrabold text-[#004349]">{totalCorrect} Soal</span>
          </div>
        </div>

        <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-5 shadow-[5px_5px_0px_0px_#004349] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffbe4f] border border-[#004349] flex items-center justify-center text-[#004349]">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3f484a] block">
              Akurasi Rata-rata
            </span>
            <span className="font-serif text-xl font-extrabold text-[#004349]">{accuracy}%</span>
          </div>
        </div>
      </div>

      {/* Full History Section */}
      <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#004349] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#004349]/10 pb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#004349] flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">history</span>
              Semua Riwayat Kuis
            </h3>
            <p className="text-xs text-[#3f484a]">Menampilkan seluruh aktivitas kuis kamu.</p>
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-[#3f484a] p-6 text-center font-bold">Memuat riwayat kuis...</p>
        ) : history.length === 0 ? (
          <div className="p-8 text-center bg-[#faf3e6] border-2 border-[#004349]/20 rounded-2xl">
            <span className="material-symbols-outlined text-4xl text-[#004349]/40 mb-1">assignment_late</span>
            <p className="text-xs font-bold text-[#3f484a]">Belum ada riwayat kuis yang tersimpan.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Hapus .slice(0, 5) untuk menampilkan semuanya */}
            {history.map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center justify-between p-4 bg-[#faf3e6] border-2 border-[#004349] rounded-2xl text-xs shadow-[2px_2px_0px_0px_#004349]"
              >
                <div className="space-y-1">
                  <span className="font-bold text-[#004349] text-sm block">Sesi Latihan Kuis</span>
                  <span className="text-[10px] font-medium text-[#3f484a] block">
                    {item.completed_at
                      ? new Date(item.completed_at).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })
                      : 'Baru saja'}
                  </span>
                </div>

                <div className="px-3 py-1.5 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl font-bold text-[#724d00] text-center shadow-[1px_1px_0px_0px_#004349]">
                  <span className="text-xs block">{item.score} / {item.total_questions} Benar</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}