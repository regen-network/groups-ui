/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_HOSTNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
