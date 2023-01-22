import { type Ref, forwardRef } from 'react'

import { type MotionProps, motion } from './framer-motion'

const fadeInProps: MotionProps = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
}

export const FadeIn = forwardRef((passedProps: MotionProps, ref) => {
  const props = { ...fadeInProps, ...passedProps }
  return <motion.div {...props} ref={ref as Ref<HTMLDivElement>} />
})
FadeIn.displayName = 'FadeIn'

export const FadeInTr = forwardRef((passedProps: MotionProps, ref) => {
  const props = { ...fadeInProps, ...passedProps }
  return <motion.tr {...props} ref={ref as Ref<HTMLTableRowElement>} />
})
FadeInTr.displayName = 'FadeInTr'
