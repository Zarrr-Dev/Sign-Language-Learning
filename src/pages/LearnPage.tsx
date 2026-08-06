import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Play, CheckCircle2, Search, X, Sparkles } from 'lucide-react'
import { signService } from '../services/signService'
import type { Sign } from '../services/signService'

export const LearnPage = () => {
  const [signs, setSigns] = useState<Sign[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null)
  const [masteredIds, setMasteredIds] = useState<string[]>([])

  useEffect(() => {
    fetchSigns()
  }, [])

  const fetchSigns = async () => {
    try {
      setLoading(true)
      const data = await signService.getAllSigns()
      setSigns(data)
    } catch (err) {
      console.error('Error fetching signs:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const filteredSigns = signs.filter(sign =>
    sign.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sign.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Modul Belajar Isyarat <Sparkles className="w-5 h-5 text-blue-400" />
          </h1>
          <p className="text-sm text-[#B5B5B5] mt-1">
            Pilih huruf atau kata di bawah untuk mempelajari gerakan isyaratnya.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari isyarat (misal: 'A')..."
            className="w-full bg-[#171717] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-44 bg-[#171717] animate-pulse rounded-[20px] border border-white/5" />
          ))}
        </div>
      ) : filteredSigns.length === 0 ? (
        <div className="bg-[#171717] border border-white/10 rounded-[20px] p-12 text-center text-[#8A8A8A]">
          Tidak ada materi isyarat yang ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSigns.map((sign) => {
            const isMastered = masteredIds.includes(sign.id)
            return (
              <motion.div
                key={sign.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedSign(sign)}
                className={`cursor-pointer bg-[#171717] border ${
                  isMastered ? 'border-green-500/40 bg-green-950/10' : 'border-white/10 hover:border-blue-500/50'
                } rounded-[20px] p-5 relative group transition-all duration-200 overflow-hidden flex flex-col justify-between h-48`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    {sign.category}
                  </span>
                  
                  <button
                    onClick={(e) => toggleMastered(sign.id, e)}
                    className={`p-1.5 rounded-full transition-colors ${
                      isMastered ? 'text-green-400 bg-green-500/20' : 'text-[#8A8A8A] hover:text-white hover:bg-white/10'
                    }`}
                    title={isMastered ? 'Tandai Belum Dikuasai' : 'Tandai Dikuasai'}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="my-auto text-center">
                  <h3 className="text-4xl font-extrabold text-white group-hover:scale-110 transition-transform duration-200">
                    {sign.label}
                  </h3>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-blue-400 font-medium group-hover:underline">
                  <Play className="w-3.5 h-3.5 fill-blue-400" />
                  <span>Putar Video</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Modal Video Player */}
      <AnimatePresence>
        {selectedSign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#171717] border border-white/10 rounded-[24px] max-w-2xl w-full p-6 relative overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedSign(null)}
                className="absolute top-5 right-5 p-2 bg-[#0F0F0F] rounded-full text-[#8A8A8A] hover:text-white border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Isyarat '{selectedSign.label}'</h2>
                  <span className="text-xs text-[#8A8A8A]">Kategori: {selectedSign.category}</span>
                </div>
              </div>

              <div className="relative aspect-video bg-[#000000] rounded-2xl overflow-hidden border border-white/10 mb-4">
                <video
                  src={selectedSign.video_url}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#0F0F0F] border border-white/5 rounded-xl p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A8A] mb-1">
                  Deskripsi & Panduan Gerakan
                </h4>
                <p className="text-sm text-[#B5B5B5] leading-relaxed">
                  {selectedSign.description || 'Perhatikan lekukan jari dan arah telapak tangan secara mendalam.'}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}