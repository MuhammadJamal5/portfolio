import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Sparkles, Film, Cpu, Zap, Radio } from 'lucide-react'
import { navClick } from '../utils/smoothScroll'

const techStack = [
  'Premiere Pro',
  'After Effects',
  'ComfyUI',
  'Runway Gen-3',
  'ElevenLabs AI',
  'DaVinci Resolve',
  'HeyGen LipSync',
  'Midjourney v6',
]

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Videos / Month' },
  { value: '30%', label: 'Faster AI Pipeline' },
  { value: '8+', label: 'Global Brands' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center pt-32 pb-20 px-4 sm:px-8 overflow-hidden nubien-grid-bg"
    >
      {/* Background ambient radial gradients */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 800px at 50% 20%, rgba(99,102,241,0.12), transparent 70%), radial-gradient(circle 600px at 80% 70%, rgba(168,85,247,0.06), transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="nubien-badge">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI MOTION ARTIST & SENIOR VIDEO EDITOR</span>
          </div>
        </motion.div>

        {/* Main Massive Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.98] text-white">
            CRAFTING HIGH-IMPACT{' '}
            <span className="nubien-text-glow">AI MOTION & VIDEO</span> PRODUCTIONS.
          </h1>
        </motion.div>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-xl text-zinc-400 leading-relaxed mb-10 font-normal"
        >
          Psychology-driven storytelling meets cutting-edge generative AI. Crafting high-converting brand films, SaaS demos, and viral social spots engineered to stop the scroll.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16"
        >
          <a
            href="#work"
            onClick={e => navClick(e, '#work')}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-lg group"
          >
            <span>Explore Selected Work</span>
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="mailto:mg32871@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full nubien-card text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
          >
            <span>Let's Talk Project</span>
            <ArrowUpRight size={16} className="text-zinc-400" />
          </a>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 nubien-card mb-16"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-black text-white">{value}</span>
              <span className="text-xs text-zinc-400 font-medium">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Tech Stack Marquee Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-6 border-t border-white/10"
        >
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">
            Production Engine & AI Stack
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {techStack.map(tool => (
              <span
                key={tool}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
