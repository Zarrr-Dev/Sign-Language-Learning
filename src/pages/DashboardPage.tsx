import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { quizService } from '../services/quizService'
import { signService } from '../services/signService'
import type { QuizAttempt } from '../services/quizService'

export const DashboardPage = () => {
  const { user } = useAuth()
  const [history, setHistory] = useState<QuizAttempt[]>([])
  const [totalSigns, setTotalSigns] = useState(0)
  const [loading, setLoading] = useState(true)

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
      const [quizHistory, signs] = await Promise.all([
        quizService.getUserQuizHistory(user!.id).catch((err) => {
          console.warn('Gagal memuat history kuis:', err)
          return [] as QuizAttempt[]
        }),
        signService.getAllSigns().catch((err) => {
          console.warn('Gagal memuat daftar isyarat:', err)
          return []
        })
      ])

      setHistory(quizHistory || [])
      setTotalSigns(signs ? signs.length : 0)
    } catch (err) {
      console.error('Error loading dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Banner Sapaan */}
      <div className="bg-surface-container-low border-2 border-primary rounded-2xl p-6 md:p-8 shadow-hard relative overflow-hidden">
        <div className="absolute -top-3 left-8 w-20 h-6 bg-secondary-container/60 border border-primary/30 -rotate-2" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container border border-primary text-[11px] font-bold text-on-secondary-container shadow-hard-sm mb-2">
              <span className="material-symbols-outlined text-sm">edit_note</span>
              Jurnal Belajar
            </span>
            <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary">
              Halo, {user?.user_metadata?.full_name || 'Pelajar Isyarat'}! 👋
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant mt-1 max-w-md">
              Mari tingkatkan kemampuan bahasa isyarat kamu hari ini. Pilih modul atau uji kemampuan lewat kuis!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-tertiary-container/20 border-2 border-tertiary text-tertiary text-xs font-bold shadow-hard-sm">
              <span className="material-symbols-outlined text-base fill-1 text-tertiary">local_fire_department</span>
              <span>3 Hari Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border-2 border-primary rounded-xl p-5 shadow-hard flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Materi Tersedia
            </span>
            <span className="font-headline text-3xl font-bold text-primary">{totalSigns}</span>
            <span className="text-[11px] text-on-surface-variant block mt-0.5">Isyarat ISINDO/SIBI</span>
          </div>
          <div className="w-12 h-12 bg-secondary-container border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-hard-sm">
            <span className="material-symbols-outlined text-2xl">auto_stories</span>
          </div>
        </div>

        <div className="bg-surface border-2 border-primary rounded-xl p-5 shadow-hard flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Kuis Selesai
            </span>
            <span className="font-headline text-3xl font-bold text-primary">{history.length}</span>
            <span className="text-[11px] text-on-surface-variant block mt-0.5">Kali Percobaan</span>
          </div>
          <div className="w-12 h-12 bg-secondary-container border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-hard-sm">
            <span className="material-symbols-outlined text-2xl">quiz</span>
          </div>
        </div>

        <div className="bg-surface border-2 border-primary rounded-xl p-5 shadow-hard flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Target Harian
            </span>
            <span className="font-headline text-3xl font-bold text-primary">100%</span>
            <span className="text-[11px] text-on-surface-variant block mt-0.5">Tercapai Hari Ini</span>
          </div>
          <div className="w-12 h-12 bg-secondary-container border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-hard-sm">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
        </div>
      </div>

      {/* Akses Cepat Modul */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-surface-container-low border-2 border-primary rounded-2xl p-6 shadow-hard flex flex-col justify-between hover:shadow-hard-lg transition-all">
          <div>
            <div className="w-10 h-10 bg-secondary-container border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-hard-sm mb-4">
              <span className="material-symbols-outlined text-xl">menu_book</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-1">Modul Pembelajaran</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Pelajari abjad dan kata isyarat dengan panduan video instruksional yang jelas.
            </p>
          </div>

          <Link
            to="/dashboard/learn"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl border-2 border-primary shadow-hard-sm hover:shadow-hard active:translate-y-1 active:shadow-none transition-all text-center"
          >
            <span>Buka Modul Belajar</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="bg-surface-container-low border-2 border-primary rounded-2xl p-6 shadow-hard flex flex-col justify-between hover:shadow-hard-lg transition-all">
          <div>
            <div className="w-10 h-10 bg-secondary-container border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-hard-sm mb-4">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-primary mb-1">Latihan & Kuis</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Uji ketepatan dan ingatan gerakan tanganmu lewat kuis tebak isyarat interaktif.
            </p>
          </div>

          <Link
            to="/dashboard/quiz"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-surface border-2 border-primary text-primary font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl shadow-hard-sm hover:shadow-hard active:translate-y-1 active:shadow-none transition-all text-center"
          >
            <span>Mulai Kuis</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Tabel Riwayat Kuis Terakhir */}
      <div className="bg-surface border-2 border-primary rounded-2xl p-6 shadow-hard space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">history</span>
            Riwayat Kuis Terakhir
          </h3>
          <Link to="/dashboard/profile" className="text-xs font-bold text-primary underline">
            Lihat Semua
          </Link>
        </div>

        {loading ? (
          <p className="text-xs text-on-surface-variant">Memuat data riwayat...</p>
        ) : history.length === 0 ? (
          <div className="p-6 text-center bg-surface-container-low border border-primary/20 rounded-xl">
            <p className="text-xs text-on-surface-variant">Belum ada riwayat kuis. Yuk coba ikuti kuis pertamamu!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {history.slice(0, 3).map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center justify-between p-3.5 bg-surface-container-low border border-primary/30 rounded-xl text-xs"
              >
                <div>
                  <span className="font-bold text-primary block">Kuis Tebak Isyarat</span>
                  <span className="text-[10px] text-on-surface-variant">
                    {item.completed_at ? new Date(item.completed_at).toLocaleDateString('id-ID') : 'Baru saja'}
                  </span>
                </div>
                <div className="px-3 py-1 bg-secondary-container border border-primary rounded-lg font-bold text-on-secondary-container shadow-hard-sm">
                  {item.score} / {item.total_questions} Benar ({Math.round((item.score / item.total_questions) * 100)}%)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}