import { useTranslations } from 'next-intl';
import { AppConfig } from '@/utils/AppConfig';
import {
  NavigationMenu,
  NavigationMenuBrand,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const tBase = useTranslations('BaseTemplate');

  return (
    <div className="w-full px-4 md:px-6 text-foreground bg-background antialiased min-h-screen flex flex-col">
      <div className="mx-auto max-w-screen-lg w-full flex-1 flex flex-col">
        <header className="py-6 border-b border-border/40">
          <NavigationMenu className="flex items-center justify-between">
            <NavigationMenuBrand className="flex flex-col items-start">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Site Title Placeholder {/* Temporarily hardcoded */}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">{tBase('description')}</p>
            </NavigationMenuBrand>
            
            <div className="flex items-center justify-between gap-6">
              <NavigationMenuList className="flex items-center gap-4">
                {props.leftNav}
              </NavigationMenuList>

              <NavigationMenuList className="flex items-center gap-4">
                {props.rightNav}
              </NavigationMenuList>
            </div>
          </NavigationMenu>
        </header>

        <main className="flex-1 py-8">{props.children}</main>

        <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
          {`© Copyright ${new Date().getFullYear()} Site Title Placeholder. `}
        </footer>
      </div>
    </div>
  );
};
