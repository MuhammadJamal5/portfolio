import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Sparkles, ArrowUpRight } from 'lucide-react'
import VideoLightbox from '../components/VideoLightbox'
import { featured, shorts, thumbUrl } from '../data/videos'

function VideoCard({ video, onOpen, isShort = false }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(video)}
      className="group relative block w-full bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 text-left cursor-pointer transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20"
      style={{ aspectRatio: isShort ? '9 / 16' : '16 / 9' }}
    >
      {/* Thumbnail with Hover Zoom */}
      <img
        src={thumbUrl(video.id)}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 group-hover:from-black/90 transition-opacity duration-300" />

      {/* Pulsing Play Badge */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black"
        >
          <Play size={20} className="translate-x-[1px]" fill="currentColor" />
        </motion.div>
      </div>

      {/* Video Info Bottom Meta */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col gap-2">
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-white/10 text-indigo-200 backdrop-blur-md w-fit border border-white/15">
          {video.category}
        </span>
        <h3 className="text-white font-bold text-base sm:text-xl leading-snug">
          {video.title}
        </h3>
      </div>
    </motion.button>
  )
}

export default function Work() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section id="work" className="py-28 px-6 bg-[#000000] relative text-center nubien-grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-indigo-400 font-bold mb-4 uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Selected Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Featured Projects & Works.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto font-medium">
            High-impact brand films, SaaS demos, and viral social reels engineered for conversion.
          </p>
        </motion.div>

        {/* Featured 16:9 Landscape Videos */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map(v => (
            <VideoCard key={v.id} video={v} onOpen={setActiveVideo} />
          ))}
        </div>

        {/* Vertical Short Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {shorts.map(v => (
            <VideoCard key={v.id} video={v} onOpen={setActiveVideo} isShort />
          ))}
        </div>
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  )
}
