'use client';

import {
  useRouter,
  usePathname,
} from '@/libs/i18nNavigation';
import { useLocale } from 'next-intl';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    router.push(pathname, { locale: newLocale });
  };

  return (
    <select defaultValue={locale} onChange={handleChange}>
      {/* Hardcoded language names */}
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
}
