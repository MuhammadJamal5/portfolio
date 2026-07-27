import { motion } from 'framer-motion'
import { FileText, Cpu, Film, Sliders } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Concept & Script Architecture',
    desc: 'Analyzing client objective, audience retention hooks, and developing narrative storyboard scripts tailored for target engagement.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'Generative AI Asset Creation',
    desc: 'Generating custom character models, cinematic B-roll assets, and synthetic voiceovers using ComfyUI, Runway, and ElevenLabs.',
    icon: Cpu,
  },
  {
    num: '03',
    title: 'Precision Motion & Video Edit',
    desc: 'Assembling sequence edits in Premiere Pro, adding dynamic motion graphics in After Effects, and syncing audio beats for max retention.',
    icon: Film,
  },
  {
    num: '04',
    title: 'Color Grading & Final Master',
    desc: 'Applying cinematic color palettes, audio mastering, and exporting platform-optimized renders (16:9 4K & 9:16 vertical reels).',
    icon: Sliders,
  },
]

export default function Pipeline() {
  return (
    <section id="pipeline" className="py-24 px-6 bg-[#000000] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-cyan-400 font-semibold mb-3">
            Production Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight max-w-2xl">
            Four Steps from Script to Final Master.
          </h2>
        </motion.div>

        {/* 4 Process Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, title, desc, icon: Icon }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="nubien-card p-6 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-zinc-600 group-hover:text-indigo-400 transition-colors">
                    {num}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
