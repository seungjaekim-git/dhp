import React from "react";
import PartnersLayout from "../PartnersLayout";
import { PARTNER_DATA } from "../PartnerData";
import { notFound } from "next/navigation";
import { CompanySidebar } from "./CompanySidebar";
import ClientContent from "./ClientContent";

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  return PARTNER_DATA.map((partner) => ({
    slug: partner.name.toLowerCase().replace(/ /g, "-"),
  }));
};

export default function CompanyProfile({ params }: { params: { slug: string } }) {
  const companyData = PARTNER_DATA.find(
    (partner) => partner.name.toLowerCase().replace(/ /g, "-") === params.slug
  );

  if (!companyData) {
    notFound();
  }

  return (
    <PartnersLayout
      title={companyData.name}
      logo={companyData.images.logo}
      breadcrumb={[
        { label: "파트너사", href: "/partners" },
        { label: companyData.name },
      ]}
      description={companyData.business_overview}
      badges={companyData.main_product_categories.map((category) => ({
        text: category,
        bgColor: "bg-blue-500/10",
        textColor: "text-blue-600",
        hoverColor: "hover:bg-blue-500/20",
      }))}
    >
      <div className="flex gap-6">
        <div className="flex-1">
          <ClientContent companyData={companyData} />
        </div>
        <CompanySidebar companyData={companyData} />
      </div>
    </PartnersLayout>
  );
}