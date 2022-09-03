import type { ReactNode } from 'react'

import { motion } from '@/atoms'

export const HorizontalSlide = ({
  children,
  fromLeft = true,
}: {
  children: ReactNode
  fromLeft?: boolean
}) => {
  const offset = 20
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -offset : offset }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: fromLeft ? -offset : offset }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
