import { useController, useFormContext } from 'react-hook-form'

import { type InputProps, Input } from '@/atoms/chakra-components'

import { type FieldProps, FieldControl } from './field-control'

/** `Input` with controls for react-hook-form */
export const InputField = ({
  inputProps,
  ...fieldProps
}: FieldProps & { inputProps?: InputProps }) => {
  const { name, required } = fieldProps

  const ctx = useFormContext()
  const { control, getValues } = ctx
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue: getValues(name),
    rules: { required },
  })
  return (
    <FieldControl {...fieldProps} error={error}>
      <Input {...field} {...inputProps} />
    </FieldControl>
  )
}
