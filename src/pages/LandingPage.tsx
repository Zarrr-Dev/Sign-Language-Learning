import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex flex-col items-center justify-between p-6 md:p-12 relative overflow-hidden">
      
      {/* Background Subtle Doodle Accents */}
      <div className="absolute top-8 left-8 opacity-20 pointer-events-none select-none">
        <span className="material-symbols-outlined text-5xl text-primary">draw</span>
      </div>
      <div className="absolute bottom-12 right-8 opacity-20 pointer-events-none select-none">
        <span className="material-symbols-outlined text-6xl text-tertiary">auto_stories</span>
      </div>

      {/* Top Header Badge */}
      <header className="w-full max-w-md flex justify-center pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border-2 border-primary shadow-hard-sm">
          <span className="material-symbols-outlined text-tertiary-container text-lg">favorite</span>
          <span className="font-body text-xs font-bold tracking-wider uppercase text-primary">
            Aksesibilitas Untuk Semua
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-md flex flex-col items-center my-auto py-8">
        
        {/* Card Ilustrasi Hero */}
        <div className="w-full aspect-square max-w-[280px] md:max-w-[320px] bg-surface-container-low border-2 border-primary rounded-2xl shadow-hard-lg p-6 mb-8 flex flex-col items-center justify-center relative group">
          
          {/* Decorative Tape Element */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-secondary-container/60 border border-primary/30 rotate-1 shadow-sm" />

          {/* Hero Illustration Gesture Icon */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-secondary-container border-2 border-primary flex items-center justify-center text-primary shadow-hard mb-4 group-hover:scale-105 transition-transform duration-200">
            <span className="material-symbols-outlined text-6xl md:text-7xl">
              backhand
            </span>
          </div>

          <div className="inline-block px-3 py-1 bg-surface border border-primary rounded-md shadow-hard-sm text-xs font-bold text-primary">
            ISINDO & SIBI
          </div>
        </div>

        {/* Typography & Branding */}
        <div className="text-center w-full mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3 relative inline-block">
            HandTalk
            {/* Hand-drawn underline accent */}
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary-container" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,15 Q50,0 100,12" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
          </h1>
          <p className="font-body text-base text-on-surface-variant max-w-xs mx-auto mt-2 leading-relaxed">
            Belajar bahasa isyarat jadi lebih hangat, menyenangkan, dan mudah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-4">
          <Link
            to="/login"
            className="w-full bg-secondary-container text-on-secondary-container font-body font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl border-2 border-primary shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-center"
          >
            <span>Masuk ke Akun</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>

          <Link
            to="/register"
            className="w-full bg-surface-container text-primary font-body font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl border-2 border-primary shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-center"
          >
            <span>Daftar Akun Baru</span>
            <span className="material-symbols-outlined text-xl">person_add</span>
          </Link>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="w-full max-w-md text-center pb-2 text-xs text-on-surface-variant/70">
        <p>© 2026 HandTalk. Dibuat dengan 🤟 untuk inklusivitas.</p>
      </footer>
    </div>
  )
}