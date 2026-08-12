import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { quizService } from '../services/quizService'
import { QUIZ_QUESTIONS, type QuizQuestion } from '../data/quizData'
import { 
  Type, Binary, Layers, HelpCircle, CheckCircle, ArrowLeft, 
  Trophy, Flame, Check, X, RotateCcw, LayoutDashboard 
} from 'lucide-react'

export const QuizPage = () => {
  const { user } = useAuth()

  // Config & State Flow
  const [quizStarted, setQuizStarted] = useState(false)
  const [category, setCategory] = useState<string>('Semua')
  const [questionCount, setQuestionCount] = useState<number>(5)
  const [signs, setSigns] = useState<QuizQuestion[]>([])

  // Gameplay State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Reset State Kuis
  const handleResetQuiz = () => {
    setQuizStarted(false)
    setIsQuizFinished(false)
    setCurrentIndex(0)
    setScore(0)
    setSelectedOption(null)
    setSigns([])
  }

  const startQuiz = (cat: string) => {
    const filtered = cat === 'Semua' 
      ? [...QUIZ_QUESTIONS] 
      : QUIZ_QUESTIONS.filter(q => q.category === cat)

    if (filtered.length === 0) {
      alert('Belum ada soal untuk kategori ini!')
      return
    }

    let pool: QuizQuestion[] = []
    let loopCount = 0

    while (pool.length < questionCount) {
      const shuffledCopy = [...filtered]
        .sort(() => 0.5 - Math.random())
        .map((q, idx) => ({
          ...q,
          id: `${q.id}-${loopCount}-${idx}`,
          options: [...q.options].sort(() => 0.5 - Math.random())
        }))

      pool = [...pool, ...shuffledCopy]
      loopCount++
    }

    const finalQuestions = pool.slice(0, questionCount)

    setSigns(finalQuestions)
    setCategory(cat)
    setQuizStarted(true)
    setCurrentIndex(0)
    setScore(0)
    setSelectedOption(null)
  }

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null) return
    setSelectedOption(option)

    const currentSign = signs[currentIndex]
    const isCorrect = option === currentSign.correctAnswer
    const newScore = isCorrect ? score + 1 : score

    if (isCorrect) setScore(newScore)

    setTimeout(() => {
      if (currentIndex + 1 < signs.length) {
        setCurrentIndex(currentIndex + 1)
        setSelectedOption(null)
      } else {
        finishQuiz(newScore, signs.length)
      }
    }, 1200)
  }

  const finishQuiz = async (finalScore: number, totalQuestions: number) => {
    setIsQuizFinished(true)
    if (user) {
      try {
        setIsSaving(true)
        await quizService.saveQuizAttempt(user.id, finalScore, totalQuestions)
      } catch (err) {
        console.error('Gagal simpan hasil kuis:', err)
      } finally {
        setIsSaving(false)
      }
    }
  }

  // 1. TAMPILAN SETUP (SELEKSI MODE)
  if (!quizStarted) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 pb-10 animate-in fade-in duration-300">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#004349]">Pilih Mode Latihan</h1>
          <p className="text-xs text-[#3f484a]">Tentukan jumlah soal dan kategori materi kuis.</p>
        </div>

        {/* Option Jumlah Soal */}
        <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#004349] space-y-3">
          <div className="flex items-center gap-2 text-[#004349]">
            <HelpCircle size={18} />
            <h3 className="font-serif font-bold text-base">Pilih Jumlah Soal</h3>
          </div>
          <div className="flex gap-4">
            {[5, 10].map((num) => (
              <button
                key={num}
                onClick={() => setQuestionCount(num)}
                className={`flex-1 py-3 px-6 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  questionCount === num
                    ? 'bg-[#ffbe4f] text-[#724d00] border-[#004349] shadow-[3px_3px_0px_0px_#004349]'
                    : 'bg-[#fff9ee] text-[#004349] border-[#004349]/30'
                }`}
              >
                {questionCount === num && <CheckCircle size={16} />}
                <span>{num} Soal</span>
              </button>
            ))}
          </div>
        </div>

  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'Abjad', title: 'Kuis Abjad', desc: 'Tes hafalan isyarat A-Z', icon: <Type />, color: 'bg-[#ffbe4f]' },
            { id: 'Angka', title: 'Kuis Angka', desc: 'Tes hafalan angka 1-10', icon: <Binary />, color: 'bg-[#ffdad2]' },
            { id: 'Semua', title: 'Campuran', desc: 'Semua materi digabung acak', icon: <Layers />, color: 'bg-[#d0e0e3]' },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => startQuiz(item.id)}
              className="cursor-pointer bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#004349] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <div className={`w-14 h-14 ${item.color} border-2 border-[#004349] rounded-2xl flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#004349]`}>
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#004349] mb-2">{item.title}</h3>
              <p className="text-xs text-[#3f484a] mb-4">{item.desc}</p>
              <div className="inline-block px-3 py-1 bg-[#fff9ee] border border-[#004349] rounded-full text-[10px] font-bold text-[#004349]">
                Mulai {questionCount} Soal →
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }


  if (isQuizFinished) {
    const accuracy = Math.round((score / signs.length) * 100)
    const isPassed = accuracy >= 70

    return (
      <div className="max-w-2xl mx-auto bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-8 shadow-[8px_8px_0px_0px_#004349] space-y-6 text-center animate-in fade-in">
        <div className="w-20 h-20 bg-[#ffbe4f] border-2 border-[#004349] rounded-full flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#004349]">
          <Trophy className="w-10 h-10 text-[#724d00]" />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#004349]">
            {isPassed ? 'Evaluasi Bagus Sekali!' : 'Coba Lagi & Tingkatkan!'}
          </h2>
          <p className="text-xs font-medium text-[#3f484a] mt-1">
            {isSaving ? 'Menyimpan statistik...' : 'Hasil kuis tersimpan dan streak harianmu aktif!'}
          </p>
        </div>

        <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-4 flex items-center justify-between shadow-[3px_3px_0px_0px_#004349]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center text-[#741a06]">
              <Flame className="w-6 h-6 fill-[#741a06]" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-xs text-[#004349]">Streak Harian Diperbarui</h4>
              <p className="text-[10px] text-[#3f484a]">Progres belajar tersimpan di Dashboard.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#ffbe4f] border border-[#004349] rounded-full text-[10px] font-bold text-[#724d00]">Active</span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#004349]">
            <span className="text-[10px] font-bold text-[#3f484a] uppercase block mb-1">Skor Akhir</span>
            <span className="font-serif text-2xl font-bold text-[#004349]">{score} / {signs.length}</span>
          </div>
          <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#004349]">
            <span className="text-[10px] font-bold text-[#3f484a] uppercase block mb-1">Akurasi</span>
            <span className="font-serif text-2xl font-bold text-[#004349]">{accuracy}%</span>
          </div>
          <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#004349]">
            <span className="text-[10px] font-bold text-[#3f484a] uppercase block mb-1">Status</span>
            <span className={`font-serif text-sm font-bold block mt-1 ${isPassed ? 'text-[#004349]' : 'text-[#ba1a1a]'}`}>
              {isPassed ? 'Sangat Baik' : 'Perlu Latihan'}
            </span>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button 
            onClick={handleResetQuiz} 
            className="flex-1 py-3.5 bg-[#fff9ee] border-2 border-[#004349] rounded-xl font-bold text-xs uppercase text-[#004349] shadow-[3px_3px_0px_0px_#004349] flex items-center justify-center gap-2 hover:bg-[#ffbe4f]/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" /><span>Kuis Lain</span>
          </button>
          <Link 
            to="/dashboard" 
            className="flex-1 py-3.5 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl font-bold text-xs uppercase text-[#724d00] shadow-[3px_3px_0px_0px_#004349] flex items-center justify-center gap-2 hover:brightness-105 transition-all"
          >
            <LayoutDashboard className="w-4 h-4" /><span>Dashboard</span>
          </Link>
        </div>
      </div>
    )
  }


  const currentSign = signs[currentIndex]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={handleResetQuiz} className="flex items-center gap-2 text-xs font-bold text-[#004349] hover:underline">
          <ArrowLeft size={16} /> Batal & Keluar
        </button>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#faf3e6] border border-[#004349] rounded-full text-xs font-bold text-[#004349]">
            {questionCount} Soal
          </span>
          <span className="px-3 py-1 bg-[#ffbe4f] border-2 border-[#004349] rounded-full text-xs font-bold text-[#724d00]">
            Kategori: {category}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">

        <div className="flex-1 bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#004349]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3f484a]">
              Soal {currentIndex + 1} dari {signs.length}
            </span>
            <div className="w-36 bg-[#fff9ee] h-2.5 rounded-full border border-[#004349]/30 overflow-hidden">
              <div 
                className="bg-[#ffbe4f] h-full transition-all duration-300" 
                style={{ width: `${((currentIndex + 1) / signs.length) * 100}%` }} 
              />
            </div>
          </div>

          <div className={`aspect-video rounded-2xl overflow-hidden border-2 border-[#004349] shadow-[4px_4px_0px_0px_#004349] flex items-center justify-center p-2 ${
            currentSign.mediaType === 'video' ? 'bg-[#1e1b14]' : 'bg-[#fff9ee]'
          }`}>
            {currentSign.mediaType === 'video' ? (
              <video 
                key={currentSign.mediaUrl} 
                src={currentSign.mediaUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-contain" 
              />
            ) : (
              
              <img 
                key={currentSign.mediaUrl} 
                src={currentSign.mediaUrl} 
                alt="Sign Quiz" 
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-2" 
                onError={(e) => {
                  console.error('ERROR: Gambar tidak bisa dibuka dari URL:', currentSign.mediaUrl)
                  e.currentTarget.src = 'https://placehold.co/600x400/fff9ee/004349?text=Gagal+Muat+Gambar'
                }}
              />
            )}
          </div>
        </div>


        <div className="w-full lg:w-[400px] flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-[#004349]">{currentSign.questionText}</h2>
            <p className="text-xs text-[#3f484a]">Pilih jawaban yang melambangkan instruksi gambar/video di samping.</p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {currentSign.options.map((option, idx) => {
              const isSelected = selectedOption === option
              const isCorrect = option === currentSign.correctAnswer
              let style = "bg-[#fff9ee] border-[#004349] text-[#004349] hover:bg-[#ffbe4f]/20 shadow-[4px_4px_0px_0px_#004349]"

              if (selectedOption) {
                if (isCorrect) {
                  style = "bg-[#ffbe4f] border-[#004349] text-[#724d00] shadow-none translate-x-[2px] translate-y-[2px]"
                } else if (isSelected) {
                  style = "bg-[#ffdad2] border-[#ba1a1a] text-[#ba1a1a] shadow-none translate-x-[2px] translate-y-[2px]"
                }
              }

              return (
                <button 
                  key={idx} 
                  disabled={!!selectedOption} 
                  onClick={() => handleSelectOption(option)} 
                  className={`w-full p-4 rounded-2xl border-2 font-serif text-lg font-bold transition-all text-left flex justify-between items-center ${style}`}
                >
                  <span>{option}</span>
                  {selectedOption && isCorrect && <Check className="w-5 h-5 text-[#724d00] stroke-[3]" />}
                  {selectedOption && isSelected && !isCorrect && <X className="w-5 h-5 text-[#ba1a1a] stroke-[3]" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}