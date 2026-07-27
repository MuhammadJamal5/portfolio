import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ArrowUp } from 'lucide-react'
import { smoothTo, navClick } from '../utils/smoothScroll'

const links = [
  { href: '#work',       label: 'Work' },
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#services',   label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact' },
]

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [open,       setOpen]       = useState(false)
  const [activeId,   setActiveId]   = useState('')
  const [hoveredId,  setHoveredId]  = useState(null)

  const { scrollYProgress } = useScroll()
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const ids = links.map(l => l.href.slice(1))
    const update = () => {
      setScrolled(window.scrollY > 60)
      let found = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        const threshold = 160
        if (top - threshold <= 0) found = id
      }
      setActiveId(found)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          paddingTop: '0.6rem',
          paddingBottom: '0.6rem',
          background: 'rgba(4,4,10,0.92)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        } : {
          paddingTop: '1.1rem',
          paddingBottom: '1.1rem',
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{
            scaleX: progressScaleX,
            originX: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1.5px',
            background: 'linear-gradient(90deg, #3730a3, #818cf8, #c084fc, #f472b6)',
            pointerEvents: 'none',
          }}
        />

        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={e => navClick(e, '#')}
            className="text-xl font-black tracking-tight"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MJ
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-8">
            {links.map(({ href, label }) => {
              const id = href.slice(1)
              const lit = activeId === id || hoveredId === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => navClick(e, href)}
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative text-sm font-medium tracking-wide"
                    style={{
                      color: lit ? '#fff' : 'rgba(148,163,184,0.85)',
                      transition: 'color 0.25s',
                    }}
                  >
                    {label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1px] rounded-full"
                      style={{
                        right: lit ? '0' : '100%',
                        background: 'linear-gradient(90deg, #818cf8, #c084fc)',
                        transition: 'right 0.3s ease',
                      }}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            onClick={e => navClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3730a3, #6d28d9, #be185d)' }}
          >
            Hire Me
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden transition-colors duration-200"
            style={{ color: 'rgba(148,163,184,0.8)' }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col pt-20"
            style={{ background: 'rgba(4,4,10,0.97)', backdropFilter: 'blur(28px)' }}
          >
            <ul className="flex flex-col items-center gap-6 pt-10">
              {links.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={href}
                    onClick={e => { navClick(e, href); setOpen(false) }}
                    className="text-3xl font-black text-white hover:text-indigo-400 transition-colors"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}>
                <a
                  href="#contact"
                  onClick={e => { navClick(e, '#contact'); setOpen(false) }}
                  className="mt-4 inline-flex px-10 py-4 rounded-full text-xl font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #3730a3, #6d28d9, #be185d)' }}
                >
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back-to-top button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => smoothTo(0)}
            className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(6,6,12,0.85)',
              border: '1px solid rgba(129,140,248,0.35)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#818cf8',
              boxShadow: '0 0 20px rgba(129,140,248,0.12)',
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
