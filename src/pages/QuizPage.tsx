import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, RotateCcw, CheckCircle2, XCircle, Trophy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { signService } from '../services/signService'
import { quizService } from '../services/quizService'
import type { Sign } from '../services/signService'

interface Question {
  targetSign: Sign
  options: string[]
}

export const QuizPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [, setSaving] = useState(false)

  useEffect(() => {
    initQuiz()
  }, [])

  const initQuiz = async () => {
    try {
      setLoading(true)
      setQuizFinished(false)
      setScore(0)
      setCurrentIndex(0)
      setSelectedAnswer(null)

      const signs = await signService.getAllSigns()
      if (signs.length < 3) return

      // Acak data untuk dijadikan soal kuis
      const shuffled = [...signs].sort(() => 0.5 - Math.random())
      const selectedSigns = shuffled.slice(0, 5) // 5 soal

      const generatedQuestions: Question[] = selectedSigns.map((targetSign) => {
        const otherLabels = signs
          .filter((s) => s.label !== targetSign.label)
          .map((s) => s.label)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)

        const options = [...otherLabels, targetSign.label].sort(() => 0.5 - Math.random())

        return { targetSign, options }
      })

      setQuestions(generatedQuestions)
    } catch (err) {
      console.error('Error initiating quiz:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectOption = (option: string) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(option)

    const isCorrect = option === questions[currentIndex].targetSign.label
    if (isCorrect) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      setQuizFinished(true)
      if (user) {
        try {
          setSaving(true)
          await quizService.saveQuizAttempt(
            user.id, 
            score + (selectedAnswer === questions[currentIndex].targetSign.label ? 1 : 0), 
            questions.length
          )
        } catch (err) {
          console.error('Failed to save score:', err)
        } finally {
          setSaving(false)
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#B5B5B5]">Menyiapkan kuis interaktif...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="bg-[#171717] border border-white/10 rounded-[20px] p-8 text-center">
        <p className="text-[#8A8A8A]">Materi belum cukup untuk memulai kuis. Tambahkan lebih banyak materi dahulu.</p>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Kuis & Evaluasi Isyarat <Award className="w-6 h-6 text-purple-400" />
          </h1>
          <p className="text-sm text-[#B5B5B5] mt-1">Uji pemahaman kamu tentang gerakan bahasa isyarat.</p>
        </div>

        {!quizFinished && (
          <div className="px-4 py-2 rounded-xl bg-[#171717] border border-white/10 text-xs font-semibold text-blue-400">
            Soal {currentIndex + 1} dari {questions.length}
          </div>
        )}
      </div>

      {/* Tampilan Hasil Kuis */}
      {quizFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#171717] border border-white/10 rounded-[24px] p-8 text-center space-y-6 shadow-2xl"
        >
          <div className="w-16 h-16 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Kuis Selesai! 🎉</h2>
            <p className="text-sm text-[#B5B5B5] mt-1">
              Kamu berhasil menjawab <span className="text-white font-semibold">{score}</span> dari{' '}
              <span className="text-white font-semibold">{questions.length}</span> soal dengan benar.
            </p>
          </div>

          <div className="p-6 bg-[#0F0F0F] rounded-2xl border border-white/5 max-w-xs mx-auto">
            <span className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider block mb-1">
              Skor Akhir
            </span>
            <span className="text-4xl font-extrabold text-purple-400">
              {Math.round((score / questions.length) * 100)}%
            </span>
          </div>

          <button
            onClick={initQuiz}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Coba Kuis Lagi
          </button>
        </motion.div>
      ) : (
        /* Soal Active Card */
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#171717] border border-white/10 rounded-[24px] p-6 md:p-8 space-y-6 shadow-2xl"
        >
          {/* Video Pertanyaan */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Pertanyaan:
            </span>
            <h3 className="text-lg font-semibold text-white">
              Isyarat apakah yang ditunjukkan pada video di bawah ini?
            </h3>

            <div className="relative aspect-video bg-[#000000] rounded-2xl overflow-hidden border border-white/10 mt-3">
              <video
                src={currentQuestion.targetSign.video_url}
                controls
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Pilihan Jawaban */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQuestion.targetSign.label
              const showResult = selectedAnswer !== null

              let btnStyle = 'bg-[#0F0F0F] border-white/10 hover:border-blue-500/40 text-white'

              if (showResult) {
                if (isCorrect) {
                  btnStyle = 'bg-green-500/10 border-green-500/50 text-green-400 font-semibold'
                } else if (isSelected) {
                  btnStyle = 'bg-red-500/10 border-red-500/50 text-red-400'
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectOption(option)}
                  className={`p-4 rounded-xl border text-center transition-all duration-200 text-sm flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                </button>
              )
            })}
          </div>

          {/* Tombol Selanjutnya */}
          {selectedAnswer !== null && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                {currentIndex + 1 === questions.length ? 'Lihat Hasil Kuis' : 'Soal Berikutnya'}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
