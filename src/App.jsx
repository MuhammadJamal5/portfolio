import React, { useState, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import ScrollProgress from './components/ScrollProgress'
import Particles from './components/Particles'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Metrics from './sections/Metrics'
import About from './sections/About'
import Pipeline from './sections/Pipeline'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import { setLenis } from './utils/smoothScroll'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // Initialize Lenis Extra Smooth Scrolling on desktop only (native touch on mobile)
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768)
    if (isTouch) return

    const lenis = new Lenis({
      duration: 0.6,
      wheelMultiplier: 1.3,
      touchMultiplier: 1.5,
      infinite: false,
    })

    setLenis(lenis)

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [loaded])

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 antialiased selection:bg-indigo-600 selection:text-white relative">
      {/* Preloader Screen */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Ambient background particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <Particles />
      </div>

      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Work />
        <Metrics />
        <About />
        <Pipeline />
        <FAQ />
        <Contact />
      </main>
    </div>
  )
}
