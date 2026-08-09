import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    try {
      await authService.register(email, password, fullName)
      navigate('/dashboard')
    } catch (err: any) {
      setErrorMsg(err.message || 'Pendaftaran gagal. Pastikan email belum pernah terdaftar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Top Bar */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Kembali</span>
        </Link>
        <span className="px-3 py-1 bg-surface-container border border-primary/30 rounded-full text-[11px] font-bold text-primary">
          Akun Baru
        </span>
      </div>

      {/* Workbook Card */}
      <main className="w-full max-w-md bg-surface-container-low border-2 border-primary rounded-2xl shadow-hard-lg p-6 md:p-8 relative">
        
        {/* Decorative Paper Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary-container/60 border border-primary/30 rotate-1" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-secondary-container border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-hard-sm">
            <span className="material-symbols-outlined text-primary text-2xl">edit_note</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-primary">Daftar Akun</h1>
          <p className="text-xs text-on-surface-variant mt-1">Mulai perjalanan belajar bahasa isyarat kamu hari ini</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-tertiary-container/20 border-2 border-tertiary rounded-xl text-xs text-tertiary font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Siti Rahma"
              className="w-full bg-surface border-2 border-primary rounded-xl px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary shadow-hard-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              Alamat Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full bg-surface border-2 border-primary rounded-xl px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary shadow-hard-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full bg-surface border-2 border-primary rounded-xl px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary shadow-hard-sm transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-container text-on-secondary-container font-body font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl border-2 border-primary shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            {loading ? (
              <span>Mendaftarkan...</span>
            ) : (
              <>
                <span>Daftar Sekarang</span>
                <span className="material-symbols-outlined text-xl">person_add</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-primary/10 pt-6">
          <p className="text-xs text-on-surface-variant">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-primary underline underline-offset-2">
              Masuk ke akun
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}