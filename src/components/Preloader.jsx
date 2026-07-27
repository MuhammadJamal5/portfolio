import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, CornerDownLeft } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Counter 0 to 100
  useEffect(() => {
    const duration = 1400; // ms
    const startTime = performance.now();

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsReady(true);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  // Listen for ENTER key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Enter' || e.code === 'Enter') && isReady && !isExiting) {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady, isExiting]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 h-[100dvh] z-[99999] bg-[#06060a] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden font-montserrat select-none cursor-pointer"
          onClick={() => isReady && !isExiting && handleEnter()}
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.25),transparent_70%)] pointer-events-none animate-pulse" />

          {/* Top Brand Tag */}
          <div className="w-full max-w-5xl flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-600/30">
                MJ
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-400 uppercase">
                Muhammed Jamal
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-indigo-400/80">PORTFOLIO v2026</span>
          </div>

          {/* Center Stage */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
            {/* Progress Percentage */}
            <div className="relative mb-4 sm:mb-6">
              <motion.span
                key={progress}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className="text-6xl sm:text-8xl font-black text-white tracking-tighter font-mono"
              >
                {progress}
                <span className="text-indigo-400 text-4xl sm:text-6xl">%</span>
              </motion.span>
            </div>

            {/* Loading Bar */}
            <div className="w-56 sm:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden mb-6 sm:mb-8 border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-purple-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Prompt when 100% ready */}
            <div className="h-16 flex items-center justify-center">
              {isReady ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnter();
                    }}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/40 hover:bg-indigo-500 transition-all border border-indigo-400/30 group"
                  >
                    <CornerDownLeft size={16} className="text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
                    <span>{isTouchDevice ? 'TAP TO EXPLORE' : 'PRESS ENTER TO EXPLORE'}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  <Sparkles size={14} className="animate-spin text-indigo-400" />
                  <span>INITIALIZING EXPERIENCE...</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10 text-[11px] text-slate-500 tracking-wider uppercase">
            <span>AI MOTION ARTIST & SENIOR VIDEO EDITOR</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
