import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles, Film, Cpu, Zap, Play } from 'lucide-react'
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
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-12 px-6 overflow-hidden bg-[#000000] text-center"
    >
      {/* Dynamic Animated Ambient Background Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 15%, rgba(99, 102, 241, 0.25) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center my-auto">
        {/* Animated Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-medium animate-border-pulse">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] tracking-wider uppercase">
              2026
            </span>
            <span className="font-semibold tracking-wide">Next-Gen AI & Video Studio</span>
          </div>
        </motion.div>

        {/* Main Animated Montserrat Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.02] max-w-4xl mb-6"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          AI–Driven Video Production <br />
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-[length:200%_auto]"
          >
            Redefining Storytelling.
          </motion.span>
        </motion.h1>

        {/* Dynamic Role Cycler */}
        <div className="mb-6 h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-sm sm:text-base font-bold text-indigo-200 tracking-wide">
                {roles[roleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-2xl text-base sm:text-lg text-zinc-400 font-medium leading-relaxed mb-10"
        >
          Psychology-driven storytelling meets cutting-edge AI production. <br className="hidden sm:inline" />
          Crafting high-converting brand films and viral social reels.
        </motion.p>

        {/* Dynamic Interactive Hero Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-row items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            onClick={e => navClick(e, '#work')}
            className="px-8 py-4 rounded-full bg-white text-black font-extrabold text-sm hover:bg-zinc-100 transition-all shadow-xl shadow-white/10 flex items-center gap-2 group"
          >
            <span>Connect With Us</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#about"
            onClick={e => navClick(e, '#about')}
            className="px-8 py-4 rounded-full bg-indigo-600/30 border border-indigo-500/50 text-indigo-100 font-bold text-sm hover:bg-indigo-600/60 transition-all backdrop-blur-md shadow-lg shadow-indigo-600/25 flex items-center gap-2"
          >
            <span>What is Studio?</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Dynamic Animated Glowing Neon Dome & Infinite Marquee */}
      <div className="relative w-full max-w-6xl mx-auto pt-16 pb-4 z-10">
        {/* Animated Curved Glowing Arch/Dome */}
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[200px] rounded-t-[100%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% 100%, rgba(99, 102, 241, 0.5) 0%, rgba(139, 92, 246, 0.3) 45%, transparent 78%)',
            borderTop: '1px solid rgba(165, 180, 252, 0.4)',
            boxShadow: '0 -20px 60px rgba(99, 102, 241, 0.3)',
          }}
        />

        {/* Dynamic Infinite Sliding Marquee for Tool Stack */}
        <div className="relative z-10 overflow-hidden w-full py-4">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-12 whitespace-nowrap w-max opacity-70 hover:opacity-100 transition-opacity"
          >
            {[...techLogos, ...techLogos].map((tool, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-zinc-300 uppercase">
                  {tool}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
