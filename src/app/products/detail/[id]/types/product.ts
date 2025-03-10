import { z } from "zod";
import { LEDDriverICInfoSchema } from "@/app/supabase/schemas/LEDDriverIC";

export interface Document {
  id: number;
  title: string;
  url: string;
  type_id: number;
  type?: string;
  created_at: string;
  updated_at: string;
  size?: string;
}

export interface Image {
  id?: number;
  url: string;
  title?: string;
  description?: string;
  alt?: string;
}

export interface Manufacturer {
  id: BigInt;
  name: string;
  website_url?: string;
  established?: string;
  headquarters?: string;
  business_type?: string;
  company_overview?: string;
  business_overview?: string;
  key_milestones?: any;
  annual_revenue?: string;
  sales_markets?: string[];
  logo?: string;
  building?: string;
  linkedin_link?: string;
  facebook_link?: string;
  country_id?: BigInt;
  role?: string;
  manufacturer_images?: { image_url: string; description?: string }[];
  countries?: { id: number; name: string };
}

export interface Feature {
  id: number;
  name: string;
  description?: string;
  category?: string;
  icon?: string;
}

export interface Application {
  id: number;
  name: string;
  description?: string;
  image?: string;
  category?: string;
}

export interface ProductFeature {
  feature_id: number;
  description?: string;
  features: Feature;
}

export interface ProductApplication {
  application_id: number;
  applications: Application;
}

export interface ProductCertification {
  certification_id: number;
  certifications: {
    id: number;
    name: string;
    description?: string;
    logo?: string;
  };
}

export interface ProductCategory {
  category_id: number;
  categories: {
    id: number;
    name: string;
  };
}

export interface ProductProps {
  id: BigInt;
  name: string;
  manufacturer_id: BigInt;
  part_number: string;
  specifications: {
    led_driver_ic?: z.infer<typeof LEDDriverICInfoSchema>;
    [key: string]: any;
  };
  description: string;
  storage_type_id: BigInt;
  created_at: string;
  updated_at: string;
  subtitle: string;
  images: Image[];
  manufacturers: Manufacturer;
  product_documents: {
    document_id: number;
    documents: Document;
  }[];
  product_features: ProductFeature[];
  product_applications: ProductApplication[];
  product_certifications?: ProductCertification[];
  product_categories?: ProductCategory[];
  categories: {
    id: number;
    name: string;
  }[];
  country?: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: 'news_event' | 'notice' | 'tech_blog' | 'discontinued' | 'product_launch';
  summary: string;
  image_url: string;
  created_at: string;
} 