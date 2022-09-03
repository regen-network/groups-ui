import { useEffect } from 'react'

import { enableKeplr, resetKeplr } from 'store/Wallet'

export function useKeplr() {
  useEffect(() => {
    enableKeplr()
    // watch for user key store change
    window.addEventListener('keplr_keystorechange', resetKeplr)
    return () => {
      window.removeEventListener('keplr_keystorechange', resetKeplr)
    }
  }, [])
}
