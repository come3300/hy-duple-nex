import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "H&Y duple | 地域の暮らしを支える事業運営",
  description:
    "株式会社H&Y dupleは、不動産賃貸、ランドリー・洗車複合施設、飲食店経営を通じて地域の暮らしを支えます。",
  icons: {
    icon: "/images/footer-logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
