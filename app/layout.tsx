import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AudixMusic — Own the Music You Love",
  description:
    "Trade music like stocks. Own a share of every release. AudixMusic lets you build a portfolio of the artists and releases you believe in.",
  openGraph: {
    title: "AudixMusic — Own the Music You Love",
    description: "Trade music like stocks. Own a share of every release.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
