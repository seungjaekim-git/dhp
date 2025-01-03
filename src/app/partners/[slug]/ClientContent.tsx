'use client';

import React, { useState } from "react";
import { CompanyInfo } from "./CompanyInfo";
import { ProductList } from "./ProductList";
import { Building2, Package, FileText, Award } from "lucide-react";
import { PostList } from "./PostList";
import { CertificateList } from "./CertificateList";


export default function ClientContent({ companyData }: { companyData: any }) {
  const [activeSection, setActiveSection] = useState<
    'info' | 'products' | 'posts' | 'certificates'
  >('info');

  const tabs = [
    { id: 'info', title: "회사정보", icon: Building2 },
    { id: 'products', title: "제품", icon: Package },
    { id: 'posts', title: "관련 게시물", icon: FileText },
    { id: 'certificates', title: "인증서", icon: Award }
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              transition-all duration-300 text-sm font-medium
              ${activeSection === tab.id
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.title}
          </button>
        ))}
      </div>

      {activeSection === 'info' && <CompanyInfo companyData={companyData} />}
      {activeSection === 'products' && <ProductList products={companyData.products} />}
      {activeSection === 'posts' && <PostList posts={companyData.posts} />}
      {activeSection === 'certificates' && <CertificateList certificates={companyData.certificates} />}
      {/* Add logic for other sections here */}
    </>
  );
}
