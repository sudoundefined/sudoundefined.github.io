import { motion } from 'framer-motion'
import { playHoverSound } from './AudioEngine'

const skillCategories = [
  {
    id: "languages",
    title: "LANGUAGES & FRAMEWORKS",
    skills: [
      { name: "Node.js" }, { name: "JavaScript" }, { name: "TypeScript" }, 
      { name: "React.js" }, { name: "Angular" }, { name: "Nest.js" }
    ]
  },
  {
    id: "architecture",
    title: "ARCHITECTURE & CLOUD",
    skills: [
      { name: "Microservices" }, { name: "SOA" }, { name: "Distributed Sys" }, 
      { name: "Event-Driven" }, { name: "Multi-Tenancy" }
    ]
  },
  {
    id: "data",
    title: "DATABASES & MESSAGING",
    skills: [
      { name: "PostgreSQL" }, { name: "MongoDB" }, { name: "Kafka" }, 
      { name: "RabbitMQ" }, { name: "Redis" }
    ]
  },
  {
    id: "devops",
    title: "TOOLS & DEVOPS",
    skills: [
      { name: "Docker" }, { name: "Kubernetes" }, { name: "AWS" }, 
      { name: "Jenkins" }, { name: "CI/CD" }
    ]
  },
  {
    id: "testing",
    title: "TESTING & AUTOMATION",
    skills: [
      { name: "Playwright" }, { name: "Jest" }, { name: "TDD" }, { name: "MCP" }
    ]
  },
  {
    id: "methodologies",
    title: "METHODOLOGIES",
    skills: [
      { name: "Agile" }, { name: "Sprint Planning" }, { name: "System Design" }
    ]
  }
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#00ff66]/20 min-h-[90vh] flex flex-col justify-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-16 md:mb-24 text-center text-white tracking-tighter"
      >
        <span className="text-[#00ff66] font-mono text-xl sm:text-3xl md:text-4xl mr-2">01.</span>TECHNICAL<span className="text-[#7000ff]">_SKILLS</span>
      </motion.h2>

      {/* Hexagonal Grid Container */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto relative">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative w-40 h-44 sm:w-48 sm:h-52 md:w-56 md:h-64 flex justify-center items-center group cursor-crosshair
              ${[1, 4].includes(idx) ? 'md:mt-32' : ''} 
            `}
            onMouseEnter={playHoverSound}
          >
            {/* SVG Hexagon Base */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(0,255,102,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(112,0,255,0.6)] transition-all duration-500">
              <polygon 
                points="50 2, 95 25, 95 75, 50 98, 5 75, 5 25" 
                fill="rgba(3,3,5,0.7)" 
                stroke="#00ff66" 
                strokeWidth="0.5" 
                className="group-hover:stroke-[#7000ff] group-hover:stroke-2 transition-all duration-300" 
              />
              {/* Inner glowing ring */}
              <polygon 
                points="50 8, 88 30, 88 70, 50 92, 12 70, 12 30" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.5" 
                className="group-hover:stroke-[#00ff66] transition-all duration-500 delay-100" 
              />
            </svg>

            {/* Default State: Category Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
              <span className="text-[#7000ff] mb-2">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </span>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white font-mono tracking-widest leading-tight">
                {cat.title}
              </h3>
            </div>

            {/* Hover State: Skills Data */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{ clipPath: 'polygon(50% 2%, 95% 25%, 95% 75%, 50% 98%, 5% 75%, 5% 25%)' }}
            >
              <div className="w-full h-full bg-[#030305]/90 backdrop-blur-sm flex flex-col justify-center items-center p-4">
                <p className="text-[10px] text-[#00ff66] font-mono mb-2 uppercase border-b border-[#00ff66]/30 pb-1 w-full text-center tracking-widest hidden md:block">
                  SYS.DATA
                </p>
                <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 content-center w-full">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill.name} 
                      className="text-[9px] sm:text-[10px] md:text-xs text-white bg-white/5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-white/10 hover:border-[#7000ff] hover:text-[#00ff66] transition-colors cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  )
}
