import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function SceneV1() {
  const beamRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (beamRef.current) {
      // @ts-ignore
      beamRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 3) * 0.05
    }
  })

  return (
    <>
      <pointLight position={[0, 15, -15]} intensity={5} color="#00ff66" />
      <group position={[0, 5, -15]}>
        {/* UFO */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[0, 10, 0]}>
            <cylinderGeometry args={[6, 1.5, 2, 32]} />
            <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 11, 0]}>
            <sphereGeometry args={[3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.8} transparent opacity={0.9} />
          </mesh>
          {/* Glowing ring */}
          <mesh position={[0, 9.5, 0]}>
            <torusGeometry args={[5.8, 0.15, 16, 100]} />
            <meshBasicMaterial color="#00ff66" />
          </mesh>
        </Float>

        {/* Tractor Beam */}
        <mesh ref={beamRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[3, 12, 25, 32, 1, true]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* Data Particles rising in the beam */}
        <Sparkles count={200} scale={[10, 25, 10]} size={6} speed={0.8} opacity={0.8} color="#00ff66" position={[0, 0, 0]} />
      </group>
      
      {/* Background stars */}
      <Sparkles count={500} scale={[60, 60, 60]} size={1.5} speed={0.1} opacity={0.2} color="#ffffff" position={[0, 0, -20]} />
    </>
  )
}
