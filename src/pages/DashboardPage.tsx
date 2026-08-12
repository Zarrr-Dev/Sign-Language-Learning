import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { quizService, type QuizAttempt } from '../services/quizService'
import { signService } from '../services/signService'
import { userService } from '../services/userService'

export const DashboardPage = () => {
  const { user } = useAuth()
  const [history, setHistory] = useState<QuizAttempt[]>([])
  const [totalSigns, setTotalSigns] = useState(0)
  const [loading, setLoading] = useState(true)

  // State Dinamis untuk Streak
  const [streakCount, setStreakCount] = useState<number>(0)
  const [isStreakActiveToday, setIsStreakActiveToday] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      loadData()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadData = async () => {
    try {
      setLoading(true)
      const [quizHistory, signs, profile] = await Promise.all([
        quizService.getUserQuizHistory(user!.id).catch(() => [] as QuizAttempt[]),
        signService.getAllSigns().catch(() => []),
        userService.getUserProfile(user!.id).catch(() => null)
      ])

      setHistory(quizHistory || [])
      setTotalSigns(signs ? signs.length : 0)

      // Cek Status Streak Realtime
      if (profile) {
        const today = new Date().toISOString().split('T')[0]
        setStreakCount(profile.streak_count || 0)
        
        // Aktif jika aktivitas terakhir dilakukan HARI INI
        setIsStreakActiveToday(profile.last_activity_date === today)
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pelajar'

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-6 text-[#1e1b14] select-none">
      
      {/* Greeting & Streak Section */}
      <section className="flex justify-between items-end relative pt-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1e1b14]">
            Halo, <span className="marker-highlight font-bold">{userName}!</span>
          </h1>
          <p className="text-xs text-[#6f797a] mt-1">Siap untuk belajar hari ini?</p>
        </div>

        {/* Dynamic Streak Badge (Abu-abu vs Nyala) */}
        <div 
          className={`flex flex-col items-center border-2 border-[#004349] px-3 py-1.5 rounded-xl rotate-2 shadow-[2px_2px_0px_0px_#004349] transition-all duration-300 ${
            isStreakActiveToday 
              ? 'bg-[#ffbe4f]' // Nyala Khas Kuning-Emas
              : 'bg-[#e2e8f0]' // Abu-abu Mati (Belum Belajar)
          }`}
        >
          <span className={`material-symbols-outlined text-2xl transition-colors ${
            isStreakActiveToday ? 'text-[#741a06]' : 'text-[#94a3b8]'
          }`}>
            local_fire_department
          </span>
          <span className={`text-[10px] font-extrabold mt-0.5 ${
            isStreakActiveToday ? 'text-[#724d00]' : 'text-[#64748b]'
          }`}>
            {streakCount} Hari
          </span>
        </div>
      </section>

      {/* Continue Learning / Modul Pilihan Card */}
      <section className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#004349] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#741a06]">menu_book</span>
          <h2 className="text-xs font-bold text-[#004349] uppercase tracking-wider">Lanjut Belajar</h2>
        </div>
        
        <h3 className="font-serif text-lg font-bold text-[#1e1b14] mb-3">Alfabet & Kata Isyarat</h3>
        
        <div className="flex items-center justify-between text-[11px] text-[#6f797a] mb-1">
          <span>Materi Tersedia</span>
          <span className="font-bold text-[#004349]">{totalSigns} Isyarat</span>
        </div>

        {/* Progress Bar Dynamic */}
        <div className="h-3 w-full bg-[#f4ede0] border border-[#004349] rounded-full overflow-hidden p-0.5 mb-4">
          <div 
            className="h-full bg-[#741a06] rounded-full transition-all duration-500" 
            style={{ width: `${totalSigns > 0 ? Math.min(100, (history.length / totalSigns) * 100) : 0}%` }}
          />
        </div>

        <Link
          to="/dashboard/learn"
          className="block w-full bg-[#ffbe4f] text-[#724d00] font-bold text-xs uppercase tracking-wider py-3 rounded-xl border-2 border-[#004349] shadow-[2px_2px_0px_0px_#004349] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-center"
        >
          Lanjutkan
        </Link>
      </section>

      {/* Quick Action Modules */}
      <section className="grid grid-cols-2 gap-3">

        <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#004349] flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#f4ede0] border border-[#004349] flex items-center justify-center mb-3 text-[#004349]">
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#004349] mb-1">Modul Belajar</h4>
            <p className="text-[11px] text-[#3f484a]">Lihat katalog video gerakan isyarat.</p>
          </div>
          <Link 
            to="/dashboard/learn" 
            className="mt-4 text-[11px] font-bold text-[#004349] underline flex items-center gap-1"
          >
            <span>Buka</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Card 2: Kuis */}
        <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#004349] flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#f4ede0] border border-[#004349] flex items-center justify-center mb-3 text-[#004349]">
              <span className="material-symbols-outlined text-2xl">quiz</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#004349] mb-1">Latihan Kuis</h4>
            <p className="text-[11px] text-[#3f484a]">Uji ingatan gerakan isyarat kamu.</p>
          </div>
          <Link 
            to="/dashboard/quiz" 
            className="mt-4 text-[11px] font-bold text-[#004349] underline flex items-center gap-1"
          >
            <span>Mulai</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>


      <section className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#004349] space-y-3">
        <div className="flex items-center justify-between border-b border-[#004349]/20 pb-2">
          <h3 className="font-serif text-base font-bold text-[#004349] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-lg">history</span>
            Riwayat Terakhir
          </h3>
          <Link to="/dashboard/profile" className="text-[11px] font-bold text-[#004349] underline">
            Lihat Semua
          </Link>
        </div>

        {loading ? (
          <p className="text-xs text-[#3f484a] py-2 text-center">Memuat riwayat...</p>
        ) : history.length === 0 ? (
          <p className="text-xs text-[#3f484a] py-2 text-center">Belum ada riwayat kuis. Yuk ikuti kuis pertamamu!</p>
        ) : (
          <div className="space-y-2">
            {history.slice(0, 3).map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center justify-between p-3 bg-[#faf3e6] border border-[#004349] rounded-xl text-xs"
              >
                <div>
                  <span className="font-bold text-[#004349] block">Kuis Tebak Isyarat</span>
                  <span className="text-[10px] text-[#3f484a]">
                    {item.completed_at ? new Date(item.completed_at).toLocaleDateString('id-ID') : 'Baru saja'}
                  </span>
                </div>
                <div className="px-2.5 py-1 bg-[#ffbe4f] border border-[#004349] rounded-lg font-bold text-[#724d00]">
                  {item.score} / {item.total_questions} Benar
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}