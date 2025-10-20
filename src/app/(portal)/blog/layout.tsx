import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "源计划 - 博客",
  description: "源计划职业交易员孵化器官方博客 - 分享交易知识、市场分析和学习资源。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
