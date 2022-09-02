import type { ReactNode } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { type NumberInputProps, Flex, NumberInput } from '@/atoms'

import { type FieldProps, FieldControl } from './FieldControl'

/** `NumberInput` with controls for react-hook-form */
/** optionally accepts `children` which will be rendered beside the input */
export const NumberField = ({
  name,
  label,
  children,
  ...numberProps
}: NumberInputProps & FieldProps & { children?: ReactNode }) => {
  const { defaultValue, isRequired } = numberProps
  const { control } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules: { required: isRequired },
  })
  return (
    <FieldControl name={field.name} label={label} isRequired={isRequired} error={error}>
      <Flex>
        <NumberInput {...field} id={name} name={name} />
        {children}
      </Flex>
    </FieldControl>
  )
}
