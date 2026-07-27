import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Cpu, Mic2, Film, Sparkles } from 'lucide-react'
import { SectionLabel } from './About'
import SceneCanvas from '../components/three/SceneCanvas'
import PlayButton3D from '../components/three/PlayButton3D'

const nodes = [
  {
    id: 'brief',
    label: 'Brief',
    icon: FileText,
    color: '#818cf8',
    rgb: '129,140,248',
    detail: {
      headline: 'Creative Brief & Strategy',
      body: 'Every project starts with a deep-dive: brand voice, target audience, emotional hooks, and key message hierarchy. I extract the creative brief using structured prompting so the AI workflow has crystal-clear direction from the start.',
      tools: ['Notion', 'Prompt Engineering', 'Brand Strategy'],
    },
  },
  {
    id: 'ai-visual',
    label: 'AI Visual',
    icon: Cpu,
    color: '#c084fc',
    rgb: '192,132,252',
    detail: {
      headline: 'AI Visual Generation',
      body: 'Character-consistent scenes generated in ComfyUI using custom LoRA pipelines. Magnific for upscaling and relighting, Freepik AI for product visuals, Veo 3 and Kling 2.6 for cinematic motion. Every visual is intentional, not random.',
      tools: ['ComfyUI', 'Veo 3', 'Kling 2.6', 'Magnific', 'Freepik AI'],
    },
  },
  {
    id: 'voice',
    label: 'Voice & Sound',
    icon: Mic2,
    color: '#f472b6',
    rgb: '244,114,182',
    detail: {
      headline: 'AI Voice & Sound Design',
      body: 'HeyGen for multilingual lip-sync avatars, ElevenLabs for ultra-realistic voiceover in English and Arabic. I match vocal tone to brand personality and pair it with emotion-driven music selection for maximum impact.',
      tools: ['HeyGen', 'ElevenLabs', 'Sound Design', 'Music Sync'],
    },
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: Film,
    color: '#67e8f9',
    rgb: '103,232,249',
    detail: {
      headline: 'Post-Production & Color',
      body: 'Adobe Premiere Pro + After Effects for the assembly edit. Pacing is driven by viewer retention psychology. Color grading in Lumetri with a custom emotional color language. Motion graphics and titles built in After Effects.',
      tools: ['Premiere Pro', 'After Effects', 'Color Grading', 'Motion Graphics'],
    },
  },
  {
    id: 'output',
    label: 'Output',
    icon: Sparkles,
    color: '#4ade80',
    rgb: '74,222,128',
    detail: {
      headline: 'Multi-Format Delivery',
      body: 'Optimized exports for every platform: 16:9 YouTube, 9:16 Reels/TikTok, 1:1 LinkedIn, with platform-native captions and thumbnails. You get a complete content package ready to publish, no extra steps.',
      tools: ['Multi-Format Export', 'Platform Optimization', 'Captions', 'Thumbnails'],
    },
  },
]

function Connector({ fromColor, toColor, delay = 0 }) {
  return (
    <div className="hidden md:flex items-center shrink-0" style={{ width: 60 }}>
      <div className="relative w-full overflow-hidden" style={{ height: 2, borderRadius: 2 }}>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(90deg, ${fromColor}30, ${toColor}30)`
        }} />
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 24,
            background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
            borderRadius: 2,
          }}
          animate={{ left: ['-24px', '100%'] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  )
}

export default function Pipeline() {
  const [active, setActive] = useState(nodes[0])

  return (
    <section id="pipeline" className="py-36 px-6 relative overflow-hidden" style={{ background: '#05050d' }}>
      {/* 3D neural network background */}
      <SceneCanvas
        className="absolute inset-0 pointer-events-none select-none"
        style={{ width: '100%', height: '100%', opacity: 0.4, zIndex: 0 }}
        cameraZ={7}
      >
        <PlayButton3D color="#c084fc" scale={1.1} />
      </SceneCanvas>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 60% at 50% 30%, rgba(192,132,252,0.04) 0%, transparent 70%)'
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionLabel label="How It Works" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            The AI <span className="animate-text-shimmer">Pipeline</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-lg">
            Click any node to see what happens at each stage of production.
          </p>
        </motion.div>

        {/* Node row */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex items-center">
            {nodes.map((node, i) => {
              const Icon = node.icon
              const isActive = active.id === node.id
              return (
                <div key={node.id} className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActive(node)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 shrink-0"
                    style={{
                      width: 120,
                      background: isActive ? `rgba(${node.rgb}, 0.12)` : 'rgba(255,255,255,0.03)',
                      border: isActive
                        ? `1px solid rgba(${node.rgb}, 0.4)`
                        : '1px solid rgba(255,255,255,0.07)',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `rgba(${node.rgb}, 0.1)`,
                        border: `1px solid rgba(${node.rgb}, 0.25)`,
                      }}
                    >
                      <Icon size={22} style={{ color: node.color }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-bold text-center transition-colors duration-200"
                        style={{ color: isActive ? node.color : 'rgba(148,163,184,0.7)' }}
                      >
                        {node.label}
                      </p>
                      <p className="text-[10px] text-center mt-0.5 font-mono" style={{ color: 'rgba(100,116,139,0.5)' }}>
                        0{i + 1}
                      </p>
                    </div>
                  </motion.button>

                  {i < nodes.length - 1 && (
                    <Connector
                      fromColor={node.color}
                      toColor={nodes[i + 1].color}
                      delay={i * 0.32}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -8, x: 20 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-3xl relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid rgba(${active.rgb}, 0.25)`,
              }}
            >
              {/* Watermark number */}
              <div
                className="absolute top-4 right-6 font-black text-7xl select-none pointer-events-none"
                style={{
                  color: `rgba(${active.rgb}, 0.07)`,
                  fontFamily: 'Montserrat, sans-serif',
                  lineHeight: 1,
                }}
              >
                {String(nodes.findIndex(n => n.id === active.id) + 1).padStart(2, '0')}
              </div>

              {/* Dot + id */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: active.color }} />
                <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: active.color }}>
                  {active.id}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {active.detail.headline}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {active.detail.body}
              </p>

              <div className="flex flex-wrap gap-2">
                {active.detail.tools.map(tool => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `rgba(${active.rgb}, 0.08)`,
                      border: `1px solid rgba(${active.rgb}, 0.2)`,
                      color: active.color,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
