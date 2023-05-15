import { useController, useFormContext } from 'react-hook-form'

import {
  RadioGroup,
  type RadioGroupProps,
  type RadioProps,
  type StackProps,
} from '@/atoms'

import { type RadioGroupOption, RadioGroupOptions } from '../radio-group-options'

import { FieldControl, type FieldProps } from './field-control'

type Props = FieldProps & {
  options: RadioGroupOption[]
  radioGroupProps?: Omit<RadioGroupProps, 'children' | keyof FieldProps>
  spacing?: StackProps['spacing']
  size?: RadioProps['size']
}

/** custom radio group field for react hook form - optionally can be passed `children` which will render within the selected radio group option */
export const RadioGroupField = ({
  label,
  name,
  options,
  radioGroupProps,
  required,
  size,
  spacing,
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
        <RadioGroupOptions
          options={options}
          selected={field.value}
          spacing={spacing}
          size={size}
        />
      </RadioGroup>
    </FieldControl>
  )
}
