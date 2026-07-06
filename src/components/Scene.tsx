import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import SceneV1 from './SceneV1'
import SceneV2 from './SceneV2'
import SceneV3 from './SceneV3'
import SceneV4 from './SceneV4'
import SceneV5 from './SceneV5'
import { scrollState } from '../utils/scrollState'
import * as THREE from 'three'

function CameraRig() {
  useFrame((state) => {
    // When scrolling fast, push camera forward (zoom in) slightly to simulate flying through space
    const targetZ = 5 - Math.min(Math.abs(scrollState.velocity) * 0.05, 3)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1)
  })
  return null
}

export default function Scene({ activeScene }: { activeScene: 1 | 2 | 3 | 4 | 5 }) {
  const [displayedScene, setDisplayedScene] = useState(activeScene)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (activeScene !== displayedScene) {
      setOpacity(0) // Fade out
      const timeout = setTimeout(() => {
        setDisplayedScene(activeScene) // Swap scene while invisible
        setOpacity(1) // Fade in
      }, 150) // 150ms fade transition duration for snappier swap
      return () => clearTimeout(timeout)
    }
  }, [activeScene, displayedScene])

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 ${displayedScene === 4 ? 'bg-[#010101]' : 'bg-[#030305]'}`}>
      <div 
        className="w-full h-full transition-opacity duration-500 ease-in-out" 
        style={{ opacity }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <CameraRig />
          <fog attach="fog" args={[displayedScene === 4 ? '#010101' : '#030305', 5, 35]} />
          <ambientLight intensity={0.3} />
          
          {displayedScene === 1 && <SceneV1 />}
          {displayedScene === 2 && <SceneV2 />}
          {displayedScene === 3 && <SceneV3 />}
          {displayedScene === 4 && <SceneV4 />}
          {displayedScene === 5 && <SceneV5 />}
        </Canvas>
      </div>
    </div>
  )
}
