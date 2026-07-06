import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 1200

export default function SceneV4() {
  const pointsRef = useRef<THREE.Points>(null)
  const star1Ref = useRef<THREE.Mesh>(null)
  const star2Ref = useRef<THREE.Mesh>(null)

  // Initialize nebula particle cloud
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => {
      // Distribute in a spherical cloud with some thickness
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 4 + Math.random() * 8 // radius between 4 and 12

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi) - 10

      return {
        position: new THREE.Vector3(x, y, z),
        originalPos: new THREE.Vector3(x, y, z),
        speed: 0.05 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2
      }
    })
  }, [])

  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])
  
  const colors = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    const color = new THREE.Color()
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Shaded green/purple/white mix for space dust
      const rand = Math.random()
      if (rand < 0.45) color.set("#00ff66")
      else if (rand < 0.9) color.set("#7000ff")
      else color.set("#ffffff")
      color.toArray(arr, i * 3)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !star1Ref.current || !star2Ref.current) return

    const time = state.clock.elapsedTime
    
    // Animate Binary Stars orbiting each other
    const orbitRadius = 1.6
    const star1X = Math.cos(time * 1.2) * orbitRadius
    const star1Y = Math.sin(time * 1.2) * orbitRadius
    star1Ref.current.position.set(star1X, star1Y, -10)
    
    const star2X = -star1X
    const star2Y = -star1Y
    star2Ref.current.position.set(star2X, star2Y, -10)

    // Pulsate stars' light outputs
    const pulse1 = 0.5 + Math.sin(time * 3) * 0.2
    const pulse2 = 0.4 + Math.cos(time * 4) * 0.15
    // @ts-ignore
    star1Ref.current.material.emissiveIntensity = pulse1
    // @ts-ignore
    star2Ref.current.material.emissiveIntensity = pulse2

    // Interactive mouse "solar wind"
    const mouseX = state.pointer.x * 15
    const mouseY = state.pointer.y * 10
    const mousePos = new THREE.Vector3(mouseX, mouseY, -10)

    const posAttr = pointsRef.current.geometry.attributes.position
    const posArr = posAttr.array as Float32Array

    particles.forEach((p, i) => {
      // Gentle breathing/drift
      const driftX = Math.sin(time * 0.4 + p.phase) * 0.015
      const driftY = Math.cos(time * 0.3 + p.phase) * 0.015

      p.position.x += driftX
      p.position.y += driftY

      // Pull back if drift pushes them too far out
      const toCenter = p.position.clone().sub(new THREE.Vector3(0, 0, -10))
      const len = toCenter.length()
      if (len > 15) {
        p.position.copy(p.originalPos)
      }

      // Mouse wind push
      const distToMouse = p.position.distanceTo(mousePos)
      if (distToMouse < 6) {
        const pushForce = (6 - distToMouse) * 0.04
        const repel = p.position.clone().sub(mousePos).normalize().multiplyScalar(pushForce)
        p.position.add(repel)
      }

      posArr[i * 3] = p.position.x
      posArr[i * 3 + 1] = p.position.y
      posArr[i * 3 + 2] = p.position.z
    })

    posAttr.needsUpdate = true
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      
      {/* Binary Stars */}
      <mesh ref={star1Ref}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={star2Ref}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={0.8} />
      </mesh>

      {/* Nebula Swarm */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Glow lighting for the nebula */}
      <pointLight position={[0, 0, -10]} intensity={6} color="#00ff66" />
      <pointLight position={[0, 0, -10]} intensity={4} color="#7000ff" />
      
      {/* Background sparse stars */}
      <Sparkles count={300} scale={[60, 60, 60]} size={1.2} speed={0.1} opacity={0.3} color="#ffffff" position={[0, 0, -20]} />
    </>
  )
}
