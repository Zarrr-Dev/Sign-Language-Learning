import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  User, 
  LogOut, 
  Flame, 
  Menu, 
  X 
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'
import { userService } from '../services/userService'

export const DashboardLayout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // State Dinamis untuk Streak di Header
  const [streakCount, setStreakCount] = useState<number>(0)
  const [isStreakActiveToday, setIsStreakActiveToday] = useState<boolean>(false)

  // 🔥 PERBAIKAN DI SINI: Tarik data profil untuk cek streak setiap kali rute (halaman) berubah
  useEffect(() => {
    if (user) {
      userService.getUserProfile(user.id)
        .then(profile => {
          if (profile) {
            setStreakCount(profile.streak_count || 0)
            
            // Menggunakan toLocaleDateString('en-CA') agar format YYYY-MM-DD sesuai dengan zona waktu lokal (WIB/Indonesia)
            const today = new Date().toLocaleDateString('en-CA')
            
            setIsStreakActiveToday(profile.last_activity_date === today)
          }
        })
        .catch(err => console.error('Gagal memuat streak di layout:', err))
    }
  }, [user, location.pathname]) // <-- Menambahkan location.pathname agar state tidak basi saat pindah halaman

  const handleLogout = async () => {
    try {
      await authService.logout()
      navigate('/login')
    } catch (err) {
      console.error('Gagal keluar:', err)
    }
  }

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Belajar Isyarat', path: '/dashboard/learn', icon: BookOpen },
    { label: 'Kuis & Evaluasi', path: '/dashboard/quiz', icon: Award },
    { label: 'Profil Saya', path: '/dashboard/profile', icon: User },
  ]

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const firstLetter = userName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-[#fff9ee] text-[#1e1b14] flex flex-col md:flex-row font-sans dot-grid">
      
      {/* 1. SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-[#faf3e6] border-r-2 border-[#004349] p-5 h-screen sticky top-0 z-30 justify-between shadow-[4px_0px_0px_0px_#004349]">
        <div>
          {/* Logo HandTalk */}
          <Link to="/dashboard" className="flex items-center gap-3 px-2 py-3 mb-6 border-b-2 border-[#004349]/20 pb-4">
            <div className="w-9 h-9 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center font-bold text-[#004349] shadow-[2px_2px_0px_0px_#004349]">
              <span className="material-symbols-outlined text-xl">handshake</span>
            </div>
            <div>
              <span className="text-lg font-bold font-serif text-[#004349] tracking-tight block">
                HandTalk
              </span>
              <span className="text-[10px] font-bold text-[#724d00] uppercase tracking-wider block">Jurnal Belajar</span>
            </div>
          </Link>

          {/* Menu Sidebar */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                    isActive
                      ? 'bg-[#ffbe4f] text-[#724d00] border-[#004349] shadow-[3px_3px_0px_0px_#004349]'
                      : 'bg-transparent text-[#004349] border-transparent hover:bg-[#fff9ee] hover:border-[#004349]/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* 2. AREA UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Atas */}
        <header className="h-16 bg-[#fff9ee] border-b-2 border-[#004349] px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0px_4px_0px_0px_#004349]">
          {/* Tombol Menu Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#004349] border-2 border-[#004349] bg-[#faf3e6] rounded-lg shadow-[2px_2px_0px_0px_#004349]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/dashboard" className="font-bold font-serif text-[#004349] text-base underline decoration-[#ffbe4f] decoration-4 underline-offset-4">
              HandTalk
            </Link>
          </div>

          <div className="hidden md:block">
            <h2 className="text-sm font-bold text-[#004349]">
              Selamat datang kembali, <span className="underline decoration-[#ffbe4f] decoration-4">{userName}</span>! 👋
            </h2>
          </div>

          {/* Kanan: Streak & Profil Link */}
          <div className="flex items-center gap-3">
            
            {/* Dynamic Streak Badge */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-[#004349] text-xs font-bold shadow-[2px_2px_0px_0px_#004349] transition-all duration-300 ${
                isStreakActiveToday 
                  ? 'bg-[#ffbe4f] text-[#724d00]' // Nyala
                  : 'bg-[#e2e8f0] text-[#64748b]' // Mati / Belum belajar hari ini
              }`}
            >
              <Flame 
                className={`w-4 h-4 transition-colors ${
                  isStreakActiveToday ? 'fill-[#741a06] text-[#741a06]' : 'fill-[#94a3b8] text-[#94a3b8]'
                }`} 
              />
              <span>{streakCount} Hari Streak</span>
            </div>

            {/* Avatar Profil */}
            <Link 
              to="/dashboard/profile"
              title="Buka Profil"
              className="w-9 h-9 rounded-full bg-[#ffbe4f] border-2 border-[#004349] flex items-center justify-center text-xs font-bold text-[#724d00] shadow-[2px_2px_0px_0px_#004349] hover:translate-x-[1px] hover:translate-y-[1px] transition-all overflow-hidden shrink-0"
            >
              {firstLetter}
            </Link>
          </div>
        </header>

        {/* Menu Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf3e6] border-b-2 border-[#004349] p-4 space-y-2 shadow-[0px_4px_0px_0px_#004349]">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                    isActive 
                      ? 'bg-[#ffbe4f] text-[#724d00] border-[#004349] shadow-[2px_2px_0px_0px_#004349]' 
                      : 'bg-transparent text-[#004349] border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-white bg-[#ba1a1a] border-2 border-[#004349] rounded-xl w-full shadow-[2px_2px_0px_0px_#004349]"
            >
              <LogOut className="w-4 h-4" />
              Keluar Sesi
            </button>
          </div>
        )}

        {/* Tempat Render Halaman */}
        <main className="p-4 md:p-8 flex-1 bg-[#fff9ee] max-w-4xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}