import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Torus, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { mouse } from '../../utils/mouse'

function HologramCore() {
  const torusRef = useRef()
  const sphereRef = useRef()
  const smoothRef = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const sm = smoothRef.current
    sm.x += ((mouse.ny - 0.5) * 0.6 - sm.x) * 0.05
    sm.y += ((mouse.nx - 0.5) * 0.8 - sm.y) * 0.05

    if (torusRef.current) {
      torusRef.current.rotation.x = sm.x + state.clock.elapsedTime * 0.25
      torusRef.current.rotation.y = sm.y + state.clock.elapsedTime * 0.35
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Floating 3D Holographic Torus Ring */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={torusRef}>
          <torusGeometry args={[1.5, 0.12, 32, 100]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#4f46e5"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Inner Distorted Glowing 3D Orb */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.7, 64, 64]} />
          <MeshDistortMaterial
            color="#a78bfa"
            emissive="#6366f1"
            emissiveIntensity={0.5}
            roughness={0.15}
            metalness={0.8}
            distort={0.35}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function Fusion3DHero() {
  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-4, -3, 2]} intensity={1.2} color="#c084fc" />
        <HologramCore />
      </Canvas>
    </div>
  )
}
