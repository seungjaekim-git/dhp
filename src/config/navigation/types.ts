import { LucideIcon } from "lucide-react";

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface NavigationItem {
  title: string;
  link: string;
  seo: SEOMetadata;
}

export interface SubCategory {
  title: string;
  link: string;
  seo: SEOMetadata;
  children?: NavigationItem[];
}

export interface ProductCategory {
  title: string;
  link: string;
  seo: SEOMetadata;
  icon?: LucideIcon;
  content?: SubCategory[];
}

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

export interface CompanyConfig {
  title: string;
  link: string;
  seo: SEOMetadata;
  items: NavigationItem[];
}

export interface ProductsConfig {
  title: string;
  link: string;
  seo: SEOMetadata;
  categories: ProductCategory[];
}

export interface PartnersConfig {
  title: string;
  link: string;
  seo: SEOMetadata;
  items: Partner[];
}

export interface SupportCategory {
  title: string;
  link: string; 
  seo: SEOMetadata;
  items: NavigationItem[];
}

export interface SupportConfig {
  title: string;
  link: string;
  seo: SEOMetadata;
  inquiry: SupportCategory;
  contact: SupportCategory;
  resources: SupportCategory;
}

export interface NavigationConfig {
  company: CompanyConfig;
  products: ProductsConfig;
  partners: PartnersConfig;
  support: SupportConfig;
} 