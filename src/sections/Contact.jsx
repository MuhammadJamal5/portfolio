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
    <section id="contact" className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#06060a] overflow-hidden">
      {/* Pulsing ambient radial gradient dome */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] max-w-[90vw] h-[400px] rounded-[100%] bg-indigo-600/20 blur-[100px] pointer-events-none"
        animate={pulseAnimation}
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="vizer-badge mb-4 sm:mb-6"
        >
          GET IN TOUCH
        </motion.div>

        {/* Clean Centered Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight text-center max-w-3xl"
        >
          Ready to Elevate Your <br />
          <span className="text-white font-bold">Visual Content?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 text-xs sm:text-base md:text-xl text-[#94a3b8] max-w-2xl text-center px-2"
        >
          Have an upcoming brand film, SaaS product demo, or AI video campaign? Let's connect and build something extraordinary.
        </motion.p>

        {/* Action Buttons — Identical matching widths on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[300px] sm:max-w-none"
        >
          <motion.a
            href="mailto:mg32871@gmail.com"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all text-center"
          >
            <Mail size={18} />
            <span>Get In Touch</span>
          </motion.a>

          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/15 text-white rounded-full font-semibold text-xs sm:text-sm backdrop-blur-sm border border-white/10 transition-all text-center min-w-[200px]"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-indigo-300"
                >
                  <Check size={18} />
                  <span>Copied Email!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Copy size={18} />
                  <span>Copy Email Address</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Footer Bar */}
      <div className="max-w-7xl mx-auto mt-16 sm:mt-24 md:mt-32 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
        <div className="text-[#94a3b8] text-xs sm:text-sm">
          © {new Date().getFullYear()} Muhammed Jamal. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <span className="text-[#94a3b8]">Cairo, Egypt</span>
          <span className="text-white/20">•</span>
          <a
            href="https://www.linkedin.com/in/muhammedjamalvfx/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:text-indigo-400 transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
