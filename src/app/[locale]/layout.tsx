import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { AppConfig } from '@/utils/AppConfig';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import '@/styles/global.css';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  return {
    title: 'CRYPTO CASH CONTROL',
    description: 'A modern cryptocurrency trading platform',
  };
}

export function generateStaticParams() {
  return AppConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  if (!AppConfig.locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
