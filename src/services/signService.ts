import { supabase } from '../lib/supabase'

export interface Sign {
  id: string
  label: string
  category: string
  video_url: string
  description?: string
  created_at?: string
}

const STORAGE_BASE = 'https://ckecfettklwbgbpqprhx.supabase.co/storage/v1/object/public/Video%20and%20Foto%20assets'

const initialSignsData = [
  
  {
    label: 'A',
    category: 'Abjad',
    video_url: `${STORAGE_BASE}/Video%20Assets/A.mp4`,
    description: 'Kepalkan tangan dengan ibu jari tegak lurus di samping.'
  },
  {
    label: 'B',
    category: 'Abjad',
    video_url: `${STORAGE_BASE}/Video%20Assets/B.mp4`,
    description: 'Buka keempat jari ke atas dan tekuk ibu jari ke dalam telapak tangan.'
  },
  {
    label: 'C',
    category: 'Abjad',
    video_url: `${STORAGE_BASE}/Video%20Assets/C.mp4`,
    description: 'Lengkungkan jari-jari membentuk huruf C.'
  },
  {
    label: 'D',
    category: 'Abjad',
    video_url: `${STORAGE_BASE}/Video%20Assets/D.mp4`,
    description: 'Acungkan jari telunjuk ke atas dan lingkarkan jari lainnya ke ibu jari.'
  },

]


let isSeedingInProgress = false

export const signService = {
  async getAllSigns(): Promise<Sign[]> {
    try {
      await this.seedIfEmpty()

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
  },

  async seedIfEmpty(): Promise<void> {

    if (isSeedingInProgress) return

    try {
      isSeedingInProgress = true

      const { count, error: countError } = await supabase
        .from('signs')
        .select('*', { count: 'exact', head: true })

      if (countError) {
        console.error('Error checking table count:', countError.message)
        return
      }

      if (count === 0) {
        console.log('Tabel signs kosong, memulai auto-seeding...')
        const { error: insertError } = await supabase
          .from('signs')
          .insert(initialSignsData)

        if (insertError) {
          console.error('Gagal melakukan seeding:', insertError.message)
        } else {
          console.log('Auto-seeding berhasil!')
        }
      }
    } catch (err) {
      console.error('Error during seedIfEmpty:', err)
    } finally {
      isSeedingInProgress = false
    }
  }
}