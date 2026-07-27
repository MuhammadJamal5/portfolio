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

/* Dream Motion: staggered orchestration variants */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.15 },
  },
}

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const { scrollY } = useScroll()
  /* Dream Motion parallax: push content up as user scrolls */
  const heroY = useTransform(scrollY, [0, 600], [0, -80])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3])

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-32 md:pt-36 pb-6 px-4 sm:px-6 overflow-hidden bg-[#06060a] text-center"
    >
      {/* Fusion AI ambient radial glow — pulsing */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 12%, rgba(99,102,241,0.3) 0%, transparent 65%)' }}
      />

      {/* Dream Motion parallax-wrapped content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center"
      >
        {/* Fusion AI pulsing badge — Loop style continuous float */}
        <motion.div
          variants={itemUp}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.07 }}
          className="vizer-badge mb-7 cursor-default shadow-lg shadow-indigo-600/20"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-indigo-400"
          />
          <span>AI MOTION & VIDEO PRODUCTION</span>
        </motion.div>

        {/* Dream Motion character-reveal headline */}
        <motion.h1
          variants={itemUp}
          className="text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-3xl mb-5"
        >
          {'AI–Driven Video Production'.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 font-bold bg-[length:200%_auto]"
            >
              Redefining Storytelling.
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Confezence spring-physics role badge */}
        <motion.div variants={itemUp} className="mb-7 h-9 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 14, rotateX: -25, filter: 'blur(6px)', scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -14, rotateX: 25, filter: 'blur(6px)', scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/40 backdrop-blur-md shadow-lg shadow-indigo-600/20"
            >
              <Sparkles size={13} className="text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs sm:text-sm font-semibold text-indigo-200">{roles[roleIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemUp}
          className="max-w-xl px-2 sm:px-0 text-sm sm:text-base text-slate-400 font-normal leading-relaxed mb-9"
        >
          Psychology-driven storytelling meets cutting-edge AI production. <br className="hidden sm:inline" />
          Crafting high-converting brand films and viral social reels.
        </motion.p>
      </motion.div>

      {/* Dome arch container — NO 3D element, pure Framer Motion + CSS */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl mx-auto w-[95%] sm:w-full pt-10 pb-6 rounded-t-[100px] sm:rounded-t-[180px] border-t border-indigo-500/40 bg-gradient-to-b from-indigo-950/50 via-[#06060a] to-[#06060a] shadow-[0_-15px_50px_rgba(99,102,241,0.35)] flex flex-col items-center justify-between"
      >
        {/* Animated glow dome */}
        <div
          className="absolute inset-0 rounded-t-[100px] sm:rounded-t-[180px] pointer-events-none animate-dome-glow"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.18) 50%, transparent 80%)' }}
        />

        {/* Confezence spring-bounce buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 relative z-10">
          <motion.a
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            href="#contact"
            onClick={e => navClick(e, '#contact')}
            className="px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-black font-bold text-[11px] sm:text-sm hover:bg-slate-50 transition-colors shadow-xl shadow-white/10 flex items-center gap-1.5 group"
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            href="#about"
            onClick={e => navClick(e, '#about')}
            className="px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-indigo-600/30 border border-indigo-500/50 text-indigo-100 font-semibold text-[11px] sm:text-sm hover:bg-indigo-600/60 transition-colors backdrop-blur-md shadow-lg shadow-indigo-600/25"
          >
            <span>About My Craft</span>
          </motion.a>
        </div>

        {/* Loop template infinite marquee */}
        <div className="relative z-10 w-full overflow-hidden py-2 border-t border-white/10">
          <div className="animate-marquee">
            {[...techLogos, ...techLogos, ...techLogos].map((tool, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="flex items-center gap-3 px-3 sm:px-6 whitespace-nowrap cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase hover:text-white transition-colors">{tool}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
