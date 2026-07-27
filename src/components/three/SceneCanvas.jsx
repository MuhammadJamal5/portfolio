import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'

// Procedural studio rig — no HDRI network fetch, just emissive planes baked
// into a small env cubemap. This is what gives glass/metal materials real
// reflections instead of the flat, matte look of lights-only PBR shading.
function StudioEnvironment() {
  // Low-res cubemap (rendered once on mount) — enough for soft reflections on
  // the small decorative meshes, cheap enough to not hitch on scroll.
  return (
    <Environment resolution={24} frames={1}>
      <Lightformer intensity={2.5} color="#a78bfa" position={[3, 2, 4]} scale={6} />
      <Lightformer intensity={2} color="#f472b6" position={[-4, -2, 2]} scale={5} />
      <Lightformer intensity={1.5} color="#67e8f9" position={[0, 4, -3]} scale={5} />
      <Lightformer intensity={1} color="#ffffff" position={[0, -4, 4]} scale={8} />
    </Environment>
  )
}

// Shared WebGL scene wrapper — camera, lighting, viewport-gated mount, and a
// mobile perf downgrade. Keeps every three/* visual consistent and avoids
// paying for a live WebGL context while scrolled out of view.
// `glow` renders a soft CSS radial halo behind the (transparent) canvas — this
// replaces the WebGL bloom pass, which left a visible rectangle on the
// transparent canvas in every section.
export default function SceneCanvas({ children, className = '', style = {}, cameraZ = 5, glow = null }) {
  const wrapRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [mounted, setMounted] = useState(false) // first time it enters view — stays true

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: '120px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={className} style={style}>
      {glow && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-20%',
            background: `radial-gradient(circle at 50% 50%, ${glow} 0%, transparent 62%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {mounted && (
        <Canvas
          dpr={1}
          frameloop={inView ? 'always' : 'never'}
          performance={{ min: 0.4 }}
          camera={{ position: [0, 0, cameraZ], fov: 45 }}
          gl={{ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 2, 4]} intensity={1.1} color="#818cf8" />
          <pointLight position={[-3, -1, 2]} intensity={0.9} color="#f472b6" />
          <pointLight position={[0, 3, -3]} intensity={0.6} color="#67e8f9" />
          <Suspense fallback={null}>
            <StudioEnvironment />
            {children}
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
