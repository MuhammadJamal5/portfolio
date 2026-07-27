import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import VideoLightbox from '../components/VideoLightbox'
import { featured, shorts, thumbUrl } from '../data/videos'

function VideoCard({ video, onOpen, isShort = false }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(video)}
      className="group relative block w-full bg-zinc-950 rounded-xl overflow-hidden border border-white/10 text-left cursor-pointer transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20"
      style={{ aspectRatio: isShort ? '9 / 16' : '16 / 9' }}
    >
      {/* Thumbnail */}
      <img
        src={thumbUrl(video.id)}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:bg-white group-hover:text-black"
        >
          <Play size={18} className="translate-x-[1px]" fill="currentColor" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-zinc-200 backdrop-blur-md mb-2 border border-white/10">
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
    <section id="work" className="py-24 px-6 bg-[#000000] relative text-center">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-indigo-400 font-semibold mb-3">
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            Featured Projects & Works.
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto font-normal">
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
