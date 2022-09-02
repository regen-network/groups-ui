import { ReactNode } from 'react'

import { Box, useColorModeValue } from './Chakra'

export const FormCard = (p: { children: ReactNode }) => (
  <Box
    w={['100%', 560]}
    px={4}
    py={8}
    borderWidth="1px"
    borderRadius="lg"
    bg={useColorModeValue('white', 'gray.800')}
  >
    {p.children}
  </Box>
)
