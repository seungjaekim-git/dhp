import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    title: '신제품 출시: 고효율 LED 드라이버 IC',
    date: '2023년 6월 15일',
    excerpt: '당사는 최신 기술을 적용한 고효율 LED 드라이버 IC를 출시했습니다. 이 제품은 에너지 효율을 20% 향상시켰습니다.',
  },
  {
    id: 2,
    title: '글로벌 전자 부품 박람회 참가 안내',
    date: '2023년 5월 30일',
    excerpt: '다음 달 개최되는 글로벌 전자 부품 박람회에 참가할 예정입니다. 부스 번호 A-101에서 최신 제품을 선보일 예정이니 많은 관심 부탁드립니다.',
  },
  {
    id: 3,
    title: '2분기 실적 발표: 매출 15% 증가',
    date: '2023년 5월 10일',
    excerpt: '당사의 2분기 실적이 발표되었습니다. 전년 동기 대비 매출이 15% 증가하였으며, 영업이익은 20% 상승하였습니다.',
  },
  {
    id: 4,
    title: '신규 R&D 센터 오픈',
    date: '2023년 4월 22일',
    excerpt: '미래 기술 개발을 위한 신규 R&D 센터를 오픈하였습니다. 이를 통해 더욱 혁신적인 제품 개발에 박차를 가할 예정입니다.',
  },
];

const BrandNews: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">브랜드 뉴스</h2>
      {newsItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <p className="text-sm text-gray-500">{item.date}</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{item.excerpt}</p>
            <Button className="mt-4">자세히 보기</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BrandNews;
