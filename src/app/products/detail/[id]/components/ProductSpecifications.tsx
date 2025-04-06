import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SpecificationMapping {
  ko: string;
  description: string;
  category: string;
}

interface SpecificationsProps {
  specifications: any;
  mappings: Record<string, SpecificationMapping>;
}

export default function ProductSpecifications({ specifications, mappings }: SpecificationsProps) {
  if (!specifications) {
    return <p className="text-gray-400">사양 정보가 제공되지 않았습니다.</p>;
  }

  // 사양을 그룹별로 표시하기 위한 함수
  const renderSpecificationValue = (key: string, value: any): React.ReactNode => {
    // null, undefined 처리
    if (value === null || value === undefined) return '정보 없음';
    
    // boolean 처리
    if (typeof value === 'boolean') return value ? '있음' : '없음';
    
    // 배열 처리
    if (Array.isArray(value)) {
      return value.join(', ') || '정보 없음';
    }
    
    // 객체 처리
    if (typeof value === 'object') {
      // 빈 객체 처리
      if (Object.keys(value).length === 0) {
        return '정보 없음';
      }
      
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([subKey, subValue]) => {
            // null, undefined 값 건너뛰기
            if (subValue === null || subValue === undefined) return null;
            
            // unit, description 필드는 별도 처리
            if (subKey === 'unit' || subKey === 'description') return null;
            
            // 라벨 변환
            let label = '';
            switch(subKey) {
              case 'min': label = '최소'; break;
              case 'max': label = '최대'; break;
              case 'typ': label = '일반'; break;
              case 'between_ics': label = 'IC 간'; break;
              case 'between_channels': label = '채널 간'; break;
              case 'configuration': label = '구성'; break;
              case 'max_pixels': label = '최대 픽셀'; break;
              case 'type': label = '유형'; break;
              case 'speed': label = '속도'; break;
              case 'proprietary': label = '독점 여부'; break;
              case 'topology': label = '토폴로지'; break;
              case 'clock_integrity': label = '클럭 무결성'; break;
              case 'clock_direction': label = '클럭 방향'; break;
              case 'bidirectional': label = '양방향'; break;
              case 'resolution': label = '해상도'; break;
              case 'frequency': label = '주파수'; break;
              case 'max_channels': label = '최대 채널'; break;
              default: label = subKey;
            }
            
            // 단위 처리
            let unit = value.unit || '';
            
            // boolean 값 처리
            if (typeof subValue === 'boolean') {
              return (
                <div key={subKey} className="text-sm">
                  <span className="text-gray-400">{label}: </span>
                  <span>{subValue ? '있음' : '없음'}</span>
                </div>
              );
            }
            
            // 일반 값 처리
            return (
              <div key={subKey} className="text-sm">
                <span className="text-gray-400">{label}: </span>
                <span>{String(subValue)}{unit}</span>
              </div>
            );
          })}
          
          {/* 설명 표시 */}
          {value.description && (
            <div className="text-sm mt-1 text-gray-400 italic">
              {String(value.description)}
            </div>
          )}
        </div>
      );
    }
    
    // 기본값 (문자열, 숫자 등)
    return String(value);
  };

  // 적절한 스펙만 필터링
  const filteredSpecs = Object.entries(specifications).filter(
    ([key, value]) => value !== null && value !== undefined && mappings[key]
  );

  // 카테고리별로 그룹화
  const categories: Record<string, Array<[string, any]>> = {};
  
  // 기본 카테고리 정의
  const defaultCategories = [
    "기본 사양",
    "전기적 특성",
    "물리적 특성",
    "통신 및 인터페이스",
    "기타"
  ];
  
  // 카테고리 초기화
  defaultCategories.forEach(category => {
    categories[category] = [];
  });
  
  // 사양을 카테고리별로 분류
  filteredSpecs.forEach(([key, value]) => {
    const mapping = mappings[key];
    if (mapping && mapping.category) {
      if (categories[mapping.category]) {
        categories[mapping.category].push([key, value]);
      } else {
        categories["기타"].push([key, value]);
      }
    } else {
      categories["기타"].push([key, value]);
    }
  });

  return (
    <div className="space-y-8">
      <Accordion type="multiple" defaultValue={defaultCategories} className="space-y-4">
        {defaultCategories.map(category => {
          // 해당 카테고리에 사양이 없으면 표시하지 않음
          if (categories[category].length === 0) return null;
          
          return (
            <AccordionItem 
              key={category}
              value={category}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/80 hover:no-underline">
                <div className="flex items-center gap-2 text-lg font-medium text-white">
                  {category}
                  <span className="text-sm text-gray-400 font-normal">
                    ({categories[category].length}개)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-blue-300 w-[250px]">사양</TableHead>
                        <TableHead className="text-blue-300">값</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories[category].map(([key, value]) => (
                        <TableRow key={key} className="border-gray-700">
                          <TableCell className="font-medium text-gray-300">
                            <div className="flex items-center gap-2">
                              {mappings[key]?.ko || key}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-blue-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-[250px] text-sm">{mappings[key]?.description || '정보 없음'}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-200">
                            {renderSpecificationValue(key, value)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
} 