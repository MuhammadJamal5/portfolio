// Single global mouse tracker — replaces per-component window.addEventListener('mousemove')
const _pos = { x: 0, y: 0, nx: 0, ny: 0 }

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    _pos.x = e.clientX
    _pos.y = e.clientY
    _pos.nx = e.clientX / window.innerWidth
    _pos.ny = e.clientY / window.innerHeight
  }, { passive: true })
}

export const mouse = _pos
