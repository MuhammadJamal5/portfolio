import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[10001]" style={{ height: 2 }}>
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'linear-gradient(90deg, #6d28d9, #a78bfa, #f472b6, #67e8f9)',
          boxShadow: '0 0 10px rgba(167,139,250,0.7)',
          transition: 'width 0.08s linear',
        }}
      />
    </div>
  )
}
