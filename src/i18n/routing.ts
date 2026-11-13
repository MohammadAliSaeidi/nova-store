import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  localePrefix: 'always',
  localeCookie: {
    name: 'NOVA_LOCALE',
    maxAge: 31_536_000,
  },
});

export type Locale = (typeof routing.locales)[number];
