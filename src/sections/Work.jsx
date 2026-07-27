import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import VideoLightbox from '../components/VideoLightbox';
import { featured, shorts, thumbUrl } from '../data/videos';

const filterTabs = [
  { id: 'all', label: 'All Works' },
  { id: 'commercials', label: 'Commercials & Ads' },
  { id: 'ai', label: 'AI & Motion' },
  { id: 'saas', label: 'SaaS & Tech' },
  { id: 'social', label: 'Social Reels' },
];

const marqueeCategories = [
  'Commercials',
  'Music Videos',
  'Documentaries',
  'Social Shorts',
  'Brand Films',
  'Event Recaps',
  'VFX & 3D',
  'Color Grading',
];

const VideoCard = ({ video, onOpen, isShort }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`vizer-card relative overflow-hidden cursor-pointer group rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all duration-300 ${
        isShort ? 'aspect-[9/16]' : 'aspect-video'
      }`}
      onClick={() => onOpen(video)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.img
          src={thumbUrl(video.id)}
          alt={video.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 flex flex-col justify-between p-3.5 sm:p-5 md:p-6 z-10 pointer-events-none">
        <div className="flex justify-end">
          {video.category && (
            <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider">
              {video.category}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center justify-center absolute inset-0">
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-indigo-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg pointer-events-auto"
          >
            <Play className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 ml-0.5" fill="currentColor" />
          </motion.div>
        </div>

        <div className="z-20 text-left">
          <h3 className="text-white text-xs sm:text-lg md:text-xl font-bold leading-tight font-montserrat">
            {video.title}
          </h3>
          {video.client && (
            <p className="text-[#94a3b8] text-[11px] sm:text-sm mt-0.5 font-montserrat">{video.client}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const matchesFilter = (video) => {
    if (activeTab === 'all') return true;
    const cat = (video.category || '').toLowerCase();
    if (activeTab === 'commercials') return cat.includes('commercial') || cat.includes('ad');
    if (activeTab === 'ai') return cat.includes('ai') || cat.includes('vfx') || cat.includes('concept');
    if (activeTab === 'saas') return cat.includes('saas') || cat.includes('tech') || cat.includes('app');
    if (activeTab === 'social') return cat.includes('social') || cat.includes('finance');
    return true;
  };

  const filteredFeatured = featured.filter(matchesFilter);
  const filteredShorts = shorts.filter(matchesFilter);

  return (
    <section id="work" className="py-16 px-4 sm:py-20 sm:px-6 md:py-24 bg-[#06060a] relative overflow-hidden font-montserrat">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section — 100% Centered */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="vizer-badge mb-4 sm:mb-6"
          >
            Selected Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-center leading-tight max-w-4xl"
          >
            Cinematic Experiences & Visual Stories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#94a3b8] text-xs sm:text-base md:text-lg max-w-2xl text-center px-2"
          >
            From high-converting SaaS demos to viral brand reels and AI motion experiments.
          </motion.p>

          {/* Centered Horizontal Filter Bar */}
          <div className="mt-6 sm:mt-8 w-full flex justify-center">
            <div className="max-w-full overflow-x-auto no-scrollbar flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-600/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured 16:9 Videos Grid */}
        <AnimatePresence mode="popLayout">
          {filteredFeatured.length > 0 && (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20"
            >
              {filteredFeatured.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onOpen={setSelectedVideo}
                  isShort={false}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Infinite Marquee */}
      <div className="w-full overflow-hidden bg-indigo-900/10 border-y border-white/5 py-6 sm:py-8 mb-12 sm:mb-16 md:mb-20">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 20,
          }}
        >
          {[...marqueeCategories, ...marqueeCategories, ...marqueeCategories].map((cat, i) => (
            <span
              key={i}
              className="text-white/40 text-xs sm:text-lg md:text-xl font-bold uppercase tracking-widest px-6 sm:px-8"
            >
              {cat} •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredShorts.length > 0 && (
            <motion.div layout>
              <div className="mb-8 sm:mb-10 flex flex-row items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white text-left">Social Shorts & Reels</h3>
                  <p className="text-[#94a3b8] mt-1 text-[11px] sm:text-sm text-left">High-impact vertical content engineered for retention.</p>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 whitespace-nowrap">
                  {filteredShorts.length} Videos
                </span>
              </div>
              
              {/* Shorts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {filteredShorts.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onOpen={setSelectedVideo}
                    isShort={true}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <VideoLightbox
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default Work;
