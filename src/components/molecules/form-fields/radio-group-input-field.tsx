import { useController, useFormContext } from 'react-hook-form'

import {
  type RadioGroupProps,
  type RadioProps,
  Flex,
  Input,
  RadioBox,
  RadioGroup,
  Text,
  VStack,
} from '@/atoms'

import { type FieldProps, FieldControl } from './field-control'

type Option = {
  label: string
  value: RadioProps['value']
  // children?: ReactNode
}

type Props = FieldProps & {
  options: Option[]
  radioGroupProps?: Omit<RadioGroupProps, 'children' | keyof FieldProps>
}

/** custom radio group field with an input for value */
export const RadioGroupInputField = ({
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
        {...radioGroupProps}
      >
        <VStack align="start">
          {options.map(({ value, label }, i) => (
            <RadioBox
              key={label + i}
              selected={field.value === value}
              value={value}
              label={label}
            >
              <Flex>
                <Input />
                <Text>Text for this component</Text>
              </Flex>
            </RadioBox>
          ))}
        </VStack>
      </RadioGroup>
    </FieldControl>
  )
}
