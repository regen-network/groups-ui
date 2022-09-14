import type { ReactNode } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { strToNumOrEmpty } from 'util/helpers'

import { type NumberInputProps, Flex, NumberInput } from '@/atoms'

import { type FieldProps, FieldControl } from './field-control'

/** `NumberInput` with controls for react-hook-form */
/** optionally accepts `children` which will be rendered beside the input */
export const NumberField = ({
  children,
  numberInputProps,
  ...fieldProps
}: FieldProps & { numberInputProps?: NumberInputProps; children?: ReactNode }) => {
  const { name, required } = fieldProps
  const { control, getValues } = useFormContext()
  const {
    fieldState: { error },
    field: { onChange, ...field },
  } = useController({
    name,
    control,
    defaultValue: getValues(name),
    rules: { required },
  })
  return (
    <FieldControl {...fieldProps} error={error}>
      <Flex>
        <NumberInput
          {...field}
          {...numberInputProps}
          // without the conversion, this can be set to decimal values which we
          // don't want. Setting it as a `number` causes a whole host of other
          // issues as well, like `NaN` rendering in the input. There might be a
          // better appraoch though, possible future refactor
          onChange={(n) => onChange(strToNumOrEmpty(n))}
        />
        {children}
      </Flex>
    </FieldControl>
  )
}
