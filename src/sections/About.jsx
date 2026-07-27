import { motion } from 'framer-motion'
import { Clapperboard, Brain, Cpu, Globe, Sparkles, CheckCircle } from 'lucide-react'

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
    <section id="about" className="py-28 px-6 bg-[#000000] relative nubien-grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-purple-400 font-bold mb-4 uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Capabilities & Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl">
            ENGINEERED FOR VISUAL EXCELLENCE AND HIGH CONVERSION.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {bentoCards.map(({ icon: Icon, title, desc, tags }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="nubien-card p-8 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
                  {desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/[0.04] text-[11px] font-bold text-zinc-300 border border-white/10"
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
