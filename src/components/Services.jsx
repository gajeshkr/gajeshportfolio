import { useRef, useEffect, useState } from 'react'
import PolygonNet from './PolygonNet'

const services = [
  {
    icon: '🖥️',
    title: 'Web Development',
    desc:  'Creating responsive, fast, and interactive web interfaces using HTML5, CSS3, JavaScript, and React.',
    tags:  ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    icon: '🎨',
    title: 'UI / UX Design',
    desc:  'Designing clean, modern interfaces with a focus on user experience using Figma and Photopea.',
    tags:  ['Figma', 'Photopea', 'Responsive'],
  },
  {
    icon: '⚙️',
    title: 'WordPress Dev',
    desc:  'Building fully custom WordPress sites with ACF, custom themes, plugins, and PHP backends.',
    tags:  ['WordPress', 'PHP', 'MySQL', 'ACF'],
  },
  {
    icon: '🌐',
    title: 'Website Builder',
    desc:  'Rapid site creation using Wix with pixel-perfect layouts and smooth user journeys.',
    tags:  ['Wix', 'Landing Page', 'SEO'],
  },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  /* 3-D tilt on hover */
  const onMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`
  }
  const onLeave = () => {
    const card = cardRef.current
    if (card) card.style.transform = ''
    setHovered(false)
  }

  return (
    <div
      className={`svc-card reveal`}
      style={{ '--reveal-delay': `${0.1 + index * 0.1}s` }}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
    >
      {/* top accent line */}
      <div className="svc-card-line" />

      {/* icon */}
      <div className={`svc-icon ${hovered ? 'svc-icon-hovered' : ''}`}>
        {service.icon}
      </div>

      {/* text */}
      <h3 className="svc-title">{service.title}</h3>
      <p  className="svc-desc">{service.desc}</p>

      {/* tags */}
      <div className="svc-tags">
        {service.tags.map(t => (
          <span className="svc-tag" key={t}>{t}</span>
        ))}
      </div>

      {/* arrow link */}
      <div className={`svc-arrow ${hovered ? 'svc-arrow-hovered' : ''}`}>↗</div>
    </div>
  )
}

export default function Services() {
  return (
    <section className="section svc-section" id="services">

      {/* ── polygon canvas fills the whole section ── */}
      <div className="svc-polygon-layer">
        <PolygonNet />
      </div>

      {/* ── red / amber decorative blobs ── */}
      <div className="svc-blob sb1" />
      <div className="svc-blob sb2" />

      <div className="wrap svc-wrap">

        {/* LEFT headline */}
        <div className="svc-headline reveal">
          <span className="section-label">what I offer</span>
          <h2 className="svc-title-main">
            My services<span className="svc-dot">.</span>
          </h2>
          <p className="svc-sub">
            From concept to deployment — I handle design,
            development, and delivery end-to-end.
          </p>
        </div>

        {/* RIGHT cards grid */}
        <div className="svc-cards">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
