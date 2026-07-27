import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import CardSpotlight from '../components/CardSpotlight'
import SceneCanvas from '../components/three/SceneCanvas'
import PlayButton3D from '../components/three/PlayButton3D'
import Clapperboard3D from '../components/three/Clapperboard3D'

const cert = {
  title: 'Google AI Professional Certificate',
  issuer: 'Google',
  date: 'Jun 2026',
  id: 'SN94JWMOLEGV',
  desc: 'Comprehensive certification in Generative AI, Prompt Engineering, and AI Application Development — issued by Google.',
  skills: ['Generative AI', 'Prompt Engineering', 'App Building with AI', 'LLM Integration'],
}

export default function Certifications() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY      = useTransform(scrollYProgress, [0.05, 0.25], [60, 0])
  const titleOp     = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])

  return (
    <section id="certifications" ref={sectionRef} className="py-36 px-6 relative overflow-hidden" style={{ background: '#05050d' }}>
      {/* 3D video motifs: play button left, clapperboard right */}
      <SceneCanvas
        className="absolute pointer-events-none select-none"
        style={{ left: '-8%', top: '50%', transform: 'translateY(-50%)', width: '40%', height: '90%', opacity: 0.4, zIndex: 0 }}
      >
        <PlayButton3D color="#67e8f9" scale={1.1} />
      </SceneCanvas>
      <SceneCanvas
        className="absolute pointer-events-none select-none"
        style={{ right: '-6%', top: '42%', width: '36%', height: '70%', opacity: 0.5, zIndex: 0 }}
      >
        <Clapperboard3D color="#c084fc" scale={1.0} />
      </SceneCanvas>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 65% at 60% 50%, rgba(109,40,217,0.1) 0%, transparent 70%)',
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="text-violet-400 text-xs font-semibold uppercase tracking-[0.3em]">Credentials</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500" />
        </div>

        <motion.div style={{ y: titleY, opacity: titleOp }} className="mb-14">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Always{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              learning.
            </span>
          </h2>
        </motion.div>

        {/* ── Google AI cert — full-width hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
          className="relative rounded-3xl overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #0e0030 0%, #1c0050 35%, #0e0025 65%, #1a0040 100%)',
            border: '1px solid rgba(167,139,250,0.28)',
          }}
        >
          <CardSpotlight color="rgba(167,139,250,0.06)" radius={600} />

          {/* Corner glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(109,40,217,0.45) 0%, transparent 55%)',
            filter: 'blur(70px)',
          }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(219,39,119,0.22) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }} />

          {/* Animated scan line */}
          <motion.div
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            className="absolute inset-x-0 h-[1.5px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.55), transparent)', zIndex: 2 }}
          />

          <div className="relative z-10 p-10 md:p-16">
            {/* Header row */}
            <div className="flex items-start justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)' }}>
                  <BadgeCheck size={26} style={{ color: '#a78bfa' }} />
                </div>
                <div>
                  <span className="text-violet-400 text-xs font-bold uppercase tracking-[0.3em] block mb-0.5">
                    Verified · {cert.issuer}
                  </span>
                  <span className="text-slate-500 text-xs">{cert.date}</span>
                </div>
              </div>

              {/* Rotating ring ornament */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="hidden md:block relative w-20 h-20 shrink-0 pointer-events-none"
              >
                <div className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: 'rgba(167,139,250,0.14)', borderStyle: 'dashed' }} />
                <div className="absolute inset-3 rounded-full border"
                  style={{ borderColor: 'rgba(167,139,250,0.08)', borderStyle: 'dashed' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(167,139,250,0.25)' }} />
                </div>
              </motion.div>
            </div>

            {/* Title */}
            <h3
              className="text-3xl md:text-5xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {cert.title}
            </h3>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10" style={{ maxWidth: '640px' }}>
              {cert.desc}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {cert.skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.28)', color: '#a78bfa' }}
                >
                  {s}
                </motion.span>
              ))}
            </div>

            {/* Divider row */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 pt-8"
              style={{ borderTop: '1px solid rgba(167,139,250,0.1)' }}
            >
              <p className="font-mono text-xs" style={{ color: 'rgba(167,139,250,0.4)' }}>
                CREDENTIAL ID: {cert.id}
              </p>
              <a
                href="https://www.linkedin.com/in/muhammedjamalvfx/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
                style={{ color: 'rgba(167,139,250,0.55)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(167,139,250,0.55)'}
              >
                <ExternalLink size={14} />
                View all on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
