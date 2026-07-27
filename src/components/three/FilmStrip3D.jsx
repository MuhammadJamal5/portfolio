import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'
import { mouse } from '../../utils/mouse'

// A 3D film strip — dark band with two rows of sprocket perforations and a
// column of lit "frames" that scroll upward, like film through a projector.
const FRAME_COUNT = 5
const SPACING = 0.62

export default function FilmStrip3D({ color = '#818cf8', scale = 1 }) {
  const groupRef = useRef(null)
  const scrollRef = useRef(null)
  const smoothRef = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    const sm = smoothRef.current
    sm.x += ((mouse.ny - 0.5) * 0.4 - sm.x) * 0.04
    sm.y += ((mouse.nx - 0.5) * 0.6 - sm.y) * 0.04
    if (groupRef.current) {
      groupRef.current.rotation.x = sm.x
      groupRef.current.rotation.z = -0.18 + sm.y * 0.2
    }
    if (scrollRef.current) {
      scrollRef.current.position.y -= delta * 0.6
      if (scrollRef.current.position.y < -SPACING) scrollRef.current.position.y += SPACING
    }
  })

  const perfs = []
  for (let i = -3; i <= 3; i++) {
    perfs.push(i)
  }

  return (
    <Float speed={1} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={groupRef} scale={scale}>
        {/* dark film band */}
        <RoundedBox args={[1.35, 3.6, 0.06]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#0c0c14" metalness={0.6} roughness={0.3} />
        </RoundedBox>

        {/* sprocket perforations (two rows) */}
        {perfs.map((i) => (
          [-0.52, 0.52].map((x, j) => (
            <mesh key={`${i}-${j}`} position={[x, i * 0.5, 0.04]}>
              <boxGeometry args={[0.12, 0.18, 0.04]} />
              <meshStandardMaterial color="#1e1e2e" metalness={0.3} roughness={0.5} />
            </mesh>
          ))
        ))}

        {/* scrolling lit frames down the center */}
        <group ref={scrollRef}>
          {Array.from({ length: FRAME_COUNT }).map((_, i) => (
            <mesh key={i} position={[0, (i - 2) * SPACING, 0.05]}>
              <planeGeometry args={[0.78, 0.5]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.55}
                metalness={0.2}
                roughness={0.25}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  )
}
