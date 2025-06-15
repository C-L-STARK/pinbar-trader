import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Crypto Cash Control Official",
  description: "This is CryptoCashControl Official WebSite. Our X: @CryptoCashCtrl.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="iris" scaling="90%" grayColor="olive" appearance="light" radius="small">
          {children}
        </Theme>
      </body>
    </html>
  );
}
