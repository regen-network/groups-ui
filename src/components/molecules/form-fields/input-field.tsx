import { useController, useFormContext } from 'react-hook-form'

import { type InputProps, Input } from '@/atoms'

import { type FieldProps, FieldControl } from './field-control'

/** `Input` with controls for react-hook-form */
export const InputField = ({
  inputProps,
  ...fieldProps
}: FieldProps & { inputProps?: InputProps }) => {
  const { name, required } = fieldProps

  const { control, getValues } = useFormContext()
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
