import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'LED 드라이버 IC',
    description: '고효율 LED 조명 제어를 위한 최신 드라이버 IC',
    image: '/images/led-driver-ic.jpg',
  },
  {
    id: 2,
    name: '전원관리 IC',
    description: '다양한 전자기기의 전력 효율을 최적화하는 IC',
    image: '/images/power-management-ic.jpg',
  },
  {
    id: 3,
    name: '센서',
    description: '정밀한 데이터 수집을 위한 고성능 센서',
    image: '/images/sensor.jpg',
  },
  {
    id: 4,
    name: '커넥터',
    description: '안정적인 연결을 보장하는 고품질 커넥터',
    image: '/images/connector.jpg',
  },
];

const BrandProducts: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">브랜드 상품</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <p className="text-gray-600">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandProducts;
