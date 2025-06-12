import type { Pathnames } from 'next-intl/navigation';

export type Messages = typeof import('@/messages/en.json');

export type Locale = 'en' | 'zh';

export type PathnameLocale = {
  pathname: string;
  locale: Locale;
};

export type PathnamesConfig = Pathnames<{
  '/': {};
  '/about': {};
  '/sign-in': {};
  '/sign-up': {};
}>; 