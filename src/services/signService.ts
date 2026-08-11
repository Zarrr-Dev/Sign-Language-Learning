import { supabase } from '../lib/supabase'

export interface Sign {
  id: string
  label: string
  category: string
  video_url: string
  description?: string
  created_at?: string
}

export const signService = {
  async getAllSigns(): Promise<Sign[]> {
    try {
      const { data, error } = await supabase
        .from('signs')
        .select('*')
        .order('label', { ascending: true })

      if (error) {
        console.error('Error fetching signs:', error.message)
        return []
      }

      return (data as Sign[]) || []
    } catch (err) {
      console.error('Unexpected signService error:', err)
      return []
    }
  }
}