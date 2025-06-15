import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";

import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CryptoCashControl App",
  description: "This is CryptoCashControl Official WebSite. Our X: @CryptoCashCtrl.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme accentColor="iris" scaling="90%" grayColor="olive" appearance="inherit" radius="small">
          {children}
        </Theme>
      </body>
    </html>
  );
}
