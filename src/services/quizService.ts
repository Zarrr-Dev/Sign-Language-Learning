import { supabase } from '../lib/supabaseClient'

export interface QuizAttempt {
  id?: string
  user_id: string
  score: number
  total_questions: number
  completed_at?: string
}

export const quizService = {
  async saveQuizAttempt(userId: string, score: number, totalQuestions: number) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        score,
        total_questions: totalQuestions,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving quiz attempt:', error)
      throw error
    }

    try {
      await quizService.updateUserStreak(userId)
    } catch (streakErr) {
      console.error('Gagal memperbarui streak user:', streakErr)
    }

    return data
  },

  async updateUserStreak(userId: string) {
    // Format YYYY-MM-DD
    const today = new Date().toLocaleDateString('en-CA')

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, streak_count, last_activity_date')
      .eq('id', userId)
      .maybeSingle()

    if (profileError) {
      console.error('Error fetching profile for streak:', profileError)
      throw profileError
    }

    const lastActivity = profile?.last_activity_date
    let newStreak = profile?.streak_count || 0

    // Jika hari ini sudah beraktivitas, tidak perlu update streak lagi
    if (lastActivity === today) {
      return
    }

    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)
    const yesterday = yesterdayDate.toLocaleDateString('en-CA')

    if (lastActivity === yesterday) {
      newStreak += 1
    } else {
      newStreak = 1
    }

    // UPDATE TABEL PROFILES (Hanya memperbarui kolom yang dipastikan ada)
    const { error: updateError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: userId,
          streak_count: newStreak,
          last_activity_date: today,
          // 'updated_at' Dihapus dari payload agar tidak memicu error PGRST204
        },
        { onConflict: 'id' }
      )

    if (updateError) {
      console.error('Error upserting streak:', updateError)
      throw updateError
    }
  },

  async getUserQuizHistory(userId: string) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (error) throw error
    return data as QuizAttempt[]
  },
}