import {
  type NumberInputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

import { forwardRef } from './chakra'

export type { NumberInputProps }

export const NumberInput = forwardRef((props: NumberInputProps, ref) => {
  return (
    <ChakraNumberInput {...props}>
      <ChakraNumberInputField ref={ref} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  )
})
