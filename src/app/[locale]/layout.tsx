import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { RequestThemeProvider } from '@/context/request-theme-provider';
import { routing } from '@/i18n/routing';
import { StyledComponentsRegistry } from '@/components/styled-components-registry';
import { AppProviders } from '@/shared/providers/app-providers';
import { getSiteUrl } from '@/shared/utils/site-url';

export const metadata: Metadata = {
  title: 'NOVA Store',
  metadataBase: getSiteUrl(),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} data-theme="light">
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Suspense fallback={<RequestThemeFallback>{children}</RequestThemeFallback>}>
              <RequestThemeProvider>{children}</RequestThemeProvider>
            </Suspense>
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

function RequestThemeFallback({ children }: Readonly<{ children: ReactNode }>) {
  return <AppProviders initialTheme="system">{children}</AppProviders>;
}
