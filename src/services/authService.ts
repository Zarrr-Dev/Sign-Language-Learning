import { supabase } from '../lib/supabase'

export const authService = {
  async register(email: string, pass: string, fullName: string) {
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
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert([
        {
          id: data.user.id,
          full_name: fullName,
          email: email
        }
      ])

      if (profileError) {
        console.warn('Gagal membuat profile', profileError.message)
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