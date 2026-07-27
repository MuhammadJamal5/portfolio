import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Film, Sliders } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Concept & Script Architecture',
    icon: FileText,
    desc: 'Analyzing client objective, audience retention hooks, and developing narrative storyboard scripts tailored for target engagement.',
  },
  {
    num: '02',
    title: 'Generative AI Asset Creation',
    icon: Cpu,
    desc: 'Generating custom character models, cinematic B-roll assets, and synthetic voiceovers using ComfyUI, Runway, and ElevenLabs.',
  },
  {
    num: '03',
    title: 'Precision Motion & Video Edit',
    icon: Film,
    desc: 'Assembling sequence edits in Premiere Pro, adding dynamic motion graphics in After Effects, and syncing audio beats for max retention.',
  },
  {
    num: '04',
    title: 'Color Grading & Final Master',
    icon: Sliders,
    desc: 'Applying cinematic color palettes, audio mastering, and exporting platform-optimized renders (16:9 4K & 9:16 vertical reels).',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const stepVariants = (index) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -40 : 40,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export default function Pipeline() {
  return (
    <section id="pipeline" className="py-16 px-4 sm:py-20 sm:px-6 md:py-24 bg-[#06060a] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="vizer-badge text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-4 inline-block">
              Our Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 font-montserrat">
              Production Pipeline
            </h2>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Connecting Line (Desktop: Horizontal, Mobile: Vertical) */}
          <div className="absolute top-0 left-8 md:left-1/2 lg:left-0 lg:top-24 bottom-0 lg:bottom-auto lg:right-0 w-0.5 lg:w-full lg:h-0.5 bg-white/5 -translate-x-1/2 lg:translate-x-0">
            <motion.div
              initial={{ height: 0, width: 0 }}
              whileInView={{ height: '100%', width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-b lg:bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 origin-top lg:origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 pt-10 lg:pt-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  variants={stepVariants(index)}
                  className="relative group lg:mt-12"
                >
                  {/* Step Connector Node */}
                  <div className="absolute -left-[35px] md:-left-[calc(50%+4px)] lg:-top-16 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-indigo-500 bg-[#06060a] z-10 hidden lg:block group-hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-shadow duration-300" />
                  
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="vizer-card relative h-full bg-white/[0.02] border border-white/5 rounded-[20px] p-5 sm:p-6 md:p-8 overflow-hidden backdrop-blur-xl"
                  >
                    {/* Border Hover Gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent opacity-50" />
                      <div className="absolute -inset-[1px] bg-gradient-to-br from-indigo-400 to-transparent rounded-[20px] opacity-20 [mask-image:linear-gradient(white,transparent)]" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute top-6 right-6 font-mono text-3xl sm:text-4xl md:text-5xl font-black text-white/5 group-hover:text-indigo-400/20 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(99,102,241,0)] group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                      {step.num}
                    </div>

                    {/* Icon Container */}
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.div>

                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 font-montserrat">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#94a3b8] leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
