import { useState, useEffect } from 'react'
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

  const [streakCount, setStreakCount] = useState<number>(0)
  const [isStreakActiveToday, setIsStreakActiveToday] = useState<boolean>(false)


  useEffect(() => {
    if (user) {
      userService.getUserProfile(user.id)
        .then(profile => {
          if (profile) {
            setStreakCount(profile.streak_count || 0)
            
            const today = new Date().toLocaleDateString('en-CA')
            
            setIsStreakActiveToday(profile.last_activity_date === today)
          }
        })
        .catch(err => console.error('Gagal memuat streak:', err))
    }
  }, [user, location.pathname])

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
      
    
      <aside className="hidden md:flex flex-col w-64 bg-[#faf3e6] border-r-2 border-[#004349] p-5 h-screen sticky top-0 z-30 justify-between shadow-[4px_0px_0px_0px_#004349]">
        <div>
          
          <Link to="/" className="flex items-center gap-2 notranslate" translate="no">
          <div className="w-10 h-10 rounded-2xl bg-[#ffbe4f] border-2 border-[#004349] flex items-center justify-center font-bold text-[#004349] shadow-[2px_2px_0px_0px_#004349] shrink-0">

            <span className="material-symbols-outlined text-2xl notranslate" translate="no">
              front_hand
              </span>
              </div>
              <span className="font-serif text-xl font-black text-[#004349] tracking-tight notranslate" translate="no">
                SGL Learning
                </span>
                </Link>

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

      <div className="flex-1 flex flex-col min-w-0">

        <header className="h-16 bg-[#fff9ee] border-b-2 border-[#004349] px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0px_4px_0px_0px_#004349]">
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#004349] border-2 border-[#004349] bg-[#faf3e6] rounded-lg shadow-[2px_2px_0px_0px_#004349]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link 
            to="/dashboard/profile"
            title="Buka Profil"
            className="w-9 h-9 rounded-full bg-[#ffbe4f] border-2 border-[#004349] flex items-center justify-center text-xs font-bold text-[#724d00] shadow-[2px_2px_0px_0px_#004349] hover:translate-x-[1px] hover:translate-y-[1px] transition-all overflow-hidden shrink-0 notranslate"
            translate="no"
            >
              {firstLetter}
              </Link>
          </div>

          <div className="hidden md:block">
            <h2 className="text-sm font-bold text-[#004349]">
              Selamat datang kembali, <span className="underline decoration-[#ffbe4f] decoration-4">{userName}</span>👋
            </h2>
          </div>

          <div className="flex items-center gap-3">
            
            <div 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-[#004349] text-xs font-bold shadow-[2px_2px_0px_0px_#004349] transition-all duration-300 ${
                isStreakActiveToday 
                  ? 'bg-[#ffbe4f] text-[#724d00]' 
                  : 'bg-[#e2e8f0] text-[#64748b]'
              }`}
            >
              <Flame 
                className={`w-4 h-4 transition-colors ${
                  isStreakActiveToday ? 'fill-[#741a06] text-[#741a06]' : 'fill-[#94a3b8] text-[#94a3b8]'
                }`} 
              />
              <span>{streakCount} Hari</span>
            </div>

            <Link 
              to="/dashboard/profile"
              title="Buka Profil"
              className="w-9 h-9 rounded-full bg-[#ffbe4f] border-2 border-[#004349] flex items-center justify-center text-xs font-bold text-[#724d00] shadow-[2px_2px_0px_0px_#004349] hover:translate-x-[1px] hover:translate-y-[1px] transition-all overflow-hidden shrink-0 notranslate" translate="no"
            >
              {firstLetter}
            </Link>
          </div>
        </header>

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
              Keluar
            </button>
          </div>
        )}

        <main className="p-4 md:p-8 flex-1 bg-[#fff9ee] max-w-4xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}