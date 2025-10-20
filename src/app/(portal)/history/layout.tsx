import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading History - 源计划职业交易员孵化器",
  description: "Comprehensive trading history, analytics and performance metrics for XAUUSD strategy",
};

export default function HistoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
