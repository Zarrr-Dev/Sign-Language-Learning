import { supabase } from '../lib/supabaseClient'

export interface QuizQuestion {
  id: string
  category: 'Abjad' | 'Angka' | 'Kata Dasar'
  questionText: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  options: string[]
  correctAnswer: string
}


const getStorageUrl = (path: string) => {
  const { data } = supabase.storage
    .from('Video and Foto assets')
    .getPublicUrl(path)
  
  return data.publicUrl
}


export const ANGKA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'a1',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/1.jpg'),
    mediaType: 'image',
    options: ['Angka 1', 'Angka 2', 'Angka 3', 'Angka 4'],
    correctAnswer: 'Angka 1',
  },
  {
    id: 'a2',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/2.jpg'),
    mediaType: 'image',
    options: ['Angka 1', 'Angka 2', 'Angka 5', 'Angka 6'],
    correctAnswer: 'Angka 2',
  },
  {
    id: 'a3',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/3.jpg'),
    mediaType: 'image',
    options: ['Angka 2', 'Angka 3', 'Angka 4', 'Angka 7'],
    correctAnswer: 'Angka 3',
  },
  {
    id: 'a4',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/4.jpg'),
    mediaType: 'image',
    options: ['Angka 3', 'Angka 4', 'Angka 5', 'Angka 8'],
    correctAnswer: 'Angka 4',
  },
  {
    id: 'a5',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/5.jpg'),
    mediaType: 'image',
    options: ['Angka 4', 'Angka 5', 'Angka 9', 'Angka 10'],
    correctAnswer: 'Angka 5',
  },
  {
    id: 'a6',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/6.jpg'),
    mediaType: 'image',
    options: ['Angka 5', 'Angka 6', 'Angka 7', 'Angka 8'],
    correctAnswer: 'Angka 6',
  },
  {
    id: 'a7',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/7.jpg'),
    mediaType: 'image',
    options: ['Angka 6', 'Angka 7', 'Angka 8', 'Angka 9'],
    correctAnswer: 'Angka 7',
  },
  {
    id: 'a8',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/8.jpg'),
    mediaType: 'image',
    options: ['Angka 7', 'Angka 8', 'Angka 9', 'Angka 10'],
    correctAnswer: 'Angka 8',
  },
  {
    id: 'a9',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/9.jpg'),
    mediaType: 'image',
    options: ['Angka 6', 'Angka 8', 'Angka 9', 'Angka 10'],
    correctAnswer: 'Angka 9',
  },
  {
    id: 'a10',
    category: 'Angka',
    questionText: 'Angka berapa yang dilambangkan oleh isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/10.jpg'),
    mediaType: 'image',
    options: ['Angka 5', 'Angka 7', 'Angka 9', 'Angka 10'],
    correctAnswer: 'Angka 10',
  },
]


export const ABJAD_QUESTIONS: QuizQuestion[] = [
  {
    id: 'b1',
    category: 'Abjad',
    questionText: 'Tebak isyarat abjad di bawah ini!',
    mediaUrl: getStorageUrl('Foto Assets/A.jpg'),
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf C', 'Huruf D'],
    correctAnswer: 'Huruf A',
  },
  {
    id: 'b2',
    category: 'Abjad',
    questionText: 'Tebak isyarat abjad di bawah ini!',
    mediaUrl: getStorageUrl('Foto Assets/B.jpg'),
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf C', 'Huruf D'],
    correctAnswer: 'Huruf B',
  },
  {
    id: 'b3',
    category: 'Abjad',
    questionText: 'Tebak isyarat abjad di bawah ini!',
    mediaUrl: getStorageUrl('Foto Assets/C.jpg'), 
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf C', 'Huruf D'],
    correctAnswer: 'Huruf C',
  },
  {
    id: 'b4',
    category: 'Abjad',
    questionText: 'Tebak isyarat abjad di bawah ini!',
    mediaUrl: getStorageUrl('Foto Assets/D.jpg'),
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf C', 'Huruf D'],
    correctAnswer: 'Huruf D',
  },
  {
    id: 'b5',
    category: 'Abjad',
    questionText: 'Tebak isyarat abjad di bawah ini!',
    mediaUrl: getStorageUrl('Foto Assets/E.jpg'),
    mediaType: 'image',
    options: ['Huruf C', 'Huruf D', 'Huruf E', 'Huruf F'],
    correctAnswer: 'Huruf E',
  },
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...ANGKA_QUESTIONS,
  ...ABJAD_QUESTIONS,
]