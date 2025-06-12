import { createNavigation } from 'next-intl/navigation';
import { AppConfig } from '@/utils/AppConfig';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: AppConfig.locales,
  defaultLocale: AppConfig.defaultLocale,
  localePrefix: AppConfig.localePrefix,
});
