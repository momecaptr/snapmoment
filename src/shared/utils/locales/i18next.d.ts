import { enTranslation } from '@/shared/utils/locales/languages/en/translation.json';

const resources = { translation: enTranslation } as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources;
  }
}
