import { type Ref, forwardRef } from 'react'

import { type MotionProps, motion } from './framer-motion'

type Props = MotionProps & { fromRight?: boolean }

/** slide in - default from left */
export const HorizontalSlide = forwardRef(({ fromRight, ...passedProps }: Props, ref) => {
  const offset = 20
  const props: MotionProps = {
    style: { width: '100%' },
    initial: { opacity: 0, x: fromRight ? offset : -offset },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: fromRight ? offset : -offset },
    transition: { duration: 0.2 },
    ...passedProps,
  }
  return <motion.div ref={ref as Ref<HTMLDivElement>} {...props} />
})
HorizontalSlide.displayName = 'HorizontalSlide'
