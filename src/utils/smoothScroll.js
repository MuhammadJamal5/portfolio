export function smoothTo(targetY, duration = 900) {
  const start = window.scrollY
  const diff  = targetY - start
  const t0    = performance.now()
  const ease  = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
  const step  = now => {
    const t = Math.min((now - t0) / duration, 1)
    window.scrollTo(0, start + diff * ease(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function navClick(e, href) {
  e.preventDefault()
  if (href === '#') { smoothTo(0); return }
  const el = document.getElementById(href.slice(1))
  if (el) smoothTo(el.getBoundingClientRect().top + window.scrollY)
}
