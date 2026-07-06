import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 3000

export default function SceneV5() {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Initialize vortex particles
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => {
      // Cylindrical/Spiral distribution
      const theta = Math.random() * Math.PI * 2
      const radius = Math.random() * 20 + 2 // from center outwards
      const y = (Math.random() - 0.5) * 40 // depth of the wormhole

      return {
        theta,
        radius,
        y,
        speed: 0.02 + Math.random() * 0.05,
        angularSpeed: 0.01 + Math.random() * 0.02,
      }
    })
  }, [])

  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])
  const colors = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    const color = new THREE.Color()
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Mix of neon green, purple, and white
      const rand = Math.random()
      if (rand < 0.5) color.set("#00ff66")
      else if (rand < 0.8) color.set("#7000ff")
      else color.set("#ffffff")
      
      // Make particles deeper in the wormhole darker
      const depth = Math.abs(particles[i].y) / 20
      color.multiplyScalar(Math.max(0.2, 1 - depth))
      
      color.toArray(arr, i * 3)
    }
    return arr
  }, [particles])

  useFrame((state) => {
    if (!pointsRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position
    const posArr = posAttr.array as Float32Array

    // Mouse interaction: slightly tilt the vortex based on mouse
    const targetRotX = (state.pointer.y * Math.PI) / 8
    const targetRotY = (state.pointer.x * Math.PI) / 8
    
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.05)
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotY, 0.05)

    // Animate particles
    particles.forEach((p, i) => {
      // Rotate around the center (angular velocity)
      p.theta += p.angularSpeed
      
      // Pull into the wormhole (z/y axis)
      p.y += p.speed * 4
      
      // Pull tighter into the center as they get "deeper"
      if (p.y > 20) {
        // Reset to the far end
        p.y = -20
        p.radius = Math.random() * 20 + 2
      } else {
        // Narrow the radius as it moves forward to create a funnel shape
        p.radius = Math.max(0.5, p.radius * 0.995) 
      }

      // Convert polar back to cartesian (using Z as the depth axis relative to camera)
      posArr[i * 3] = p.radius * Math.cos(p.theta)
      posArr[i * 3 + 1] = p.radius * Math.sin(p.theta)
      posArr[i * 3 + 2] = p.y // using y as Z-depth in local space
    })

    posAttr.needsUpdate = true
  })

  return (
    <>
      <points ref={pointsRef} position={[0, 0, -10]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        {/* We use additive blending to make overlapping particles glow intensely */}
        <pointsMaterial 
          size={0.12} 
          vertexColors 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>
      
      {/* Central light source for the wormhole */}
      <pointLight position={[0, 0, -5]} intensity={5} color="#00ff66" distance={20} />
    </>
  )
}
