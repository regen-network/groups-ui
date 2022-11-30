import { useController, useFormContext } from 'react-hook-form'

import { type RadioGroupProps, RadioGroup } from '@/atoms'

import { type RadioGroupOption, RadioGroupOptions } from '../radio-group-options'

import { type FieldProps, FieldControl } from './field-control'

type Props = FieldProps & {
  options: RadioGroupOption[]
  radioGroupProps?: Omit<RadioGroupProps, 'children' | keyof FieldProps>
}

/** custom radio group field for react hook form */
export const RadioGroupField = ({
  options,
  label,
  required,
  name,
  radioGroupProps,
}: Props) => {
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
    <FieldControl name={field.name} label={label} error={error} required={required}>
      <RadioGroup
        id={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        value={field.value}
        defaultValue={field.value}
        {...radioGroupProps}
      >
        <RadioGroupOptions options={options} selected={field.value} />
      </RadioGroup>
    </FieldControl>
  )
}
