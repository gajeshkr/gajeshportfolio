import skills from '../data/skills'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <span className="section-label reveal">skills</span>
        <h2 className="section-title reveal">What I work with</h2>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="reveal" key={group.group}>
              <div className="skill-group-title">{group.group}</div>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <span className="skill-pill" key={item}>
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
