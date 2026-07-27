import projects from '../data/projects'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <span className="section-label reveal">projects</span>
        <h2 className="section-title reveal">Recent work</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.title}>
              <div className="project-thumb">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <span>add image →  src/assets/</span>
                )}
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  )}
                  {!project.liveUrl && !project.codeUrl && (
                    <span style={{ color: 'var(--text-muted)' }}>links coming soon</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
