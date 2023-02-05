/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_HOSTNAME?: string
  /** URI for proxy server to make ledger requests */
  readonly VITE_PROXY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
