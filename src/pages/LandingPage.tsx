import { Link } from 'react-router-dom'
import { BookOpen, Award, Flame, Camera, ArrowRight, CheckCircle2, Handshake } from 'lucide-react'

export const LandingPage = () => {
  return (
    <div className="bg-[#fff9ee] text-[#1e1b14] dot-grid min-h-screen flex flex-col justify-between font-sans select-none overflow-x-hidden">
      
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between border-b-2 border-[#004349]/10">
        
        {/* LOGO & BRAND - Diberi notranslate & Lucide Icon agar bebas dari bug terjemahan */}
        <div className="flex items-center gap-3 notranslate" translate="no">
          <div className="w-9 h-9 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center font-bold text-[#004349] shadow-[2px_2px_0px_0px_#004349] shrink-0">
            <Handshake className="w-5 h-5 text-[#004349]" />
          </div>
          <div>
            <span className="font-serif font-extrabold text-xl text-[#004349] tracking-tight block leading-none notranslate" translate="no">
              SGL Learning
            </span>
            <span className="text-[9px] font-bold text-[#724d00] uppercase tracking-wider block mt-0.5 notranslate" translate="no">
              Sign Language Learning
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-[#fff9ee] text-[#004349] font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-[#004349] shadow-[2px_2px_0px_0px_#004349] hover:bg-[#faf3e6] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-[#ffbe4f] text-[#724d00] font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-[#004349] shadow-[2px_2px_0px_0px_#004349] hover:bg-[#ffa91a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            Daftar
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center space-y-12">

        <div className="max-w-3xl space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#004349] leading-tight">
            Belajar Bahasa Isyarat Jadi Lebih <span className="underline decoration-[#ffbe4f] decoration-wavy decoration-4">Hangat & Seru</span>
          </h1>
          <p className="text-sm sm:text-base text-[#3f484a] max-w-xl mx-auto leading-relaxed font-medium">
            Kuasai gestur jemari abjad dan kata secara terstruktur lewat modul visual, latihan kuis interaktif, dan pencatatan jurnal progress harian di SGL Learning.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ffbe4f] text-[#724d00] font-extrabold text-sm uppercase tracking-wider rounded-2xl border-2 border-[#004349] shadow-[5px_5px_0px_0px_#004349] hover:shadow-[7px_7px_0px_0px_#004349] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <span>Mulai Belajar Gratis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fff9ee] text-[#004349] font-bold text-sm uppercase tracking-wider rounded-2xl border-2 border-[#004349] shadow-[5px_5px_0px_0px_#004349] hover:bg-[#faf3e6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <span>Masuk ke Akun</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 text-left">
          
          <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#004349] space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center text-[#004349] shadow-[2px_2px_0px_0px_#004349]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#004349]">Modul Visual Isyarat</h3>
            <p className="text-xs text-[#3f484a] leading-relaxed font-medium">
              Katalog lengkap abjad dan kosa kata isyarat BISINDO dilengkapi instruksi ilustrasi visual yang mudah dipahami.
            </p>
          </div>

          <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#004349] space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center text-[#004349] shadow-[2px_2px_0px_0px_#004349]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#004349]">Kuis & Evaluasi</h3>
            <p className="text-xs text-[#3f484a] leading-relaxed font-medium">
              Uji ketepatan hafalan gerakan tanganmu lewat sistem kuis pilihan ganda yang interaktif dan dinamis.
            </p>
          </div>

          <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#004349] space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center text-[#004349] shadow-[2px_2px_0px_0px_#004349]">
              <Flame className="w-5 h-5 text-[#741a06]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#004349]">Jurnal & Streak</h3>
            <p className="text-xs text-[#3f484a] leading-relaxed font-medium">
              Pantau konsistensi belajar harianmu dengan sistem streak harian otomatis dan riwayat nilai kuis yang tersimpan aman.
            </p>
          </div>

        </div>

        {/* AI FEATURE SHOWCASE */}
        <div className="w-full bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#004349] text-left relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#004349]/20 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center text-[#004349] shadow-[2px_2px_0px_0px_#004349]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#004349]">AI Camera Sign Detector</h3>
                <span className="text-[10px] font-bold text-[#724d00] uppercase tracking-wider block">Fitur Masa Depan (In Development)</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#ffbe4f] border-2 border-[#004349] rounded-full text-xs font-bold text-[#724d00] shadow-[2px_2px_0px_0px_#004349]">
              Machine Learning
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#3f484a] leading-relaxed mb-4 font-medium">
            SGL Learning sedang mengembangkan model Machine Learning berbasis kamera web untuk mendeteksi posisi lekukan jemari tanganmu secara <span className="font-bold text-[#004349]">real-time</span> saat berlatih isyarat!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[#004349]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#004349]" />
              <span>Deteksi Posisi Jari Real-Time</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#004349]" />
              <span>Umpan Balik Akurasi Gerakan</span>
            </div>
          </div>
        </div>

      </main>


      <footer className="w-full border-t-2 border-[#004349]/10 py-6 text-center text-xs font-bold text-[#3f484a]">
        SGL Learning © {new Date().getFullYear()} • Dibuat untuk Edukasi & Aksesibilitas Bahasa Isyarat (BISINDO)
      </footer>

    </div>
  )
}