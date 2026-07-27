import { useState, useCallback } from 'react'
import Preloader from './components/Preloader'
import Noise from './components/Noise'
import ScrollProgress from './components/ScrollProgress'
import SoundToggle from './components/SoundToggle'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Work from './sections/Work'
import About from './sections/About'
import Pipeline from './sections/Pipeline'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Experience from './sections/Experience'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      <Noise />
      <ScrollProgress />
      <Preloader onDone={handleDone} />

      {loaded && (
        <div className="min-h-screen">
          <Nav />
          <main>
            <Hero />
            <Work />
            <About />
            <Pipeline />
            <Skills />
            <Services />
            <Experience />
            <Certifications />
            <Contact />
          </main>
        </div>
      )}
      {loaded && <SoundToggle />}
    </>
  )
}
