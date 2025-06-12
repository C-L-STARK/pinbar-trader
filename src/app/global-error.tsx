'use client';

import { NextIntlClientProvider } from 'next-intl';
import NextError from 'next/error';
import { locales, defaultLocale } from '@/i18n';

export default function GlobalError(props: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang={defaultLocale}>
      <body>
        <NextIntlClientProvider locale={defaultLocale}>
          <NextError statusCode={500} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
