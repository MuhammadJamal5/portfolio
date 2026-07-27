import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import VideoLightbox from '../components/VideoLightbox'
import { featured, shorts, thumbUrl } from '../data/videos'

function VideoCard({ video, onOpen, isShort = false, index = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(video)}
      className="group relative block w-full bg-[#0c0c14] rounded-2xl overflow-hidden border border-white/10 text-left cursor-pointer transition-all duration-400 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/25"
      style={{ aspectRatio: isShort ? '9 / 16' : '16 / 9' }}
    >
      {/* Thumbnail */}
      <img
        src={thumbUrl(video.id)}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      {/* Dream Motion Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-13 h-13 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl transition-all group-hover:bg-white group-hover:text-black"
        >
          <Play size={20} className="translate-x-[1px]" fill="currentColor" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
        <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-indigo-200 backdrop-blur-md mb-2 border border-white/10 tracking-wider uppercase">
          {video.category}
        </span>
        <h3 className="text-white font-semibold text-sm sm:text-base leading-snug">
          {video.title}
        </h3>
      </div>
    </motion.button>
  )
}

export default function Work() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section id="work" className="py-24 px-6 bg-[#06060a] relative text-center">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="vizer-badge mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>SELECTED PORTFOLIO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            Featured Projects & Works.
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto font-normal">
            High-impact brand films, SaaS demos, and viral social reels engineered for conversion.
          </p>
        </motion.div>

        {/* Featured 16:9 Landscape Videos */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((v, i) => (
            <VideoCard key={v.id} video={v} onOpen={setActiveVideo} index={i} />
          ))}
        </div>

        {/* Vertical Short Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {shorts.map((v, i) => (
            <VideoCard key={v.id} video={v} onOpen={setActiveVideo} isShort index={i} />
          ))}
        </div>
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  )
}
