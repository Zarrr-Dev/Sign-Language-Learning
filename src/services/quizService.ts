import { supabase } from '../lib/supabase'

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

    if (error) throw error
    return data
  },

  async getUserQuizHistory(userId: string) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (error) throw error
    return data as QuizAttempt[]
  }
}
