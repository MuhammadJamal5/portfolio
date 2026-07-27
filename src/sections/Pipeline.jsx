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
    <section id="pipeline" className="py-28 px-4 sm:px-8 bg-[#08080c] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="nubien-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>PRODUCTION PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl">
            FOUR STEPS FROM SCRIPT TO FINAL CINEMATIC MASTER.
          </h2>
        </div>

        {/* 4 Process Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, title, desc, icon: Icon }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="nubien-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-black text-zinc-600 group-hover:text-white transition-colors">
                    {num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                    <Icon size={20} />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  {title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
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
