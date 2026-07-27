import { motion } from 'framer-motion'
import { Mail, Link2, ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'mg32871@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-28 px-4 sm:px-8 bg-[#08080c] relative nubien-grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="nubien-card p-8 sm:p-14 relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-2xl">
            <div className="nubien-badge mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>START A PROJECT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              LET'S BUILD SOMETHING <span className="nubien-text-glow">EXTRAORDINARY</span> TOGETHER.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
              Have an upcoming brand film, SaaS demo, or AI video campaign? Reach out directly and let's craft content that converts.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-auto shrink-0">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-xl"
            >
              <Mail size={16} />
              <span>Send Direct Email</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full nubien-card text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? 'Copied Email!' : 'Copy Email Address'}</span>
            </button>

            <a
              href="https://www.linkedin.com/in/muhammedjamalvfx/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-zinc-300 font-semibold text-sm hover:bg-white/5 transition-all duration-200"
            >
              <Link2 size={16} />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </a>
          </div>
        </motion.div>

        {/* Footer Bottom Strip */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} Muhammed Jamal. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Cairo, Egypt</span>
            <span>·</span>
            <span>AI Motion Studio</span>
          </p>
        </div>
      </div>
    </section>
  )
}
