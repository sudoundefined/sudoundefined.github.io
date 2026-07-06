import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="about" className="min-h-[100dvh] flex items-center justify-center pt-36 pb-12 relative z-10 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl z-20">
        
        {/* System badge - Centered */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] font-mono text-xs uppercase tracking-widest mb-6 rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff66]"></span>
          </span>
          System_Identity: Confirmed
        </motion.div>
        
        {/* Centered Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tighter text-white leading-none"
        >
          DEEPANSHU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#7000ff]">SRIVASTAVA</span>
        </motion.h1>
        
        {/* Centered Subtitle */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm md:text-base text-[#b0b0b0] mt-3 mb-6 font-mono uppercase tracking-[0.2em]"
        >
          Tech_Lead // Sr.Full_Stack_Eng
        </motion.h2>
        
        {/* Centered Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-sm md:text-base text-[#888] leading-relaxed max-w-2xl font-light mb-12"
        >
          Accomplished engineering leader architecting highly scalable, service-oriented distributed systems to deliver robust enterprise solutions.
        </motion.p>

        {/* Centered Diagnostic Card */}
        <div className="w-full max-w-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="glass-panel p-6 md:p-8 text-left relative overflow-hidden"
          >
            {/* Ambient glowing background inside the card */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#7000ff]/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#00ff66]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="font-mono text-[#00ff66] text-xs tracking-widest uppercase">Diagnostic_Data</span>
                <span className="font-mono text-[#7000ff] text-xs tracking-widest uppercase animate-pulse">Live</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-mono text-[9px] text-[#888] uppercase tracking-wider mb-0.5">Time_in_Orbit</p>
                  <p className="font-mono text-white text-base tracking-tight">9.2_YEARS</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#888] uppercase tracking-wider mb-0.5">Current_Status</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
                    <p className="font-mono text-[#00ff66] text-xs tracking-tight">READY_FOR_TRANSMISSION</p>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-mono text-[9px] text-[#888] uppercase tracking-wider mb-0.5">Core_Engines</p>
                  <p className="font-mono text-white text-sm sm:text-base tracking-tight leading-normal">ANGULAR / NODE / SQL / MICROSERVICES / KAFKA</p>
                </div>
              </div>

              {/* Action Buttons Integrated into Card */}
              <div className="space-y-3">
                <a href="#contact" className="cyber-button block w-full py-3.5 text-center text-xs font-bold bg-[#00ff66]/10 hover:bg-[#00ff66] hover:text-[#030305]">
                  Initiate_Contact
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a href="#experience" className="cyber-button-alt block w-full py-2.5 text-center text-[10px]">
                    View_Logs
                  </a>
                  <a href="/Resume.pdf" download="Deepanshu_Srivastava_Resume.pdf" className="cyber-button-alt block w-full py-2.5 text-center text-[10px]">
                    Get_Resume
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
