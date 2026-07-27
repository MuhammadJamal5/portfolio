import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { mouse } from '../../utils/mouse'

// A 3D play button — glass ring with an emissive play triangle. Gently
// pulses like a live media control.
export default function PlayButton3D({ color = '#f472b6', scale = 1 }) {
  const groupRef = useRef(null)
  const smoothRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const sm = smoothRef.current
    sm.x += ((mouse.ny - 0.5) * 0.5 - sm.x) * 0.04
    sm.y += ((mouse.nx - 0.5) * 0.7 - sm.y) * 0.04
    if (groupRef.current) {
      groupRef.current.rotation.x = sm.x
      groupRef.current.rotation.y = sm.y
      const p = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.04
      groupRef.current.scale.setScalar(scale * p)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef} scale={scale}>
        {/* outer ring */}
        <mesh>
          <torusGeometry args={[1, 0.12, 16, 64]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.85} roughness={0.12} />
        </mesh>
        {/* play triangle (cone as a 3-sided prism) */}
        <mesh rotation={[Math.PI / 2, 0, -Math.PI / 2]} position={[0.08, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.18, 3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} metalness={0.6} roughness={0.15} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}
