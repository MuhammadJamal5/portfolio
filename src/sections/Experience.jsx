import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SceneCanvas from '../components/three/SceneCanvas'
import FilmStrip3D from '../components/three/FilmStrip3D'

const highlights = [
  { num: '3+', label: 'Years' },
  { num: '10+', label: 'Videos / Month' },
  { num: '30%', label: 'Faster with AI' },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const y      = useTransform(scrollYProgress, [0.05, 0.28], [70, 0])
  const opacity = useTransform(scrollYProgress, [0.05, 0.28], [0, 1])
  const sphereOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.85, 1], [0, 0.22, 0.22, 0])

  return (
    <section id="experience" ref={sectionRef} className="py-40 px-6 relative overflow-hidden" style={{ background: '#07070f' }}>
      {/* 3D elements */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ opacity: sphereOpacity, right: '-8%', top: '50%', transform: 'translateY(-50%)', width: '52%', height: '120%', zIndex: 0 }}
      >
        <SceneCanvas style={{ width: '100%', height: '100%' }}>
          <FilmStrip3D color="#f472b6" scale={0.85} />
        </SceneCanvas>
      </motion.div>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 15% 50%, rgba(124,58,237,0.07) 0%, transparent 65%)',
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="text-violet-400 text-xs font-semibold uppercase tracking-[0.3em]">Experience</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500" />
        </div>

        <motion.div style={{ y, opacity }}>
          {/* Main statement */}
          <h2
            className="text-5xl md:text-7xl font-black text-white leading-[1.03] tracking-tight mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: '760px' }}
          >
            I studied how{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              people think
            </span>
            {' '}so I could change how they{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f472b6 0%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              feel.
            </span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-16" style={{ maxWidth: '600px' }}>
            From a psychology degree in Cairo to 10+ monthly videos for investment brands —
            my edge is understanding what makes humans stop scrolling, then rebuilding that in AI-powered pipelines.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8 mb-16">
            {highlights.map(({ num, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col"
              >
                <span
                  className="font-black text-white leading-none"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)' }}
                >
                  {num}
                </span>
                <span className="text-slate-500 text-sm font-medium mt-1">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Current role — one clean line */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: '#a78bfa' }}
            />
            <p className="text-slate-300 text-sm md:text-base font-medium">
              Currently:{' '}
              <span className="text-white font-bold">Video Editor & Motion Graphics Artist</span>
              <span className="text-violet-400"> @ Keheilan Asset Management</span>
              <span className="text-slate-600"> · Cairo, Egypt</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
