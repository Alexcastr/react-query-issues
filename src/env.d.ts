/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
