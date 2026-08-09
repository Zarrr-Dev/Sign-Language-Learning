import React, { useState } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  User, 
  LogOut, 
  Sparkles, 
  Flame, 
  Menu, 
  X 
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'

export const DashboardLayout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col md:flex-row font-sans">
      

      <aside className="hidden md:flex flex-col w-64 bg-[#0F0F0F] border-r border-white/[0.08] p-5 h-screen sticky top-0 z-30 justify-between">
        <div>

          <Link to="/dashboard" className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              HandTalk <span className="text-blue-500">Learn</span>
            </span>
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                      : 'text-[#B5B5B5] hover:text-white hover:bg-[#171717]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          Keluar Sesi
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="h-16 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/[0.08] px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#B5B5B5] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <span className="font-bold text-white text-sm">HandTalk</span>
          </div>

          <div className="hidden md:block">
            <h2 className="text-sm font-semibold text-[#B5B5B5]">
              Selamat datang kembali,<span className="text-white">{user?.user_metadata?.full_name || user?.email}</span>!
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>3 Hari Streak</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>


        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0F0F0F] border-b border-white/[0.08] p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-blue-600/10 text-blue-400' : 'text-[#B5B5B5]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              Keluar Sesi
            </button>
          </div>
        )}

        <main className="p-6 md:p-8 flex-1 bg-[#000000]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}