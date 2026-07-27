import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUp } from 'lucide-react'
import { smoothTo, navClick } from '../utils/smoothScroll'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#work',     label: 'Portfolio' },
  { href: '#about',    label: 'Capabilities' },
  { href: '#pipeline', label: 'Process' },
  { href: '#contact',  label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const ids = links.map(l => l.href.slice(1))
    const update = () => {
      setScrolled(window.scrollY > 40)
      let found = 'home'
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#000000]/90 backdrop-blur-xl border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => navClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-600/30">
              MJ
            </div>
            <span className="text-white font-semibold tracking-tight text-base">
              Muhammed Jamal
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => {
              const id = href.slice(1)
              const isActive = activeId === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => navClick(e, href)}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right Action Button */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={e => navClick(e, '#contact')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25"
            >
              Get In Touch
            </a>

            <button
              className="md:hidden text-zinc-300 hover:text-white p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => { navClick(e, href); setOpen(false) }}
                    className="text-2xl font-semibold text-white py-2 block border-b border-zinc-800"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={e => { navClick(e, '#contact'); setOpen(false) }}
              className="mt-8 flex items-center justify-center py-4 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top */}
      {scrolled && (
        <button
          onClick={() => smoothTo(0)}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-zinc-900 border border-white/10 text-white flex items-center justify-center shadow-2xl hover:bg-indigo-600 transition-all"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </>
  )
}
