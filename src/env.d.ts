/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: string;
  readonly SMTP_USER: string;
  readonly SMTP_PASS: string;
  readonly CONTACT_FROM_EMAIL: string;
  readonly CONTACT_TO_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
