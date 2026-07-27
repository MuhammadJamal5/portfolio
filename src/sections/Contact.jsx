import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('mg32871@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const headlineLines = [
    "Ready to Elevate Your",
    "Visual Content?"
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 md:py-32 px-6 bg-[#06060a] overflow-hidden">
      {/* FUSION AI: Pulsing ambient radial gradient dome */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] max-w-[90vw] h-[400px] rounded-[100%] bg-indigo-600/20 blur-[100px] pointer-events-none"
        animate={pulseAnimation}
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="vizer-badge">GET IN TOUCH</span>
        </motion.div>

        {/* DREAM MOTION: Staggered text reveal */}
        <motion.h2 
          className="mt-5 sm:mt-6 md:mt-8 text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {headlineLines.map((line, lineIndex) => (
            <span key={lineIndex} className="block mt-2">
              {line.split(' ').map((word, wordIndex) => (
                <motion.span
                  key={`${lineIndex}-${wordIndex}`}
                  variants={wordVariants}
                  className="inline-block mr-3 md:mr-4 last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h2>

        <motion.p
          className="mt-8 text-sm sm:text-base md:text-xl text-[#94a3b8] max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Have an upcoming brand film, SaaS product demo, or AI video campaign? Let's connect and build something extraordinary.
        </motion.p>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* CONFEZENCE: Spring-physics hover buttons */}
          <motion.a
            href="mailto:mg32871@gmail.com"
            whileHover={{ scale: 1.07, y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium transition-colors"
          >
            <Mail size={20} />
            Get In Touch
          </motion.a>

          {/* DENTORA: Copy button with AnimatePresence */}
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.07, y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium backdrop-blur-sm border border-white/10 transition-colors w-full sm:w-[240px] justify-center relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-indigo-300"
                >
                  <Check size={20} />
                  Copied Email!
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Copy size={20} />
                  Copy Email Address
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 sm:mt-24 md:mt-32 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <motion.div 
          className="text-[#94a3b8] text-sm md:text-base text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Muhammed Jamal. All rights reserved.
        </motion.div>
        
        <div className="flex items-center gap-6 text-sm md:text-base">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#94a3b8]"
          >
            Cairo, Egypt
          </motion.div>
          
          {/* LOOP: Social links float animation */}
          <motion.a
            href="https://www.linkedin.com/in/muhammedjamalvfx/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:text-indigo-400 transition-colors"
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            LinkedIn <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
