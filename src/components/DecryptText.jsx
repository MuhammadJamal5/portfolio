import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&'

export default function DecryptText({ text, as: Tag = 'span', className, style, delay = 0, speed = 26 }) {
  const [display, setDisplay] = useState(text)
  const ref = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true
        setTimeout(() => {
          const chars = text.split('')
          const totalFrames = Math.max(22, Math.floor(chars.length * 1.5))
          let frame = 0
          const id = setInterval(() => {
            frame++
            const progress = frame / totalFrames
            setDisplay(
              chars.map((char, i) => {
                if (char === ' ') return ' '
                if (i / chars.length < progress) return char
                return CHARS[Math.floor(Math.random() * CHARS.length)]
              }).join('')
            )
            if (frame >= totalFrames) {
              clearInterval(id)
              setDisplay(text)
            }
          }, speed)
        }, delay)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [text, delay, speed])

  return <Tag ref={ref} className={className} style={style}>{display}</Tag>
}
