import profile from '../data/profile'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

const socials = [
  { label: 'GitHub',   icon: '⌥', href: (p) => p.social.github   },
  { label: 'LinkedIn', icon: '💼', href: (p) => p.social.linkedin },
  { label: 'Twitter',  icon: '𝕏',  href: (p) => p.social.twitter  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content wrap">
        {/* Logo */}
        <div className="footer-logo">
          <span className="footer-logo-bracket">&lt;</span>
          {profile.name}
          <span className="footer-logo-bracket">/&gt;</span>
        </div>

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

        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()}&nbsp;
          <a href="#top">{profile.name}</a>.
          &nbsp;Built with React &amp; ❤️. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
