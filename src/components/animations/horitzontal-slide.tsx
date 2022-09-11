import type { ReactNode } from 'react'

import { motion } from './framer-motion'

/** slide in - default from left */
export const HorizontalSlide = ({
  children,
  fromRight = false,
}: {
  children: ReactNode
  fromRight?: boolean
}) => {
  const offset = 20
  return (
    <motion.div
      initial={{ opacity: 0, x: fromRight ? offset : -offset }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: fromRight ? offset : -offset }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
