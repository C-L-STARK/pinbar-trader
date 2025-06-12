import { ClerkProvider } from '@clerk/nextjs';
import { ClerkLocalizations } from '@/utils/AppConfig';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  return (
    <ClerkProvider localization={ClerkLocalizations.supportedLocales[locale]}>
      {props.children}
    </ClerkProvider>
  );
}
