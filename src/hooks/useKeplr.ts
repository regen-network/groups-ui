import { useEffect } from 'react'

import { enableKeplr } from 'store'

export function useKeplr() {
  window.onload = () => {
    enableKeplr()
  }

  useEffect(() => {
    // watch for user key store change
    window.addEventListener('keplr_keystorechange', enableKeplr)
    return () => {
      window.removeEventListener('keplr_keystorechange', enableKeplr)
    }
  }, [])
}
