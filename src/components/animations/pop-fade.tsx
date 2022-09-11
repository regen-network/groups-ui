import type { ReactNode } from 'react'

import { motion } from './framer-motion'

export const PopUpFade = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.995, y: 10, height: '95%' }}
      animate={{ opacity: 1, scale: 1, y: 0, height: '100%' }}
      exit={{ opacity: 0, scale: 0.995, y: -10, height: '95%' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
