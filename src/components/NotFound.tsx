import Scene from './Scene'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] bg-[#010101] text-[#e0e0e0] font-sans overflow-hidden flex items-center justify-center">
      {/* 3D Simulation Background - Black Hole */}
      <Scene activeScene={4} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 bg-[#030305]/60 backdrop-blur-md border border-[#ff003c]/20 rounded-2xl shadow-[0_0_50px_rgba(255,0,60,0.1)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold font-mono text-[#ff003c] tracking-widest mb-4 glitch-effect">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mb-2">
            Sector Not Found
          </h2>
          <p className="text-[#888] font-mono max-w-md mb-8">
            The coordinates you provided do not exist in this dimension. You have drifted into a quantum singularity.
          </p>
          
          <a href="/" className="cyber-button px-8 py-3 inline-block border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c]/10 hover:shadow-[0_0_20px_rgba(255,0,60,0.4)]">
            INITIATE_WARP_HOME()
          </a>
        </motion.div>
      </div>
    </div>
  )
}
