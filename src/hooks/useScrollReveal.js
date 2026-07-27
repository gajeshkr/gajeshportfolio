import { useEffect } from 'react'

// Watches every element with class="reveal" and adds "in-view" once it
// scrolls into the viewport. Runs once, globally, after the page mounts.
export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')

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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
