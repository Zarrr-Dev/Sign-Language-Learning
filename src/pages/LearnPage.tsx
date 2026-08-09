import React, { useEffect, useState } from 'react'
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
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredSigns = signs.filter(
    (sign) =>
      sign.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Header Section */}
      <div className="bg-surface-container-low border-2 border-primary rounded-2xl p-6 shadow-hard relative overflow-hidden">
        {/* Tape Decor */}
        <div className="absolute -top-3 left-8 w-20 h-6 bg-secondary-container/60 border border-primary/30 rotate-1" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container border border-primary text-[11px] font-bold text-on-secondary-container shadow-hard-sm mb-2">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              Katalog Isyarat
            </span>
            <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary">
              Modul Pembelajaran
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant mt-1">
              Pilih huruf atau kata di bawah untuk mempelajari gerakan isyaratnya.
            </p>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-xl">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari isyarat (misal: 'A')..."
              className="w-full bg-surface border-2 border-primary rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary shadow-hard-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid Content / Loading */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-44 bg-surface-container border-2 border-primary/20 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredSigns.length === 0 ? (
        <div className="bg-surface border-2 border-primary rounded-2xl p-12 text-center text-on-surface-variant shadow-hard">
          <span className="material-symbols-outlined text-4xl text-primary mb-2">search_off</span>
          <p className="text-xs font-bold uppercase tracking-wider">Materi tidak ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredSigns.map((sign) => {
            const isMastered = masteredIds.includes(sign.id)
            return (
              <div
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className={`cursor-pointer border-2 border-primary rounded-2xl p-4 flex flex-col justify-between h-48 relative transition-all duration-200 group ${
                  isMastered
                    ? 'bg-secondary-container/30 shadow-hard-sm'
                    : 'bg-surface hover:bg-surface-container-low shadow-hard hover:shadow-hard-lg hover:-translate-y-1'
                }`}
              >
                {/* Top Badge & Checkmark */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-surface border border-primary text-primary">
                    {sign.category}
                  </span>

                  <button
                    onClick={(e) => toggleMastered(sign.id, e)}
                    className={`w-7 h-7 rounded-full border border-primary flex items-center justify-center transition-all ${
                      isMastered
                        ? 'bg-primary text-on-primary shadow-hard-sm'
                        : 'bg-surface text-primary/40 hover:text-primary hover:bg-secondary-container'
                    }`}
                    title={isMastered ? 'Tandai Belum Dikuasai' : 'Tandai Dikuasai'}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isMastered ? 'check_circle' : 'circle'}
                    </span>
                  </button>
                </div>

                {/* Card Title */}
                <div className="text-center my-auto">
                  <h3 className="font-headline text-4xl font-extrabold text-primary group-hover:scale-110 transition-transform duration-200">
                    {sign.label}
                  </h3>
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-primary uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  <span>Putar Video</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal Video Player & Detail Pelajaran */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm">
          <div className="bg-surface border-2 border-primary rounded-2xl max-w-xl w-full p-6 relative shadow-hard-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Tape Decor */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary-container/80 border border-primary/30 -rotate-1" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-surface-container border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-secondary-container shadow-hard-sm transition-all"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4 pt-2">
              <div className="w-10 h-10 bg-secondary-container border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-hard-sm">
                <span className="material-symbols-outlined text-xl">videocam</span>
              </div>
              <div>
                <h2 className="font-headline text-xl font-bold text-primary">
                  Isyarat '{selectedSign.label}'
                </h2>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Kategori: {selectedSign.category}
                </span>
              </div>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video bg-on-surface/90 rounded-xl overflow-hidden border-2 border-primary shadow-hard mb-4">
              <video
                src={selectedSign.video_url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description Box */}
            <div className="bg-surface-container-low border-2 border-primary/40 rounded-xl p-4 mb-6">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                Panduan & Detail Gerakan
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {selectedSign.description ||
                  'Perhatikan bentuk jari, lekukan, serta posisi telapak tangan dengan saksama.'}
              </p>
            </div>

            {/* Complete Lesson Action */}
            <button
              onClick={() => {
                if (!masteredIds.includes(selectedSign.id)) {
                  setMasteredIds((prev) => [...prev, selectedSign.id])
                }
                setSelectedSign(null)
              }}
              className="w-full bg-secondary-container text-on-secondary-container font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border-2 border-primary shadow-hard hover:shadow-hard-lg active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Selesaikan Pelajaran</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}