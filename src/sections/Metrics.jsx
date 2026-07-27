import { motion } from 'framer-motion'
import { TrendingUp, Eye, Zap, Award } from 'lucide-react'

const metrics = [
  {
    icon: Eye,
    value: '10M+',
    label: 'Total Video Views Generated',
    desc: 'Across YouTube, TikTok, Reels, and commercial campaign distribution.',
  },
  {
    icon: TrendingUp,
    value: '3.2x',
    label: 'Average Hook & CTR Lift',
    desc: 'Psychology-backed visual hooks engineered to stop scroll inertia.',
  },
  {
    icon: Award,
    value: '85%',
    label: 'Audience Retention Rate',
    desc: 'Pacing, sound design, and motion graphics keeping viewers hooked.',
  },
  {
    icon: Zap,
    value: '24–48h',
    label: 'Fast Turnaround Delivery',
    desc: 'Streamlined AI generative pipeline + precision post-production.',
  },
]

export default function Metrics() {
  return (
    <section className="py-20 px-6 bg-[#000000] relative text-center">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-emerald-400 font-semibold mb-3">
            Impact & Performance
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            Measured Results for Brands & Creators.
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto font-normal">
            Combining creative AI motion art with data-driven retention science.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(({ icon: Icon, value, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="nubien-card p-6 flex flex-col items-center text-center group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                <Icon size={20} />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                {value}
              </span>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                {label}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
