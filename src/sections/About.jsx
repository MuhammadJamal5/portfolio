import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clapperboard, Brain, Cpu, Globe } from 'lucide-react';

const bentoCards = [
  {
    title: "AI Generative Video Pipelines",
    icon: Cpu,
    tags: ["ComfyUI", "Runway", "ElevenLabs", "HeyGen"],
  },
  {
    title: "Precision Editing & Post Production",
    icon: Clapperboard,
    tags: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
  {
    title: "Viewer Retention & Hook Psychology",
    icon: Brain,
    tags: ["Audience Retention", "Hook Design", "Narrative Arc"],
  },
  {
    title: "Multilingual Lip-Sync Dubbing",
    icon: Globe,
    tags: ["Arabic & English", "LipSync AI", "Global Ads"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 20, ease: [0.16, 1, 0.3, 1] }
  }
};

const BentoCard = ({ title, icon: Icon, tags }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  // Confezence: 3D perspective tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={itemVariants}
      className="vizer-card relative flex flex-col p-8 overflow-hidden rounded-[20px] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 group cursor-pointer h-64 shadow-xl"
    >
      {/* Fusion AI: Ambient radial gradient glow */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_60%)] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
      />

      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        {/* Dentora: Icon container spring animation */}
        <motion.div
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-indigo-500/30 text-indigo-400 mb-6"
          animate={{
            backgroundColor: isHovered ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0)",
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -4 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon size={28} />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-2 font-['Montserrat'] tracking-tight">
          {title}
        </h3>
      </div>

      {/* Loop: Tech tags micro-marquee */}
      <div 
        className="mt-auto overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" 
        style={{ transform: "translateZ(20px)" }}
      >
        <motion.div
          className="flex gap-3 whitespace-nowrap pt-2"
          animate={isHovered ? { x: "-50%" } : { x: "0%" }}
          transition={{ 
            repeat: Infinity, 
            duration: 8, 
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {/* Double array for infinite loop effect */}
          {[...tags, ...tags, ...tags].map((tag, i) => (
            <span 
              key={i} 
              className="vizer-badge px-3 py-1.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function About() {
  return (
    <section id="about" className="bg-[#06060a] py-24 px-6 min-h-screen flex items-center justify-center overflow-hidden font-['Montserrat']">
      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Capabilities & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Tech Stack</span>
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg">
            Leveraging cutting-edge tools to architect high-retention video content and generative pipelines.
          </p>
        </motion.div>

        {/* Dream Motion: Staggered Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative perspective-[1000px]"
        >
          {bentoCards.map((card, index) => (
            <BentoCard key={index} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
