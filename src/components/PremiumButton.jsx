import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

let RIPPLE_ID = 0

// Premium reactive button: magnetic pull toward the cursor, spring press
// feedback (scale-down on tap), an expanding click ripple from the exact
// press point, and a one-shot shine sweep on hover. Honors prefers-reduced-
// motion by skipping the magnetic/ripple flourish.
export default function PremiumButton({
  children,
  as = 'button',
  variant = 'primary',
  className = '',
  strength = 0.4,
  icon = null,
  onClick,
  ...props
}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = useCallback(
    (e) => {
      if (reduced) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength })
    },
    [reduced, strength],
  )

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), [])

  const spawnRipple = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    const id = ++RIPPLE_ID
    const size = Math.max(rect.width, rect.height) * 2
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size },
    ])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650)
  }, [])

  const handleClick = useCallback(
    (e) => {
      spawnRipple(e)
      onClick?.(e)
    },
    [spawnRipple, onClick],
  )

  const isPrimary = variant === 'primary'
  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold select-none cursor-pointer'
  const skin = isPrimary
    ? 'text-white'
    : 'text-white/90 border border-white/12 bg-white/[0.03] backdrop-blur-md'

  const MotionTag = motion[as] || motion.button

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleClick}
      animate={{ x: offset.x, y: offset.y }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.955 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.6 }}
      className={`group ${base} ${skin} ${className}`}
      style={
        isPrimary
          ? {
              background:
                'linear-gradient(120deg, #7c3aed 0%, #a855f7 45%, #ec4899 100%)',
              boxShadow: '0 8px 30px -8px rgba(168,85,247,0.55)',
            }
          : undefined
      }
      {...props}
    >
      {/* hover shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)',
          backgroundSize: '220% 100%',
          backgroundPosition: '220% center',
          transition: 'background-position 0.6s ease',
        }}
      />
      <style>{`.group:hover > span[aria-hidden] { background-position: -60% center !important; }`}</style>

      {/* click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 60%)',
            }}
          />
        ))}
      </AnimatePresence>

      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon && (
          <motion.span
            className="inline-flex"
            initial={false}
            whileHover={{ x: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </MotionTag>
  )
}
