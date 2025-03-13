import { LucideIcon } from "lucide-react";

/**
 * SEO 메타데이터 타입 정의
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

/**
 * 서브 카테고리 타입 정의
 */
export interface SubCategory {
  title: string;
  link: string;
  seo: SEOMetadata;
  children?: {
    title: string;
    link: string;
    seo: SEOMetadata;
    icon?: string;
  }[];
}

/**
 * 제품 카테고리 타입 정의
 */
export interface ProductCategory {
  title: string;
  link: string;
  seo: SEOMetadata;
  icon?: LucideIcon;
  content?: SubCategory[];
}

/**
 * 파트너 타입 정의
 */
export interface Partner {
  title: string;
  description: string;
  icon: string;
  categories: string[];
  country: string;
  type: string;
  subtitle: string;
  details: string[];
  link: string;
  seo: SEOMetadata;
  partnerStory: {
    image: string;
    text: string;
    learnMoreLink: string;
  };
}

/**
 * 네비게이션 설정 타입 정의
 */
export interface NavigationConfig {
  company: {
    title: string;
    link: string;
    seo: SEOMetadata;
    items: {
      title: string;
      description: string;
      link: string;
      seo: SEOMetadata;
    }[];
  };
  products: {
    title: string;
    link: string;
    seo: SEOMetadata;
    categories: ProductCategory[];
  };
  partners: {
    title: string;
    link: string;
    seo: SEOMetadata;
    items: Partner[];
  };
  support: {
    title: string;
    link: string;
    seo: SEOMetadata;
    inquiry: {
      title: string;
      link: string;
      seo: SEOMetadata;
      items: { title: string; link: string; seo: SEOMetadata; }[];
    };
    contact: {
      title: string;
      link: string;
      seo: SEOMetadata;
      items: { title: string; link: string; seo: SEOMetadata; }[];
    };
    resources: {
      title: string;
      link: string;
      seo: SEOMetadata;
      items: { title: string; link: string; seo: SEOMetadata; }[];
    };
  };
} 