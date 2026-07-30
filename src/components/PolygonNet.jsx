import { useRef, useEffect } from 'react'

// mouseRef — optional external ref so parent can share cursor position
export default function PolygonNet({ mouseRef: externalMouse }) {
  const canvasRef   = useRef(null)
  const internalRef = useRef({ x: -9999, y: -9999 })
  const mouse       = externalMouse || internalRef
  const rafRef      = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    /* ── resize handler ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* ── config ── */
    const NODE_COUNT   = 90
    const CONNECT_DIST = 140
    const MOUSE_DIST   = 180
    const MOUSE_FORCE  = 0.015
    const BASE_SPEED   = 0.45

    /* ── create nodes ── */
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * (canvas.width  || window.innerWidth),
      y:  Math.random() * (canvas.height || window.innerHeight),
      vx: (Math.random() - 0.5) * BASE_SPEED,
      vy: (Math.random() - 0.5) * BASE_SPEED,
      r:  Math.random() * 1.8 + 1.2,
    }))

    /* ── draw loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y

      /* ── update positions ── */
      for (const n of nodes) {
        const dx = mx - n.x
        const dy = my - n.y
        const d  = Math.hypot(dx, dy)

        if (d < MOUSE_DIST && d > 0) {
          const force = MOUSE_FORCE * (1 - d / MOUSE_DIST)
          n.vx += (dx / d) * force * 60
          n.vy += (dy / d) * force * 60
        }

        /* damping */
        n.vx *= 0.97
        n.vy *= 0.97

        /* keep minimum drift */
        const spd = Math.hypot(n.vx, n.vy)
        if (spd < BASE_SPEED * 0.4) {
          n.vx += (Math.random() - 0.5) * 0.08
          n.vy += (Math.random() - 0.5) * 0.08
        }
        /* cap max */
        if (spd > 3.5) { n.vx *= 3.5 / spd; n.vy *= 3.5 / spd }

        n.x += n.vx
        n.y += n.vy

        if (n.x < 0)             { n.x = 0;             n.vx = Math.abs(n.vx) }
        if (n.x > canvas.width)  { n.x = canvas.width;  n.vx = -Math.abs(n.vx) }
        if (n.y < 0)             { n.y = 0;             n.vy = Math.abs(n.vy) }
        if (n.y > canvas.height) { n.y = canvas.height; n.vy = -Math.abs(n.vy) }
      }

      /* ── draw connecting lines ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.5
            ctx.beginPath()
            ctx.strokeStyle = `rgba(232,160,32,${alpha})`
            ctx.lineWidth   = 0.7
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      /* ── draw nodes ── */
      for (const n of nodes) {
        const dist = Math.hypot(mx - n.x, my - n.y)
        const near = dist < MOUSE_DIST

        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? n.r * 1.8 : n.r, 0, Math.PI * 2)

        if (near) {
          const t = 1 - dist / MOUSE_DIST
          ctx.fillStyle  = `rgba(255,255,255,${0.6 + t * 0.4})`
          ctx.shadowBlur  = 10 * t
          ctx.shadowColor = 'rgba(232,160,32,0.9)'
        } else {
          ctx.fillStyle  = `rgba(232,160,32,0.7)`
          ctx.shadowBlur  = 0
        }
        ctx.fill()
      }
      ctx.shadowBlur = 0

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    /* ── mouse tracking (on the SECTION, not just canvas) ── */
    const section = canvas.closest('section') || canvas.parentElement.parentElement
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [mouse])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        display:       'block',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
