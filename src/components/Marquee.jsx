import { motion } from 'framer-motion'

const tools = [
  'Adobe Premiere Pro', 'After Effects', 'ComfyUI', 'HeyGen', 'ElevenLabs',
  'Freepik AI', 'Veo 3', 'Kling 2.6', 'Remotion', 'Python', 'Vertex AI',
  'OpenArt', 'Supabase', 'Django', 'Git', 'Prompt Engineering',
]

function Track({ direction = -1, speed = 30 }) {
  const items = [...tools, ...tools]
  const duration = items.length * speed * 0.15

  return (
    <div className="flex overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        className="flex shrink-0 gap-6 pr-6"
        animate={{ x: direction === -1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((tool, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/8 text-slate-400 text-sm font-medium whitespace-nowrap hover:border-violet-500/30 hover:text-violet-300 transition-colors duration-300 cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
            {tool}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="py-12 space-y-4 overflow-hidden">
      <Track direction={-1} speed={28} />
      <Track direction={1} speed={35} />
    </div>
  )
}
