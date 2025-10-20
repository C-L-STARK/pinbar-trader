import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import UnifiedNavbar from "@/components/layout/UnifiedNavbar";
import SplanFooter from "@/components/splan/SplanFooter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "源计划职业交易员孵化器",
  description: "源计划职业交易员孵化器 - 专业交易员培养平台，提供系统化课程、实战训练和专业指导。",
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
      </body>
    </html>
  );
}
