import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "源计划 - 交易控制台",
  description: "源计划量化交易控制台 - 实时监控、回测分析和策略管理。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
