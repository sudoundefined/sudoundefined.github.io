import { useState } from 'react'
import { playClickSound, playHoverSound } from './AudioEngine'

const projects = [
  {
    id: 1,
    title: "AI Core - Neural Network",
    date: "2025.10.12",
    status: "ARCHIVED",
    tech: "PYTHON / TENSORFLOW / CUDA",
    description: "Developed a distributed neural network architecture capable of processing multi-modal datasets in real-time. Achieved a 40% reduction in training latency.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Quantum DB Interface",
    date: "2024.08.05",
    status: "ACTIVE",
    tech: "REACT / NODE / POSTGRES / KAFKA",
    description: "A high-performance streaming database interface for monitoring sub-atomic particle collision data. Handles 100k+ events per second.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Space-ML Portfolio",
    date: "2026.07.06",
    status: "SYSTEM",
    tech: "REACT / THREE.JS / WEBGL",
    description: "You are looking at it. A multi-dimensional, interactive portfolio leveraging WebGL and custom shader materials for an immersive experience.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80"
  }
]

const Projects = () => {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null)

  const openProject = (project: typeof projects[0]) => {
    playClickSound()
    setActiveProject(project)
  }

  const closeProject = () => {
    playClickSound()
    setActiveProject(null)
  }

  return (
    <section id="projects" className="min-h-screen relative flex items-center py-20 z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-[#00ff66] tracking-widest uppercase mb-2">&gt; Accessing Records</h2>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">MISSION_ARCHIVES</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7000ff] to-[#00ff66] mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="glass-panel group cursor-pointer h-[400px] flex flex-col justify-end p-6 relative overflow-hidden"
              onClick={() => openProject(project)}
              onMouseEnter={() => playHoverSound()}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent" />
              
              <div className="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-[#00ff66] border border-[#00ff66]/30 px-2 py-1 rounded bg-[#00ff66]/10">
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-[#a0a0a0]">{project.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm font-mono text-[#7000ff]">{project.tech}</p>
                
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 mt-4 overflow-hidden">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
                    Initialize Uplink <span className="w-4 h-[1px] bg-white/50 block"></span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holographic HUD Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#030305]/90 backdrop-blur-xl animate-fade-in cursor-pointer"
            onClick={closeProject}
          />
          
          {/* Modal Content */}
          <div className="glass-panel border-[#00ff66]/50 w-full max-w-5xl h-[80vh] flex flex-col md:flex-row relative z-10 overflow-hidden animate-hud-boot pointer-events-auto">
            {/* Scanline Effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50 z-20" />
            
            <button 
              className="absolute top-4 right-4 z-30 text-[#00ff66] hover:text-white font-mono text-xl w-10 h-10 flex items-center justify-center border border-[#00ff66]/30 bg-[#00ff66]/10 rounded-full transition-colors"
              onClick={closeProject}
              onMouseEnter={() => playHoverSound()}
            >
              &times;
            </button>

            <div className="md:w-1/2 h-64 md:h-full relative border-b md:border-b-0 md:border-r border-[#00ff66]/20 bg-black">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-screen"
                style={{ backgroundImage: `url(${activeProject.image})` }}
              />
              {/* Telemetry overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none z-10">
                <div className="font-mono text-xs text-[#00ff66] space-y-1">
                  <p>REC: {activeProject.date.replace(/\./g, '')}</p>
                  <p>SYS.STAT: NOMINAL</p>
                </div>
                <div className="w-16 h-16 border-l-2 border-b-2 border-[#00ff66]/50"></div>
              </div>
            </div>

            <div className="md:w-1/2 h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-center relative z-10">
              <span className="text-sm font-mono text-[#00ff66] tracking-widest uppercase mb-4 inline-block bg-[#00ff66]/10 px-3 py-1 rounded border border-[#00ff66]/20">
                Log Decrypted
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{activeProject.title}</h2>
              
              <div className="mb-8">
                <h4 className="text-xs font-mono text-[#a0a0a0] mb-2 uppercase tracking-widest border-b border-[#a0a0a0]/20 pb-2">Technical Stack</h4>
                <p className="text-sm font-mono text-[#7000ff]">{activeProject.tech}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-mono text-[#a0a0a0] mb-2 uppercase tracking-widest border-b border-[#a0a0a0]/20 pb-2">Mission Briefing</h4>
                <p className="text-base text-[#e0e0e0] leading-relaxed">
                  {activeProject.description}
                </p>
                <p className="text-base text-[#e0e0e0] leading-relaxed mt-4">
                  Further documentation is classified. Additional functionality includes high-speed data processing pipelines, scalable microservices, and dynamic state rendering. 
                </p>
              </div>

              <div className="flex gap-4 mt-auto">
                <a href="#" className="cyber-button px-6 py-3 text-sm flex-1 text-center" onMouseEnter={() => playHoverSound()} onClick={() => playClickSound()}>
                  View Source
                </a>
                <a href="#" className="cyber-button-alt px-6 py-3 text-sm flex-1 text-center" onMouseEnter={() => playHoverSound()} onClick={() => playClickSound()}>
                  Launch App
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
