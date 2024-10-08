import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/container/footer/footer"
import TwoLayerNavigation from "@/container/navbar/navigationBar"
import DynamicBreadcrumb from "@/container/breadcrumb/breadcrumb"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <TwoLayerNavigation/>
        <DynamicBreadcrumb />
        {children}
        <Footer />
      </body>
    </html>
  );
}
