import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PremiumButton from './PremiumButton'

const QUOTE = ['Every', 'frame', 'is', 'a', 'decision.', 'Every', 'cut,', 'a', 'heartbeat.']

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | ready | exiting

  useEffect(() => {
    const duration = 2000
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.floor(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setProgress(100)
        setTimeout(() => setPhase('ready'), 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleEnter = () => {
    setPhase('exiting')
    setTimeout(() => onDone(), 850)
  }

  return (
    <AnimatePresence>
      {phase !== 'exiting' ? (
        <motion.div
          key="loader"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#050508] select-none overflow-hidden"
        >
          {/* ambient radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(109,40,217,0.16) 0%, transparent 65%)' }}
          />

          {/* corner framing */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((c, i) => (
            <div key={i} className={`absolute w-12 h-12 ${c}`} style={{ borderColor: 'rgba(129,140,248,0.22)' }} />
          ))}

          <AnimatePresence mode="wait">
            {phase === 'loading' ? (
              /* ── LOADING: camera-lens aperture + counter ── */
              <motion.div
                key="loading"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                className="relative flex flex-col items-center"
              >
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* outer rotating lens ring */}
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(129,140,248,0.14)" strokeWidth="1" />
                    {Array.from({ length: 8 }).map((_, i) => {
                      const a = (i / 8) * Math.PI * 2
                      return (
                        <line
                          key={i}
                          x1={50 + Math.cos(a) * 40} y1={50 + Math.sin(a) * 40}
                          x2={50 + Math.cos(a) * 46} y2={50 + Math.sin(a) * 46}
                          stroke="rgba(167,139,250,0.5)" strokeWidth="1.4" strokeLinecap="round"
                        />
                      )
                    })}
                  </motion.svg>

                  {/* progress arc */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50" cy="50" r="38" fill="none"
                      stroke="url(#gp)" strokeWidth="2.5" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 38}
                      strokeDashoffset={2 * Math.PI * 38 * (1 - progress / 100)}
                    />
                    <defs>
                      <linearGradient id="gp" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="50%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* counter-rotating inner blades (aperture) */}
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    {Array.from({ length: 6 }).map((_, i) => {
                      const a = (i / 6) * Math.PI * 2
                      return (
                        <line
                          key={i}
                          x1="50" y1="50"
                          x2={50 + Math.cos(a) * 26} y2={50 + Math.sin(a) * 26}
                          stroke="rgba(129,140,248,0.16)" strokeWidth="1"
                        />
                      )
                    })}
                  </motion.svg>

                  <span
                    className="relative font-black text-3xl text-white"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    MJ
                  </span>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <span className="label" style={{ color: 'rgba(100,116,139,0.85)' }}>
                    Loading Experience
                  </span>
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: 'rgba(167,139,250,0.85)', minWidth: '3ch' }}
                  >
                    {progress}%
                  </span>
                </div>
              </motion.div>
            ) : (
              /* ── READY: quote + Enter button ── */
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative flex flex-col items-center px-6 text-center"
              >
                <motion.p
                  className="label mb-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ color: 'rgba(167,139,250,0.8)' }}
                >
                  Muhammed Jamal — AI Motion Artist
                </motion.p>

                <h2
                  className="max-w-2xl text-[clamp(26px,4.2vw,52px)] font-bold leading-[1.15] text-white mb-12"
                  style={{ fontFamily: 'Syne, Montserrat, sans-serif' }}
                >
                  {QUOTE.map((w, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.28em]"
                      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w === 'decision.' || w === 'heartbeat.' ? (
                        <span className="shimmer-text">{w}</span>
                      ) : (
                        w
                      )}
                    </motion.span>
                  ))}
                </h2>

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15 + QUOTE.length * 0.07 + 0.15, type: 'spring', stiffness: 200, damping: 18 }}
                >
                  {/* soft pulsing halo behind the button */}
                  <motion.div
                    className="relative"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <PremiumButton
                      as="button"
                      onClick={handleEnter}
                      className="px-11 py-5 text-base tracking-wide"
                      icon={<ArrowRight size={18} />}
                    >
                      Enter Site
                    </PremiumButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* bottom progress bar (loading only) */}
          {phase === 'loading' && (
            <motion.div
              style={{
                scaleX: progress / 100, originX: 0, transformOrigin: 'left',
                background: 'linear-gradient(90deg, #3730a3, #6d28d9, #be185d, #f472b6)',
              }}
              className="absolute bottom-0 left-0 right-0 h-[2px]"
            />
          )}
        </motion.div>
      ) : (
        /* exit curtain wipe */
        <motion.div
          key="curtain"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] bg-[#050508]"
        />
      )}
    </AnimatePresence>
  )
}
