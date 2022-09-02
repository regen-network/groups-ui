import { useController, useFormContext } from 'react-hook-form'

import { type InputProps, Flex, Input } from '@/atoms'

import { type FieldProps, FieldControl } from './FieldControl'
/** `Input` with controls for react-hook-form */
export const InputField = ({
  name,
  label,
  children,
  ...inputProps
}: InputProps & FieldProps) => {
  const { defaultValue, isRequired } = inputProps
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
    <FieldControl name={field.name} label={label} isRequired={isRequired} error={error}>
      <Flex>
        <Input {...field} {...inputProps} id={name} />
        {children}
      </Flex>
    </FieldControl>
  )
}
