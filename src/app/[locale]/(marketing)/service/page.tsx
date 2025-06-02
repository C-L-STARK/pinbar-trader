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

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <div>
        <h1>User Service Agreement - CRYPTO CASH CONTROL TEAM</h1>
        <p><strong>Last updated:</strong> [2025-06-01]</p>

        <p>This User Service Agreement ("Agreement") governs the relationship between CRYPTO CASH CONTROL TEAM and you, the user. By using our platform, you agree to the terms outlined in this Agreement.</p>

        <h2>1. Services Provided</h2>
        <p>We provide a digital currency trading platform that allows you to engage in various types of transactions, including but not limited to:</p>
        <ul>
          <li><strong>Spot Trading:</strong> Buy and sell digital currencies at current market prices.</li>
          <li><strong>Futures Trading:</strong> Engage in leveraged trading of digital currencies with the option to speculate on future prices.</li>
          <li><strong>Options Trading:</strong> Trade options contracts on digital currencies.</li>
        </ul>

        <h2>2. Account Registration</h2>
        <p>To use our services, you must create an account. By registering, you agree to provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your login details and for all activities under your account.</p>

        <h2>3. Trading Risks</h2>
        <p>Trading digital currencies involves significant risk and may not be suitable for all investors. You acknowledge and accept the risks associated with trading, including market volatility, liquidity risks, and potential financial loss.</p>

        <h2>4. Fees and Charges</h2>
        <p>We may charge fees for various services, including trading, deposits, and withdrawals. Fees will be disclosed to you at the time of the transaction.</p>

        <h2>5. Compliance with Laws</h2>
        <p>You agree to comply with all applicable laws and regulations when using our services. You are prohibited from using our platform for any illegal or unauthorized activities.</p>

        <h2>6. Limitation of Liability</h2>
        <p>To the extent permitted by law, CRYPTO CASH CONTROL TEAM shall not be liable for any indirect, special, or consequential damages arising from the use of our platform, including but not limited to trading losses or data breaches.</p>

        <h2>7. Termination of Account</h2>
        <p>We reserve the right to suspend or terminate your account at any time if you breach any terms of this Agreement or engage in fraudulent, abusive, or illegal activities.</p>

        <h2>8. Governing Law</h2>
        <p>This Agreement shall be governed by and construed in accordance with the laws of [Country/Region].</p>

        <h2>9. Changes to the Agreement</h2>
        <p>We may update this Agreement from time to time. Any changes will be posted on our platform and will be effective immediately upon posting.</p>

        <p>For any questions or support, please contact us at <a href="mailto:x.stark.dylan@gmail.com">`support service`</a>.</p>
      </div>
    </>
  );
};
