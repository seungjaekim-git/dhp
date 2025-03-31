import React from "react";
import { Microchip } from "lucide-react";
import { getLEDDriverICs } from "@/lib/supabase-client";
import ProductsLayout from "@/app/products/ProductsLayout";
import ProductList from "./components/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'LED 드라이버 IC - DH Semiconductor',
  description: '고성능 LED 드라이버 IC 제품 라인업을 만나보세요',
};

export default async function LEDDriverICPage() {
  // Fetch LED Driver ICs with filter options
  const { products, filterOptions } = await getLEDDriverICs();
  
  return (
    <ProductsLayout
      title="LED 드라이버 IC"
      icon={<Microchip className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC" },
      ]}
      description="다양한 애플리케이션을 위한 고효율, 고성능 LED 드라이버 IC 제품 라인업을 살펴보세요."
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
      ]}
    >
      <ProductList products={products} filterOptions={filterOptions} />
    </ProductsLayout>
  );
}
