import { motion } from 'framer-motion'
import { Clapperboard, Brain, Cpu, Globe, ArrowUpRight, CheckCircle2 } from 'lucide-react'

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
    <section id="about" className="py-28 px-4 sm:px-8 bg-[#08080c] relative nubien-grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="nubien-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>CAPABILITIES & TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl">
            ENGINEERED FOR VISUAL EXCELLENCE AND HIGH CONVERSION.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {bentoCards.map(({ icon: Icon, title, desc, tags }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="nubien-card p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/[0.04] text-[11px] font-semibold text-zinc-300 border border-white/5"
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
