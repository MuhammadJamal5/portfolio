import { motion } from 'framer-motion'

export default function SplitText({ text, className = '', delay = 0, stagger = 0.04, once = true }) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once }}
            transition={{
              duration: 0.7,
              delay: delay + wi * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
