import { forwardRef, type Ref } from 'react'

import { motion, type MotionProps } from './framer-motion'
import { MOTIONS } from './motions'

export const FadeIn = forwardRef((passedProps: MotionProps, ref) => {
  const props = { ...MOTIONS.fadeIn, ...passedProps }
  return <motion.div {...props} ref={ref as Ref<HTMLDivElement>} />
})
FadeIn.displayName = 'FadeIn'
