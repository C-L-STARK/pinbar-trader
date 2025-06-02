import type { LocalizationResource } from '@clerk/types';
import type { LocalePrefixMode } from 'next-intl/routing';
import { enUS, zhCN } from '@clerk/localizations';

const localePrefix: LocalePrefixMode = 'as-needed';

export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix,
};

const supportedLocales: Record<string, LocalizationResource> = {
  en: enUS,
  zh: zhCN,
};

export const ClerkLocalizations = {
  defaultLocale: enUS,
  supportedLocales,
};
