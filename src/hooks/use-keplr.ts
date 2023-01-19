import { useEffect } from 'react'

import { bootstrapKeplr } from 'store/wallet.store'

export function useKeplr() {
  useEffect(() => {
    bootstrapKeplr()
    // watch for user key store change
    window.addEventListener('keplr_keystorechange', bootstrapKeplr)
    return () => {
      window.removeEventListener('keplr_keystorechange', bootstrapKeplr)
    }
  }, [])
}
