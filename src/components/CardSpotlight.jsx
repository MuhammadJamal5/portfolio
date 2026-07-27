import { useEffect, useRef } from 'react'

export default function CardSpotlight({ radius = 280, color = 'rgba(255,255,255,0.065)' }) {
  const ref = useRef(null)

  useEffect(() => {
    const overlay = ref.current
    const card = overlay?.parentElement
    if (!card) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      overlay.style.backgroundImage =
        `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 70%)`
      overlay.style.opacity = '1'
    }

    const onLeave = () => { overlay.style.opacity = '0' }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [radius, color])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute', inset: 0,
        opacity: 0,
        pointerEvents: 'none',
        borderRadius: 'inherit',
        transition: 'opacity 0.2s',
        zIndex: 1,
      }}
    />
  )
}
