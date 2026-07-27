import { useState, useRef, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)
  const gainRef = useRef(null)
  const oscsRef = useRef([])

  const toggle = useCallback(() => {
    if (!on) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctxRef.current = ctx

      const master = ctx.createGain()
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 2)
      master.connect(ctx.destination)
      gainRef.current = master

      // Rich ambient drone — 3 sine layers + subtle filter
      const freqs = [55, 110, 165.5]
      const gains = [0.5, 0.3, 0.2]
      oscsRef.current = freqs.map((freq, i) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        const g = ctx.createGain()
        g.gain.value = gains[i]

        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 800

        osc.connect(filter)
        filter.connect(g)
        g.connect(master)
        osc.start()
        return osc
      })
    } else {
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1.2)
        setTimeout(() => {
          oscsRef.current.forEach(o => { try { o.stop() } catch (_) {} })
          ctxRef.current?.close()
          ctxRef.current = null
          gainRef.current = null
          oscsRef.current = []
        }, 1400)
      }
    }
    setOn(v => !v)
  }, [on])

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
      className="fixed bottom-8 right-8 z-[9990] flex items-center gap-2 px-4 py-2.5 rounded-full"
      style={{
        background: on ? 'rgba(109,40,217,0.18)' : 'rgba(15,15,25,0.7)',
        border: `1px solid ${on ? 'rgba(167,139,250,0.45)' : 'rgba(255,255,255,0.08)'}`,
        backdropFilter: 'blur(12px)',
        cursor: 'none',
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <AnimatePresence mode="wait">
        {on ? (
          <motion.span
            key="on"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Volume2 size={12} style={{ color: '#a78bfa' }} />
            <span className="font-bold uppercase tracking-widest" style={{ fontSize: 9, color: '#a78bfa' }}>
              Ambient
            </span>
            <span className="flex items-end gap-px" style={{ height: 12 }}>
              {[0, 0.15, 0.05, 0.25, 0.1].map((delay, i) => (
                <motion.span
                  key={i}
                  className="inline-block rounded-full"
                  style={{ width: 2, background: '#a78bfa' }}
                  animate={{ height: ['3px', '10px', '3px'] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay, ease: 'easeInOut' }}
                />
              ))}
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <VolumeX size={12} style={{ color: 'rgba(148,163,184,0.45)' }} />
            <span className="font-bold uppercase tracking-widest" style={{ fontSize: 9, color: 'rgba(148,163,184,0.45)' }}>
              Sound
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
