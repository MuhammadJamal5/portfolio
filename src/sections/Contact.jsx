import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Link2, MapPin, Phone, ArrowUpRight, Send, CheckCircle } from 'lucide-react'
import MagneticBtn from '../components/MagneticBtn'
import SceneCanvas from '../components/three/SceneCanvas'
import Clapperboard3D from '../components/three/Clapperboard3D'
import PlayButton3D from '../components/three/PlayButton3D'

const links = [
  { icon: Mail,   label: 'Email',    value: 'mg32871@gmail.com',              href: 'mailto:mg32871@gmail.com' },
  { icon: Phone,  label: 'Phone',    value: '+20 115 503 4631',               href: 'tel:+201155034631' },
  { icon: Link2,  label: 'LinkedIn', value: 'muhammedjamalvfx',               href: 'https://www.linkedin.com/in/muhammedjamalvfx/' },
  { icon: MapPin, label: 'Location', value: 'Cairo, Egypt — Open to Remote', href: null },
]

const PROJECT_TYPES = [
  'AI UGC Creator Pack',
  'Cinematic Product Hero',
  'Before/After Ad',
  'Brand Spokesperson',
  'Multi-Format Social Pack',
  'Generative B-Roll Library',
  'Other / Custom',
]

const BUDGETS = ['Under $300', '$300–$700', '$700–$1,500', '$1,500–$3,000', '$3,000+']

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 14,
  padding: '12px 16px',
  outline: 'none',
  width: '100%',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s',
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Portfolio] ${form.type || 'Project Inquiry'} from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.type}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:mg32871@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  const focusBorder = (key) => (e) => {
    setFocused(key)
    e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)'
  }
  const blurBorder = (key) => (e) => {
    setFocused('')
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      onSubmit={submit}
      className="p-8 md:p-10 rounded-3xl mb-16"
      style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <p className="label mb-6">Quick Inquiry</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label block mb-2" style={{ fontSize: 10 }}>Your Name *</label>
          <input
            required
            value={form.name}
            onChange={set('name')}
            onFocus={focusBorder('name')}
            onBlur={blurBorder('name')}
            placeholder="Ahmed Al-Rashid"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="label block mb-2" style={{ fontSize: 10 }}>Your Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set('email')}
            onFocus={focusBorder('email')}
            onBlur={blurBorder('email')}
            placeholder="hello@brand.com"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label block mb-2" style={{ fontSize: 10 }}>Project Type</label>
          <select
            value={form.type}
            onChange={set('type')}
            onFocus={focusBorder('type')}
            onBlur={blurBorder('type')}
            style={{ ...inputStyle, cursor: 'none' }}
          >
            <option value="" style={{ background: '#060608' }}>Select a service…</option>
            {PROJECT_TYPES.map(t => (
              <option key={t} value={t} style={{ background: '#060608' }}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label block mb-2" style={{ fontSize: 10 }}>Budget Range</label>
          <select
            value={form.budget}
            onChange={set('budget')}
            onFocus={focusBorder('budget')}
            onBlur={blurBorder('budget')}
            style={{ ...inputStyle, cursor: 'none' }}
          >
            <option value="" style={{ background: '#060608' }}>Select range…</option>
            {BUDGETS.map(b => (
              <option key={b} value={b} style={{ background: '#060608' }}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="label block mb-2" style={{ fontSize: 10 }}>Message *</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={set('message')}
          onFocus={focusBorder('message')}
          onBlur={blurBorder('message')}
          placeholder="Tell me about your project, goals, and timeline…"
          style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-sm transition-all duration-300"
        style={{
          background: sent
            ? 'linear-gradient(135deg, #059669, #10b981)'
            : 'linear-gradient(135deg, #6d28d9, #be185d)',
          cursor: 'none',
        }}
      >
        {sent ? (
          <>
            <CheckCircle size={16} />
            Email client opening…
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden py-40 px-6"
             style={{ background: '#030308' }}>
      {/* Video motifs: clapperboard left, play button right */}
      <SceneCanvas
        className="absolute pointer-events-none select-none"
        style={{ left: '-4%', top: '52%', transform: 'translateY(-50%)', width: '38%', height: '80%', opacity: 0.4, zIndex: 0 }}
      >
        <Clapperboard3D color="#818cf8" scale={0.95} />
      </SceneCanvas>
      <SceneCanvas
        className="absolute pointer-events-none select-none"
        style={{ right: '-4%', top: '50%', transform: 'translateY(-50%)', width: '40%', height: '90%', opacity: 0.45, zIndex: 0 }}
      >
        <PlayButton3D color="#a78bfa" scale={1.2} />
      </SceneCanvas>
      {/* Moving gradient bg */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(109,40,217,0.12) 0%, rgba(190,24,93,0.06) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Decorative ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(109,40,217,0.06)' }}
        aria-hidden
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(109,40,217,0.08)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="label">Let's Create Together</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500" />
        </motion.div>

        {/* Headline */}
        <div className="mb-10">
          {["Ready to make", "content that converts?"].map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(36px,6vw,80px)] font-black text-white tracking-tight leading-tight"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 text-lg max-w-lg mx-auto mb-14 leading-relaxed"
        >
          From AI pipelines to retention-engineered edits — let's discuss what your brand needs and build something remarkable together.
        </motion.p>

        {/* Contact form */}
        <ContactForm />

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-20"
        >
          <MagneticBtn>
            <a
              href="mailto:mg32871@gmail.com"
              className="group flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #6d28d9, #be185d)' }}
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowUpRight size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
              />
            </a>
          </MagneticBtn>
        </motion.div>

        {/* Contact links grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid sm:grid-cols-2 gap-4 text-left"
        >
          {links.map(({ icon: Icon, label, value, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/7 hover:border-violet-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="label mb-0.5">{label}</p>
                    <p className="text-slate-200 text-sm font-medium">{value}</p>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-slate-700 group-hover:text-violet-400 transition-colors" />
                </a>
              ) : (
                <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/7">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="label mb-0.5">{label}</p>
                    <p className="text-slate-200 text-sm font-medium">{value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer credit */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-20 text-slate-600 text-xs"
        >
          © 2026 Muhammed Jamal — Built with React + Framer Motion
        </motion.p>
      </div>
    </section>
  )
}
