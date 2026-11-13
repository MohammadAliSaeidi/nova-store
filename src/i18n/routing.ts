import { defineRouting } from 'next-intl/routing';

export const localeCookie = {
  name: 'NOVA_LOCALE',
  maxAge: 31_536_000,
} as const;

export const routing = defineRouting({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  localePrefix: 'always',
  localeCookie,
});

