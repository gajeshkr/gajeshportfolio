import { useState } from 'react'
import profile from '../data/profile'
import PolygonNet from './PolygonNet'

// ─────────────────────────────────────────────────────────────
// 👇 Formspree se form banao (formspree.io) aur apna URL yahan daalo
const FORMSPREE_URL = 'https://formspree.io/f/xqerrgbk'
// Example: 'https://formspree.io/f/xyzabcde'
// ─────────────────────────────────────────────────────────────

const socials = [
  { label: 'GitHub',   icon: '⌥', href: (p) => p.social.github         },
  { label: 'LinkedIn', icon: '💼', href: (p) => p.social.linkedin       },
  { label: 'Email',    icon: '✉️', href: (p) => `mailto:${p.email}`     },
]

export default function Contact() {
  const [copied, setCopied]   = useState(false)
  const [form,   setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus]   = useState('idle') // idle | sending | success | error

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const btnLabel = {
    idle:    '🚀 Send Message',
    sending: '⏳ Sending...',
    success: '✅ Message Sent!',
    error:   '❌ Failed — try again',
  }[status]

  return (
    <section className="section contact-section" id="contact">

      {/* polygon canvas */}
      <div className="contact-polygon-layer">
        <PolygonNet />
      </div>

      {/* blobs */}
      <div className="contact-blob cb1" />
      <div className="contact-blob cb2" />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-label reveal">get in touch</span>
        <h2 className="contact-title reveal">
          Have a project in mind?<br />Let's build it together.
        </h2>
        <p className="contact-sub reveal d2">
          Fill the form below and I'll get back to you within 24 hours.
          Or reach me directly via email.
        </p>

        {/* Quick action buttons */}
        <div className="contact-actions reveal d3">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            <span>✉️</span>
            <span>Email me directly</span>
          </a>
          <a className="btn" href="https://www.linkedin.com/in/gajesh-sharma-05702b266" target="_blank" rel="noreferrer">
            <span>💼</span>
            <span>LinkedIn</span>
          </a>
        </div>

        {/* ── Contact form ── */}
        <form className="contact-form reveal d3" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                className="form-input"
                type="text"
                name="name"
                placeholder="Gajesh Sharma"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                className="form-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className="form-textarea"
              name="message"
              placeholder="Tell me about your project or idea..."
              value={form.message}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
            />
          </div>

          {/* Success banner */}
          {status === 'success' && (
            <div className="form-banner form-banner-success">
              🎉 Message received! I'll reply within 24 hours.
            </div>
          )}

          {/* Error banner */}
          {status === 'error' && (
            <div className="form-banner form-banner-error">
              ⚠️ Something went wrong. Please try again or email me directly.
            </div>
          )}

          <button
            className="form-submit"
            type="submit"
            disabled={status === 'sending' || status === 'success'}
          >
            {btnLabel}
          </button>
        </form>

        {/* Social icons */}
        <div className="contact-socials reveal d4">
          {socials.map(({ label, icon, href }) => (
            <a
              key={label}
              className="social-link"
              href={href(profile)}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Copy link */}
        <div className="copy-link-wrap reveal d5">
          <div className="copy-link">
            <span>$ share this-portfolio</span>
            <button onClick={handleCopy} type="button">
              {copied ? '✅ copied!' : 'copy link'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
