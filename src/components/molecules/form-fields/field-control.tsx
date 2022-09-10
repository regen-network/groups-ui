import type { ReactNode } from 'react'
import { type FieldError } from 'react-hook-form'

import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Text } from '@/atoms'

export type FieldProps = {
  name: string
  label?: string
  helperText?: string
  required?: boolean
}

/** Wrapper for form elements which adds label + error handling */
export const FieldControl = ({
  children,
  error,
  helperText,
  required,
  label,
  name,
}: FieldProps & {
  children: ReactNode
  error?: FieldError
}) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name}>
          {label}
          {!required && (
            <Text fontSize="sm" color="gray" display="inline">
              {' (optional)'}
            </Text>
          )}
        </FormLabel>
      )}
      {children}
      {!error && helperText ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}
