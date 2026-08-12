import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Kata Sandi',
  error,
  value,
  onChange,
  placeholder = 'Masukkan kata sandi...',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label className="text-xs font-bold text-[#004349] uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-11 bg-[#faf3e6] border-2 border-[#004349] rounded-xl text-sm font-medium text-[#1e1b14] placeholder-[#004349]/40 focus:outline-none focus:ring-2 focus:ring-[#ffbe4f] transition-all shadow-[2px_2px_0px_0px_#004349]"
        />

        {/* Tombol Tanda Mata */}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          className="absolute right-3 p-1 text-[#004349]/70 hover:text-[#004349] focus:outline-none transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {error && (
        <span className="text-[11px] font-bold text-[#ba1a1a]">
          {error}
        </span>
      )}
    </div>
  )
}