import { getTranslations, setRequestLocale } from 'next-intl/server';

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

export default async function Privacy(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <div>
        <h1>Privacy Policy - CRYPTO CASH CONTROL TEAM</h1>
        <p>
          <strong>Last updated:</strong>
          <span>[Date]</span>
        </p>

        <p>
          At CRYPTO CASH CONTROL TEAM, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of personal information:</p>
        <ul>
          <li>
            <strong>Account Information:</strong>
            <span>Email address, name, phone number, date of birth, etc.</span>
          </li>
          <li>
            <strong>Transaction Information:</strong>
            <span>Records of trades, deposits, withdrawals, and transactions related to your account.</span>
          </li>
          <li>
            <strong>Device and Usage Information:</strong>
            <span>IP address, browser type, operating system, and other usage data collected automatically while you interact with our platform.</span>
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your personal data for the following purposes:</p>
        <ul>
          <li>
            <span>To provide and manage our digital currency trading services (spot, futures, options).</span>
          </li>
          <li>
            <span>To comply with legal obligations and regulatory requirements.</span>
          </li>
          <li>
            <span>To process transactions, deposits, and withdrawals.</span>
          </li>
          <li>
            <span>To communicate with you about account updates, service-related issues, or promotional offers.</span>
          </li>
          <li>
            <span>To improve our services, security, and user experience.</span>
          </li>
        </ul>

        <h2>3. Data Sharing and Disclosure</h2>
        <p>We will not sell, rent, or lease your personal data to third parties. However, we may share your information with:</p>
        <ul>
          <li>
            <strong>Service Providers:</strong>
            <span>Third-party companies that assist in the operation of our platform.</span>
          </li>
          <li>
            <strong>Regulatory Authorities:</strong>
            <span>As required by law or regulation.</span>
          </li>
          <li>
            <strong>Partners:</strong>
            <span>In some cases, we may share data with strategic partners to improve your experience.</span>
          </li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement robust technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, and destruction. However, no security measures are completely foolproof, and we cannot guarantee the absolute security of your data.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>
            <span>Access, update, or delete your personal information.</span>
          </li>
          <li>
            <span>Opt-out of marketing communications.</span>
          </li>
          <li>
            <span>Withdraw consent for the use of your personal data, where applicable.</span>
          </li>
        </ul>

        <h2>6. Changes to the Privacy Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time. Any changes will be communicated through our platform, and the updated policy will be effective upon posting.
        </p>

        <p>
          For any questions or concerns regarding your privacy, please contact us at 
          <a href="mailto:contact@cryptocashcontrolteam.com">contact@cryptocashcontrolteam.com</a>.
        </p>
      </div>

    </>
  );
};
