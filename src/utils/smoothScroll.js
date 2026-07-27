let lenisInstance = null

export function setLenis(lenis) {
  lenisInstance = lenis
}

export function getLenis() {
  return lenisInstance
}

export function smoothTo(targetY) {
  if (lenisInstance) {
    lenisInstance.scrollTo(targetY, { duration: 1.2 })
  } else {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }
}

export function navClick(e, href) {
  if (e) e.preventDefault()
  if (href === '#') {
    smoothTo(0)
    return
  }
  const el = document.getElementById(href.slice(1))
  if (el) {
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { offset: -70, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
