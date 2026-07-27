import { motion } from 'framer-motion'
import { Clapperboard, Brain, Cpu, Globe } from 'lucide-react'

const bentoCards = [
  {
    icon: Cpu,
    title: 'AI Generative Video Pipelines',
    desc: 'End-to-end generative AI workflows using ComfyUI, Runway Gen-3, ElevenLabs, and Midjourney v6 for consistent character creation and visual effects at scale.',
    tags: ['ComfyUI', 'Runway', 'ElevenLabs', 'HeyGen'],
  },
  {
    icon: Clapperboard,
    title: 'Precision Editing & Post Production',
    desc: '3+ years crafting retention-focused edits in Premiere Pro and After Effects — color grading, motion graphics, and audio mastering.',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  },
  {
    icon: Brain,
    title: 'Viewer Retention & Hook Psychology',
    desc: 'Leveraging psychological principles of audience attention, pacing, emotional resonance, and narrative hooks to maximize watch time.',
    tags: ['Audience Retention', 'Hook Design', 'Narrative Arc'],
  },
  {
    icon: Globe,
    title: 'Multilingual Lip-Sync Dubbing',
    desc: 'Native Arabic and fluent English voice-to-video lip-sync dubbing with facial expression alignment for global campaign reach.',
    tags: ['Arabic & English', 'LipSync AI', 'Global Ads'],
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#000000] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-purple-400 font-semibold mb-3">
            Capabilities & Tech Stack
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight max-w-2xl">
            Engineered for Visual Excellence & Conversion.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {bentoCards.map(({ icon: Icon, title, desc, tags }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="nubien-card p-7 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                  {title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                  {desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-white/[0.04] text-[10px] font-semibold text-zinc-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
