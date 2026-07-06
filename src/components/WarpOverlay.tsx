import { useEffect, useState } from 'react'

interface WarpOverlayProps {
  isWarping: boolean
}

const WarpOverlay = ({ isWarping }: WarpOverlayProps) => {
  const [render, setRender] = useState(false)
  
  useEffect(() => {
    if (isWarping) setRender(true)
    else {
      // Delay unmounting to allow fade out
      const timeout = setTimeout(() => setRender(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [isWarping])

  if (!render) return null

  // Render a CSS-based warp effect
  return (
    <div 
      className={`fixed inset-0 z-[150] pointer-events-none flex items-center justify-center overflow-hidden bg-black transition-opacity duration-300 ${isWarping ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Central Singularity (Dark Theme) */}
      <div className={`absolute w-full h-full bg-[#030305] mix-blend-normal transition-opacity duration-300 ${isWarping ? 'opacity-90' : 'opacity-0'}`} />
      <div className={`w-32 h-32 rounded-full bg-black shadow-[0_0_100px_#7000ff] blur-xl transition-transform duration-300 ${isWarping ? 'scale-[25] opacity-100' : 'scale-0 opacity-0'}`} />
      
      {/* CSS Warp Lines */}
      <div className="absolute inset-0 warp-container perspective-[1000px] transform-style-3d">
        {[...Array(60)].map((_, i) => {
          // Randomize properties for each line
          const angle = Math.random() * 360;
          const delay = Math.random() * 0.2;
          const length = 50 + Math.random() * 150;
          const width = 1 + Math.random() * 3;
          
          return (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 bg-[#00ff66] origin-left"
              style={{
                width: `${length}px`,
                height: `${width}px`,
                transform: `rotate(${angle}deg) translateX(${10 + Math.random() * 50}px)`,
                animation: isWarping ? `warp-line 0.4s ease-in ${delay}s infinite` : 'none',
                opacity: 0,
                boxShadow: '0 0 10px #00ff66, 0 0 20px #00ff66'
              }}
            />
          )
        })}
      </div>

      <style>{`
        @keyframes warp-line {
          0% {
            opacity: 0;
            transform: rotate(var(--angle)) translate3d(50px, 0, 0) scaleX(1);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(var(--angle)) translate3d(1500px, 0, 1000px) scaleX(4);
          }
        }
      `}</style>
    </div>
  )
}

export default WarpOverlay
