import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What is your typical turnaround time for a project?',
    a: 'Turnaround times vary by scope: Short reels & social ads are delivered within 48–72 hours, while full brand films and complex AI SaaS demos take 5–7 business days.',
  },
  {
    q: 'How do you integrate Generative AI into traditional video editing?',
    a: 'I leverage AI tools (ComfyUI, Runway Gen-3, ElevenLabs) for B-roll generation, character consistency, voice synthesis, and lip-syncing — then refine and edit everything with precision in Premiere Pro and After Effects for a seamless broadcast finish.',
  },
  {
    q: 'Do you offer multi-language lip-sync dubbing for campaigns?',
    a: 'Yes. Using HeyGen and ElevenLabs voice-face alignment, I produce natural Arabic and English video dubs where lip movements dynamically match the spoken audio.',
  },
  {
    q: 'What formats and resolution deliverables do I receive?',
    a: 'You receive master 4K 16:9 renders for web/YouTube/TV, and 9:16 vertical renders optimized for Instagram Reels, TikTok, and YouTube Shorts.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = i => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-24 px-6 bg-[#06060a] relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="vizer-badge mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            Got Questions? Answers Below.
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto font-normal">
            Everything you need to know about my video editing and AI production workflow.
          </p>
        </motion.div>

        {/* Dentora Clinic Framer Motion Accordions */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="vizer-card overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-base sm:text-lg hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 pb-6 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 font-normal"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
