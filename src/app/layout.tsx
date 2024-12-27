import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/app/mainPage/footer";
import TwoLayerNavigation from "@/app/mainPage/navigationBar";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dhes.co.kr'),
  title: {
    default: '대한플러스전자(주) | 반도체 전문 기업',
    template: '%s | 대한플러스전자(주)'
  },
  description: 'LED Driver IC, 다이오드, 전원관리 IC 등을 공급하는 반도체 전문 기업입니다.',
  keywords: ['대한플러스전자', '반도체', 'LED Driver IC', '다이오드', '전원관리 IC'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'http://www.dhes.co.kr',
    siteName: '대한플러스전자(주)',
    title: '대한플러스전자(주) | 반도체 전문 기업',
    description: 'LED Driver IC, 다이오드, 전원관리 IC 등을 공급하는 반도체 전문 기업입니다.',
    images: [
      {
        url: '/logos/dhp-logo.png',
        width: 1200,
        height: 630,
        alt: '대한플러스전자(주) 로고'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'google-site-verification-code',
  //   naver: 'naver-site-verification-code'
  // },
  // alternates: {
  //   canonical: 'https://www.dhanplus.com',
  //   languages: {
  //     'ko-KR': 'https://www.dhanplus.com',
  //     'en-US': 'https://www.dhanplus.com/en'
  //   }
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logos/dhp-logo.png" />
        <link rel="apple-touch-icon" href="/logos/dhp-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <Script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_ID}&submodules=geocoder`}
          strategy="afterInteractive"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "대한플러스전자(주)",
              "url": "https://www.dhes.co.kr",
              "logo": "https://www.dhes.co.kr/logos/dhp-logo.png",
              // "sameAs": [
              //   "https://www.facebook.com/dhes.co.kr",
              //   "https://www.linkedin.com/company/dhes.co.kr"
              // ],
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+82-2-6679-5025",
                "contactType": "customer service",
                "areaServed": "KR",
                "availableLanguage": ["Korean", "English"]
              }]
            })
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50">
          <TwoLayerNavigation />
        </header>
        <main className="flex-grow w-full h-full items-center justify-center">
          {children}
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  );
}
