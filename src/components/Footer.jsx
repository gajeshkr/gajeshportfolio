import profile from '../data/profile'
import PolygonNet from './PolygonNet'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

const socials = [
  { label: 'GitHub',   icon: '⌥', href: (p) => p.social.github   },
  { label: 'LinkedIn', icon: '💼', href: (p) => p.social.linkedin },
]

export default function Footer() {
  return (
    <footer className="footer">

      {/* ── polygon canvas ── */}
      <div className="footer-polygon-layer">
        <PolygonNet />
      </div>

      {/* ── amber glow blob top-center ── */}
      <div className="footer-blob fb1" />
      <div className="footer-blob fb2" />

      <div className="footer-content wrap">

        {/* Nav links */}
        <nav>
          <ul className="footer-links" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map(({ label, href }) => (
              <li key={label}>
                <a className="footer-link" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social icons */}
        <div className="footer-socials">
          {socials.map(({ label, icon, href }) => (
            <a
              key={label}
              className="footer-social-link"
              href={href(profile)}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()}&nbsp;
          <a href="#top">{profile.name}</a>.&nbsp;
          Open for freelance &amp; full-time opportunities.
        </p>

      </div>
    </footer>
  )
}
