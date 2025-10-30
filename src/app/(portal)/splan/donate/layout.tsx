import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "试用会员招募 - 90天交易员集训计划",
  description: "源计划全球试用会员招募：捐赠成为90天试用会员，参与顶尖交易员集训、21天教练陪跑。成绩优异可挑战晋级，获得终身进阶受训资格和1-20万美元MOM操作权。仅接受USDT/USDC加密货币捐赠。",
  keywords: ["试用会员", "交易员集训", "教练陪跑", "加密货币捐赠", "交易资金支持", "MOM操作权", "90天培训"],
  openGraph: {
    title: "试用会员招募 - 90天交易员集训计划",
    description: "90天试用会员培训，顶尖交易员集训+21天教练陪跑。挑战成功可获得1-20万美元MOM操作权。",
    url: "https://pinbar-trader.com/splan/donate",
    type: "website",
  },
  alternates: {
    canonical: "https://pinbar-trader.com/splan/donate",
  },
};

export default function DonateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
