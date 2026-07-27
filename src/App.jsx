import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Work from './sections/Work'
import About from './sections/About'
import Pipeline from './sections/Pipeline'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[#07070a] text-slate-200 antialiased selection:bg-indigo-600 selection:text-white">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Pipeline />
        <Contact />
      </main>
    </div>
  )
}
