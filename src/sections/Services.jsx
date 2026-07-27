import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SectionLabel } from './About'

const services = [
  {
    id: 'ugc',
    num: '01',
    title: 'AI UGC Creator Pack',
    tagline: 'Human-looking AI creators. Real results.',
    color: '#a78bfa',
    rgb: '167,139,250',
    desc: 'Full UGC ad package using AI-generated creators with consistent character identity. HeyGen lip-sync + ElevenLabs voice + ComfyUI scenes. Platform-native, human-feeling content without hiring real creators.',
    deliverables: ['3–5 unique AI creators', 'Script + voiceover', 'Hook testing variants', 'Captions & thumbnails'],
    timeline: '3–5 days',
    ideal: 'DTC brands, e-comm',
  },
  {
    id: 'product',
    num: '02',
    title: 'Cinematic Product Hero',
    tagline: 'Your product. Cinema quality.',
    color: '#f472b6',
    rgb: '244,114,182',
    desc: 'Luxury-grade product video using AI-generated environments, cinematic lighting, and color science. Perfect for hero sections, launch campaigns, and paid ads. Shot-by-shot storyboarding + premium color grade.',
    deliverables: ['Hero video (30–60s)', '15s cut-down', 'Still frames', 'Social variants'],
    timeline: '4–6 days',
    ideal: 'Product launches, hero ads',
  },
  {
    id: 'beforeafter',
    num: '03',
    title: 'Before/After Ad',
    tagline: 'The most powerful format in paid social.',
    color: '#67e8f9',
    rgb: '103,232,249',
    desc: 'Contrast-driven ads engineered for maximum curiosity gaps. Before/after transformations for skincare, fitness, software, real estate. Paced with retention psychology. Hook in frame one, payoff by second ten.',
    deliverables: ['Main before/after video', '3 hook variations', 'Subtitles', 'A/B testing cuts'],
    timeline: '2–4 days',
    ideal: 'Performance marketing',
  },
  {
    id: 'spokesperson',
    num: '04',
    title: 'Brand Spokesperson',
    tagline: 'A consistent face for your brand. Forever.',
    color: '#4ade80',
    rgb: '74,222,128',
    desc: 'Custom AI brand spokesperson with fixed visual identity, voice, and mannerisms. Multilingual capability (Arabic + English). Produces unlimited video content from a single character blueprint.',
    deliverables: ['AI character creation', '5 spokesperson videos', 'Multilingual versions', 'Reuse license'],
    timeline: '5–7 days',
    ideal: 'SaaS, personal brands',
  },
  {
    id: 'social',
    num: '05',
    title: 'Multi-Format Social Pack',
    tagline: 'One idea. Every platform.',
    color: '#fbbf24',
    rgb: '251,191,36',
    desc: 'A single content asset repurposed into 9:16 Reels, 1:1 LinkedIn, 16:9 YouTube, with platform-specific hooks and captions for each. Maximum reach from minimum shoots. Built for content calendars.',
    deliverables: ['9:16 Reel (60s)', '1:1 LinkedIn cut', '16:9 YouTube', 'Caption + cover per platform'],
    timeline: '2–3 days',
    ideal: 'Content creators, agencies',
  },
  {
    id: 'broll',
    num: '06',
    title: 'Generative B-Roll Library',
    tagline: 'Infinite custom visuals. Zero stock footage.',
    color: '#fb923c',
    rgb: '251,146,60',
    desc: "Custom AI-generated B-roll library in your brand's visual language. 20–30 unique clips using Veo 3, Kling 2.6, and ComfyUI. Cinematic motion, correct color treatment, no stock-footage look.",
    deliverables: ['20–30 AI video clips', 'Brand style guide', 'Raw exports + proxies', 'Usage license'],
    timeline: '4–5 days',
    ideal: 'Agencies, media companies',
  },
]

export default function Services() {
  const [selected, setSelected] = useState(services[0])

  return (
    <section id="services" className="py-36 px-6 relative overflow-hidden" style={{ background: '#060610' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(167,139,250,0.04) 0%, transparent 65%)'
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel label="What I Can Build For You" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Pick your<br />content type.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 items-start">
          {/* Left — service list */}
          <div className="space-y-2">
            {services.map((s, i) => {
              const isSelected = selected.id === s.id
              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onClick={() => setSelected(s)}
                  className="w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4"
                  style={{
                    background: isSelected ? `rgba(${s.rgb}, 0.07)` : 'rgba(255,255,255,0.02)',
                    border: isSelected
                      ? `1px solid rgba(${s.rgb}, 0.3)`
                      : '1px solid rgba(255,255,255,0.04)',
                    borderLeft: isSelected ? `3px solid ${s.color}` : '3px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: 'rgba(100,116,139,0.5)' }}>
                    {s.num}
                  </span>
                  <div>
                    <p
                      className="font-bold text-sm leading-snug transition-colors duration-200"
                      style={{ color: isSelected ? '#fff' : 'rgba(226,232,240,0.75)' }}
                    >
                      {s.title}
                    </p>
                    <p
                      className="text-xs mt-0.5 transition-colors duration-200"
                      style={{ color: isSelected ? s.color : 'rgba(100,116,139,0.7)' }}
                    >
                      {s.tagline}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Right — detail panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="sticky top-24 p-8 rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid rgba(${selected.rgb}, 0.2)`,
                }}
              >
                {/* Watermark number */}
                <div
                  className="absolute top-6 right-8 font-black text-8xl select-none pointer-events-none"
                  style={{
                    color: `rgba(${selected.rgb}, 0.07)`,
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {selected.num}
                </div>

                {/* Dot + id */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: selected.color }} />
                  <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: selected.color }}>
                    {selected.id}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selected.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: selected.color }}>{selected.tagline}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{selected.desc}</p>

                {/* Deliverables */}
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-slate-600">Deliverables</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {selected.deliverables.map(d => (
                    <div key={d} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(203,213,225,0.7)' }}>
                      <span
                        className="shrink-0 rounded-full mt-1"
                        style={{ width: 4, height: 4, background: selected.color, display: 'inline-block' }}
                      />
                      {d}
                    </div>
                  ))}
                </div>

                {/* Timeline + Ideal chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `rgba(${selected.rgb}, 0.07)`,
                      border: `1px solid rgba(${selected.rgb}, 0.18)`,
                      color: selected.color,
                    }}
                  >
                    ⏱ {selected.timeline}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(148,163,184,0.7)',
                    }}
                  >
                    ✦ {selected.ideal}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${selected.color}cc, ${selected.color}88)` }}
                >
                  Start this project <ChevronRight size={14} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
