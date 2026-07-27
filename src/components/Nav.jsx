import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react'
import { smoothTo, navClick } from '../utils/smoothScroll'

const links = [
  { href: '#work',     label: 'Selected Work' },
  { href: '#about',    label: 'Capabilities' },
  { href: '#pipeline', label: 'AI Process' },
  { href: '#contact',  label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  const { scrollYProgress } = useScroll()
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const ids = links.map(l => l.href.slice(1))
    const update = () => {
      setScrolled(window.scrollY > 40)
      let found = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - 180 <= 0) found = id
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
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 transition-all duration-300"
      >
        <motion.div
          style={{
            scaleX: progressScaleX,
            originX: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
            pointerEvents: 'none',
          }}
        />

        <nav className="max-w-6xl mx-auto flex items-center justify-between p-3 sm:px-6 sm:py-3.5 rounded-full nubien-card bg-[#0e0e14]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={e => navClick(e, '#')}
            className="flex items-center gap-2.5 px-2"
          >
            <div className="w-8 h-8 rounded-full bg-white text-black font-black flex items-center justify-center text-xs tracking-tighter">
              MJ
            </div>
            <span className="text-sm font-bold text-white tracking-tight hidden sm:inline-block">
              MUHAMMED JAMAL
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 sm:gap-2">
            {links.map(({ href, label }) => {
              const id = href.slice(1)
              const isActive = activeId === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => navClick(e, href)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/15'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA Action */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => navClick(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-all duration-200"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col pt-28 px-6 bg-[#08080c]/98 backdrop-blur-2xl"
          >
            <ul className="flex flex-col gap-4">
              {links.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={href}
                    onClick={e => { navClick(e, href); setOpen(false) }}
                    className="text-2xl font-bold text-white flex items-center justify-between py-3 border-b border-white/5"
                  >
                    <span>{label}</span>
                    <ArrowUpRight size={20} className="text-zinc-500" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={e => { navClick(e, '#contact'); setOpen(false) }}
              className="mt-8 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-black font-bold text-base"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => smoothTo(0)}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-zinc-900/90 border border-white/15 text-white flex items-center justify-center backdrop-blur-xl shadow-xl hover:bg-white hover:text-black transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
