'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Link2Icon, 
  ShareIcon, 
  Building2Icon, 
  NetworkIcon,
  CalendarIcon,
  CopyIcon
} from 'lucide-react';
import Image from 'next/image';
interface CompanyCardProps {
  logo: string;
  name: string;
  industry: string;
  size: string;
  website: string;
  internalPage: string;
  description: string;
  partnershipYear: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  logo,
  name,
  industry,
  size,
  website,
  internalPage,
  description,
  partnershipYear
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl">
      <Card className="w-full mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 transition-all duration-500 hover:shadow-xl">
        {/* 헤더 섹션 */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image 
                src={logo} 
                alt={`${name} 로고`} 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border border-gray-200"
                width={80}
                height={80}
                quality={80}
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">{name}</h2>
                  
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mt-1">
                  <NetworkIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  <span>{industry}</span>
                  
                </div>
                
              </div>
            </div>

            
          </div>

          <div className="flex space-x-2">
                    <Link2Icon 
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-blue-600 cursor-pointer" 
                      onClick={() => window.open(website, '_blank')}
                    />
                    <div className="relative">
                      <ShareIcon 
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-green-600 cursor-pointer" 
                        onClick={() => handleCopyLink(website)}
                      />
                      {copied && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          링크 복사됨
                        </span>
                      )}
                    </div>
                  </div>
        </div>

        {/* 메인 컨텐츠 섹션 */}
        <div className="p-4 sm:p-6 pt-3 sm:pt-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Building2Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                기업 규모: {size}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                파트너십 시작: {partnershipYear}년
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2">
              {description}
            </p>
          </div>
        </div>

        {/* 링크 섹션 */}
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-2">
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                py-2 sm:py-3 text-gray-700 
                flex items-center justify-center space-x-1 sm:space-x-2
                hover:bg-gray-100 transition-colors duration-300
                border-r border-gray-200
              "
            >
              <Link2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">웹사이트</span>
            </a>
            <a 
              href={internalPage} 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                py-2 sm:py-3 text-gray-700 
                flex items-center justify-center space-x-1 sm:space-x-2
                hover:bg-gray-100 transition-colors duration-300
              "
            >
              <Building2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">내부 페이지</span>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompanyCard;