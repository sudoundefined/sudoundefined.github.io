import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailingRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)
  const position = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })
  const trailingPosition = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })

  useEffect(() => {
    // Check if on mobile (touch device), if so, do not activate custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    let animationFrameId: number

    const updatePosition = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea'
      ) {
        isHovering.current = true
      } else {
        isHovering.current = false
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current && trailingRef.current) {
        cursorRef.current.style.opacity = '0'
        trailingRef.current.style.opacity = '0'
      }
    }

    const handleMouseEnter = () => {
      if (cursorRef.current && trailingRef.current) {
        cursorRef.current.style.opacity = '1'
        trailingRef.current.style.opacity = isHovering.current ? '0.8' : '0.4'
      }
    }

    const renderLoop = () => {
      // Interpolate trailing position
      trailingPosition.current.x += (position.current.x - trailingPosition.current.x) * 0.15
      trailingPosition.current.y += (position.current.y - trailingPosition.current.y) * 0.15

      if (cursorRef.current && trailingRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) scale(${isHovering.current ? 1.5 : 1})`
        if (isHovering.current) {
          cursorRef.current.style.backgroundColor = 'rgba(0, 255, 102, 0.2)'
        } else {
          cursorRef.current.style.backgroundColor = 'transparent'
        }
        
        trailingRef.current.style.transform = `translate3d(${trailingPosition.current.x}px, ${trailingPosition.current.y}px, 0) scale(${isHovering.current ? 2.5 : 1})`
        if (isHovering.current) {
           trailingRef.current.style.opacity = '0.8'
        } else {
           trailingRef.current.style.opacity = '0.4'
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    animationFrameId = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <div className="hidden sm:block">
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 rounded-full pointer-events-none z-[9999] transition-colors duration-200 ease-out border border-[#00ff66] mix-blend-screen"
        style={{ willChange: 'transform, opacity' }}
      />
      <div 
        ref={trailingRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[9998] bg-[#7000ff] blur-[4px] mix-blend-screen transition-opacity duration-300"
        style={{ willChange: 'transform, opacity' }}
      />
    </div>
  )
}

export default CustomCursor
