import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const BOOT_SEQUENCE = [
  "> INITIATING SECURE HANDSHAKE...",
  "> [OK] MICROSERVICES ONLINE",
  "> [OK] EVENT STREAM CONNECTED",
  "> [OK] NEURAL NET KERNEL ACTIVE",
  "> BYPASSING FIREWALL...",
  "> ROOT ACCESS GRANTED",
  "> SYSTEM READY."
]

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    let currentLine = 0;
    
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setDisplayedLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsBooting(false);
        setTimeout(() => {
          document.body.style.overflow = 'auto';
          onComplete();
        }, 600);
      }
    }, 250); // 250ms per line to be snappy
    
    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    }
  }, [onComplete])

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#030305] z-[99999] flex flex-col justify-end p-8 md:p-12 font-mono text-sm sm:text-base pb-12"
    >
      <div className="space-y-2 text-[#00ff66] max-w-3xl mx-auto w-full relative z-10">
        {displayedLines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {line}
          </motion.div>
        ))}
        {isBooting && (
          <motion.div 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-[#00ff66] inline-block mt-2"
          />
        )}
      </div>
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-30" />
    </motion.div>
  )
}
