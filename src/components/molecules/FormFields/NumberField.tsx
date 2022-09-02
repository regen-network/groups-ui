import type { ReactNode } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { type NumberInputProps, Flex, NumberInput } from '@/atoms'

import { type FieldProps, FieldControl } from './FieldControl'

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
          onChange={(_, val) => onChange(val)}
        />
        {children}
      </Flex>
    </FieldControl>
  )
}
