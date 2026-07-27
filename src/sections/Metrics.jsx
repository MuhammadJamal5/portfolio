import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Zap, Award } from 'lucide-react';

const easeOutExpo = (x) => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const AnimatedCounter = ({ target, duration = 1500, prefix = "", suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = easeOutExpo(progress);
            
            setCount(easeProgress * target);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

const Metrics = () => {
  const headerText = "Measurable Impact. Real Results.";
  const headerWords = headerText.split(" ");

  const metricsData = [
    {
      icon: <Eye className="w-6 h-6 text-indigo-400" />,
      target: 10,
      prefix: "",
      suffix: "M+",
      decimals: 0,
      title: "Total Video Views Generated",
      desc: "Across YouTube, TikTok, Reels, and commercial campaign distribution."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
      target: 3.2,
      prefix: "",
      suffix: "x",
      decimals: 1,
      title: "Average Hook & CTR Lift",
      desc: "Psychology-backed visual hooks engineered to stop scroll inertia."
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-400" />,
      target: 85,
      prefix: "",
      suffix: "%",
      decimals: 0,
      title: "Audience Retention Rate",
      desc: "Pacing, sound design, and motion graphics keeping viewers hooked."
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      target: 48,
      prefix: "24–",
      suffix: "h",
      decimals: 0,
      title: "Fast Turnaround Delivery",
      desc: "Streamlined AI generative pipeline + precision post-production."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 }
    }
  };

  const marqueeText = [
    "Trusted by brands worldwide",
    "High-converting video assets",
    "Psychology-backed visual hooks",
    "Precision post-production",
    "Streamlined generative pipeline"
  ];

  return (
    <section id="metrics" className="relative py-16 px-4 sm:py-20 sm:px-6 md:py-24 bg-[#06060a] overflow-hidden">
      {/* Fusion AI ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Dream Motion Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            className="inline-block vizer-badge px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Metrics & Impact
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Montserrat'] flex flex-wrap justify-center gap-x-3 gap-y-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {headerWords.map((word, i) => (
              <motion.span key={i} variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {metricsData.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="vizer-card relative p-5 sm:p-6 md:p-8 rounded-[20px] bg-[#0c0c14] border border-white/5 overflow-hidden group"
            >
              {/* Fusion AI Glow behind number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                {metric.icon}
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-['Montserrat'] mb-4 tracking-tight">
                <AnimatedCounter 
                  target={metric.target}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                />
              </h3>
              
              <h4 className="text-lg font-semibold text-white/90 mb-2 font-['Montserrat']">
                {metric.title}
              </h4>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Loop Marquee */}
        <div className="mt-24 pt-12 border-t border-white/5 relative flex overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06060a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06060a] to-transparent z-10" />
          
          <motion.div
            className="flex gap-6 sm:gap-8 md:gap-12 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {[...marqueeText, ...marqueeText].map((text, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-8 md:gap-12 text-[#94a3b8]/60 font-['Montserrat'] uppercase tracking-widest text-xs md:text-sm">
                <span>{text}</span>
                {i !== marqueeText.length * 2 - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Metrics;
