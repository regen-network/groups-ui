import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  useColorModeValue,
  VStack,
} from '@/atoms'

type FieldProps = { name: string; label: string; required?: boolean }

export const FieldControl = ({
  name,
  label,
  children,
  required,
}: FieldProps & { children: ReactNode }) => {
  const { getFieldState, formState } = useFormContext()
  const { error } = getFieldState(name, formState)
  return (
    <FormControl isInvalid={!!error && !!required}>
      <FormLabel htmlFor={name}>
        {label}
        {!required && ' (optional)'}
      </FormLabel>
      {children}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  )
}

export const FormInput = (fieldProps: FieldProps) => {
  const { register } = useFormContext()
  const { name } = fieldProps
  return (
    <FieldControl {...fieldProps}>
      <Input id={name} {...register(name)} />
    </FieldControl>
  )
}

export const FormTextarea = (fieldProps: FieldProps) => {
  const { register } = useFormContext()
  const { name } = fieldProps
  return (
    <FieldControl {...fieldProps}>
      <Textarea {...register(name)} id={name} resize="vertical" />
    </FieldControl>
  )
}

export const FormRadioGroup = ({
  options,
  ...fieldProps
}: FieldProps & { options: { value: string; label: string }[] }) => {
  const { register, getValues } = useFormContext()
  const { name } = fieldProps
  const activeValue: string = getValues(name)
  return (
    <FieldControl {...fieldProps}>
      {/* <RadioGroup onChange={(nextVal) => setValue(name, nextVal)} id={name}> */}
      <RadioGroup id={name}>
        <VStack align="start">
          {options.map(({ value, label }, i) => (
            <Box key={value + i} borderWidth={1} w="full" borderRadius="md" py={2} px={3}>
              <Radio size="md" {...register(name)} value={value} w="full">
                {label}
              </Radio>
            </Box>
          ))}
        </VStack>
      </RadioGroup>
    </FieldControl>
  )
}
