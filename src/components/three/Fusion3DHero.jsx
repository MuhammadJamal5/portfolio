import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshTransmissionMaterial, Ring } from '@react-three/drei'
import { mouse } from '../../utils/mouse'

// Brand New High-End Fusion AI Glass Crystal Prism Core
// Pure physical refraction, transmission, and dispersion — zero old glass frame meshes.
function QuantumCrystalCore() {
  const crystalRef = useRef()
  const ringRef = useRef()
  const smoothRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const sm = smoothRef.current
    sm.x += ((mouse.ny - 0.5) * 0.7 - sm.x) * 0.05
    sm.y += ((mouse.nx - 0.5) * 0.9 - sm.y) * 0.05

    if (crystalRef.current) {
      crystalRef.current.rotation.x = sm.x + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      crystalRef.current.rotation.y = sm.y + state.clock.elapsedTime * 0.4
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = sm.x * 0.5 + Math.PI / 2
      ringRef.current.rotation.y = sm.y * 0.5 + state.clock.elapsedTime * -0.2
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Refractive Floating Crystal Polyhedron */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={crystalRef} scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.5}
            chromaticAberration={0.4}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#818cf8"
          />
        </mesh>
      </Float>

      {/* Orbiting Orbital Glow Ring */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh ref={ringRef} scale={1.8}>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
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
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#818cf8" />
        <pointLight position={[-5, -4, 3]} intensity={1.5} color="#c084fc" />
        <QuantumCrystalCore />
      </Canvas>
    </div>
  )
}
