import { toErrorWithMessage } from 'util/errors'
import { TOAST_DEFAULTS, TOAST_DURATIONS } from 'util/style.constants'

import { useToast } from './chakra'

export function useTxToasts() {
  const toast = useToast()
  return {
    toastNotify: (title = 'Broadcasting message...', description?: string) => {
      return toast({
        ...TOAST_DEFAULTS,
        ...(!!description && { description }),
        title,
        status: 'info',
        duration: TOAST_DURATIONS.short,
      })
    },
    toastSuccess: (txHash: string, title = 'Transaction complete!') => {
      return toast({
        ...TOAST_DEFAULTS,
        title,
        description: 'Transaction hash: ' + txHash,
        status: 'success',
        duration: TOAST_DURATIONS.short,
      })
    },
    toastErr: (err: unknown, title = 'Transaction failed') => {
      const msg = toErrorWithMessage(err).message
      return toast({
        ...TOAST_DEFAULTS,
        title,
        description: msg,
        status: 'error',
        duration: TOAST_DURATIONS.long,
      })
    },
  }
}
