import { useController, useFormContext } from 'react-hook-form'

import { Textarea } from '@/atoms'

import { type FieldProps, FieldControl } from './FieldControl'

/** `Textarea` with controls for react-hook-form */
export const TextareaField = (fieldProps: FieldProps) => {
  const { name, required } = fieldProps
  const { control, getValues } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue: getValues(name),
    rules: { required: required },
  })
  return (
    <FieldControl {...fieldProps} error={error}>
      <Textarea {...field} id={name} />
    </FieldControl>
  )
}
