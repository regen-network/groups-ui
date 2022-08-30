import type { ReactNode } from 'react'
import { type FieldError, useController, useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
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
  helperText?: string
}

/** Wrapper for form elements which adds label + error handling */
export const FieldControl = ({
  children,
  error,
  helperText,
  label,
  name,
  required,
}: {
  children: ReactNode
  error?: FieldError
  helperText?: string
  label: string
  name: string
  required?: boolean
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>
        {label}
        {!required && (
          <Text fontSize="sm" color="gray" display="inline">
            {' (optional)'}
          </Text>
        )}
      </FormLabel>
      {children}
      {!error ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

/** `Input` with controls for react-hook-form */
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
    <FieldControl name={field.name} label={label} required={required} error={error}>
      <Input {...field} id={name} />
    </FieldControl>
  )
}

/** `Input` with controls for react-hook-form */
export const TextareaField = ({ name, label, required, defaultValue }: FieldProps) => {
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
            <RadioBox key={label + i} selected={field.value === value} value={value}>
              {label}
            </RadioBox>
          ))}
        </VStack>
      </RadioGroup>
    </FieldControl>
  )
}
