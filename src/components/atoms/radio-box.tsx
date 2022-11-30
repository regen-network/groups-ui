import { useColorModeValue } from 'hooks/chakra'

import { type RadioProps, Box, Collapse, Flex, forwardRef, Radio } from './chakra'

/** Cusom behavior and styles on a `<Radio /> element */
export const RadioBox = forwardRef<
  RadioProps & {
    error?: boolean
    label: string
    selected: boolean
    value: RadioProps['value']
  },
  'div'
>(({ error, children, label, selected, ...radioProps }, ref) => {
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
      py={2.5}
      px={3}
    >
      <Flex direction="column">
        <Radio size="md" value={radioProps.value} w="full" ref={ref}>
          {label}
        </Radio>
        <Collapse in={selected} animateOpacity>
          {children}
        </Collapse>
      </Flex>
    </Box>
  )
})
