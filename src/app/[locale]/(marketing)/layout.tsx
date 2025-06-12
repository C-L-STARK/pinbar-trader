import { getTranslations } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import { NavigationLink } from '@/components/ui/navigation-link';

export default async function MarketingLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  const t = await getTranslations({ locale, namespace: 'RootLayout' });

  return (
    <BaseTemplate
      leftNav={
        <>
          <NavigationMenuItem>
            <NavigationLink href="/">{t('home_link')}</NavigationLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationLink href="/about">{t('about_link')}</NavigationLink>
          </NavigationMenuItem>
        </>
      }
      rightNav={
        <>
          <NavigationMenuItem>
            <NavigationLink href="/sign-in" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {t('sign_in_link')}
            </NavigationLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationLink href="/sign-up" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              {t('sign_up_link')}
            </NavigationLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LocaleSwitcher />
          </NavigationMenuItem>
        </>
      }
    >
      {children}
    </BaseTemplate>
  );
}
