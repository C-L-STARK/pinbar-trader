import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import UnifiedNavbar from "@/components/layout/UnifiedNavbar";
import SplanFooter from "@/components/splan/SplanFooter";
import SubscriptionNotification from "@/components/custom/SubscriptionNotification";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pinbar-trader.com'),
  title: {
    default: "源计划职业交易员孵化器 - 30天培养职业交易员 | 专业交易培训平台",
    template: "%s | 源计划职业交易员孵化器"
  },
  description: "源计划职业交易员孵化器 - 30个工作日系统化培养职业交易员，提供专业交易培训、实战训练和资金支持。通过考核即可获得资金管理权限，分润比例高达90%。专注筛选和培养真正适合做交易的人才。",
  keywords: ["交易员培训", "职业交易员", "交易员孵化", "量化交易", "交易培训", "交易心理", "金融交易", "专业交易员", "交易员招募", "交易技能培训"],
  authors: [{ name: "源计划职业交易员孵化器" }],
  creator: "源计划职业交易员孵化器",
  publisher: "源计划职业交易员孵化器",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://pinbar-trader.com",
    siteName: "源计划职业交易员孵化器",
    title: "源计划职业交易员孵化器 - 30天培养职业交易员",
    description: "30个工作日系统化培养职业交易员，提供专业交易培训、实战训练和资金支持。通过考核即可获得资金管理权限，分润比例高达90%。",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "源计划职业交易员孵化器"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "源计划职业交易员孵化器 - 30天培养职业交易员",
    description: "30个工作日系统化培养职业交易员，提供专业交易培训、实战训练和资金支持。",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 可以添加 Google Search Console 验证码
    // google: 'google-site-verification-code',
  },
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body>
        <UnifiedNavbar />
        <main className="pt-16">
          <Theme accentColor="iris" scaling="90%" grayColor="olive" appearance="inherit" radius="small">
            {children}
          </Theme>
        </main>
        <SplanFooter />
        <SubscriptionNotification />
      </body>
    </html>
  );
}
