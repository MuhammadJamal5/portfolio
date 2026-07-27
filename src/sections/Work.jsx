import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowUpRight } from 'lucide-react'
import VideoLightbox from '../components/VideoLightbox'
import { featured, shorts, thumbUrl } from '../data/videos'

function VideoCard({ video, onOpen, isShort = false }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(video)}
      className="group relative block w-full nubien-card overflow-hidden text-left cursor-pointer"
      style={{ aspectRatio: isShort ? '9 / 16' : '16 / 9' }}
    >
      {/* Thumbnail */}
      <img
        src={thumbUrl(video.id)}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.2) 50%, rgba(8,8,12,0.4) 100%)',
        }}
      />

      {/* Play Icon Badge */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
          <Play size={20} className="translate-x-[1px]" fill="currentColor" />
        </div>
      </div>

      {/* Video Info Bottom Meta */}
      <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-6 flex flex-col gap-2">
        <span className="inline-self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/10 text-white backdrop-blur-md border border-white/15 w-fit">
          {video.category}
        </span>
        <h3 className="text-white font-bold text-lg sm:text-xl leading-snug">
          {video.title}
        </h3>
      </div>
    </motion.button>
  )
}

export default function Work() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section id="work" className="py-28 px-4 sm:px-8 relative bg-[#08080c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="nubien-badge mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>SELECTED WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              PROVEN COMMERCIAL & CREATIVE OUTPUT.
            </h2>
          </div>
          <p className="max-w-md text-zinc-400 text-sm leading-relaxed">
            From high-converting SaaS product demos to narrative brand films and viral social reels. Click any piece to play.
          </p>
        </div>

        {/* Featured 16:9 Landscape Videos Grid */}
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
