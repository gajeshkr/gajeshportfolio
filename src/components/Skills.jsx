import skills from '../data/skills'

const groupIcons = {
  Languages:        '🔤',
  Frontend:         '🎨',
  Backend:          '⚙️',
  'CMS & Builders': '🌐',
  'Tools & Design': '🛠️',
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <span className="section-label reveal">what I know</span>
        <h2 className="section-title reveal">Skills & Technologies</h2>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <div
              className={`skill-card reveal`}
              style={{ '--reveal-delay': `${i * 0.1}s` }}
              key={group.group}
            >
              <div className="skill-card-header">
                <span className="skill-card-icon">
                  {groupIcons[group.group] || '💡'}
                </span>
                <div className="skill-group-title">{group.group}</div>
              </div>

              <div className="skill-pills">
                {group.items.map((item, j) => (
                  <span
                    className="skill-pill"
                    key={item}
                    style={{ '--reveal-delay': `${i * 0.1 + j * 0.05}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
