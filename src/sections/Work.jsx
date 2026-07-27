import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { SectionLabel } from './About'
import VideoLightbox from '../components/VideoLightbox'
import { featured, shorts, thumbUrl } from '../data/videos'

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

function PlayBadge({ size = 56 }) {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size, height: size,
        background: 'linear-gradient(120deg, #7c3aed, #ec4899)',
        boxShadow: '0 10px 30px -8px rgba(168,85,247,0.7)',
      }}
      initial={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <Play size={size * 0.38} className="text-white translate-x-[1px]" fill="white" />
    </motion.div>
  )
}

function VideoCard({ video, i, onOpen, short = false }) {
  return (
    <motion.button
      variants={rise}
      custom={i}
      onClick={() => onOpen(video)}
      className="group relative block w-full overflow-hidden rounded-2xl text-left cursor-pointer"
      style={{
        aspectRatio: short ? '9 / 16' : '16 / 9',
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0a0a14',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* thumbnail */}
      <img
        src={thumbUrl(video.id)}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* gradient scrim */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.92) 0%, rgba(5,5,10,0.15) 45%, rgba(5,5,10,0.35) 100%)' }}
      />
      {/* play badge */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="opacity-85 group-hover:opacity-100 transition-opacity">
          <PlayBadge size={short ? 46 : 60} />
        </div>
      </div>
      {/* meta */}
      <div className="absolute left-0 right-0 bottom-0 p-5">
        <span
          className="inline-block mb-2 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase"
          style={{ background: 'rgba(167,139,250,0.16)', color: '#c4b5fd', border: '1px solid rgba(167,139,250,0.25)' }}
        >
          {video.category}
        </span>
        <h3 className="text-white font-bold leading-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: short ? 15 : 20 }}>
          {video.title}
        </h3>
      </div>
    </motion.button>
  )
}

export default function Work() {
  const [active, setActive] = useState(null)

  return (
    <section id="work" className="py-36 px-6 relative overflow-hidden" style={{ background: '#05050d' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(67,56,202,0.1) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel label="Selected Work" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(38px,6vw,76px)] font-black text-white leading-[0.95] tracking-tight mt-6 mb-4"
          style={{ fontFamily: 'Syne, Montserrat, sans-serif' }}
        >
          Work that <span className="shimmer-text">moves</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mb-16 leading-relaxed"
          style={{ color: 'rgba(148,163,184,0.85)' }}
        >
          Ads, brand films, and social reels — edited, graded, and AI-crafted. Click any piece to watch.
        </motion.p>

        {/* Featured landscape videos */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className={`grid gap-6 mb-8 ${featured.length > 1 ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'}`}
        >
          {featured.map((v, i) => (
            <VideoCard key={v.id} video={v} i={i} onOpen={setActive} />
          ))}
        </motion.div>

        {/* Shorts / reels grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {shorts.map((v, i) => (
            <VideoCard key={v.id} video={v} i={i} onOpen={setActive} short />
          ))}
        </motion.div>
      </div>

      <VideoLightbox video={active} onClose={() => setActive(null)} />
    </section>
  )
}
