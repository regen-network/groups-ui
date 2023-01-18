import { type CardProps, Card as ChakraCard } from '@chakra-ui/react'

import { useColorModeValue } from 'hooks/chakra'

export const Card = ({ variant, borderRadius, bg, shadow, ...props }: CardProps) => {
  const defaultBg = useColorModeValue('white', 'gray.800')
  const defaultShadow = useColorModeValue('md', 'dark-lg')
  return (
    <ChakraCard
      {...props}
      variant={variant || 'outline'}
      borderRadius={borderRadius || 'lg'}
      shadow={shadow || defaultShadow}
      bg={bg || defaultBg}
    />
  )
}
