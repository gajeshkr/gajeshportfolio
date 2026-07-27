import profile from '../data/profile'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="logo" href="#top">
          <span>&gt;_</span> {profile.name}
        </a>
        <ul className="nav-links">
          <li><a href="#about">about</a></li>
          <li><a href="#skills">skills</a></li>
          <li><a href="#projects">projects</a></li>
          <li><a href="#contact">contact</a></li>
        </ul>
      </div>
    </header>
  )
}
