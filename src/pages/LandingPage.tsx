import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Video, Flame, Award, CheckCircle, PlayCircle } from 'lucide-react'

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-blue-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Glow Effects Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Navigation Bar Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#000000]/60 border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              HandTalk <span className="text-blue-500">Learn</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#B5B5B5] font-medium">
            <a href="#fitur" className="hover:text-white transition-colors">Fitur Utama</a>
            <a href="#kurikulum" className="hover:text-white transition-colors">Kurikulum</a>
            <a href="#keunggulan" className="hover:text-white transition-colors">Keunggulan</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-[#B5B5B5] hover:text-white transition-colors px-4 py-2"
            >
              Masuk
            </Link>
            <Link 
              to="/register" 
              className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
            >
              Mulai Belajar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-[1280px] mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717] border border-white/10 text-xs font-medium text-blue-400 mb-8 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Platform Pembelajaran Bahasa Isyarat Interaktif</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]"
        >
          Kuasai Bahasa Isyarat <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Tanpa Hambatan & Interaktif
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-[#B5B5B5] max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Pelajari ISINDO & SIBI dengan panduan video definisi tinggi, kuis interaktif, dan statistik progres belajar real-time.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            to="/register" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-600/25 active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            Mulai Belajar Gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/login" 
            className="w-full sm:w-auto bg-[#171717] hover:bg-[#1D1D1D] border border-white/10 text-white font-medium px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            <PlayCircle className="w-5 h-5 text-blue-400" />
            Lihat Demo
          </Link>
        </motion.div>

        {/* Dashboard Preview / Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 relative max-w-5xl mx-auto rounded-[24px] border border-white/10 bg-[#171717]/80 backdrop-blur-2xl p-4 shadow-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />
          <div className="rounded-[16px] bg-[#0F0F0F] border border-white/5 p-6 md:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1D1D1D] p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8A8A]">Progress Hari Ini</span>
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-bold text-white">7 Hari Streak 🔥</p>
              <p className="text-xs text-[#B5B5B5] mt-2">Pertahankan konsistensi belajar kamu!</p>
            </div>

            <div className="bg-[#1D1D1D] p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8A8A]">Materi Dikuasai</span>
                <Award className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white">24 Isyarat</p>
              <p className="text-xs text-[#B5B5B5] mt-2">80% dari modul Abjad Dasar A-Z</p>
            </div>

            <div className="bg-[#1D1D1D] p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8A8A]">Modul Aktif</span>
                <Video className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white">Isyarat 'B'</p>
              <p className="text-xs text-[#B5B5B5] mt-2">Siap untuk kuis pengujian?</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section id="fitur" className="py-24 px-6 max-w-[1280px] mx-auto border-t border-white/[0.06]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Fitur Utama HandTalk Learn
          </h2>
          <p className="text-[#B5B5B5] mt-4 text-base md:text-lg max-w-xl mx-auto">
            Dirancang khusus untuk pengalaman belajar bahasa isyarat yang terstruktur dan menyenangkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#171717] border border-white/10 rounded-[20px] p-8 hover:border-blue-500/40 transition-all duration-300">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 w-fit mb-6 border border-blue-500/20">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Video HD & Slow-Mo</h3>
            <p className="text-sm text-[#B5B5B5] leading-relaxed">
              Pelajari gerakan tangan secara mendalam dengan video beresolusi tinggi dan opsi kontrol kecepatan gerakan.
            </p>
          </div>

          <div className="bg-[#171717] border border-white/10 rounded-[20px] p-8 hover:border-purple-500/40 transition-all duration-300">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 w-fit mb-6 border border-purple-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Kuis Interaktif</h3>
            <p className="text-sm text-[#B5B5B5] leading-relaxed">
              Uji pemahaman kamu setelah menyelesaikan materi lewat kuis tebak isyarat dengan evaluasi skor instan.
            </p>
          </div>

          <div className="bg-[#171717] border border-white/10 rounded-[20px] p-8 hover:border-cyan-500/40 transition-all duration-300">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit mb-6 border border-cyan-500/20">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Streak & Leaderboard</h3>
            <p className="text-sm text-[#B5B5B5] leading-relaxed">
              Bangun kebiasaan belajar harian dengan fitur Daily Streak untuk menjaga motivasi konsistensi kamu.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 px-6 bg-[#000000]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[#8A8A8A] text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white">HandTalk Learn</span> © 2026. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  )
}