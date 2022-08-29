import type { ReactNode } from 'react'
import { type FieldError, useController, useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioBox,
  RadioGroup,
  Text,
  Textarea,
  VStack,
} from '@/atoms'

type FieldProps = {
  name: string
  label: string
  required?: boolean
  defaultValue?: string
}

export const FieldControl = ({
  name,
  label,
  children,
  error,
  required,
}: {
  children: ReactNode
  name: string
  label: string
  error?: FieldError
  required?: boolean
}) => {
  return (
    <FormControl isInvalid={!!error && !!required}>
      <FormLabel htmlFor={name}>
        {label}
        {!required && (
          <Text fontSize="sm" color="gray" display="inline">
            {' (optional)'}
          </Text>
        )}
      </FormLabel>
      {children}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  )
}

export const InputField = ({ name, label, required, defaultValue }: FieldProps) => {
  const { control } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue,
    rules: { required },
  })
  return (
    <FieldControl name={field.name} error={error} label={label} required={required}>
      <Input id={name} {...field} />
    </FieldControl>
  )
}

export const TextareaField = ({
  name,
  label,
  defaultValue,
  required = false,
}: FieldProps) => {
  const { control } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue,
    rules: { required },
  })
  return (
    <FieldControl name={field.name} label={label} required={required} error={error}>
      <Textarea {...field} id={name} resize="vertical" />
    </FieldControl>
  )
}

export const RadioGroupField = ({
  options,
  name,
  label,
  defaultValue,
  required,
}: FieldProps & { options: { value: string; label: string }[] }) => {
  const { control } = useFormContext()
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
    defaultValue,
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
            <RadioBox key={label + i} selected={field.value === value}>
              <Radio size="md" value={value} w="full">
                {label}
              </Radio>
            </RadioBox>
          ))}
        </VStack>
      </RadioGroup>
    </FieldControl>
  )
}
