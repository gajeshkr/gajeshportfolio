import { useEffect, useRef } from 'react'

export default function BackgroundFX() {
  const particlesRef = useRef(null)

  useEffect(() => {
    // Create animated particles
    const container = particlesRef.current
    if (!container) return

    const particleCount = 15
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'bg-particle'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.setProperty('--dur', `${8 + Math.random() * 6}s`)
      particle.style.setProperty('--delay', `${Math.random() * 5}s`)
      particle.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}px`)
      container.appendChild(particle)
    }

    return () => {
      if (container) container.innerHTML = ''
    }
  }, [])

  return (
    <div className="bg-fx" aria-hidden="true">
      {/* Animated orbs */}
      <div className="bg-orb o1" />
      <div className="bg-orb o2" />
      <div className="bg-orb o3" />
      <div className="bg-orb o4" />
      
      {/* Grid overlay */}
      <div className="bg-grid" />
      
      {/* Floating particles */}
      <div className="bg-particles" ref={particlesRef} />
      
      {/* Noise texture */}
      <div className="bg-noise" />
    </div>
  )
}
