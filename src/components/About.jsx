import { useState, useEffect, useRef } from 'react'
import profile from '../data/profile'
import skills from '../data/skills'

/* ── count-up hook ── */
function useCountUp(target, duration = 1600, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const t = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(t)
  }, [target, duration, inView])
  return count
}

/* ── tab content ── */
const TABS = ['Skills', 'Experience']

const experienceItems = [
  {
    year:  '2026 – Present',
    role:  'Web Developer',
    place: 'GWMICC Pvt. Ltd.',
    desc:  'Currently working as a Web Developer — handling development, maintenance, and new feature implementation.',
  },
  {
    year:  'Mar 2023 – Jun 2026',
    role:  'Web / WordPress Developer',
    place: 'Web Infosoftware',
    desc:  'Developed and maintained WordPress websites, custom themes, ACF-based layouts, and PHP backends for multiple clients.',
  },
  {
    year:  '2022 – Early 2023',
    role:  'Web Developer Intern',
    place: 'KSJ Infotech',
    desc:  'Completed a 3-month internship working on live web projects using HTML, CSS, JavaScript, and PHP.',
  },
  {
    year:  '2022 (6 Months)',
    role:  'Core PHP Course',
    place: 'Technoglobe, Jaipur',
    desc:  'Completed a 6-month professional course in Core PHP covering OOP, MySQL, form handling, and dynamic web development.',
  },
]



export default function About() {
  const [activeTab, setActiveTab] = useState('Skills')
  const statsRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const years      = useCountUp(4,   1200, inView)
  const clients    = useCountUp(100, 1800, inView)
  const projects   = useCountUp(200, 2000, inView)
  const techSkills = useCountUp(15,  1400, inView)

  return (
    <section className="section about2-section" id="about">
      <div className="wrap">

        {/* section label */}
        <span className="section-label reveal">about me</span>

        {/* ── two-column grid ── */}
        <div className="about2-grid">

          {/* ════ LEFT ════ */}
          <div className="about2-left">
            <h2 className="about2-heading reveal">
              Captivating ideas<br />
              birth&nbsp;
              <span className="about2-accent">magnificent</span><br />
              designs.
            </h2>

            <p className="about2-desc reveal d2">{profile.about}</p>

            {/* Stats row */}
            <div className="about2-stats reveal d3" ref={statsRef}>
              <div className="about2-stat">
                <span className="about2-stat-num accent-red">{years}+</span>
                <span className="about2-stat-label">Years of<br/>Experience</span>
              </div>
              <div className="about2-stat">
                <span className="about2-stat-num accent-amber">{clients}+</span>
                <span className="about2-stat-label">Satisfied<br/>Clients</span>
              </div>
              <div className="about2-stat">
                <span className="about2-stat-num accent-amber">{projects}+</span>
                <span className="about2-stat-label">Finished<br/>Projects</span>
              </div>
              <div className="about2-stat">
                <span className="about2-stat-num accent-amber">{techSkills}+</span>
                <span className="about2-stat-label">Tech<br/>Skills</span>
              </div>
            </div>
          </div>

          {/* ════ RIGHT ════ */}
          <div className="about2-right reveal-right d2">

            {/* Tab buttons */}
            <div className="about2-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`about2-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="about2-tab-body">

              {/* ── Skills ── */}
              {activeTab === 'Skills' && (
                <div className="about2-skills-list">
                  {skills.map((group) => (
                    <div className="about2-skill-row" key={group.group}>
                      <span className="about2-skill-group">{group.group}</span>
                      <span className="about2-skill-sep">—</span>
                      <div className="about2-skill-pills">
                        {group.items.map((item) => (
                          <span className="about2-pill" key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Experience ── */}
              {activeTab === 'Experience' && (
                <div className="about2-exp-list">
                  {experienceItems.map((item, i) => (
                    <div className="about2-exp-item" key={i}>
                      <div className="about2-exp-dot" />
                      <div>
                        <div className="about2-exp-role">{item.role}</div>
                        <div className="about2-exp-place">{item.place}</div>
                        <div className="about2-exp-desc">{item.desc}</div>
                        <div className="about2-exp-year">{item.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Credentials removed ── */}

            </div>

            {/* Info meta */}
            <div className="about2-meta-row">
              <div className="about2-meta-item">
                <span className="about2-meta-icon">📍</span>
                <span>{profile.location}</span>
              </div>
              <div className="about2-meta-item">
                <span className="about2-meta-icon">✉️</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="about2-meta-item">
                <span className="about2-meta-icon">🟢</span>
                <span style={{ color: 'var(--green)' }}>Available for work</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
