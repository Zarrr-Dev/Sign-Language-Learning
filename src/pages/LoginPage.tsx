import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    try {
      await authService.login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Top Stamp */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Kembali</span>
        </Link>
        <span className="px-3 py-1 bg-surface-container border border-primary/30 rounded-full text-[11px] font-bold text-primary">
          Buku Catatan
        </span>
      </div>

      {/* Main Card Workbook */}
      <main className="w-full max-w-md bg-surface-container-low border-2 border-primary rounded-2xl shadow-hard-lg p-6 md:p-8 relative">
        
        {/* Decorative Paper Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary-container/60 border border-primary/30 -rotate-1" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-secondary-container border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-hard-sm">
            <span className="material-symbols-outlined text-primary text-2xl">key</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-primary">Selamat Datang!</h1>
          <p className="text-xs text-on-surface-variant mt-1">Masuk untuk melanjutkan pembelajaran bahasa isyarat</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-tertiary-container/20 border-2 border-tertiary rounded-xl text-xs text-tertiary font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              Alamat Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-surface border-2 border-primary rounded-xl px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary shadow-hard-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface border-2 border-primary rounded-xl px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary shadow-hard-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-container text-on-secondary-container font-body font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl border-2 border-primary shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-primary/10 pt-6">
          <p className="text-xs text-on-surface-variant">
            Belum punya akun?{' '}
            <Link to="/register" className="font-bold text-primary underline underline-offset-2">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}