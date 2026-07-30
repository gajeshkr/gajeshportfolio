import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const selectors = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale']
    const els = document.querySelectorAll(selectors.join(', '))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in-view'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    els.forEach((el) => observer.observe(el))

    // Also immediately check elements already in viewport
    setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view')
        }
      })
    }, 100)

    return () => observer.disconnect()
  }, [])
}
