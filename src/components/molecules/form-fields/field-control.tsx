import type { ReactNode } from 'react'
import { type FieldError } from 'react-hook-form'

import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
} from '@/atoms'

export type FieldProps = {
  helperText?: string
  label?: string
  labelRight?: JSX.Element
  name: string
  required?: boolean
}

/** Wrapper for form elements which adds label + error display */
export const FieldControl = ({
  children,
  error,
  helperText,
  label,
  labelRight,
  name,
  required,
}: FieldProps & {
  children: ReactNode
  error?: FieldError
}) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <Flex justify="space-between" align="baseline">
          <FormLabel htmlFor={name}>
            {label}
            {!required && (
              <Text fontSize="sm" color="gray" display="inline">
                {' (optional)'}
              </Text>
            )}
          </FormLabel>
          {!!labelRight && <div>{labelRight}</div>}
        </Flex>
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
