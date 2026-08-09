import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { signService, type Sign } from '../services/signService'
import { quizService } from '../services/quizService'
import { useAuth } from '../context/AuthContext'

export const QuizPage = () => {
  const { user } = useAuth()
  const [signs, setSigns] = useState<Sign[]>([])
  const [loading, setLoading] = useState(true)
  
  // State Permainan
  const [currentIndex, setCurrentIndex] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [savingResult, setSavingResult] = useState(false)

  useEffect(() => {
    fetchQuizData()
  }, [])

  const fetchQuizData = async () => {
    try {
      setLoading(true)
      const data = await signService.getAllSigns()
      // Acak urutan pertanyaan
      const shuffled = [...data].sort(() => 0.5 - Math.random())
      setSigns(shuffled)
      if (shuffled.length > 0) {
        generateOptions(shuffled[0], shuffled)
      }
    } catch (err) {
      console.error('Error fetching quiz signs:', err)
    } finally {
      setLoading(false)
    }
  }

  // Generate 4 Pilihan Jawaban Acak (1 Benar, 3 Salah)
  const generateOptions = (currentSign: Sign, allSigns: Sign[]) => {
    const wrongAnswers = allSigns
      .filter((s) => s.id !== currentSign.id)
      .map((s) => s.label)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    const choices = [currentSign.label, ...wrongAnswers].sort(() => 0.5 - Math.random())
    setOptions(choices)
    setSelectedOption(null)
  }

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null) return // Mencegah double klik
    setSelectedOption(option)

    const currentSign = signs[currentIndex]
    let newScore = score
    if (option === currentSign.label) {
      newScore = score + 1
      setScore(newScore)
    }

    // Delay 1 detik sebelum lanjut ke soal berikutnya
    setTimeout(() => {
      if (currentIndex + 1 < signs.length && currentIndex + 1 < 5) {
        // Batasi 5 Pertanyaan per Sesi Kuis
        const nextIdx = currentIndex + 1
        setCurrentIndex(nextIdx)
        generateOptions(signs[nextIdx], signs)
      } else {
        finishQuiz(newScore, Math.min(signs.length, 5))
      }
    }, 1000)
  }

  const finishQuiz = async (finalScore: number, totalQuestions: number) => {
    setIsQuizFinished(true)
    if (user) {
      try {
        setSavingResult(true)
        await quizService.saveQuizAttempt(user.id, finalScore, totalQuestions)
      } catch (err) {
        console.error('Gagal menyimpan hasil kuis:', err)
      } finally {
        setSavingResult(false)
      }
    }
  }

  const handleRestartQuiz = () => {
    setCurrentIndex(0)
    setScore(0)
    setIsQuizFinished(false)
    fetchQuizData()
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center">
        <div className="w-12 h-12 bg-secondary-container border-2 border-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Menyiapkan Kuis...</p>
      </div>
    )
  }

  if (signs.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-surface border-2 border-primary rounded-2xl p-8 text-center shadow-hard">
        <span className="material-symbols-outlined text-4xl text-primary mb-2">quiz</span>
        <h2 className="font-headline text-xl font-bold text-primary mb-2">Materi Belum Cukup</h2>
        <p className="text-xs text-on-surface-variant mb-6">Silakan tambahkan data isyarat terlebih dahulu di database Supabase.</p>
        <Link
          to="/dashboard/learn"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-container border-2 border-primary rounded-xl text-xs font-bold text-on-secondary-container shadow-hard-sm"
        >
          <span>Buka Modul Belajar</span>
        </Link>
      </div>
    )
  }

  const currentSign = signs[currentIndex]
  const totalQuestions = Math.min(signs.length, 5)

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-16">
      
      {/* TAMPILAN 1: KUIS AKTIF */}
      {!isQuizFinished ? (
        <div className="bg-surface-container-low border-2 border-primary rounded-2xl p-6 shadow-hard relative">
          {/* Tape Decor */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary-container/80 border border-primary/30 -rotate-1" />

          {/* Header Progress */}
          <div className="flex items-center justify-between mb-4 pt-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Soal {currentIndex + 1} dari {totalQuestions}
            </span>
            <div className="px-3 py-1 bg-surface border border-primary rounded-full text-xs font-bold text-tertiary shadow-hard-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-tertiary">star</span>
              <span>Skor: {score}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-surface border border-primary/30 h-2.5 rounded-full overflow-hidden mb-6 p-0.5">
            <div
              className="bg-secondary-container h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Prompt Title */}
          <div className="text-center mb-4">
            <h2 className="font-headline text-xl font-bold text-primary">Tebak Gerakan Isyarat Ini!</h2>
            <p className="text-xs text-on-surface-variant">Perhatikan video di bawah, lalu pilih huruf yang sesuai.</p>
          </div>

          {/* Video Player Box */}
          <div className="aspect-video bg-on-surface/90 border-2 border-primary rounded-xl overflow-hidden shadow-hard mb-6 relative">
            <video
              src={currentSign.video_url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* 4 Pilihan Jawaban */}
          <div className="grid grid-cols-2 gap-3">
            {options.map((option, idx) => {
              const isSelected = selectedOption === option
              const isCorrect = option === currentSign.label

              let btnStyle = 'bg-surface text-primary border-primary hover:bg-surface-container-low shadow-hard'
              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-secondary-container text-on-secondary-container border-primary shadow-hard-sm'
                } else if (isSelected) {
                  btnStyle = 'bg-tertiary-container/30 text-tertiary border-tertiary shadow-none'
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-xl border-2 font-headline text-2xl font-bold uppercase transition-all duration-200 ${btnStyle}`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        
        /* TAMPILAN 2: HASIL KUIS (RECAP) */
        <div className="bg-surface-container-low border-2 border-primary rounded-2xl p-8 text-center shadow-hard relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary-container/80 border border-primary/30 rotate-1" />

          {/* Icon Trophy / Stars */}
          <div className="w-20 h-20 bg-secondary-container border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-hard">
            <span className="material-symbols-outlined text-4xl text-primary">emoji_events</span>
          </div>

          <h2 className="font-headline text-3xl font-bold text-primary mb-1">
            {score === totalQuestions ? 'Sempurna!' : score > 2 ? 'Bagus Sekali!' : 'Tetap Semangat!'}
          </h2>
          <p className="text-xs text-on-surface-variant mb-6">
            Kamu telah menyelesaikan sesi latihan tebak isyarat.
          </p>

          {/* Score Box */}
          <div className="bg-surface border-2 border-primary rounded-2xl p-6 shadow-hard mb-6 max-w-xs mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Skor Akhir Kamu
            </span>
            <div className="font-headline text-5xl font-extrabold text-primary mb-1">
              {score} <span className="text-2xl text-on-surface-variant">/ {totalQuestions}</span>
            </div>
            <span className="inline-block px-3 py-1 bg-secondary-container border border-primary rounded-full text-xs font-bold text-on-secondary-container">
              Akurasi {Math.round((score / totalQuestions) * 100)}%
            </span>
          </div>

          {savingResult && (
            <p className="text-[11px] text-on-surface-variant mb-4 italic">Menyimpan skor ke database...</p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRestartQuiz}
              className="flex-1 bg-surface text-primary border-2 border-primary font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl shadow-hard hover:shadow-hard-lg active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              <span>Coba Lagi</span>
            </button>

            <Link
              to="/dashboard"
              className="flex-1 bg-secondary-container text-on-secondary-container border-2 border-primary font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl shadow-hard hover:shadow-hard-lg active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Kembali ke Dashboard</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  )
}