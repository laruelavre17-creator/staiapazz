interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly VITE_PUBLIC_URL?: string;
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
