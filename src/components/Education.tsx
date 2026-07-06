import { motion } from 'framer-motion'

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#00ff66]/20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-16 text-center text-white tracking-tighter"
      >
        <span className="text-[#00ff66] font-mono text-xl sm:text-3xl md:text-4xl mr-2">03.</span>EDUCATION<span className="text-[#7000ff]">_DATA</span>
      </motion.h2>

      <div className="max-w-4xl mx-auto relative pl-6 md:pl-10">
        
        {/* Vertical glowing connector line */}
        <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#00ff66] via-[#7000ff] to-[#00ff66] shadow-[0_0_15px_#00ff66] opacity-70"></div>

        <div className="space-y-8">
          {/* Degree 1: MCA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-6 md:p-8 relative overflow-hidden group hover:border-[#00ff66]/50 transition-all duration-300"
          >
            {/* Hex/Binary abstract background pattern on hover */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMCIgeT0iMTUiIGZpbGw9InJnYmEoMCwyNTUsMTAyLDAuMDMpIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEwIj4xPC90ZXh0Pjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

            {/* Glowing Node on the line */}
            <div className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#030305] border-2 border-[#00ff66] rounded-full z-10 -translate-x-[1px] group-hover:bg-[#00ff66] group-hover:shadow-[0_0_20px_#00ff66] transition-all duration-300"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-[#00ff66] uppercase tracking-widest border border-[#00ff66]/30 px-2 py-0.5 rounded-sm bg-[#00ff66]/5">SECTOR_01</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-[#00ff66] transition-colors">Master of Computer Applications (MCA)</h3>
                <p className="text-[#888] font-mono text-sm mt-1">National Institute of Technology (NIT), Jamshedpur</p>
              </div>
              <div className="hidden md:block">
                {/* Decorative Tech Graphic */}
                <div className="w-16 h-16 rounded-full border border-[#00ff66]/20 flex items-center justify-center relative">
                  <div className="absolute inset-2 border border-dashed border-[#00ff66]/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Degree 2: BCA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-6 md:p-8 relative overflow-hidden group hover:border-[#7000ff]/50 transition-all duration-300"
          >
            {/* Hex/Binary abstract background pattern on hover */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMCIgeT0iMTUiIGZpbGw9InJnYmEoMTEyLDAsMjU1LDAuMDMpIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEwIj4wPC90ZXh0Pjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

            {/* Glowing Node on the line */}
            <div className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#030305] border-2 border-[#7000ff] rounded-full z-10 -translate-x-[1px] group-hover:bg-[#7000ff] group-hover:shadow-[0_0_20px_#7000ff] transition-all duration-300"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-[#7000ff] uppercase tracking-widest border border-[#7000ff]/30 px-2 py-0.5 rounded-sm bg-[#7000ff]/5">SECTOR_02</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-[#7000ff] transition-colors">Bachelor of Computer Applications (BCA)</h3>
                <p className="text-[#888] font-mono text-sm mt-1">Swami Vivekanand Subharti University, Prayagraj</p>
              </div>
              <div className="hidden md:block">
                {/* Decorative Tech Graphic */}
                <div className="w-16 h-16 rounded-full border border-[#7000ff]/20 flex items-center justify-center relative">
                  <div className="absolute inset-2 border border-dashed border-[#7000ff]/40 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                  <div className="w-2 h-2 bg-[#7000ff] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
