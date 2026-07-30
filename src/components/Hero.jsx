import { useRef, useState, useEffect } from 'react'
import profile from '../data/profile'
import PolygonNet from './PolygonNet'

export default function Hero() {
  const heroRef   = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const [typedText, setTypedText] = useState('')
  const fullText = profile.role

  /* ── spotlight (pass coords to canvas section) ── */
  const handleMouseMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  /* ── typing animation ── */
  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        if (i <= fullText.length) { setTypedText(fullText.slice(0, i)); i++ }
        else clearInterval(iv)
      }, 100)
      return () => clearInterval(iv)
    }, 800)
    return () => clearTimeout(timer)
  }, [fullText])

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* ── full-section polygon canvas ── */}
      <div className="hero-polygon-layer">
        <PolygonNet />
      </div>

      {/* ── subtle red/amber glow blobs (like reference) ── */}
      <div className="hero-blob hb1" />
      <div className="hero-blob hb2" />

      {/* ── spotlight ── */}
      <div className="hero-spotlight" />

      {/* ── two-column layout ── */}
      <div className="wrap hero-wrap">

        {/* LEFT — text content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="status-dot" />
            available for opportunities
          </div>

          <h1 className="hero-title">
            Transforming Ideas
            <span className="line2">
              Into&nbsp;
              <span className="hero-accent">
                {typedText}
                <span className="hero-cursor-blink" />
              </span>
            </span>
          </h1>

          <p className="hero-sub">{profile.tagline}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              <span>View My Work</span>
              <span className="btn-icon">→</span>
            </a>
            <a className="btn" href="#contact">
              <span>Get In Touch</span>
            </a>
            {profile.resumeUrl && (
              <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <span>Resume</span>
                <span className="btn-icon">↓</span>
              </a>
            )}
          </div>

          <div className="hero-badges">
            <div className="hero-badge"><span className="hero-badge-icon">⚡</span><span>Fast</span></div>
            <div className="hero-badge"><span className="hero-badge-icon">🎨</span><span>Clean Design</span></div>
            <div className="hero-badge"><span className="hero-badge-icon">📱</span><span>Responsive</span></div>
            <div className="hero-badge"><span className="hero-badge-icon">✨</span><span>Modern Stack</span></div>
          </div>
        </div>

        {/* RIGHT — polygon visual (no image, just the net focused here) */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-ring rv1" />
          <div className="hero-visual-ring rv2" />
          <div className="hero-visual-ring rv3" />
          <div className="hero-visual-center">
            <span className="hero-visual-icon">👨‍💻</span>
          </div>
        </div>

      </div>

      {/* scroll hint */}
      <div className="hero-scroll-hint">
        <span>scroll</span>
      </div>
    </section>
  )
}
