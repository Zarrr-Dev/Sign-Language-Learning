export interface QuizQuestion {
  id: string
  category: 'Abjad' | 'Angka' | 'Kata Dasar'
  questionText: string
  mediaUrl: string // Alamat Public URL dari Supabase Storage
  mediaType: 'image' | 'video'
  options: string[]
  correctAnswer: string
}

// Gantilah [PROJECT-ID] dengan Supabase Project ID kamu
const SUPABASE_STORAGE_URL = 'https://[PROJECT-ID].supabase.co/storage/v1/object/public/sign-videos'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    category: 'Abjad',
    questionText: 'Tebak isyarat abjad di bawah ini!',
    mediaUrl: `${SUPABASE_STORAGE_URL}/huruf-a.png`, // Bisa .mp4 / .webm / .png
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf C', 'Huruf D'],
    correctAnswer: 'Huruf A',
  },
  {
    id: '2',
    category: 'Abjad',
    questionText: 'Tebak isyarat abjad di bawah ini!',
    mediaUrl: `${SUPABASE_STORAGE_URL}/huruf-b.png`,
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf E', 'Huruf F'],
    correctAnswer: 'Huruf B',
  },
  {
    id: '3',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan isyarat ini?',
    mediaUrl: `${SUPABASE_STORAGE_URL}/angka-1.mp4`,
    mediaType: 'video',
    options: ['Angka 1', 'Angka 2', 'Angka 3', 'Angka 4'],
    correctAnswer: 'Angka 1',
  },
  {
    id: '4',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan isyarat ini?',
    mediaUrl: `${SUPABASE_STORAGE_URL}/angka-2.mp4`,
    mediaType: 'video',
    options: ['Angka 1', 'Angka 2', 'Angka 5', 'Angka 10'],
    correctAnswer: 'Angka 2',
  },
  {
    id: '5',
    category: 'Kata Dasar',
    questionText: 'Gerakan isyarat apakah ini?',
    mediaUrl: `${SUPABASE_STORAGE_URL}/halo.mp4`,
    mediaType: 'video',
    options: ['Halo', 'Terima Kasih', 'Sama-sama', 'Maaf'],
    correctAnswer: 'Halo',
  },
]