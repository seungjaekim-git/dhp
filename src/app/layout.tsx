import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/app/mainPage/footer";
import TwoLayerNavigation from "@/app/mainPage/navigationBar";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "대한플러스전자(주)",
  description: "대한플러스전자(주) 공식 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_ID}&submodules=geocoder`}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <TwoLayerNavigation />
        <div className="flex-grow w-full h-full items-center justify-center">
          {children}
          <Toaster />
        </div>
        <Footer />
      </body>
    </html>
  );
}
