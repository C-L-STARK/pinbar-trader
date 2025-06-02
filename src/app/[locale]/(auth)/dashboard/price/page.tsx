import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PricingTable } from '@clerk/nextjs'

type IAboutProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IAboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Pricing(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <PricingTable />
      </div>
    </>
  );
};
