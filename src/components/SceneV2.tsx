import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 150
const MAX_DISTANCE = 4

export default function SceneV2() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Initialize particles
  const particles = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vels = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5

      vels.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      })
    }
    return { positions: pos, velocities: vels }
  }, [])

  // Initialize max possible line segments (n * (n - 1) / 2)
  // To save memory, we can cap it or just allocate a reasonable amount
  const maxLines = PARTICLE_COUNT * 5
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines])
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const mouseX = state.pointer.x * 20
    const mouseY = state.pointer.y * 15
    const mousePos = new THREE.Vector3(mouseX, mouseY, -2)

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let x = positions[i * 3]
      let y = positions[i * 3 + 1]
      let z = positions[i * 3 + 2]

      const vel = particles.velocities[i]
      x += vel.x
      y += vel.y
      z += vel.z

      // Boundary check
      if (x > 15 || x < -15) vel.x *= -1
      if (y > 10 || y < -10) vel.y *= -1
      if (z > 5 || z < -15) vel.z *= -1

      // Mouse interaction (pull particles slightly)
      const distToMouse = Math.sqrt((x - mouseX)**2 + (y - mouseY)**2 + (z - mousePos.z)**2)
      if (distToMouse < 8) {
        const force = (8 - distToMouse) * 0.005
        vel.x += (mouseX - x) * force
        vel.y += (mouseY - y) * force
        // limit velocity
        vel.x = Math.max(-0.05, Math.min(0.05, vel.x))
        vel.y = Math.max(-0.05, Math.min(0.05, vel.y))
      }

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Update lines
    let vertexpos = 0
    let colorpos = 0
    let numConnected = 0

    // O(N^2) check, acceptable for 150 particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const distSq = dx * dx + dy * dy + dz * dz

        if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
          const alpha = 1.0 - Math.sqrt(distSq) / MAX_DISTANCE
          
          linePositions[vertexpos++] = positions[i * 3]
          linePositions[vertexpos++] = positions[i * 3 + 1]
          linePositions[vertexpos++] = positions[i * 3 + 2]
          
          linePositions[vertexpos++] = positions[j * 3]
          linePositions[vertexpos++] = positions[j * 3 + 1]
          linePositions[vertexpos++] = positions[j * 3 + 2]

          // Neon green line fading out
          lineColors[colorpos++] = 0
          lineColors[colorpos++] = 1 * alpha
          lineColors[colorpos++] = 0.4 * alpha

          lineColors[colorpos++] = 0
          lineColors[colorpos++] = 1 * alpha
          lineColors[colorpos++] = 0.4 * alpha

          numConnected++
          if (numConnected >= maxLines) break
        }
      }
      if (numConnected >= maxLines) break
    }

    linesRef.current.geometry.setDrawRange(0, numConnected * 2)
    linesRef.current.geometry.attributes.position.needsUpdate = true
    linesRef.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            args={[particles.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#00ff66" transparent opacity={0.8} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={maxLines * 2}
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  )
}
