import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.2'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [60, 0, 0])

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  )
}
