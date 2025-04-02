import React, { Suspense } from "react";
import { Microchip } from "lucide-react";
import { getLEDDriverICs } from "@/lib/supabase-client";
import ProductsLayout from "@/app/products/ProductsLayout";
import ProductList from "./components/ProductList";
import { Metadata } from "next";
import ProductListSkeleton from "./components/ProductListSkeleton";

export const metadata: Metadata = {
  title: 'LED 드라이버 IC - DH Semiconductor',
  description: '고성능, 고효율 LED 드라이버 IC 제품군으로 다양한 조명 및 디스플레이 솔루션을 제공합니다',
  keywords: 'LED 드라이버, IC, 반도체, 조명제어, 디스플레이, PWM, RGB 컨트롤러',
  openGraph: {
    title: 'LED 드라이버 IC - DH Semiconductor',
    description: '다양한 애플리케이션을 위한 고효율, 고성능 LED 드라이버 IC',
    type: 'website',
  },
};

async function ProductListContainer() {
  // Fetch LED Driver ICs with filter options
  const { products, filterOptions } = await getLEDDriverICs();
  return <ProductList products={products} filterOptions={filterOptions} />;
}

export default function LEDDriverICPage() {
  return (
    <ProductsLayout
      title="LED 드라이버 IC"
      icon={<Microchip className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC" },
      ]}
      description="다양한 애플리케이션을 위한 고효율, 고성능 LED 드라이버 IC 제품군입니다. 조명 제어, 디스플레이, 자동차 조명 등 다양한 분야에 최적화된 솔루션을 제공합니다."
      badges={[
        {
          text: "조명 제어",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
        {
          text: "디스플레이",
          bgColor: "bg-purple-500/20",
          textColor: "text-purple-400",
          hoverColor: "hover:bg-purple-500/30",
        },
        {
          text: "자동차 조명",
          bgColor: "bg-amber-500/20",
          textColor: "text-amber-400",
          hoverColor: "hover:bg-amber-500/30",
        },
        {
          text: "RGB 컨트롤러",
          bgColor: "bg-emerald-500/20",
          textColor: "text-emerald-400",
          hoverColor: "hover:bg-emerald-500/30",
        },
      ]}
      theme="dark"
    >
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductListContainer />
      </Suspense>
    </ProductsLayout>
  );
}
