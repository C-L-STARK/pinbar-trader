import { getTranslations, setRequestLocale } from 'next-intl/server';
import CryptoPriceTable from '@/components/CryptoPriceTable';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 欢迎区域 */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm">
        <h1 className="text-5xl font-bold gradient-text mb-6">
          欢迎来到 PinBar Trader
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          实时数字货币交易数据，助您把握市场脉搏
        </p>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
          <span>数据来源:</span>
          <a
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            href="https://polygon.io/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Polygon.io
          </a>
        </div>
      </div>

      {/* 实时价格表格 */}
      <div className="animate-slide-in">
        <CryptoPriceTable />
      </div>

      {/* 底部信息 */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-600">
          {`关注我们获取更多信息: `}
          <a
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            href="https://x.com/CryptoSignalDog"
            target="_blank"
            rel="noreferrer noopener"
          >
            @CryptoCashControl on X
          </a>
        </p>
      </div>
    </div>
  );
}
