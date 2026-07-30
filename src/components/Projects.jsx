import { useRef, useEffect } from 'react'
import projects from '../data/projects'
import PolygonNet from './PolygonNet'

// Unique gradient + icon per card index
const cardThemes = [
  {
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 40%, #0f3460 100%)',
    accent: '#e94560',
    icon: '🌐',
    pattern: 'radial-gradient(circle at 20% 50%, rgba(233,69,96,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(76,130,255,0.12) 0%, transparent 40%)',
  },
  {
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0a3d2e 100%)',
    accent: '#00d4aa',
    icon: '⚡',
    pattern: 'radial-gradient(circle at 70% 60%, rgba(0,212,170,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 30%, rgba(232,160,32,0.1) 0%, transparent 40%)',
  },
  {
    gradient: 'linear-gradient(135deg, #1a0e2e 0%, #2d1b4e 40%, #1a0e2e 100%)',
    accent: '#a855f7',
    icon: '🚀',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(168,85,247,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(76,130,255,0.1) 0%, transparent 40%)',
  },
  {
    gradient: 'linear-gradient(135deg, #0a1a10 0%, #0d2818 40%, #1a2e0a 100%)',
    accent: '#3ddc84',
    icon: '🎯',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(61,220,132,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(232,160,32,0.1) 0%, transparent 40%)',
  },
  {
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2e1a0a 40%, #1a1000 100%)',
    accent: '#ff8c42',
    icon: '💡',
    pattern: 'radial-gradient(circle at 60% 40%, rgba(255,140,66,0.18) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(232,160,32,0.1) 0%, transparent 40%)',
  },
  {
    gradient: 'linear-gradient(135deg, #0a1828 0%, #0d2040 40%, #162030 100%)',
    accent: '#4c82ff',
    icon: '🔧',
    pattern: 'radial-gradient(circle at 40% 30%, rgba(76,130,255,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.1) 0%, transparent 40%)',
  },
]

function ProjectThumb({ project, index, theme }) {
  return (
    <div className="project-thumb-inner" style={{ background: theme.gradient, width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Pattern overlay */}
      <div style={{ position: 'absolute', inset: 0, background: theme.pattern }} />

      {/* Animated grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${theme.accent}18 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}18 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      {/* Floating circles decoration */}
      <div style={{
        position: 'absolute', top: '12%', right: '12%',
        width: 60, height: 60, borderRadius: '50%',
        border: `1.5px solid ${theme.accent}40`,
        animation: 'ringPulse 3s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '12%', right: '12%',
        width: 90, height: 90, borderRadius: '50%',
        border: `1px solid ${theme.accent}20`,
        marginTop: -15, marginRight: -15,
        animation: 'ringPulse 3s ease-in-out infinite 0.5s',
      }} />

      {/* Center content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 10, zIndex: 1,
      }}>
        {/* Icon bubble */}
        <div style={{
          width: 52, height: 52, borderRadius: '14px',
          background: `${theme.accent}20`,
          border: `1.5px solid ${theme.accent}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24,
          boxShadow: `0 0 24px ${theme.accent}30`,
        }}>
          {theme.icon}
        </div>

        {/* Project name */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          fontWeight: 600,
          color: '#fff',
          textAlign: 'center',
          padding: '0 16px',
          textShadow: `0 0 20px ${theme.accent}60`,
        }}>
          {project.title}
        </div>

        {/* Tags row */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', padding: '0 12px' }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              padding: '3px 8px',
              borderRadius: 4,
              background: `${theme.accent}18`,
              border: `1px solid ${theme.accent}40`,
              color: theme.accent,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom shimmer bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        animation: 'shimmerSlide 2.5s ease-in-out infinite',
      }} />
    </div>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  // Each card observes itself — more reliable than global observer
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Already in view on mount (e.g. first card)
    const rect = card.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setTimeout(() => card.classList.add('in-view'), index * 80)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.add('in-view')
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [index])

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ''
  }

  return (
    <article
      className="project-card reveal"
      style={{ '--reveal-delay': `${index * 0.08}s` }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-thumb">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <ProjectThumb project={project} index={index} theme={cardThemes[index % cardThemes.length]} />
        )}
        <span className="project-num">0{index + 1}</span>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project-links">
          {project.liveUrl && (
            <a
              className="project-link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="project-link-icon">🌐</span>
              <span>View Project</span>
            </a>
          )}
          {project.codeUrl && (
            <a
              className="project-link"
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="project-link-icon">{'</>'}</span>
              <span>Source Code</span>
            </a>
          )}
          {!project.liveUrl && !project.codeUrl && (
            <span className="project-link-soon">
              <span>🔒</span>
              <span>Private Project</span>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="section proj-section" id="projects">

      {/* polygon canvas */}
      <div className="proj-polygon-layer">
        <PolygonNet />
      </div>

      {/* blobs */}
      <div className="proj-blob pb1" />
      <div className="proj-blob pb2" />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-label reveal">my work</span>
        <h2 className="section-title reveal">Recent Projects</h2>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
