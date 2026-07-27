import profile from '../data/profile'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <span className="section-label reveal">about</span>
        <h2 className="section-title reveal">A little about me</h2>
        <div className="about-grid">
          <p className="about-text reveal">{profile.about}</p>
          <dl className="about-meta reveal">
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
            <dt>Role</dt>
            <dd>{profile.role}</dd>
            <dt>Email</dt>
            <dd>{profile.email}</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
