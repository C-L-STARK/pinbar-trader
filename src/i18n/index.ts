import { AppConfig } from '@/utils/AppConfig';

export const locales = AppConfig.locales;
export const defaultLocale = AppConfig.defaultLocale;
export const localePrefix = AppConfig.localePrefix;

export async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    return (await import(`@/messages/${defaultLocale}.json`)).default;
  }
} 