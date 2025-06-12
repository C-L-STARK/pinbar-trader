import { getRequestConfig } from 'next-intl/server';
import { AppConfig } from '@/utils/AppConfig';

export default getRequestConfig(async ({ locale }) => {
  // 验证请求的语言是否支持
  const validLocale = AppConfig.locales.includes(locale as any) 
    ? locale 
    : AppConfig.defaultLocale;

  return {
    locale: validLocale as string,
    messages: (await import(`../locales/${validLocale}.json`)).default,
    timeZone: 'Asia/Shanghai',
  };
});