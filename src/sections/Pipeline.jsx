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
    <section id="pipeline" className="py-24 px-6 bg-[#06060a] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center md:text-left"
        >
          <div className="vizer-badge mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>PRODUCTION PROCESS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight max-w-2xl">
            Four Steps from Script to Final Master.
          </h2>
        </motion.div>

        {/* Dentora & Confezence Animated 4-Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, title, desc, icon: Icon }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="vizer-card p-6 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <motion.span
                    whileHover={{ scale: 1.15, color: '#818cf8' }}
                    className="text-3xl font-extrabold text-slate-600 transition-colors"
                  >
                    {num}
                  </motion.span>
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
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
