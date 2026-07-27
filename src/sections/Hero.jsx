import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { navClick } from '../utils/smoothScroll'

const techLogos = [
  { name: 'Premiere Pro', label: 'PREMIERE' },
  { name: 'After Effects', label: 'AFTER EFFECTS' },
  { name: 'ComfyUI', label: 'COMFYUI' },
  { name: 'Runway', label: 'RUNWAY GEN-3' },
  { name: 'ElevenLabs', label: 'ELEVENLABS' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-12 px-6 overflow-hidden bg-[#000000] text-center"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center my-auto">
        {/* Eyebrow Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-medium mb-8"
        >
          <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px]">
            2026
          </span>
          <span>Next-Gen AI & Video Studio</span>
        </motion.div>

        {/* Main Nubien Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.08] max-w-4xl mb-6"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          AI–Driven Video Production <br />
          <span className="text-white">Redefining Storytelling.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mb-10"
        >
          Psychology-driven storytelling meets cutting-edge AI production. <br className="hidden sm:inline" />
          Engineering high-converting brand films and viral social reels.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            onClick={e => navClick(e, '#work')}
            className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-xl"
          >
            Connect With Us
          </a>

          <a
            href="#about"
            onClick={e => navClick(e, '#about')}
            className="px-7 py-3.5 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 font-semibold text-sm hover:bg-indigo-600/50 transition-all backdrop-blur-md shadow-lg shadow-indigo-600/20"
          >
            What is Studio?
          </a>
        </motion.div>
      </div>

      {/* Hero Bottom Glowing Neon Dome & Logo Bar */}
      <div className="relative w-full max-w-5xl mx-auto pt-16 pb-4 z-10">
        {/* Curved Glowing Arch/Dome (Exact match to Nubien screenshot) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[180px] rounded-t-[100%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.25) 45%, transparent 75%)',
            borderTop: '1px solid rgba(165, 180, 252, 0.35)',
            boxShadow: '0 -20px 50px rgba(99, 102, 241, 0.2)',
          }}
        />

        {/* Partner Logos Strip */}
        <div className="relative z-10 flex items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          {techLogos.map(logo => (
            <span
              key={logo.name}
              className="text-xs sm:text-sm font-bold tracking-widest text-zinc-400 uppercase"
            >
              {logo.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
