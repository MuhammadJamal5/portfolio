import { motion } from 'framer-motion'
import { Mail, Link2, Copy, Check } from 'lucide-react'
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
    <section id="contact" className="py-28 px-6 bg-[#000000] relative text-center overflow-hidden">
      {/* Nubien Glowing Dome Background in Footer */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[300px] rounded-t-[100%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 45%, transparent 75%)',
          borderTop: '1px solid rgba(165, 180, 252, 0.3)',
          boxShadow: '0 -20px 60px rgba(99, 102, 241, 0.2)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-indigo-400 font-medium mb-6">
          Get In Touch
        </span>
        <h2 className="text-4xl sm:text-6xl font-normal text-white tracking-tight leading-tight mb-6">
          Ready to Elevate Your <br />
          <span className="text-white">Visual Content?</span>
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
          Have an upcoming brand film, SaaS product demo, or AI video campaign? Let's connect and build something extraordinary.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={`mailto:${email}`}
            className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30"
          >
            Connect With Us
          </a>

          <button
            onClick={copyEmail}
            className="px-8 py-4 rounded-full bg-white/10 border border-white/15 text-white font-semibold text-sm hover:bg-white/20 transition-all"
          >
            {copied ? 'Copied Email!' : 'Copy Email Address'}
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Muhammed Jamal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/muhammedjamalvfx/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <span>Cairo, Egypt</span>
          </div>
        </div>
      </div>
    </section>
  )
}
