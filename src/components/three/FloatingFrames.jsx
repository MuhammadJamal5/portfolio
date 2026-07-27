import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'
import { mouse } from '../../utils/mouse'

// Video-editor motif: glass "clip" panels (16:9 frames) drifting in 3D space,
// catching the colored studio lights for a premium, cinematic feel. Pure R3F —
// no external network fetch, unlike a Spline scene.
const FRAMES = [
  { pos: [0, 0.1, 0], rot: [0.1, 0.35, -0.05], scale: 1.15, color: '#a78bfa', float: 0.5 },
  { pos: [-1.5, 0.9, -0.8], rot: [0.2, 0.6, 0.1], scale: 0.7, color: '#818cf8', float: 0.9 },
  { pos: [1.55, -0.7, -0.6], rot: [-0.15, -0.4, -0.08], scale: 0.8, color: '#f472b6', float: 0.7 },
  { pos: [-1.2, -1.0, 0.4], rot: [0.05, 0.5, 0.12], scale: 0.55, color: '#67e8f9', float: 1.1 },
  { pos: [1.35, 1.15, 0.2], rot: [-0.2, -0.55, 0.06], scale: 0.6, color: '#c084fc', float: 0.8 },
]

function Frame({ pos, rot, scale, color, float }) {
  return (
    <Float speed={float * 1.4} rotationIntensity={0.35} floatIntensity={0.7}>
      <group position={pos} rotation={rot} scale={scale}>
        {/* glass panel */}
        <RoundedBox args={[1.6, 0.9, 0.05]} radius={0.06} smoothness={2}>
          <meshStandardMaterial
            color="#0b0b16"
            emissive={color}
            emissiveIntensity={0.12}
            metalness={0.85}
            roughness={0.12}
          />
        </RoundedBox>
        {/* glowing edge accent */}
        <RoundedBox args={[1.66, 0.96, 0.04]} radius={0.07} smoothness={2} position={[0, 0, -0.02]}>
          <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.55} />
        </RoundedBox>
      </group>
    </Float>
  )
}

export default function FloatingFrames() {
  const groupRef = useRef(null)
  const smoothRef = useRef({ x: 0, y: 0 })

  const dust = useMemo(
    () =>
      Array.from({ length: 16 }, () => [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ]),
    [],
  )

  useFrame((_, delta) => {
    const sm = smoothRef.current
    sm.x += ((mouse.ny - 0.5) * 0.5 - sm.x) * 0.04
    sm.y += ((mouse.nx - 0.5) * 0.7 - sm.y) * 0.04
    if (groupRef.current) {
      groupRef.current.rotation.x = sm.x
      groupRef.current.rotation.y = sm.y + Math.sin(performance.now() * 0.0001) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {FRAMES.map((f, i) => (
        <Frame key={i} {...f} />
      ))}
      {dust.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshBasicMaterial color="#c4b5fd" toneMapped={false} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}
