import type { UseToastOptions } from 'hooks/chakra'

// NOTE: probably unnecessary if we use wrapper hooks for all toasting
export const TOAST_DURATIONS = {
  short: 3000,
  long: 9000,
}

export const TOAST_DEFAULTS: UseToastOptions = {
  position: 'top-right',
  isClosable: true,
  duration: 3500,
}

export const SPACING = {
  formStack: 7,
  formWidth: 570,
}
