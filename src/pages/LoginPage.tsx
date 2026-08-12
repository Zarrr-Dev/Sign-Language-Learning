import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { authService } from '../services/authService'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      alert(err.message || 'Login gagal.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#fff9ee] text-[#1e1b14] dot-grid min-h-screen flex flex-col justify-center items-center px-4 py-8 relative select-none">
      {/* Tombol Kembali ke Landing */}
      <div className="w-full max-w-sm mb-4 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-1 font-bold text-xs uppercase text-[#004349]">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Kembali
        </Link>
        <span className="px-3 py-1 bg-[#f4ede0] border border-[#004349]/30 rounded-full text-[10px] font-bold text-[#004349]">
          Masuk
        </span>
      </div>

      {/* Card Form Login */}
      <main className="w-full max-w-sm bg-[#faf3e6] border-2 border-[#004349] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#004349] relative z-10">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#ffbe4f] border-2 border-[#004349] rounded-full flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_0px_#004349]">
            <span className="material-symbols-outlined text-[#004349] text-2xl">lock</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#004349]">Selamat Datang Kembali</h1>
          <p className="text-xs text-[#3f484a] mt-1">Mari lanjutkan petualangan bahasamu.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#004349] mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pelajar@handtalk.id"
              className="w-full bg-[#fff9ee] border-2 border-[#004349] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1e1b14] focus:outline-none focus:ring-2 focus:ring-[#ffbe4f]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#004349]" htmlFor="password">
                Kata Sandi
              </label>
              <a href="#" className="text-[11px] font-semibold text-[#004349] underline">
                Lupa kata sandi?
              </a>
            </div>

            {/* Input Wrapper dengan Tombol Mata */}
            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#fff9ee] border-2 border-[#004349] rounded-xl pl-3.5 pr-11 py-2.5 text-sm font-medium text-[#1e1b14] focus:outline-none focus:ring-2 focus:ring-[#ffbe4f]"
              />
              
              {/* Tombol Toggle Mata */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                className="absolute right-3 p-1 text-[#004349]/70 hover:text-[#004349] focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffbe4f] text-[#724d00] font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl border-2 border-[#004349] shadow-[4px_4px_0px_0px_#004349] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            <span>{loading ? 'Memproses...' : 'Masuk'}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>

        <div className="mt-6 text-center border-t border-[#004349]/10 pt-4 text-xs text-[#3f484a]">
          Belum punya akun?{' '}
          <Link to="/register" className="font-bold text-[#004349] underline">
            Daftar sekarang
          </Link>
        </div>
      </main>
    </div>
  )
}