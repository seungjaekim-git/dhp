// 제품 기본 인터페이스
export interface Product {
  id: number;
  name: string;
  subtitle: string;
  manufacturer_id?: number;
  manufacturer?: {
    id: number;
    name: string;
    logo?: string;
  };
  part_number?: string;
  specifications: Record<string, any>;
  tables?: Record<string, any>;
  description?: string;
  storage_type_id?: number;
  created_at?: string;
  updated_at?: string;
  
  // 관계형 데이터
  images?: ProductImage[];
  categories?: ProductCategory[];
  features?: ProductFeature[];
  certifications?: ProductCertification[];
  applications?: ProductApplication[];
  documents?: ProductDocument[];
  
  // 클라이언트 측 추가 속성
  price?: number;
  quantity?: number;
  note?: string;
  category?: string; // 단순화된 카테고리 표시용
}

// 장바구니 아이템
export interface CartItem extends Product {
  quantity: number;
  note: string;
}

// 제품 이미지
export interface ProductImage {
  id: number;
  title?: string;
  url: string;
  description?: string;
  product_id: number;
}

// 제품 카테고리 관계
export interface ProductCategory {
  product_id: number;
  category_id: number;
  category?: {
    id: number;
    name: string;
    description?: string;
  };
}

// 제품 기능 관계
export interface ProductFeature {
  product_id: number;
  feature_id: number;
  description?: string;
  feature?: {
    id: number;
    name: string;
    description?: string;
  };
}

// 제품 인증 관계
export interface ProductCertification {
  product_id: number;
  certification_id: number;
  certification?: {
    id: number;
    name: string;
    description?: string;
  };
}

// 제품 응용 분야 관계
export interface ProductApplication {
  product_id: number;
  application_id: number;
  application?: {
    id: number;
    name: string;
    description?: string;
  };
}

// 제품 문서 관계
export interface ProductDocument {
  product_id: number;
  document_id: number;
  document?: {
    id: number;
    title: string;
    url: string;
    type_id?: number;
  };
} 