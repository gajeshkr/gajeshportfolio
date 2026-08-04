import { useState, useEffect } from 'react'
import profile from '../data/profile'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for nav styling
      setScrolled(window.scrollY > 50)

      // Calculate scroll progress
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setProgress(scrolled)

      // Detect active section
      const sections = ['top', 'about', 'services', 'projects', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobile = () => setMobileOpen(!mobileOpen)

  const handleLinkClick = () => {
    setMobileOpen(false)
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-progress" style={{ '--progress': `${progress}%` }} />
      <div className="nav-inner">
        <a className="logo" href="#top" onClick={handleLinkClick}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">{profile.name.split(' ')[0]}</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <ul className="nav-links">
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              data-num="01"
            >
              about
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              className={activeSection === 'services' ? 'active' : ''}
              data-num="02"
            >
              services
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              data-num="03"
            >
              projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              data-num="04"
            >
              contact
            </a>
          </li>
        </ul>

        <a className="nav-cta" href="tel:+917891162667">
          Let's talk
        </a>

        <button 
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={`nav-mobile ${mobileOpen ? 'open' : ''}`}>
        <a href="#about" onClick={handleLinkClick}>01. About</a>
        <a href="#services" onClick={handleLinkClick}>02. Services</a>
        <a href="#projects" onClick={handleLinkClick}>03. Projects</a>
        <a href="#contact" onClick={handleLinkClick}>04. Contact</a>
      </nav>
    </header>
  )
}
