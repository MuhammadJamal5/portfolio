import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Clapperboard, Brain, Code2, Globe } from 'lucide-react'
import CardSpotlight from '../components/CardSpotlight'
import SceneCanvas from '../components/three/SceneCanvas'
import Clapperboard3D from '../components/three/Clapperboard3D'

const cards = [
  {
    icon: Clapperboard,
    title: 'Video Mastery',
    text: 'Premiere Pro & After Effects expert — retention-focused pacing, color psychology, and storytelling across YouTube, Reels, and TikTok.',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
    from: 'from-violet-600/20',
    glow: 'rgba(124,58,237,0.2)',
  },
  {
    icon: Brain,
    title: 'AI Pipelines',
    text: 'End-to-end generative AI workflows with ComfyUI, HeyGen, ElevenLabs, and Veo 3 — character-consistent content at scale.',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
    from: 'from-pink-600/20',
    glow: 'rgba(219,39,119,0.2)',
  },
  {
    icon: Code2,
    title: 'Python & Dev',
    text: 'Leveling up with Python, Django, SQL, Supabase, and Linux — bridging creative work with backend automation and AI engineering.',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    from: 'from-cyan-600/20',
    glow: 'rgba(6,182,212,0.2)',
  },
  {
    icon: Globe,
    title: 'Multilingual',
    text: 'Arabic native, English professional. Dual-language lip-sync dubbing using HeyGen + ElevenLabs — backed by psychology of voice-face congruence.',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    from: 'from-emerald-600/20',
    glow: 'rgba(16,185,129,0.2)',
  },
]

const lines = [
  <>I'm a Cairo-based Video Editor and AI Visual Specialist with 3+ years producing high-impact content for finance, real estate, gaming, and social media brands.</>,
  <>My <span className="text-violet-400 font-semibold">Psychology background</span> sharpens my instinct for pacing, emotional storytelling, and viewer retention — translating audience behavior directly into editing decisions that keep people watching.</>,
  <>My edge: blending traditional editing craft with end-to-end AI generative pipelines — custom ComfyUI workflows, character-consistent AI scenes, and multilingual lip sync — content that scales without sacrificing quality.</>,
]

export function SectionLabel({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="h-px w-10 bg-gradient-to-r from-indigo-400 to-transparent" />
      <span className="text-indigo-400 text-xs font-semibold uppercase tracking-[0.3em]">{label}</span>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const leftX = useTransform(scrollYProgress, [0.1, 0.4], [-60, 0])
  const leftOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const rightX = useTransform(scrollYProgress, [0.15, 0.45], [60, 0])
  const rightOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])

  return (
    <section id="about" ref={sectionRef} className="py-36 px-6 relative overflow-hidden" style={{ background: '#05050d' }}>
      {/* Morphing blob background */}
      <SceneCanvas
        className="absolute pointer-events-none select-none"
        style={{ right: 0, top: '50%', transform: 'translateY(-50%)', width: '42%', height: '110%', opacity: 0.5, zIndex: 0 }}
      >
        <Clapperboard3D color="#818cf8" scale={1.05} />
      </SceneCanvas>
      {/* Scroll-driven bg glow */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0.1, 0.4], [0, 1]),
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(109,40,217,0.06) 0%, transparent 70%)',
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel label="About Me" />

        <div className="grid lg:grid-cols-2 gap-20 items-start mt-8">
          {/* Text — slides from left */}
          <motion.div style={{ x: leftX, opacity: leftOpacity }}>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
              Where creativity meets{' '}
              <span className="animate-text-shimmer">artificial intelligence</span>
            </h2>

            <div className="space-y-5">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="text-slate-400 text-base leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {['Cairo, Egypt', 'Open to Remote', 'Arabic · English', 'Finance · Gaming · Real Estate'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full glass border border-white/10 text-slate-400 text-sm hover:border-violet-500/30 hover:text-slate-200 transition-all duration-300">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Cards — slide from right, each staggers on scroll */}
          <motion.div style={{ x: rightX, opacity: rightOpacity }} className="grid grid-cols-2 gap-4">
            {cards.map(({ icon: Icon, title, text, border, iconColor, from, glow }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className={`p-5 rounded-2xl bg-gradient-to-br ${from} to-transparent border ${border} relative overflow-hidden group cursor-default`}
              >
                <CardSpotlight color={`${glow.replace('0.2', '0.12')}`} />
                <Icon className={`${iconColor} mb-3 relative z-10`} size={24} />
                <h3 className="text-white font-bold text-sm mb-2" style={{ position: 'relative', zIndex: 2 }}>{title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed" style={{ position: 'relative', zIndex: 2 }}>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
