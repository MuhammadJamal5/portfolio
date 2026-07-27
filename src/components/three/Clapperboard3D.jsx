import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'
import { mouse } from '../../utils/mouse'

// A 3D clapperboard — the universal icon for filmmaking / video editing.
// The hinged striped stick "claps" open and shut periodically for life.
function Stripes({ count = 8, width = 1.7, y = 0, z = 0.06, accent = '#ffffff' }) {
  const w = width / count
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[-width / 2 + w / 2 + i * w, y, z]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[w * 0.92, 0.16, 0.02]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accent : '#0c0c16'}
            emissive={i % 2 === 0 ? accent : '#000000'}
            emissiveIntensity={i % 2 === 0 ? 0.25 : 0}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Clapperboard3D({ color = '#a78bfa', scale = 1 }) {
  const groupRef = useRef(null)
  const clapperRef = useRef(null)
  const smoothRef = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const sm = smoothRef.current
    sm.x += ((mouse.ny - 0.5) * 0.5 - sm.x) * 0.04
    sm.y += ((mouse.nx - 0.5) * 0.7 - sm.y) * 0.04
    if (groupRef.current) {
      groupRef.current.rotation.x = sm.x
      groupRef.current.rotation.y = sm.y + Math.sin(state.clock.elapsedTime * 0.3) * 0.25
    }
    // clap: mostly closed, snap open every ~3s
    if (clapperRef.current) {
      const t = (state.clock.elapsedTime % 3) / 3
      const open = t < 0.15 ? (0.15 - t) / 0.15 : 0
      clapperRef.current.rotation.z = open * 0.4
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={scale}>
        {/* base board */}
        <RoundedBox args={[1.7, 1.05, 0.09]} radius={0.05} smoothness={4} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#111120" emissive={color} emissiveIntensity={0.08} metalness={0.75} roughness={0.22} />
        </RoundedBox>
        {/* hinged clapper stick — pivots from left */}
        <group ref={clapperRef} position={[-0.85, 0.48, 0]}>
          <group position={[0.85, 0, 0]}>
            <RoundedBox args={[1.7, 0.26, 0.07]} radius={0.03} smoothness={3}>
              <meshStandardMaterial color="#14141f" metalness={0.7} roughness={0.25} />
            </RoundedBox>
            <Stripes count={8} width={1.6} y={0} z={0.05} accent={color} />
          </group>
        </group>
      </group>
    </Float>
  )
}
