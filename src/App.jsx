import ScrollProgress from './components/ScrollProgress'
import Particles from './components/Particles'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Metrics from './sections/Metrics'
import About from './sections/About'
import Pipeline from './sections/Pipeline'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 antialiased selection:bg-indigo-600 selection:text-white relative">
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
