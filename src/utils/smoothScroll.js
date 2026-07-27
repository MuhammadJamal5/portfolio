export function smoothTo(targetY) {
  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  })
}

export function navClick(e, href) {
  e.preventDefault()
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(href.slice(1))
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
