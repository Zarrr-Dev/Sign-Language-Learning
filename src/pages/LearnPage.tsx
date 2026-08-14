import React, { useEffect, useState } from 'react'
import { signService, type Sign } from '../services/signService'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'

export const LearnPage = () => {
  const { user } = useAuth()
  const [signs, setSigns] = useState<Sign[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua')
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null)
  const [masteredIds, setMasteredIds] = useState<string[]>([])

  useEffect(() => {
    signService.getAllSigns().then((data) => {
      setSigns(data)
      setLoading(false)
    })
  }, [])

  const triggerLearningActivity = async () => {
    if (user?.id) {
      await userService.updateStreak(user.id)
    }
  }

  const handleOpenDetail = (sign: Sign) => {
    setSelectedSign(sign)
    triggerLearningActivity()
  }

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
    triggerLearningActivity()
  }

  const categories = ['Semua', 'Abjad', 'Angka', 'Kata Dasar']

  const filteredSigns = signs.filter((sign) => {
    const matchesSearch =
      sign.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Semua' || sign.category === selectedCategory
    
    const isVideo = sign.video_url?.toLowerCase().endsWith('.mp4')

    return matchesSearch && matchesCategory && isVideo
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 text-[#1e1b14] select-none">
      
      <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#004349] relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffbe4f] border border-[#004349] text-xs font-bold text-[#724d00] shadow-[2px_2px_0px_0px_#004349]">
              <span className="material-symbols-outlined text-sm notranslate"translate="no">auto_stories</span>
              Kumpulan Isyarat
            </span>
            <h1 className="font-serif text-3xl font-extrabold text-[#004349] pt-1">
              Modul Pembelajaran
            </h1>
            <p className="text-xs md:text-sm text-[#3f484a] max-w-xl">
              Eksplorasi materi isyarat langsung dari database. Setiap kali kamu belajar, streak harianmu otomatis aktif!
            </p>
          </div>

          <div className="relative w-full md:w-80 shrink-0">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#004349] text-xl notranslate"translate="no">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari isyarat..."
              className="w-full bg-[#fff9ee] border-2 border-[#004349] rounded-2xl pl-10 pr-4 py-3 text-xs md:text-sm font-medium text-[#1e1b14] placeholder-[#3f484a]/60 shadow-[3px_3px_0px_0px_#004349] focus:outline-none focus:ring-2 focus:ring-[#004349]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pt-6 border-t border-[#004349]/15 mt-6">
          <span className="text-xs font-bold text-[#004349] shrink-0 mr-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm notranslate"translate="no">filter_alt</span>
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full border-2 text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#004349] text-[#fff9ee] border-[#004349] shadow-[2px_2px_0px_0px_#ffbe4f]'
                  : 'bg-[#fff9ee] text-[#004349] border-[#004349]/30 hover:border-[#004349]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-56 bg-[#faf3e6] border-2 border-[#004349]/20 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredSigns.length === 0 ? (
        <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-3xl p-12 text-center text-[#3f484a] shadow-[6px_6px_0px_0px_#004349]">
          <span className="material-symbols-outlined text-5xl text-[#004349] mb-2 notranslate"translate="no">search_off</span>
          <h3 className="font-serif text-lg font-bold text-[#004349]">Materi Tidak Ditemukan</h3>
          <p className="text-xs mt-1">Coba gunakan kata kunci lain atau ubah filter kategori.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredSigns.map((sign) => {
            const isMastered = masteredIds.includes(sign.id)
            return (
              <div
                key={sign.id}
                onClick={() => handleOpenDetail(sign)}
                className={`cursor-pointer border-2 border-[#004349] rounded-2xl p-4 flex flex-col justify-between h-56 relative transition-all duration-200 group ${
                  isMastered
                    ? 'bg-[#ffbe4f]/25 shadow-[3px_3px_0px_0px_#004349]'
                    : 'bg-[#fff9ee] hover:bg-[#faf3e6] shadow-[5px_5px_0px_0px_#004349] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-[#faf3e6] border border-[#004349] text-[#004349]">
                    {sign.category}
                  </span>

                  <button
                    onClick={(e) => toggleMastered(sign.id, e)}
                    className={`w-7 h-7 rounded-full border border-[#004349] flex items-center justify-center transition-all ${
                      isMastered
                        ? 'bg-[#004349] text-white shadow-[1px_1px_0px_0px_#004349]'
                        : 'bg-[#fff9ee] text-[#004349]/40 hover:text-[#004349] hover:bg-[#ffbe4f]'
                    }`}
                    title={isMastered ? 'Tandai Belum Dikuasai' : 'Tandai Dikuasai'}
                  >
                    <span className="material-symbols-outlined text-base notranslate"translate="no">
                      {isMastered ? 'check_circle' : 'circle'}
                    </span>
                  </button>
                </div>

                <div className="text-center my-auto py-2">
                  <h3 className="font-serif text-3xl font-extrabold text-[#004349] group-hover:scale-110 transition-transform duration-200">
                    {sign.label}
                  </h3>
                </div>

                <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#faf3e6] border border-[#004349] rounded-xl text-[10px] font-bold text-[#004349] uppercase tracking-wider group-hover:bg-[#ffbe4f] transition-colors">
                  <span className="material-symbols-outlined text-sm notranslate"translate="no">play_circle</span>
                  <span>Putar Video</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1b14]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fff9ee] border-2 border-[#004349] rounded-3xl max-w-md w-full p-6 relative shadow-[10px_10px_0px_0px_#004349] overflow-hidden">
            
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-[#faf3e6] border-2 border-[#004349] rounded-full flex items-center justify-center text-[#004349] hover:bg-[#ffbe4f] shadow-[2px_2px_0px_0px_#004349] transition-all z-10"
            >
              <span className="material-symbols-outlined text-xl notranslate"translate="no">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-10 h-10 bg-[#ffbe4f] border-2 border-[#004349] rounded-xl flex items-center justify-center text-[#004349] shadow-[2px_2px_0px_0px_#004349] shrink-0">
                <span className="material-symbols-outlined text-xl notranslate"translate="no">videocam</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#004349]">
                  Isyarat '{selectedSign.label}'
                </h2>
                <span className="text-[10px] font-bold text-[#3f484a] uppercase tracking-wider">
                  Kategori: {selectedSign.category}
                </span>
              </div>
            </div>

            <div className="relative aspect-video bg-[#1e1b14] rounded-2xl overflow-hidden border-2 border-[#004349] shadow-[4px_4px_0px_0px_#004349] mb-5 flex items-center justify-center">
              <video
                key={selectedSign.video_url}
                src={selectedSign.video_url}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <div className="bg-[#faf3e6] border-2 border-[#004349] rounded-2xl p-4 mb-5 shadow-[3px_3px_0px_0px_#004349]">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#004349] mb-1">
                Panduan Gerakan Isyarat
              </h4>
              <p className="text-xs text-[#3f484a] leading-relaxed">
                {selectedSign.description ||
                  'Perhatikan bentuk jari, posisi telapak tangan, dan arah gerakan dengan benar.'}
              </p>
            </div>

            <button
              onClick={() => {
                if (!masteredIds.includes(selectedSign.id)) {
                  setMasteredIds((prev) => [...prev, selectedSign.id])
                }
                triggerLearningActivity()
                setSelectedSign(null)
              }}
              className="w-full bg-[#ffbe4f] text-[#724d00] font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-2xl border-2 border-[#004349] shadow-[4px_4px_0px_0px_#004349] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg notranslate" translate="no">check_circle</span>
              <span>Selesaikan Pelajaran Ini</span>
            </button>

          </div>
        </div>
      )}

    </div>
  )
}