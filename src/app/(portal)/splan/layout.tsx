import type { Metadata } from "next";
import SplanFooter from "@/components/splan/SplanFooter";

export const metadata: Metadata = {
  title: "源计划职业交易员孵化器",
  description: "源计划职业交易员孵化器 - 专业交易员培养平台，提供系统化课程、实战训练和专业指导。",
};

export default function SplanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SplanFooter />
    </>
  );
}
