import dynamic from 'next/dynamic';

// 클라이언트 컴포넌트를 동적으로 가져옴 (SSG 지원)
const ProductCardClient = dynamic(() => import('./ProductCardClient'), {
  ssr: false, // 서버 측 렌더링 비활성화 (클라이언트에서만 실행)
});

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    subtitle: string;
    manufacturers: {
      id: number;
      name: string;
      country_id: number;
      business_type: string;
      website_url: string;
      manufacturer_images: {
        image_url: string;
      }[];
      headquarters?: string;
      countries?: { name: string };
    };
    packaging_info?: {
      type: string;
      quantity: number;
      unit: string;
    }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // 서버 컴포넌트에서는 클라이언트 컴포넌트를 불러와 props를 전달
  return <ProductCardClient product={product} />;
}
