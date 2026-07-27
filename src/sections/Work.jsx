import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import VideoLightbox from '../components/VideoLightbox';
import { featured, shorts, thumbUrl } from '../data/videos';

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  }),
};

const categories = [
  'Commercials',
  'Music Videos',
  'Documentaries',
  'Social Shorts',
  'Brand Films',
  'Event Recaps',
  'VFX & 3D',
  'Color Grading',
];

const VideoCard = ({ video, onOpen, isShort, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`vizer-card relative overflow-hidden cursor-pointer group rounded-[20px] bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all duration-500 ${
        isShort ? 'aspect-[9/16]' : 'aspect-video'
      }`}
      onClick={() => onOpen(video)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[20px]">
        <motion.img
          src={thumbUrl(video.id)}
          alt={video.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 flex flex-col justify-between p-6 z-10 pointer-events-none">
        <div className="flex justify-end">
          {video.category && (
            <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {video.category}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center justify-center absolute inset-0">
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="w-16 h-16 rounded-full bg-indigo-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg pointer-events-auto"
          >
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </motion.div>
        </div>

        <div className="z-20">
          <h3 className="text-white text-lg md:text-xl font-bold leading-tight font-montserrat">
            {video.title}
          </h3>
          {video.client && (
            <p className="text-[#94a3b8] text-sm mt-1 font-montserrat">{video.client}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const headerText = 'Cinematic Experiences & Visual Stories'.split(' ');

  return (
    <section id="work" className="py-24 px-6 bg-[#06060a] relative overflow-hidden font-montserrat">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="vizer-badge mb-6"
          >
            Selected Works
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {headerText.map((word, i) => (
              <motion.span key={i} variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#94a3b8] text-lg max-w-2xl"
          >
            From sweeping landscapes to high-octane action, we bring visions to life through dynamic motion and compelling narratives.
          </motion.p>
        </div>

        {/* Featured Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {featured.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onOpen={setSelectedVideo}
              isShort={false}
            />
          ))}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="w-full overflow-hidden bg-indigo-900/10 border-y border-white/5 py-8 mb-20">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 20,
          }}
        >
          {[...categories, ...categories, ...categories].map((cat, i) => (
            <span
              key={i}
              className="text-white/40 text-xl font-bold uppercase tracking-widest px-8"
            >
              {cat} •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-white">Social Shorts</h3>
          <p className="text-[#94a3b8] mt-2">High-impact vertical content engineered for engagement.</p>
        </div>
        
        {/* Shorts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {shorts.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onOpen={setSelectedVideo}
              isShort={true}
            />
          ))}
        </div>
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
