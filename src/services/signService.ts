import { supabase } from '../lib/supabase'

export interface Sign {
  id: string
  label: string
  category: string
  video_url: string
  description: string
  created_at: string
}

export const signService = {
  async getAllSigns() {
    const { data, error } = await supabase
      .from('signs')
      .select('*')
      .order('label', { ascending: true })

    if (error) throw error
    return data as Sign[]
  }
}