import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  type NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react'

import { forwardRef } from './chakra-components'

export type { NumberInputProps }

export const NumberInput = forwardRef((props: NumberInputProps, ref) => {
  return (
    <ChakraNumberInput {...props} w={props.w || 'full'}>
      <ChakraNumberInputField ref={ref} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  )
})
