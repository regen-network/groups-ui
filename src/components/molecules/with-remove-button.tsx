import type { ReactNode } from 'react'

import { Box, IconButton, type IconButtonProps } from '@/atoms'

import { AiOutlineMinus } from 'assets/tsx'

/** absolutely positions a remove button on the top-right of whatever it wraps */
export const WithRemoveButton = ({
  onClick,
  children,
  label = 'remove',
  hideBtn = false,
}: {
  children: ReactNode
  onClick: IconButtonProps['onClick']
  hideBtn?: boolean
  label?: IconButtonProps['aria-label']
}) => {
  return (
    <Box pos="relative">
      {!hideBtn && (
        <IconButton
          aria-label={label}
          onClick={onClick}
          variant="solid"
          rounded="full"
          size="xs"
          icon={<AiOutlineMinus />}
          zIndex={2}
          pos="absolute"
          top={0}
          right={0}
          transform="translate(50%, -50%)"
        />
      )}
      {children}
    </Box>
  )
}
