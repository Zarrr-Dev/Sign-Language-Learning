import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react'
import { authService } from '../services/authService'

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      await authService.register(email, password, fullName)
      navigate('/dashboard')
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-[#171717] border border-white/10 rounded-[20px] p-8 shadow-2xl relative z-10 backdrop-blur-xl"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white tracking-tight mb-1">
          Mulai Belajar Isyarat
        </h2>
        <p className="text-sm text-[#B5B5B5] text-center mb-6">
          Buat akun gratis dan mulai pantau progres kamu
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5 uppercase tracking-wider">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-600/25 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Mendaftarkan...' : (
              <>
                Daftar Akun
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#8A8A8A]">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-purple-400 hover:underline font-medium">
            Masuk di Sini
          </Link>
        </p>
      </motion.div>
    </div>
  )
}