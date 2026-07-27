import { useState } from 'react'
import profile from '../data/profile'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="wrap">
        <span className="section-label reveal">contact</span>
        <h2 className="contact-title reveal">Have a project in mind? Let's talk.</h2>
        <p className="contact-sub reveal">
          The fastest way to reach me is email. Feel free to also share this
          page directly with anyone who's asking for my portfolio.
        </p>
        <div className="contact-actions reveal">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn" href={profile.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>

        <div className="copy-link-wrap">
          <div className="copy-link">
            <span>$ share this-portfolio</span>
            <button onClick={handleCopy}>{copied ? 'copied!' : 'copy link'}</button>
          </div>
        </div>

        <div className="social-row">
          <a href={profile.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.social.twitter} target="_blank" rel="noreferrer">
            Twitter
          </a>
        </div>
      </div>
    </section>
  )
}
