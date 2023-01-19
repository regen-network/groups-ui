import { toErrorWithMessage } from 'util/errors'

import type { UseToastOptions } from 'hooks/chakra-hooks'

import { useToast } from './chakra-hooks'

const TOAST_DURATIONS = {
  short: 1500,
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
    toastNotify: (title = 'Broadcasting message...', description?: string) => {
      return toast({
        ...TX_TOAST_DEFAULTS,
        ...(!!description && { description }),
        title,
        status: 'info',
      })
    },
    toastSuccess: (txHash: string, title = 'Transaction complete!') => {
      return toast({
        ...TX_TOAST_DEFAULTS,
        title,
        description: 'Transaction hash: ' + txHash,
        status: 'success',
      })
    },
    toastErr: (err: unknown, title = 'Transaction failed') => {
      const msg = toErrorWithMessage(err).message
      return toast({
        ...TX_TOAST_DEFAULTS,
        title,
        description: msg,
        status: 'error',
        duration: TOAST_DURATIONS.long,
      })
    },
  }
}

export function useToastCopied(title = 'Copied to clipboard!') {
  const toast = useToast()
  return () =>
    toast({
      title,
      position: 'bottom',
      status: 'info',
      duration: TOAST_DURATIONS.short,
    })
}
