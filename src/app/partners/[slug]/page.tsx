import React from "react";
import PartnersLayout from "../PartnersLayout";
import { notFound } from "next/navigation";
import { CompanySidebar } from "./CompanySidebar";
import ClientContent from "./ClientContent";
import Image from "next/image";
import { getManufacturerBySlug, getAllManufacturers, getProductsByManufacturerId } from "@/lib/supabase-client";
import { Building2 } from "lucide-react";

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const partners = await getAllManufacturers();
  
  return partners.map((partner) => {
    // Create a consistent slug format
    const slug = partner.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
    
    console.log(`Generated slug for ${partner.name}: ${slug}`);
    return { slug };
  });
};

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const manufacturer = await getManufacturerBySlug(params.slug);
  
  if (!manufacturer) {
    return {
      title: '파트너 정보를 찾을 수 없음',
      description: '요청하신 파트너 정보를 찾을 수 없습니다.',
    };
  }
  
  return {
    title: `${manufacturer.name} - DH Semiconductor 파트너`,
    description: manufacturer.business_overview || manufacturer.company_overview || `${manufacturer.name}에 대한 파트너 정보`,
  };
};

export default async function CompanyProfile({ params }: { params: { slug: string } }) {
  // Log the slug to help with debugging
  console.log('Looking for manufacturer with slug:', params.slug);
  
  // Clean the slug for better matching
  const cleanSlug = params.slug.toLowerCase().replace(/-/g, ' ');
  
  // Try to fetch the manufacturer with the cleaned slug
  let companyData = await getManufacturerBySlug(cleanSlug);

  if (!companyData) {
    // If not found with clean slug, try with original slug as fallback
    console.log('Not found with clean slug, trying original:', params.slug);
    companyData = await getManufacturerBySlug(params.slug);
    
    if (!companyData) {
      console.log('Manufacturer not found with either slug format');
      notFound();
    }
  }
  
  // Parse key_milestones if it exists
  let keyMilestones = [];
  if (companyData.key_milestones) {
    try {
      if (typeof companyData.key_milestones === 'string') {
        // If it's a string, parse it
        const parsedData = JSON.parse(companyData.key_milestones);
        if (parsedData && parsedData.history) {
          keyMilestones = parsedData.history;
        } else if (Array.isArray(parsedData)) {
          keyMilestones = parsedData;
        }
      } else if (typeof companyData.key_milestones === 'object') {
        // If it's already an object (parsed by Supabase)
        if (Array.isArray(companyData.key_milestones)) {
          keyMilestones = companyData.key_milestones;
        } else if (companyData.key_milestones.history) {
          keyMilestones = companyData.key_milestones.history;
        }
      }
    } catch (e) {
      console.error('Error parsing key_milestones:', e);
    }
  }

  // Extract product categories for badges
  const productCategories = companyData.products && companyData.products.length > 0 
    ? companyData.products.map((product: any) => product.category)
        .filter((category: string, index: number, self: string[]) => self.indexOf(category) === index)
    : ['제품 정보 없음'];
  
  // Prepare complete company data for client components
  const completeCompanyData = {
    ...companyData,
    key_milestones: keyMilestones,
    products: companyData.products || [],
    // Placeholder data for posts and certificates - would normally fetch these from DB
    posts: [],
    certificates: [],
  };

  return (
    <PartnersLayout
      title={companyData.name}
      icon={
        <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-blue-500/10 backdrop-blur-sm border border-blue-500/20">
          {companyData.logo ? (
            <Image
              src={companyData.logo}
              alt={companyData.name}
              width={30}
              height={30}
              className="object-contain"
            />
          ) : (
            <Building2 className="w-6 h-6 text-blue-400" />
          )}
        </div>
      }
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "파트너사", href: "/partners" },
        { label: companyData.name },
      ]}
      description={companyData.description || companyData.business_overview || companyData.company_overview || `${companyData.name} 파트너사 정보`}
      badges={[
        // Country badge
        {
          text: companyData.country_id ? getCountryName(companyData.country_id) : "기타 국가",
          bgColor: "bg-indigo-500/20",
          textColor: "text-indigo-400",
          hoverColor: "hover:bg-indigo-500/30",
        },
        // Product category badges
        ...(companyData.product_category 
          ? (typeof companyData.product_category === 'string'
              ? companyData.product_category.split(',').map(category => ({
                  text: category.trim(),
                  bgColor: "bg-blue-500/20",
                  textColor: "text-blue-400",
                  hoverColor: "hover:bg-blue-500/30",
                }))
              : [])
          : productCategories.map(category => ({
              text: category,
              bgColor: "bg-blue-500/20",
              textColor: "text-blue-400",
              hoverColor: "hover:bg-blue-500/30",
            }))
        )
      ]}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 order-2 lg:order-1">
          <ClientContent companyData={completeCompanyData} />
        </div>
        <div className="w-full lg:w-auto order-1 lg:order-2">
          <CompanySidebar companyData={completeCompanyData} />
        </div>
      </div>
    </PartnersLayout>
  );
}

// Helper function to get country name from ID
function getCountryName(countryId: number): string {
  const countryMap: Record<number, string> = {
    1: '한국',
    2: '미국',
    3: '중국',
    4: '일본',
    5: '독일',
    6: '프랑스',
    7: '영국',
    8: '이탈리아',
    9: '캐나다',
    10: '호주',
    11: '인도',
    12: '대만',
    13: '스위스',
    14: '네덜란드',
    15: '싱가포르',
    16: '스웨덴',
    17: '덴마크',
    18: '핀란드',
    19: '노르웨이',
    20: '벨기에'
  };
  
  return countryMap[countryId] || '기타 국가';
}