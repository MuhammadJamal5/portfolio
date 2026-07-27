import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Word({ children, scrollYProgress, start, end }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1])
  const y = useTransform(scrollYProgress, [start, end], [14, 0])
  return (
    <motion.span style={{ opacity, y, display: 'inline-block', marginRight: '0.3em' }}>
      {children}
    </motion.span>
  )
}

export default function RevealWords({ text, className, style }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'end 0.45'],
  })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <Word
          key={i}
          scrollYProgress={scrollYProgress}
          start={i / words.length}
          end={Math.min((i + 1) / words.length, 1)}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}
