import { useController, useFormContext } from 'react-hook-form'

import { type AmountInputProps, AmountInput } from '@/atoms/amount-input'
import { Heading, HStack, Text } from '@/atoms/chakra-components'

import { type FieldProps, FieldControl } from './field-control'

type Props = FieldProps & {
  inputProps?: AmountInputProps
  maxValue: string
  maxLabel?: string
  denom?: string
}

/** Basic number input with a `maxValue`, set upon click */
export const AmountField = ({
  maxValue,
  maxLabel = 'Available:',
  denom,
  inputProps,
  ...fieldProps
}: Props) => {
  const { name, required } = fieldProps
  const { control, getValues, setValue } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue: getValues(name),
    rules: { required },
  })

  function handleClick() {
    setValue(name, maxValue)
  }

  return (
    <FieldControl
      {...fieldProps}
      error={error}
      labelRight={
        <HStack alignItems="baseline">
          <Text fontSize="xs">{maxLabel + ' '}</Text>
          <Heading variant="label" fontSize="xs">
            {maxValue}
            {denom && ' ' + denom}
          </Heading>
        </HStack>
      }
    >
      <AmountInput {...field} {...inputProps} onMaxClick={handleClick} />
    </FieldControl>
  )
}
