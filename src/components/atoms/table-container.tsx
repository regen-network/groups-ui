import {
  TableContainer as ChakraContainer,
  type TableContainerProps,
} from '@chakra-ui/react'

import { useColorModeValue } from 'hooks/chakra-hooks'

export const TableContainer = ({
  borderRadius = 'lg',
  borderWidth = 2,
  bg,
  shadow,
  ...props
}: TableContainerProps) => {
  const defaultBg = useColorModeValue('white', 'gray.800')
  const defaultShadow = useColorModeValue('md', 'xl')
  return (
    <ChakraContainer
      shadow={shadow || defaultShadow}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      bg={bg || defaultBg}
      {...props}
    />
  )
}
