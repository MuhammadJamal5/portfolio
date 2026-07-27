import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Sparkles, MeshTransmissionMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { mouse } from '../../utils/mouse'

// Same golden-angle Fibonacci-sphere distribution used by the old
// canvas-2D HeroOrb/MorphSphere, now feeding a real WebGL point cloud.
function fibSpherePositions(n, r) {
  const positions = new Float32Array(n * 3)
  const g = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const t = g * i
    positions[i * 3] = Math.cos(t) * rad * r
    positions[i * 3 + 1] = y * r
    positions[i * 3 + 2] = Math.sin(t) * rad * r
  }
  return positions
}

function ParticleSphere({ count, radius, color, speed, opacity, size }) {
  const positions = useMemo(() => fibSpherePositions(count, radius), [count, radius])
  const groupRef = useRef(null)
  const smoothRef = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    const sm = smoothRef.current
    sm.x += ((mouse.ny - 0.5) * 1.1 - sm.x) * 0.04
    sm.y += ((mouse.nx - 0.5) * 1.1 - sm.y) * 0.04
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * delta
      groupRef.current.rotation.x = sm.x * 0.6
      groupRef.current.rotation.y += sm.y * 0.002
    }
  })

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={opacity}
        />
      </Points>
    </group>
  )
}

// Glass core — MeshTransmissionMaterial reflects/refracts the procedural
// studio environment set up in SceneCanvas, giving it real depth and a
// glowing "gem" look instead of a flat lit sphere.
function GlassCore() {
  const meshRef = useRef(null)
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.3
  })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.34, 64, 64]} />
        <MeshTransmissionMaterial
          color="#f0abfc"
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.06}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.15}
          samples={8}
          resolution={256}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color('#c084fc').multiplyScalar(2.4)}
          toneMapped={false}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

export default function GlowOrb() {
  return (
    <>
      <ParticleSphere count={340} radius={1.7} color="#a78bfa" speed={0.06} opacity={0.85} size={0.035} />
      <ParticleSphere count={140} radius={0.85} color="#f472b6" speed={-0.11} opacity={0.9} size={0.03} />
      <Sparkles count={60} scale={2.6} size={2.5} speed={0.3} color="#67e8f9" opacity={0.6} />
      <GlassCore />
    </>
  )
}
