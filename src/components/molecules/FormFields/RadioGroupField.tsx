import { useController, useFormContext } from 'react-hook-form'

import { type RadioGroupProps, RadioBox, RadioGroup, VStack } from '@/atoms'

import { type FieldProps, FieldControl } from './FieldControl'

type Option = {
  label: string
  value: string
}

type Props = Omit<RadioGroupProps, 'children'> &
  FieldProps & {
    options: Option[]
    isRequired?: boolean
  }

/** custom radio group field for react hook form */
export const RadioGroupField = ({
  options,
  label,
  isRequired,
  ...radioGroupProps
}: Props) => {
  const { name, defaultValue } = radioGroupProps
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
    <FieldControl name={field.name} label={label} error={error} isRequired={isRequired}>
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
