import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { navClick } from '../utils/smoothScroll'

const roles = [
  'AI Motion Artist',
  'Senior Video Editor',
  'Motion Graphics Designer',
  'Creative Technologist',
]

const techLogos = [
  'PREMIERE PRO',
  'AFTER EFFECTS',
  'COMFYUI AI',
  'RUNWAY GEN-3',
  'ELEVENLABS',
  'DAVINCI RESOLVE',
  'HEYGEN LIPSYNC',
  'MIDJOURNEY V6',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-6 px-4 sm:px-6 overflow-hidden bg-[#06060a] text-center"
    >
      {/* Fusion AI & Recon Ambient Background Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 15%, rgba(99, 102, 241, 0.25) 0%, transparent 65%)',
        }}
      />

      {/* Top Content Container */}
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Dream Motion & Confezence Staggered Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          className="vizer-badge mb-6 cursor-default"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>AI MOTION & VIDEO PRODUCTION</span>
        </motion.div>

        {/* Dream Motion Word-by-Word Title Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-3xl mb-5"
        >
          AI–Driven Video Production <br />
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 font-bold bg-[length:200%_auto]"
          >
            Redefining Storytelling.
          </motion.span>
        </motion.h1>

        {/* Dynamic Animated Role Badge with Spring Physics */}
        <div className="mb-6 h-9 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 12, rotateX: -20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, rotateX: 20, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/40 backdrop-blur-md shadow-lg shadow-indigo-600/20"
            >
              <Sparkles size={13} className="text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs sm:text-sm font-semibold text-indigo-200">
                {roles[roleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-sm sm:text-base text-slate-400 font-normal leading-relaxed mb-8"
        >
          Psychology-driven storytelling meets cutting-edge AI production. <br className="hidden sm:inline" />
          Crafting high-converting brand films and viral social reels.
        </motion.p>
      </div>

      {/* CURVED NEON DOME CONTAINER (Confezence 3D Physics + Loop Marquee) */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl mx-auto w-full pt-10 pb-6 rounded-t-[100px] sm:rounded-t-[180px] border-t border-indigo-500/40 bg-gradient-to-b from-indigo-950/45 via-[#06060a] to-[#06060a] shadow-[0_-15px_40px_rgba(99,102,241,0.3)] flex flex-col items-center justify-between"
      >
        {/* Glowing Arch Curve Lighting Effect */}
        <div
          className="absolute inset-0 rounded-t-[100px] sm:rounded-t-[180px] pointer-events-none animate-dome-glow"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Confezence Style Interactive 3D Tilt Buttons */}
        <div className="flex flex-row items-center justify-center gap-4 mb-10 relative z-10">
          <motion.a
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            href="#contact"
            onClick={e => navClick(e, '#contact')}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-xl shadow-white/10 flex items-center gap-1.5 group"
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            href="#about"
            onClick={e => navClick(e, '#about')}
            className="px-8 py-4 rounded-full bg-indigo-600/30 border border-indigo-500/50 text-indigo-100 font-semibold text-xs sm:text-sm hover:bg-indigo-600/60 transition-all backdrop-blur-md shadow-lg shadow-indigo-600/25"
          >
            <span>About My Craft</span>
          </motion.a>
        </div>

        {/* Loop Template Infinite Sliding Marquee */}
        <div className="relative z-10 w-full overflow-hidden py-2 border-t border-white/10">
          <div className="animate-marquee">
            {[...techLogos, ...techLogos, ...techLogos].map((tool, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, color: '#ffffff' }}
                className="flex items-center gap-3 px-6 whitespace-nowrap cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase transition-colors">
                  {tool}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
