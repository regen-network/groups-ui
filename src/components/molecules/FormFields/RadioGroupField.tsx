import { useController, useFormContext } from 'react-hook-form'

import { RadioBox, RadioGroup, VStack } from '@/atoms'

import { type FieldProps, FieldControl } from './FieldControl'

type Option = {
  label: string
  value: string
}

type Props = FieldProps & {
  options: Option[]
}

/** custom radio group field for react hook form */
export const RadioGroupField = ({ options, label, required, name }: Props) => {
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
      >
        <VStack align="start">
          {options.map(({ value, label }, i) => (
            <RadioBox key={label + i} selected={field.value === value} value={value}>
              {label}
            </RadioBox>
          ))}
        </VStack>
      </RadioGroup>
    </FieldControl>
  )
}
