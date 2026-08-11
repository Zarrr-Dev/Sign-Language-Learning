import { supabase } from '../lib/supabase'

export const authService = {
  async register(email: string, pass: string, fullName: string) {
    // 1. Sign Up User ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    if (error) throw error

    // 2. Jika user berhasil dibuat, pastikan profile terisi di database
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert([
        {
          id: data.user.id,
          full_name: fullName,
          email: email
        }
      ])

      if (profileError) {
        console.warn('Gagal membuat profile manual (mungkin sudah dibuat via trigger):', profileError.message)
      }
    }

    return data
  },

  async login(email: string, pass: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass
    })

    if (error) throw error
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}