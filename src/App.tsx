import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Scene from './components/Scene'
import Hero from './components/Hero'
import Skills from './components/Skills'
// import Projects from './components/Projects' // Hidden for now
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import CustomCursor from './components/CustomCursor'
import AudioEngine, { playClickSound, playHoverSound } from './components/AudioEngine'
import WarpOverlay from './components/WarpOverlay'
import Loader from './components/Loader'
import { scrollState } from './utils/scrollState'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeScene, setActiveScene] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [is404, setIs404] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [isWarping, setIsWarping] = useState(false)
  const [isBooted, setIsBooted] = useState(false)

  useEffect(() => {
    // 404 router check — works for both root domain and GitHub Pages subpath
    const path = window.location.pathname
    // Get the base path from Vite's import.meta.env.BASE_URL (e.g., '/' or '/repo-name/')
    const basePath = import.meta.env.BASE_URL || '/'
    // Normalize: strip the base prefix and trailing slashes
    const relativePath = path.replace(basePath, '').replace(/^\/+|\/+$/g, '')
    // If there's a remaining path segment beyond the base, it's a 404
    if (relativePath.length > 0 && relativePath !== 'index.html') {
      setIs404(true)
      return
    }

    let animationFrameId: number;

    const handleScroll = () => {
      // Set scrolled state earlier for better visual transition
      setScrolled(window.scrollY > 20)
      
      // Update velocity
      const currentY = window.scrollY
      scrollState.velocity = currentY - scrollState.lastY
      scrollState.lastY = currentY
    }

    // Decay loop for velocity
    const decayVelocity = () => {
      scrollState.velocity *= 0.9 // Dampen
      if (Math.abs(scrollState.velocity) < 0.1) scrollState.velocity = 0
      animationFrameId = requestAnimationFrame(decayVelocity)
    }
    
    decayVelocity()

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Call once initially to set correct state if page is loaded scrolled down
    handleScroll()

    // Robust Intersection Observer for section background changes
    const sections = ['about', 'skills', 'experience', 'education', 'contact']
    const observers = sections.map((id, index) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            let sceneIndex = index + 1;
            if (sceneIndex > 5) sceneIndex = 5; // Contact maps to 5 (Wormhole)
            setActiveScene(sceneIndex as 1 | 2 | 3 | 4 | 5)
          }
        },
        {
          threshold: 0.15, // Trigger when 15% visible
          rootMargin: '-20% 0px -30% 0px' // Adjust active viewport box
        }
      )
      observer.observe(el)
      return { observer, el }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el)
      })
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    playClickSound()
    // Only warp if it's an anchor link on the same page
    if (targetId.startsWith('#')) {
      e.preventDefault()
      setIsWarping(true)
      setMenuOpen(false)

      setTimeout(() => {
        const el = document.querySelector(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'auto' })
        }
      }, 300) // Wait for warp flash to cover screen

      setTimeout(() => {
        setIsWarping(false)
      }, 800)
    }
  }

  if (is404) {
    return <NotFound />
  }

  return (
    <div className="relative min-h-[100dvh]">
      <AnimatePresence>
        {!isBooted && <Loader onComplete={() => setIsBooted(true)} />}
      </AnimatePresence>

      <CustomCursor />
      <AudioEngine enabled={audioEnabled} />
      <WarpOverlay isWarping={isWarping} />

      {/* 3D Simulation Background */}
      <Scene activeScene={activeScene} />

      {/* Navigation - Increased z-index to 100 to prevent overlap */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 px-6 md:px-12 flex justify-between items-center ${scrolled ? 'py-3 bg-[#030305]/95 backdrop-blur-md border-b border-[#00ff66]/20 shadow-[0_4px_30px_rgba(0,255,102,0.15)]' : 'py-5 bg-transparent'}`}>
        <a href="#" className="text-2xl font-bold tracking-widest z-50 font-mono text-[#00ff66] uppercase" onClick={(e) => handleNavClick(e, '#about')} onMouseEnter={() => playHoverSound()}>&lt;DS/&gt;</a>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-mono text-sm uppercase tracking-widest">
          <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} onMouseEnter={() => playHoverSound()} className="text-[#a0a0a0] hover:text-[#00ff66] transition-colors">About</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} onMouseEnter={() => playHoverSound()} className="text-[#a0a0a0] hover:text-[#00ff66] transition-colors">Skills</a></li>
          {/* <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} onMouseEnter={() => playHoverSound()} className="text-[#a0a0a0] hover:text-[#00ff66] transition-colors">Projects</a></li> */}
          <li><a href="#experience" onClick={(e) => handleNavClick(e, '#experience')} onMouseEnter={() => playHoverSound()} className="text-[#a0a0a0] hover:text-[#00ff66] transition-colors">Experience</a></li>
          <li><a href="#education" onClick={(e) => handleNavClick(e, '#education')} onMouseEnter={() => playHoverSound()} className="text-[#a0a0a0] hover:text-[#00ff66] transition-colors">Education</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} onMouseEnter={() => playHoverSound()} className="cyber-button px-5 py-2">Contact</a></li>
          <li><a href="/Resume.pdf" download="Deepanshu_Srivastava_Resume.pdf" onMouseEnter={() => playHoverSound()} onClick={() => playClickSound()} className="cyber-button px-5 py-2" style={{ backgroundColor: 'rgba(0, 255, 102, 0.1)' }}>Resume</a></li>
          
          {/* Comms Toggle Button */}
          <li>
            <button 
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                if (!audioEnabled) playClickSound();
              }} 
              onMouseEnter={() => audioEnabled && playHoverSound()}
              className={`p-2 rounded-full border transition-all ${audioEnabled ? 'border-[#00ff66] text-[#00ff66] bg-[#00ff66]/10 shadow-[0_0_10px_rgba(0,255,102,0.5)]' : 'border-[#a0a0a0] text-[#a0a0a0] hover:border-[#00ff66] hover:text-[#00ff66]'}`}
              title={audioEnabled ? "Disable Comms" : "Enable Comms"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                {audioEnabled ? (
                  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707zM10.121 12.596A6.474 6.474 0 0 0 12.025 8a6.474 6.474 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706zM8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                ) : (
                  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
                )}
              </svg>
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => { setMenuOpen(!menuOpen); playClickSound(); }}
          onMouseEnter={() => playHoverSound()}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 relative focus:outline-none"
        >
          <span className={`w-6 h-[2px] bg-[#00ff66] transition-all duration-300 absolute ${menuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
          <span className={`w-6 h-[2px] bg-[#00ff66] transition-all duration-300 absolute ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-[2px] bg-[#00ff66] transition-all duration-300 absolute ${menuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#030305]/95 backdrop-blur-xl flex flex-col items-center justify-center transition-opacity duration-300 z-40 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <ul className="flex flex-col gap-6 text-center text-xl font-mono uppercase tracking-widest">
            <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-[#e0e0e0] hover:text-[#00ff66]">About</a></li>
            <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="text-[#e0e0e0] hover:text-[#00ff66]">Skills</a></li>
            {/* <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="text-[#e0e0e0] hover:text-[#00ff66]">Projects</a></li> */}
            <li><a href="#experience" onClick={(e) => handleNavClick(e, '#experience')} className="text-[#e0e0e0] hover:text-[#00ff66]">Experience</a></li>
            <li><a href="#education" onClick={(e) => handleNavClick(e, '#education')} className="text-[#e0e0e0] hover:text-[#00ff66]">Education</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="cyber-button px-8 py-3 mt-4 inline-block">Contact</a></li>
            <li><a href="/Resume.pdf" download="Deepanshu_Srivastava_Resume.pdf" onClick={() => { setMenuOpen(false); playClickSound(); }} className="cyber-button px-8 py-3 mt-4 inline-block" style={{ backgroundColor: 'rgba(0, 255, 102, 0.1)' }}>Resume</a></li>
            
            {/* Mobile Comms Toggle */}
            <li className="mt-8">
              <button 
                onClick={() => { setAudioEnabled(!audioEnabled); if(!audioEnabled) playClickSound(); }}
                className={`flex items-center gap-3 mx-auto px-6 py-2 rounded-full border transition-all ${audioEnabled ? 'border-[#00ff66] text-[#00ff66] bg-[#00ff66]/10' : 'border-[#a0a0a0] text-[#a0a0a0]'}`}
              >
                <span>COMMS {audioEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 selection:bg-[#7000ff] selection:text-white">
        <Hero />
        <Skills />
        {/* <Projects /> */}
        <Experience />
        <Education />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-[#00ff66]/20 bg-[#030305] py-8 text-center text-[#888] font-mono text-sm">
        <p>SYSTEM.HALT(); &copy; {new Date().getFullYear()} Deepanshu Srivastava.</p>
      </footer>
    </div>
  )
}

export default App
