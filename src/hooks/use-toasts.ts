import { toErrorWithMessage } from 'util/errors'

import { useToast, type UseToastOptions } from './chakra-hooks'

const TOAST_DURATIONS = {
  short: 2000,
  medium: 3000,
  long: 9000,
}

const TX_TOAST_DEFAULTS: UseToastOptions = {
  position: 'top-right',
  isClosable: true,
  duration: TOAST_DURATIONS.medium,
}

export function useTxToasts() {
  const toast = useToast()
  return {
    toastInfo: (title = 'Broadcasting message...', description?: string) => {
      toast({
        ...TX_TOAST_DEFAULTS,
        ...(!!description && { description }),
        title,
        status: 'info',
      })
    },
    toastSuccess: (txHash: string, title = 'Transaction complete!') => {
      toast({
        ...TX_TOAST_DEFAULTS,
        title,
        description: 'Transaction hash: ' + txHash,
        status: 'success',
      })
    },
    toastErr: (err: unknown, title = 'Transaction failed') => {
      const msg = toErrorWithMessage(err).message
      toast({
        ...TX_TOAST_DEFAULTS,
        title,
        description: msg,
        status: 'error',
        duration: TOAST_DURATIONS.long,
      })
    },
  }
}

const BOTTOM_TOAST_DEFAULTS: UseToastOptions = {
  position: 'bottom',
  duration: TOAST_DURATIONS.short,
}

export function useToastBottom() {
  const toast = useToast()
  return {
    toastInfo: (title: string) => {
      toast({
        ...BOTTOM_TOAST_DEFAULTS,
        title,
        status: 'info',
      })
    },
    toastWarning: (title: string) => {
      toast({
        ...BOTTOM_TOAST_DEFAULTS,
        title,
        status: 'warning',
      })
    },
  }
}
