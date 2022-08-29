import { Box, useColorModeValue } from '@/atoms'

export const FormCard = (p: { children: React.ReactNode }) => (
  <Box
    w={['100%', 'lg']}
    px={4}
    py={8}
    borderWidth="1px"
    borderRadius="lg"
    bg={useColorModeValue('white', 'gray.800')}
    // bgColor="gray.50"
  >
    {p.children}
  </Box>
)
