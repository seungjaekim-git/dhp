import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BrandIntroduction = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">브랜드 스토리</h2>
        <p className="text-lg text-gray-600 mb-8">
          혁신과 품질로 전자 부품 시장을 선도하는 우리의 여정
        </p>
        <Image
          src="/images/brand-story.jpg"
          alt="브랜드 스토리 이미지"
          width={800}
          height={400}
          className="rounded-lg mx-auto"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">미션</h3>
            <p className="text-gray-600">
              최고 품질의 전자 부품을 제공하여 고객의 혁신을 지원합니다.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">비전</h3>
            <p className="text-gray-600">
              글로벌 전자 부품 시장의 리더로 자리매김하여 기술 발전을 선도합니다.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">핵심 가치</h3>
            <p className="text-gray-600">
              혁신, 품질, 고객 중심, 지속가능성을 추구합니다.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">우리의 역사</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="text-blue-600 font-bold mr-2">2000년</span>
            회사 설립
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 font-bold mr-2">2010년</span>
            글로벌 시장 진출
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 font-bold mr-2">2015년</span>
            혁신 기술 개발 및 특허 획득
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 font-bold mr-2">2020년</span>
            업계 선두 기업으로 도약
          </li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">함께 성장하는 파트너십</h2>
        <p className="text-gray-600 mb-6">
          우리는 고객, 공급업체, 직원들과의 강력한 파트너십을 통해 지속적인 성장을 이루고 있습니다.
        </p>
        <Button>파트너십 문의하기</Button>
      </section>
    </div>
  );
};

export default BrandIntroduction;
