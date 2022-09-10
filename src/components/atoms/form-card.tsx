import { ReactNode } from 'react'

import { useColorModeValue } from 'hooks/chakra'

import { Box } from './chakra'

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
