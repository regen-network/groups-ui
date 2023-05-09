import { useColorModeValue } from 'hooks/chakra-hooks'

import {
  Box,
  type BoxProps,
  Flex,
  forwardRef,
  Radio,
  type RadioProps,
} from './chakra-components'

/** Cusom behavior and styles on a `<Radio /> element */
export const RadioBox = forwardRef<
  RadioProps & {
    rootProps?: BoxProps
    error?: boolean
    label: string
    selected: boolean
    value: RadioProps['value']
  },
  'div'
>(({ rootProps, error, children, label, selected, ...radioProps }, ref) => {
  const bgSelected = useColorModeValue('gray.100', 'gray.700')
  const borderSelected = useColorModeValue('blue.300', 'blue.700')
  const borderNormal = useColorModeValue('gray.300', 'gray.600')
  return (
    <Box
      w="full"
      borderRadius="md"
      borderWidth={1}
      borderColor={error ? 'red' : selected ? borderSelected : borderNormal}
      shadow={selected ? 'md' : undefined}
      bg={selected ? bgSelected : undefined}
      transition="all 0.2s ease-in-out"
      py={rootProps?.py || 2.5}
      px={rootProps?.px || 3}
      {...rootProps}
    >
      <Flex direction="column">
        <Radio w="full" ref={ref} {...radioProps}>
          {label}
        </Radio>
        {children}
      </Flex>
    </Box>
  )
})
