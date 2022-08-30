import { type RadioProps, Box, forwardRef, Radio, useColorModeValue } from './Chakra'

/** Cusom behavior and styles on a `<Radio /> element */
export const RadioBox = forwardRef<
  RadioProps & { selected: boolean; value: string; error?: boolean },
  'div'
>(({ selected, error, children, ...radioProps }, ref) => {
  const bgSelected = useColorModeValue('gray.100', 'gray.700')
  const borderSelected = useColorModeValue('gray.400', 'gray.500')
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
    >
      <Radio size="md" py={2.5} px={3} value={radioProps.value} w="full" ref={ref}>
        {children}
      </Radio>
    </Box>
  )
})
