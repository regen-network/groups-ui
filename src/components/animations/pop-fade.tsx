import type { ReactNode } from 'react'

import { type MotionStyle, motion } from './framer-motion'

export const PopUpFade = ({
  children,
  style,
}: {
  children: ReactNode
  style?: MotionStyle
}) => {
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, scale: 0.99, height: '90%' }}
      animate={{ opacity: 1, scale: 1, height: '100%' }}
      exit={{ opacity: 0, scale: 0.99, height: '90%' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
