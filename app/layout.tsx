import type { Metadata, Viewport } from "next";
import "./globals.css";
import { OneSignalInit } from "@/components/OneSignalInit";

export const metadata: Metadata = {
  title: "特典アプリ",
  description: "特典を受け取るためのPWAアプリ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "特典アプリ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <OneSignalInit />
        {children}
      </body>
    </html>
  );
}

