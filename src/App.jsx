import { useEffect, useRef, useState } from 'react'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import About        from './components/About'
import Services     from './components/Services'
import Projects     from './components/Projects'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import BackgroundFX from './components/BackgroundFX'
import useScrollReveal from './hooks/useScrollReveal'

function CursorFollower() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      // Hover detect
      const target = e.target
      const isHoverable = target.closest('a, button, [role="button"], .skill-pill, .project-card')
      dotRef.current?.classList.toggle('hover', !!isHoverable)
      ringRef.current?.classList.toggle('hover', !!isHoverable)
    }

    const onLeave = () => setVisible(false)

    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`
        dotRef.current.style.top  = `${pos.current.y}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top  = `${ring.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  if (window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  )
}

export default function App() {
  useScrollReveal()

  // Pad body top for fixed nav
  useEffect(() => {
    document.body.style.paddingTop = '0'
  }, [])

  return (
    <>
      <CursorFollower />
      <BackgroundFX />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
