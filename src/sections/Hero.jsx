import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import SceneCanvas from '../components/three/SceneCanvas'
import FloatingFrames from '../components/three/FloatingFrames'
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
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-6 px-4 sm:px-6 overflow-hidden bg-[#000000] text-center"
    >
      {/* 3D Floating Glass Frames Canvas - High-End $10k Visual Feature */}
      <SceneCanvas
        className="absolute pointer-events-none select-none inset-0 opacity-40 sm:opacity-75 transition-opacity"
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        cameraZ={5.2}
        glow="rgba(99,102,241,0.2)"
      >
        <FloatingFrames />
      </SceneCanvas>

      {/* Ambient background lighting */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 15%, rgba(99, 102, 241, 0.22) 0%, transparent 65%)',
          zIndex: 2,
        }}
      />

      {/* Top Text Content */}
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Eyebrow Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-medium mb-6 backdrop-blur-md"
        >
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] tracking-wider uppercase">
            2026
          </span>
          <span className="font-medium tracking-wide">Next-Gen AI & Video Studio</span>
        </motion.div>

        {/* Refined Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.12] max-w-3xl mb-5"
        >
          AI–Driven Video Production <br />
          <span className="text-white font-semibold">Redefining Storytelling.</span>
        </motion.h1>

        {/* Dynamic Animated Role Badge */}
        <div className="mb-6 h-9 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 backdrop-blur-md"
            >
              <Sparkles size={13} className="text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs sm:text-sm font-semibold text-indigo-200">
                {roles[roleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-8"
        >
          Psychology-driven storytelling meets cutting-edge AI production. <br className="hidden sm:inline" />
          Crafting high-converting brand films and viral social reels.
        </motion.p>
      </div>

      {/* EXACT NUBIEN CURVED NEON DOME CONTAINER (Encapsulating Buttons + Arch Border + Marquee) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-5xl mx-auto w-full pt-10 pb-6 rounded-t-[100px] sm:rounded-t-[180px] border-t border-indigo-400/40 bg-gradient-to-b from-indigo-950/50 via-black/90 to-black shadow-[0_-15px_40px_rgba(99,102,241,0.3)] flex flex-col items-center justify-between z-10 backdrop-blur-md"
      >
        {/* Glowing Arch Curve Lighting Effect */}
        <div
          className="absolute inset-0 rounded-t-[100px] sm:rounded-t-[180px] pointer-events-none animate-dome-glow"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Hero Action Buttons - Floating INSIDE the curved arch */}
        <div className="flex flex-row items-center justify-center gap-4 mb-10 relative z-10">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            onClick={e => navClick(e, '#contact')}
            className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-100 transition-all shadow-xl shadow-white/10 flex items-center gap-1.5 group"
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#about"
            onClick={e => navClick(e, '#about')}
            className="px-7 py-3.5 rounded-full bg-indigo-600/30 border border-indigo-500/50 text-indigo-100 font-semibold text-xs sm:text-sm hover:bg-indigo-600/60 transition-all backdrop-blur-md shadow-lg shadow-indigo-600/25"
          >
            <span>About My Craft</span>
          </motion.a>
        </div>

        {/* 100% Animated Continuous Sliding Marquee */}
        <div className="relative z-10 w-full overflow-hidden py-2 border-t border-white/10">
          <div className="animate-marquee">
            {[...techLogos, ...techLogos, ...techLogos].map((tool, i) => (
              <div key={i} className="flex items-center gap-3 px-6 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-bold tracking-widest text-zinc-300 uppercase">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
