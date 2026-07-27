import { useRef, useEffect } from 'react'
import { mouse } from '../utils/mouse'

const N = 160
const ARMS = 3
const PALETTE = [
  [167, 139, 250],
  [244, 114, 182],
  [103, 232, 249],
]

function makeParticles() {
  return Array.from({ length: N }, (_, i) => {
    const arm = i % ARMS
    const t = i / N
    const r = 38 + t * 310
    const angle = (arm / ARMS) * Math.PI * 2 + t * Math.PI * 5.5
    const scatterR = Math.random() * r * 0.18
    const scatterA = Math.random() * Math.PI * 2
    const [cr, cg, cb] = PALETTE[arm]
    return {
      r: r + scatterR * Math.cos(scatterA),
      angle,
      z: (Math.random() - 0.5) * 160,
      speed: 0.00014 + (1 - t) * 0.00055,
      size: 0.7 + Math.random() * 2.2,
      cr, cg, cb,
      opacity: 0.3 + Math.random() * 0.7,
    }
  })
}

function rotX([x, y, z], a) { const c = Math.cos(a), s = Math.sin(a); return [x, y*c - z*s, y*s + z*c] }
function rotY([x, y, z], a) { const c = Math.cos(a), s = Math.sin(a); return [x*c + z*s, y, -x*s + z*c] }

export default function ParticleVortex({ style, className }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const smoothRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef(makeParticles())

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      const p = canvas.parentElement
      if (!p) return
      const rect = p.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let active = true
    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active) rafRef.current = requestAnimationFrame(draw)
      else cancelAnimationFrame(rafRef.current)
    })
    io.observe(canvas)

    const draw = () => {
      if (!active) return
      rafRef.current = requestAnimationFrame(draw)
      const rect = canvas.getBoundingClientRect()
      const W = rect.width, H = rect.height
      if (!W || !H) return

      const sm = smoothRef.current
      sm.x += ((mouse.nx - 0.5) * 2 - sm.x) * 0.04
      sm.y += ((mouse.ny - 0.5) * 2 - sm.y) * 0.04

      ctx.clearRect(0, 0, W, H)

      const cx = W / 2, cy = H / 2
      const FOV = 480

      const particles = particlesRef.current
      const pts = particles.map(p => {
        p.angle += p.speed
        let pos = [p.r * Math.cos(p.angle), p.z, p.r * Math.sin(p.angle)]
        pos = rotX(pos, sm.y * 0.38)
        pos = rotY(pos, sm.x * 0.22)
        const z = pos[2] + FOV
        const s = FOV / Math.max(z, 1)
        return { ...p, px: cx + pos[0] * s, py: cy + pos[1] * s, s, depth: z / (FOV * 2) }
      })
      pts.sort((a, b) => a.depth - b.depth)

      for (const p of pts) {
        const r = p.size * p.s * 0.75
        const op = p.opacity * Math.min(p.depth * 2.2, 1) * 0.85
        if (op < 0.01 || r < 0.1) continue
        ctx.beginPath()
        ctx.arc(p.px, p.py, Math.max(0.25, r), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${op.toFixed(3)})`
        ctx.fill()
      }
    }

    return () => {
      active = false
      cancelAnimationFrame(rafRef.current)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} style={{ display: 'block', ...style }} />
}
