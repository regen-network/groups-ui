import { useController, useFormContext } from 'react-hook-form'

import { type TextareaProps, Textarea } from '@/atoms'

import { type FieldProps, FieldControl } from './FieldControl'

/** `Textarea` with controls for react-hook-form */
export const TextareaField = ({
  name,
  label,
  ...textareaProps
}: TextareaProps & FieldProps) => {
  const { defaultValue, isRequired } = textareaProps
  const { control } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue,
    rules: { required: isRequired },
  })
  return (
    <FieldControl name={name} label={label} isRequired={isRequired} error={error}>
      <Textarea {...field} {...textareaProps} id={name} />
    </FieldControl>
  )
}
