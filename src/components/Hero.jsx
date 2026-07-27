import { useRef } from 'react'
import profile from '../data/profile'

export default function Hero() {
  const heroRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="hero" id="top" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow two" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-tag">
          <span className="dot" />
          available for opportunities
        </div>
        <h1>
          {profile.name}
          <br />
          <span className="accent">{profile.role}</span>
          <span className="hero-cursor">&nbsp;</span>
        </h1>
        <p className="hero-sub">{profile.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn" href="#contact">
            Get in touch
          </a>
          {profile.resumeUrl && (
            <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
