import { useController, useFormContext } from 'react-hook-form'

import { Button, Input, InputGroup, InputRightElement } from '@/atoms'

import { FieldControl, type FieldProps } from './field-control'

type Props = FieldProps & {
  balances?: any[] // TODO
}

/** Basic number input with a `maxValue`, set upon click */
export const AmountField = ({ balances, ...fieldProps }: Props) => {
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
    const balance = balances?.find((b) => b.denom === getValues('denom'))
    if (balance !== undefined) {
      setValue(name, balance.amount)
    }
  }

  return (
    <FieldControl {...fieldProps} error={error}>
      <InputGroup>
        <Input type="number" {...field} />
        <InputRightElement width="4.5rem">
          <Button size="sm" h="1.75rem" onClick={handleClick}>
            max
          </Button>
        </InputRightElement>
      </InputGroup>
    </FieldControl>
  )
}
