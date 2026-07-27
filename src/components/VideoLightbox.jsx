import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { embedUrl } from '../data/videos'

// Premium video lightbox. The YouTube iframe is only mounted while open, so
// no player weight loads until the user actually clicks play.
export default function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const isShort = video?.orientation === 'short'

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          style={{ background: 'rgba(3,3,8,0.82)', backdropFilter: 'blur(10px)' }}
        >
          <motion.button
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-5 right-5 z-10 flex items-center justify-center w-11 h-11 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
          >
            <X size={20} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: isShort ? 'min(92vw, 420px)' : 'min(92vw, 1100px)',
              aspectRatio: isShort ? '9 / 16' : '16 / 9',
              maxHeight: '88vh',
              boxShadow: '0 30px 80px -20px rgba(124,58,237,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#000',
            }}
          >
            <iframe
              src={embedUrl(video.id)}
              title={video.title}
              allow="accelerated-analytics; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          </motion.div>

          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <p className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
              {video.title}
            </p>
            <p className="text-xs mt-1" style={{ color: 'rgba(167,139,250,0.8)' }}>
              {video.category}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
