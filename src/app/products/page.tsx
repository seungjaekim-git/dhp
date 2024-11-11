'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Package } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// 샘플 카테고리 데이터
const categories = [
  {
    id: 1,
    name: "반도체",
    icon: "🔧",
    subCategories: [
      {
        id: 11,
        name: "마이크로프로세서",
        subCategories: [
          { id: 111, name: "CPU" },
          { id: 112, name: "MCU" },
          { id: 113, name: "DSP" }
        ]
      },
      {
        id: 12,
        name: "메모리",
        subCategories: [
          { id: 121, name: "DRAM" },
          { id: 122, name: "SRAM" },
          { id: 123, name: "Flash Memory" }
        ]
      },
      {
        id: 13,
        name: "아날로그 IC",
        subCategories: [
          { id: 131, name: "Op-Amp" },
          { id: 132, name: "Voltage Regulator" },
          { id: 133, name: "ADC/DAC" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "수동부품",
    icon: "⚡",
    subCategories: [
      {
        id: 21,
        name: "저항",
        subCategories: [
          { id: 211, name: "카본 저항" },
          { id: 212, name: "금속피막 저항" },
          { id: 213, name: "와이어와운드 저항" }
        ]
      },
      {
        id: 22,
        name: "커패시터",
        subCategories: [
          { id: 221, name: "세라믹 커패시터" },
          { id: 222, name: "전해 커패시터" },
          { id: 223, name: "탄탈 커패시터" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "센서",
    icon: "📡",
    subCategories: [
      {
        id: 31,
        name: "온도센서",
        subCategories: [
          { id: 311, name: "서미스터" },
          { id: 312, name: "열전대" },
          { id: 313, name: "RTD" }
        ]
      },
      {
        id: 32,
        name: "압력센서",
        subCategories: [
          { id: 321, name: "피에조저항형" },
          { id: 322, name: "정전용량형" },
          { id: 323, name: "광학식" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "커넥터",
    icon: "🔌",
    subCategories: [
      {
        id: 41,
        name: "PCB 커넥터",
        subCategories: [
          { id: 411, name: "핀 헤더" },
          { id: 412, name: "터미널 블록" },
          { id: 413, name: "카드 엣지" }
        ]
      },
      {
        id: 42,
        name: "원형 커넥터",
        subCategories: [
          { id: 421, name: "M8/M12" },
          { id: 422, name: "푸시풀" },
          { id: 423, name: "DIN" }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "디스플레이",
    icon: "📺",
    subCategories: [
      {
        id: 51,
        name: "LCD",
        subCategories: [
          { id: 511, name: "TFT LCD" },
          { id: 512, name: "OLED" },
          { id: 513, name: "E-Paper" }
        ]
      },
      {
        id: 52,
        name: "LED",
        subCategories: [
          { id: 521, name: "SMD LED" },
          { id: 522, name: "Through Hole LED" },
          { id: 523, name: "COB LED" }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "전원부품",
    icon: "🔋",
    subCategories: [
      {
        id: 61,
        name: "DC-DC 컨버터",
        subCategories: [
          { id: 611, name: "벅 컨버터" },
          { id: 612, name: "부스트 컨버터" },
          { id: 613, name: "벅부스트 컨버터" }
        ]
      },
      {
        id: 62,
        name: "배터리",
        subCategories: [
          { id: 621, name: "리튬이온" },
          { id: 622, name: "니켈수소" },
          { id: 623, name: "리튬폴리머" }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "통신모듈",
    icon: "📶",
    subCategories: [
      {
        id: 71,
        name: "무선통신",
        subCategories: [
          { id: 711, name: "WiFi 모듈" },
          { id: 712, name: "블루투스 모듈" },
          { id: 713, name: "LoRa 모듈" }
        ]
      },
      {
        id: 72,
        name: "유선통신",
        subCategories: [
          { id: 721, name: "이더넷 IC" },
          { id: 722, name: "CAN 트랜시버" },
          { id: 723, name: "RS-485 IC" }
        ]
      }
    ]
  }
];

export default function ProductCategories() {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [expandedSubCategories, setExpandedSubCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubCategory = (subCategoryId: number) => {
    setExpandedSubCategories(prev =>
      prev.includes(subCategoryId)
        ? prev.filter(id => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 브레드크럼 네비게이션 */}
      <nav className="flex px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <a href="/" className="text-sm text-gray-700 hover:text-blue-600">
              홈
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-sm font-medium text-gray-500">제품 카테고리</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">제품 카테고리</h1>
        <p className="text-gray-600">
          대한플러스전자의 모든 제품 카테고리를 확인하실 수 있습니다.
        </p>
      </div>

      {/* 카테고리 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="border rounded-lg shadow-sm bg-white">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              {expandedCategories.includes(category.id) ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>

            {expandedCategories.includes(category.id) && (
              <div className="p-4 pt-0">
                {category.subCategories.map(subCategory => (
                  <div key={subCategory.id} className="ml-4">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between py-2 hover:bg-gray-50"
                      onClick={() => toggleSubCategory(subCategory.id)}
                    >
                      <span className="text-sm">{subCategory.name}</span>
                      {expandedSubCategories.includes(subCategory.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>

                    {expandedSubCategories.includes(subCategory.id) && (
                      <div className="ml-4 space-y-2 py-2">
                        {subCategory.subCategories.map(item => (
                          <a
                            key={item.id}
                            href={`/products/category/${item.id}`}
                            className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
