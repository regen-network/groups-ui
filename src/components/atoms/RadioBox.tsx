import { ReactNode } from 'react'

import { Box, useColorModeValue } from './Chakra'

/** Wrapper for `Radio` elements which can  */
export const RadioBox = ({
  selected,
  error,
  children,
}: {
  selected: boolean
  error?: boolean
  children: ReactNode
}) => {
  const bgSelected = useColorModeValue('gray.100', 'gray.700')
  const borderSelected = useColorModeValue('gray.400', 'gray.500')
  const borderNormal = useColorModeValue('gray.300', 'gray.600')
  return (
    <Box
      w="full"
      borderRadius="md"
      borderWidth={1}
      borderColor={error ? 'red' : selected ? borderSelected : borderNormal}
      py={2}
      px={3}
      shadow={selected ? 'md' : undefined}
      bg={selected ? bgSelected : undefined}
      transition="all 0.2s ease-in-out"
    >
      {children}
    </Box>
  )
}
