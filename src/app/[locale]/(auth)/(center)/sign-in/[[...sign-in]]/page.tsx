import { SignIn } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

type ISignInPageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: ISignInPageProps) {
  const t = await getTranslations('SignIn');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignInPage({ params }: ISignInPageProps) {
  const t = await getTranslations('SignIn');

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-muted-foreground">{t('description')}</p>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary hover:bg-primary/90',
            footerActionLink: 'text-primary hover:text-primary/90',
          },
        }}
      />
    </div>
  );
}
