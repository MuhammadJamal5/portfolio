import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowDown, Link2, Mail } from 'lucide-react'
import PremiumButton from '../components/PremiumButton'
import Particles from '../components/Particles'
import SceneCanvas from '../components/three/SceneCanvas'
import FloatingFrames from '../components/three/FloatingFrames'
import { navClick } from '../utils/smoothScroll'

const roles = ['AI Motion Artist', 'Senior Video Editor', 'Motion Graphics Designer', 'Creative Technologist']

const stats = [
  { value: 3,  suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Videos / Month' },
  { value: 30, suffix: '%', label: 'Faster AI Pipeline' },
  { value: 8,  suffix: '+', label: 'Client Brands' },
]

function SplitName({ text, wordIndex, charDelay = 0.035 }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.12em', lineHeight: 1.08, perspective: '600px' }}>
      {text.split('').map((char, ci) => (
        <motion.span
          key={ci}
          initial={{ rotateX: -90, y: '30%', opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.75,
            delay: 0.25 + wordIndex * 0.18 + ci * charDelay,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - t, 4)
            setCount(Math.floor(ease * value))
            if (t < 1) requestAnimationFrame(tick)
            else setCount(value)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY       = useTransform(scrollYProgress, [0, 0.6], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0])
  const bgScale        = useTransform(scrollYProgress, [0, 1], [1, 1.14])

  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3200)
    return () => clearInterval(id)
  }, [])

  const spotlightRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 })
  const my = useSpring(rawY, { stiffness: 60, damping: 18 })

  const glow1X = useTransform(mx, v => v * 44)
  const glow1Y = useTransform(my, v => v * 30)
  const glow2X = useTransform(mx, v => v * -32)
  const glow2Y = useTransform(my, v => v * -24)
  const glow3X = useTransform(mx, v => v * 26)
  const glow3Y = useTransform(my, v => v * 20)

  const nameTiltX = useTransform(my, v => v * -10)
  const nameTiltY = useTransform(mx, v => v * 8)

  useEffect(() => {
    const hero = sectionRef.current
    if (!hero) return
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      rawX.set((e.clientX - r.left - r.width / 2) / r.width)
      rawY.set((e.clientY - r.top - r.height / 2) / r.height)
      if (spotlightRef.current) {
        const px = ((e.clientX - r.left) / r.width) * 100
        const py = ((e.clientY - r.top) / r.height) * 100
        spotlightRef.current.style.background = `radial-gradient(ellipse 50% 42% at ${px}% ${py}%, rgba(129,140,248,0.11) 0%, transparent 68%)`
      }
    }
    const onLeave = () => {
      rawX.set(0); rawY.set(0)
      if (spotlightRef.current) spotlightRef.current.style.background = 'none'
    }
    hero.addEventListener('mousemove', onMove, { passive: true })
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [rawX, rawY])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-bg"
    >
      {/* Floating glass "clip" frames — video-editor 3D focal element */}
      <SceneCanvas
        className="absolute pointer-events-none select-none"
        style={{
          right: '-4%', top: '50%', transform: 'translateY(-50%)',
          width: 'clamp(360px, 52vw, 820px)',
          height: 'clamp(420px, 78vh, 860px)',
          zIndex: 5,
        }}
        cameraZ={5.5}
        glow="rgba(139,92,246,0.2)"
      >
        <FloatingFrames />
      </SceneCanvas>

      <motion.div style={{ scale: bgScale }} className="absolute inset-0 pointer-events-none" aria-hidden />

      {/* Cursor spotlight — direct DOM update in onMove, no React re-render */}
      <div ref={spotlightRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Particles above overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <Particles />
      </div>

      {/* Ambient glows — parallax layers that follow the mouse */}
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ x: glow1X, y: glow1Y, background: 'radial-gradient(ellipse 110% 70% at 50% -8%, rgba(30,58,138,0.55) 0%, transparent 58%)', zIndex: 4 }} />
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ x: glow2X, y: glow2Y, background: 'radial-gradient(ellipse 65% 50% at 8% 55%, rgba(67,56,202,0.22) 0%, transparent 62%)', zIndex: 4 }} />
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ x: glow3X, y: glow3Y, background: 'radial-gradient(ellipse 48% 40% at 92% 65%, rgba(157,23,77,0.15) 0%, transparent 55%)', zIndex: 4 }} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ background: '#818cf8' }}
          />
          <span className="label">Available for projects — Cairo, Egypt</span>
        </motion.div>

        {/* Name */}
        <motion.div
          className="mb-8"
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontWeight: 900,
            rotateX: nameTiltX,
            rotateY: nameTiltY,
            transformPerspective: 1400,
          }}
        >
          <h1
            className="text-[clamp(58px,10.5vw,148px)] text-white tracking-[-0.03em] leading-none"
            style={{ fontFamily: 'inherit', fontWeight: 'inherit' }}
          >
            <SplitName text="Muhammed" wordIndex={0} charDelay={0.038} />
            <SplitName text="Jamal" wordIndex={1} charDelay={0.045} />
          </h1>
        </motion.div>

        {/* Role cycler */}
        <div className="mb-12 h-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              exit   ={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <div
                className="shrink-0 w-1 h-8 rounded-full"
                style={{ background: 'linear-gradient(to bottom, #60a5fa, #818cf8, #c084fc)' }}
              />
              <span
                className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.01em' }}
              >
                {roles[roleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg max-w-xl leading-relaxed mb-14"
          style={{ color: 'rgba(148,163,184,0.85)' }}
        >
          Psychology-driven storytelling meets cutting-edge AI production.{' '}
          I craft content that makes audiences{' '}
          <em className="not-italic font-semibold" style={{ color: '#e2e8f0' }}>stop scrolling</em>{' '}
          and brands{' '}
          <em className="not-italic font-semibold" style={{ color: '#e2e8f0' }}>impossible to ignore</em>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4 mb-24"
        >
          <PremiumButton
            as="a"
            href="#work"
            onClick={e => navClick(e, '#work')}
            className="px-8 py-4 text-sm"
            icon={
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <ArrowDown size={15} />
              </motion.span>
            }
          >
            View My Work
          </PremiumButton>

          <PremiumButton
            as="a"
            variant="ghost"
            href="mailto:mg32871@gmail.com"
            className="px-8 py-4 text-sm"
          >
            <Mail size={15} /> Let's Talk
          </PremiumButton>

          <PremiumButton
            as="a"
            variant="ghost"
            href="https://www.linkedin.com/in/muhammedjamalvfx/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-sm"
          >
            <Link2 size={15} /> LinkedIn
          </PremiumButton>

        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 flex flex-col gap-2 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.055)',
                border: '1px solid rgba(255,255,255,0.11)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(129,140,248,0.1)'; e.currentTarget.style.borderColor = 'rgba(129,140,248,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.11)' }}
            >
              <span
                className="font-black leading-none text-white"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(30px, 3.5vw, 42px)',
                }}
              >
                <AnimatedCounter value={value} suffix={suffix} />
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: 'rgba(203,213,225,0.85)', letterSpacing: '0.01em' }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <div className="w-px h-12 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, #818cf8, transparent)' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <span className="label" style={{ color: 'rgba(100,116,139,0.4)', fontSize: 10 }}>scroll</span>
      </motion.div>
    </section>
  )
}
