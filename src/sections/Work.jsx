import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import VideoLightbox from '../components/VideoLightbox'
import { featured, shorts, thumbUrl } from '../data/videos'

function VideoCard({ video, onOpen, isShort = false }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={() => onOpen(video)}
      className="group relative block w-full bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 text-left cursor-pointer transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
      style={{ aspectRatio: isShort ? '9 / 16' : '16 / 9' }}
    >
      <img
        src={thumbUrl(video.id)}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <Play size={18} className="translate-x-[1px]" fill="currentColor" />
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-5">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white backdrop-blur-md mb-2 border border-white/10">
          {video.category}
        </span>
        <h3 className="text-white font-semibold text-base sm:text-lg leading-snug">
          {video.title}
        </h3>
      </div>
    </motion.button>
  )
}

export default function Work() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section id="work" className="py-28 px-6 bg-[#000000] relative text-center">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-indigo-400 font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-4">
            Featured Projects & Works.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            High-impact brand films, SaaS demos, and viral social reels engineered for conversion.
          </p>
        </div>

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
