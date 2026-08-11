import { supabase } from '../lib/supabaseClient'

export interface UserProfile {
  id: string
  username?: string
  streak_count: number
  last_activity_date: string | null
}

export const userService = {
  // 1. Ambil data profil & streak user dari Supabase
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Gagal mengambil profil user:', error)
      return null
    }

    return data as UserProfile
  },

  // 2. Perbarui streak harian saat user melakukan aktivitas (belajar / kuis)
  async updateStreak(userId: string) {
    const today = new Date().toISOString().split('T')[0]

    // Ambil data profil saat ini
    const { data: profile } = await supabase
      .from('profiles')
      .select('streak_count, last_activity_date')
      .eq('id', userId)
      .single()

    if (!profile) return

    const lastDate = profile.last_activity_date
    let newStreak = profile.streak_count || 0

    if (!lastDate) {
      // Aktivitas pertama kali
      newStreak = 1
    } else {
      const last = new Date(lastDate)
      const current = new Date(today)
      const diffTime = Math.abs(current.getTime() - last.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        // Berturut-turut hari berikutnya -> Streak bertambah 1
        newStreak += 1
      } else if (diffDays > 1) {
        // Terlewat lebih dari 1 hari -> Reset streak ke 1
        newStreak = 1
      }
      // Jika diffDays === 0 (aktivitas di hari yang sama), streak tetap
    }

    // Simpan streak baru dan tanggal aktivitas terakhir ke Supabase
    const { error } = await supabase
      .from('profiles')
      .update({
        streak_count: newStreak,
        last_activity_date: today,
      })
      .eq('id', userId)

    if (error) {
      console.error('Gagal memperbarui streak:', error)
    }

    return newStreak
  },
}