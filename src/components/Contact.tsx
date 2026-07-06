import { motion } from 'framer-motion'
import { useState, type SyntheticEvent } from 'react'
import { playClickSound, playHoverSound } from './AudioEngine'

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    playClickSound()
    
    const form = e.currentTarget
    const rawFormData = new FormData(form)
    const formData = new FormData()

    for (const [key, value] of rawFormData.entries()) {
      if (typeof value === 'string') {
        const sanitized = value.replace(/[<>;'"]/g, '')
        formData.append(key, sanitized)
      } else {
        formData.append(key, value)
      }
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/srivastava.deepanshu24@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    } finally {
      setIsSending(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 relative z-10 px-6 md:px-12 max-w-7xl mx-auto min-h-[90vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl relative"
      >
        {/* Console Frame / Crosshairs */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#00ff66]"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#00ff66]"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#00ff66]"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#00ff66]"></div>

        <div className="bg-[#030305]/80 backdrop-blur-md border border-[#00ff66]/20 p-8 sm:p-12 shadow-[0_0_50px_rgba(0,255,102,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12">
          
          {/* Grid Overlay inside console */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00ff66 1px, transparent 1px), linear-gradient(90deg, #00ff66 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          {/* Left: Comms Info */}
          <div className="md:w-1/2 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3 rounded-full bg-[#ff003c] animate-pulse shadow-[0_0_10px_#ff003c]"></div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tighter uppercase">
                  COMM<span className="text-[#00ff66]">_RELAY</span>
                </h2>
              </div>
              
              <div className="font-mono text-sm text-[#00ff66]/80 mb-8 border-l border-[#00ff66]/30 pl-4 py-2 space-y-1">
                <p>&gt; STATUS: SECURE CHANNEL OPEN</p>
                <p>&gt; ENCRYPTION: QUANTUM AES-256</p>
                <p>&gt; LATENCY: 12ms</p>
                <p className="text-[#a0a0a0] mt-4 max-w-md">
                  Establish a direct uplink to my terminal. Open to new missions, collaborations, and data-sharing opportunities.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-[#e0e0e0] font-mono text-sm mt-8">
              <a href="mailto:srivastava.deepanshu24@gmail.com" onMouseEnter={() => playHoverSound()} onClick={() => playClickSound()} className="flex items-center gap-4 hover:text-[#00ff66] transition-colors group p-3 border border-transparent hover:border-[#00ff66]/30 hover:bg-[#00ff66]/5">
                <span className="text-[#7000ff] group-hover:text-[#00ff66] transition-colors">[{' '}]</span>
                srivastava.deepanshu24@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/ds3042/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHoverSound()} onClick={() => playClickSound()} className="flex items-center gap-4 hover:text-[#00ff66] transition-colors group p-3 border border-transparent hover:border-[#00ff66]/30 hover:bg-[#00ff66]/5">
                <span className="text-[#7000ff] group-hover:text-[#00ff66] transition-colors">[{' '}]</span>
                LINKEDIN_UPLINK
              </a>
            </div>
          </div>
          
          {/* Right: Transmission Form */}
          <div className="md:w-1/2 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="relative group">
                <label htmlFor="name" className="block text-[10px] font-mono text-[#7000ff] mb-1 uppercase tracking-widest group-focus-within:text-[#00ff66] transition-colors">IDENTIFIER</label>
                <input type="text" id="name" name="name" required placeholder="Enter User ID" className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white font-mono focus:outline-none focus:border-[#00ff66] transition-colors placeholder:text-white/20" onMouseEnter={() => playHoverSound()} />
                {/* Laser scanline effect on focus */}
                <div className="absolute bottom-0 left-0 h-[1px] bg-[#00ff66] w-0 group-focus-within:w-full transition-all duration-500"></div>
              </div>

              <div className="relative group">
                <label htmlFor="email" className="block text-[10px] font-mono text-[#7000ff] mb-1 uppercase tracking-widest group-focus-within:text-[#00ff66] transition-colors">RETURN_ADDRESS</label>
                <input type="email" id="email" name="email" required placeholder="user@domain.com" className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white font-mono focus:outline-none focus:border-[#00ff66] transition-colors placeholder:text-white/20" onMouseEnter={() => playHoverSound()} />
                <div className="absolute bottom-0 left-0 h-[1px] bg-[#00ff66] w-0 group-focus-within:w-full transition-all duration-500"></div>
              </div>

              <div className="relative group">
                <label htmlFor="subject" className="block text-[10px] font-mono text-[#7000ff] mb-1 uppercase tracking-widest group-focus-within:text-[#00ff66] transition-colors">TRANSMISSION_VECTOR</label>
                <input type="text" id="subject" name="_subject" required placeholder="Intent of message" className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white font-mono focus:outline-none focus:border-[#00ff66] transition-colors placeholder:text-white/20" onMouseEnter={() => playHoverSound()} />
                <div className="absolute bottom-0 left-0 h-[1px] bg-[#00ff66] w-0 group-focus-within:w-full transition-all duration-500"></div>
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-[10px] font-mono text-[#7000ff] mb-1 uppercase tracking-widest group-focus-within:text-[#00ff66] transition-colors">DATA_PAYLOAD</label>
                <textarea id="message" name="message" rows={4} required placeholder="Input sequence..." className="w-full bg-[#00ff66]/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-[#00ff66] transition-colors resize-none placeholder:text-white/20 mt-2" onMouseEnter={() => playHoverSound()}></textarea>
                <div className="absolute bottom-0 left-0 h-[2px] bg-[#00ff66] w-0 group-focus-within:w-full transition-all duration-500"></div>
              </div>

              <button 
                disabled={isSending} 
                type="submit" 
                className={`w-full py-4 text-center font-bold font-mono tracking-widest uppercase transition-all duration-300 relative overflow-hidden ${
                  status === 'success' ? 'bg-[#00ff66] text-black shadow-[0_0_20px_#00ff66]' : 
                  status === 'error' ? 'bg-[#ff003c] text-white shadow-[0_0_20px_#ff003c]' :
                  'bg-white/5 text-[#00ff66] border border-[#00ff66]/50 hover:bg-[#00ff66]/20 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                }`}
                onMouseEnter={() => playHoverSound()}
              >
                {/* Glitch/Scan effect inside button */}
                <span className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-[-100%] transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10">
                  {isSending ? 'TRANSMITTING...' : status === 'success' ? 'PAYLOAD_DELIVERED' : status === 'error' ? 'TRANSMISSION_FAILED' : 'EXECUTE_TRANSMISSION'}
                </span>
              </button>
            </form>
          </div>
          
        </div>
      </motion.div>
    </section>
  )
}
