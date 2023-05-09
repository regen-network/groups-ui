import { forwardRef, type Ref } from 'react'

import { motion, type MotionProps } from './framer-motion'
import { MOTIONS } from './motions'

type Props = MotionProps & { fromRight?: boolean }

/** slide in - default from left */
export const HorizontalSlide = forwardRef(({ fromRight, ...passedProps }: Props, ref) => {
  const props: MotionProps = {
    style: { width: '100%' },
    ...MOTIONS.horizontalSlide(fromRight),
    ...passedProps,
  }
  return <motion.div ref={ref as Ref<HTMLDivElement>} {...props} />
})
HorizontalSlide.displayName = 'HorizontalSlide'
