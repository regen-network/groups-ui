import { ReactNode } from 'react'

import { SPACING } from 'util/style.constants'

import { useColorModeValue } from 'hooks/chakra'

import { Box, Text } from './chakra'

export const FormCard = ({
  title,
  children,
}: {
  children: ReactNode
  title?: string
}) => {
  const titleColor = useColorModeValue('gray.200', 'gray.700')
  return (
    <Box
      w={['100%', SPACING.formWidth]}
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.800')}
    >
      {title && (
        <Box px={4} py={3} bg={titleColor}>
          <Text fontWeight="bold">{title}</Text>
        </Box>
      )}
      <Box px={4} py={8}>
        {children}
      </Box>
    </Box>
  )
}
