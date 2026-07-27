import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionLabel } from './About'
import Marquee from '../components/Marquee'
import SceneCanvas from '../components/three/SceneCanvas'
import GlowOrb from '../components/three/GlowOrb'

const stack = [
  {
    category: 'Video & Motion',
    accent: '#a78bfa',
    rgb: '167,139,250',
    tools: ['Adobe Premiere Pro', 'After Effects', 'Motion Graphics', 'Color Grading', 'Compositing', 'Remotion'],
  },
  {
    category: 'AI & Generative',
    accent: '#f472b6',
    rgb: '244,114,182',
    tools: ['ComfyUI', 'Freepik AI (Magnific)', 'HeyGen', 'ElevenLabs', 'Veo 3', 'Kling 2.6', 'OpenArt'],
  },
  {
    category: 'Cloud & Platforms',
    accent: '#67e8f9',
    rgb: '103,232,249',
    tools: ['Google Vertex AI', 'Google Cloud', 'Prompt Engineering', 'LLM Integration'],
  },
  {
    category: 'Dev & Automation',
    accent: '#4ade80',
    rgb: '74,222,128',
    tools: ['Python', 'Django', 'SQL', 'Git & GitHub', 'Linux CLI', 'Supabase'],
  },
]

const highlights = [
  { value: '3+', label: 'Years in production' },
  { value: '10+', label: 'Tools mastered' },
  { value: '2', label: 'Languages' },
]

export default function Skills() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0.05, 0.22], [50, 0])
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1])

  return (
    <section id="skills" ref={sectionRef} className="py-36 px-6 relative overflow-hidden" style={{ background: '#07070f' }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(109,40,217,0.05) 0%, transparent 65%)'
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel label="Stack" />

        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Tools I <span className="animate-text-shimmer">trust</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-md">
            Creative + technical stack spanning editing, AI generation, cloud, and dev automation.
          </p>
        </motion.div>

        {/* Stack grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {stack.map(({ category, accent, rgb, tools }, gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: gi * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: `rgba(${rgb},0.04)`,
                border: `1px solid rgba(${rgb},0.14)`,
              }}
            >
              {/* Category label */}
              <p className="text-xs font-bold uppercase tracking-[0.28em] mb-5" style={{ color: accent }}>
                {category}
              </p>

              {/* Tool badges */}
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, ti) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.07 + ti * 0.04 }}
                    whileHover={{ scale: 1.07, y: -2, transition: { duration: 0.18 } }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium cursor-default select-none"
                    style={{
                      background: `rgba(${rgb},0.08)`,
                      border: `1px solid rgba(${rgb},0.2)`,
                      color: 'rgba(226,232,240,0.85)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `rgba(${rgb},0.16)`
                      e.currentTarget.style.borderColor = `rgba(${rgb},0.4)`
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `rgba(${rgb},0.08)`
                      e.currentTarget.style.borderColor = `rgba(${rgb},0.2)`
                      e.currentTarget.style.color = 'rgba(226,232,240,0.85)'
                    }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>

              {/* Subtle corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{
                background: `radial-gradient(circle, rgba(${rgb},0.1) 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }} />
            </motion.div>
          ))}
        </div>

        {/* Quick highlights strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-4"
        >
          {highlights.map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2 px-5 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-2xl font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{value}</span>
              <span className="text-slate-500 text-xs">{label}</span>
            </div>
          ))}
          <div className="flex items-baseline gap-2 px-5 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-2xl font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Arabic</span>
            <span className="text-slate-500 text-xs mx-1">+</span>
            <span className="text-2xl font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>English</span>
          </div>
        </motion.div>

        {/* 3D tag sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-10 rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '16/7' }}
        >
          <SceneCanvas className="absolute inset-0" style={{ width: '100%', height: '100%' }} cameraZ={4.5}>
            <GlowOrb />
          </SceneCanvas>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(109,40,217,0.06) 0%, transparent 65%)'
          }} />
        </motion.div>

        {/* Marquee */}
        <Marquee />
      </div>
    </section>
  )
}
