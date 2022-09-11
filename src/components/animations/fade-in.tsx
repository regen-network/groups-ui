import type { ReactNode } from 'react'

import { type MotionStyle, motion } from './framer-motion'

export const FadeIn = ({
  children,
  style,
}: {
  children: ReactNode
  style?: MotionStyle
}) => {
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export const FadeInTR = ({
  children,
  style,
}: {
  children: ReactNode
  style?: MotionStyle
}) => {
  return (
    <motion.tr
      style={style}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.tr>
  )
}
