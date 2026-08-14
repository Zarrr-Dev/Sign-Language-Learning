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
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/1.jpg'),
    mediaType: 'image',
    options: ['Angka 1', 'Angka 2', 'Angka 3', 'Angka 4'],
    correctAnswer: 'Angka 1',
  },
  {
    id: 'a2',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/2.jpg'),
    mediaType: 'image',
    options: ['Angka 1', 'Angka 2', 'Angka 5', 'Angka 6'],
    correctAnswer: 'Angka 2',
  },
  {
    id: 'a3',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/3.jpg'),
    mediaType: 'image',
    options: ['Angka 2', 'Angka 3', 'Angka 4', 'Angka 7'],
    correctAnswer: 'Angka 3',
  },
  {
    id: 'a4',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/4.jpg'),
    mediaType: 'image',
    options: ['Angka 3', 'Angka 4', 'Angka 5', 'Angka 8'],
    correctAnswer: 'Angka 4',
  },
  {
    id: 'a5',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/5.jpg'),
    mediaType: 'image',
    options: ['Angka 4', 'Angka 5', 'Angka 9', 'Angka 10'],
    correctAnswer: 'Angka 5',
  },
  {
    id: 'a6',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/6.jpg'),
    mediaType: 'image',
    options: ['Angka 5', 'Angka 6', 'Angka 7', 'Angka 8'],
    correctAnswer: 'Angka 6',
  },
  {
    id: 'a7',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/7.jpg'),
    mediaType: 'image',
    options: ['Angka 6', 'Angka 7', 'Angka 8', 'Angka 9'],
    correctAnswer: 'Angka 7',
  },
  {
    id: 'a8',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/8.jpg'),
    mediaType: 'image',
    options: ['Angka 7', 'Angka 8', 'Angka 9', 'Angka 10'],
    correctAnswer: 'Angka 8',
  },
  {
    id: 'a9',
    category: 'Angka',
    questionText: 'Angka berapa yang ada digambar isyarat ini?',
    mediaUrl: getStorageUrl('Foto Assets/9.jpg'),
    mediaType: 'image',
    options: ['Angka 6', 'Angka 8', 'Angka 9', 'Angka 10'],
    correctAnswer: 'Angka 9',
  },
  {
    id: 'a10',
    category: 'Angka',
    questionText: 'Gambar apa isyarat disamping?',
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
    questionText: 'Gambar apa isyarat disamping',
    mediaUrl: getStorageUrl('Foto Assets/A.jpg'),
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf C', 'Huruf D'],
    correctAnswer: 'Huruf A',
  },
  {
    id: 'b2',
    category: 'Abjad',
    questionText: 'Tebak isyarat huruf disamping',
    mediaUrl: getStorageUrl('Foto Assets/B.jpg'),
    mediaType: 'image',
    options: ['Huruf A', 'Huruf B', 'Huruf C', 'Huruf D'],
    correctAnswer: 'Huruf B',
  },
  {
    id: 'b3',
    category: 'Abjad',
    questionText: 'Gambar apa isyarat disamping',
    mediaUrl: getStorageUrl('Foto Assets/C.jpg'),
    mediaType: 'image',
    options: ['Angka 19', 'Huruf B', 'Huruf C', 'Angka 100'],
    correctAnswer: 'Huruf C',
  },
  {
    id: 'b4',
    category: 'Abjad',
    questionText: 'Tebak gambar isyarat disamping',
    mediaUrl: getStorageUrl('Foto Assets/D.jpg'),
    mediaType: 'image',
    options: ['Angka 21', 'Huruf B', 'Angka 24', 'Huruf D'],
    correctAnswer: 'Huruf D',
  },
  {
    id: 'b5',
    category: 'Abjad',
    questionText: 'Tebak gambar isyarat di samping',
    mediaUrl: getStorageUrl('Foto Assets/E.jpg'),
    mediaType: 'image',
    options: ['Angka 15', 'Huruf D', 'Huruf E', 'Angka 14'],
    correctAnswer: 'Huruf E',
  },
  {
    id: 'b6',
    category: 'Abjad',
    questionText: 'Tebak gambar isyarat disamping',
    mediaUrl: getStorageUrl('Foto Assets/F.jpg'),
    mediaType: 'image',
    options: ['Angka 18', 'Huruf F', 'Angka 20', 'Huruf H'],
    correctAnswer: 'Huruf F',
  },
  {
    id: 'b7',
    category: 'Abjad',
    questionText: 'Tebak gambar isyarat disamping',
    mediaUrl: getStorageUrl('Foto Assets/G.jpg'),
    mediaType: 'image',
    options: ['Angka 16', 'Huruf G', 'Angka 20', 'Huruf I'],
    correctAnswer: 'Huruf G',
  },
  {
    id: 'b8',
    category: 'Abjad',
    questionText: 'Tebak isyarat huruf di bawah ini',
    mediaUrl: getStorageUrl('Foto Assets/H.jpg'),
    mediaType: 'image',
    options: ['Huruf G', 'Huruf H', 'Huruf I', 'Huruf J'],
    correctAnswer: 'Huruf H',
  },
  {
    id: 'b9',
    category: 'Abjad',
    questionText: 'Tebak isyarat huruf di bawah ini',
    mediaUrl: getStorageUrl('Foto Assets/I.jpg'),
    mediaType: 'image',
    options: ['Huruf F', 'Huruf H', 'Huruf I', 'Huruf J'],
    correctAnswer: 'Huruf I',
  },
  {
    id: 'b10',
    category: 'Abjad',
    questionText: 'Tebak isyarat huruf di bawah ini',
    mediaUrl: getStorageUrl('Foto Assets/J.jpg'),
    mediaType: 'image',
    options: ['Huruf G', 'Huruf H', 'Huruf I', 'Huruf J'],
    correctAnswer: 'Huruf J',
  },
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...ANGKA_QUESTIONS,
  ...ABJAD_QUESTIONS,
]

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {
  
    const j = Math.floor(Math.random() * (i + 1))

    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

const getAllPossibleAnswers = (): string[] =>
  [...ANGKA_QUESTIONS, ...ABJAD_QUESTIONS].map((q) => q.correctAnswer)

const generateMixedOptions = (correctAnswer: string): string[] => {
  const distractorPool = getAllPossibleAnswers().filter(
    (answer) => answer !== correctAnswer
  )
  const pickedDistractors = shuffleArray(distractorPool).slice(0, 3)

  return shuffleArray([correctAnswer, ...pickedDistractors])
}


export const getCampuranQuestions = (count: 5 | 10): QuizQuestion[] => {
  const combined = shuffleArray([...ANGKA_QUESTIONS, ...ABJAD_QUESTIONS])
  const selected = combined.slice(0, count)

  return selected.map((question) => ({
    ...question,
    options: generateMixedOptions(question.correctAnswer),
  }))
}

export const getQuestionsByCategory = (
  category: 'Angka' | 'Abjad',
  count: 5 | 10
): QuizQuestion[] => {
  const pool = category === 'Angka' ? ANGKA_QUESTIONS : ABJAD_QUESTIONS
  return shuffleArray(pool).slice(0, count)
}

