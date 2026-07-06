import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function SceneV3() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle organic sway
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.2
      
      // Look at mouse
      const targetX = state.pointer.x * 2
      const targetY = state.pointer.y * 2
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
    }
  })

  return (
    <>
      <Environment preset="city" />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00ff66" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
      
      <group ref={groupRef} position={[0, 0, -8]}>
        {/* Central massive blob */}
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[4, 128, 128]} />
            <MeshDistortMaterial 
              color="#050508" 
              envMapIntensity={2.5} 
              metalness={1} 
              roughness={0.05} 
              distort={0.4} 
              speed={3} 
            />
          </mesh>
        </Float>

        {/* Orbiting smaller blob 1 */}
        <Float speed={2} rotationIntensity={3} floatIntensity={3} position={[-6, 2, -2]}>
          <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <MeshDistortMaterial 
              color="#7000ff" 
              envMapIntensity={1} 
              metalness={0.9} 
              roughness={0.2} 
              distort={0.6} 
              speed={4} 
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>

        {/* Orbiting smaller blob 2 */}
        <Float speed={2.5} rotationIntensity={2} floatIntensity={4} position={[5, -3, 1]}>
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial 
              color="#00ff66" 
              envMapIntensity={1} 
              metalness={0.9} 
              roughness={0.2} 
              distort={0.5} 
              speed={5} 
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      </group>
      
      <Sparkles count={300} scale={[30, 30, 30]} size={3} speed={0.2} opacity={0.15} color="#ffffff" position={[0, 0, -10]} />
    </>
  )
}
