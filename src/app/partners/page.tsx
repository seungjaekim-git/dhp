import React from "react";
import PartnersLayout from "./PartnersLayout";
import { getAllManufacturers } from "@/lib/supabase-client";
import { Building2 } from "lucide-react";
import { PartnerList } from "./PartnerList";

export const metadata = {
  title: '파트너사 - DH Semiconductor',
  description: '글로벌 파트너사와 함께하는 DH Semiconductor',
};

export default async function PartnersPage() {
  // Fetch all manufacturers from Supabase
  const partners = await getAllManufacturers();
  
  return (
    <PartnersLayout
      title="파트너사"
      icon={<Building2 className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "파트너사" },
      ]}
      description={`전 세계 ${partners.length}개 글로벌 파트너사와 함께 혁신적인 반도체 솔루션을 제공합니다.`}
      badges={[
        {
          text: "글로벌 네트워크",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
      ]}
    >
      <PartnerList partners={partners} />
    </PartnersLayout>
  );
}
