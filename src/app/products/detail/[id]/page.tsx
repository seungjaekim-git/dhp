// app/products/[id]/page.tsx (서버 컴포넌트)
import { supabase } from "@/lib/supabase-client";
import ProductDetailClient from "./ProductDetailClient"; // 클라이언트 컴포넌트
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data: products } = await supabase
    .from("products")
    .select("id");

  if (!products) return [];

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetail({ params }: { params: { id: string } }) {

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      manufacturer_id,
      part_number,
      specifications,
      description,
      storage_type_id,
      created_at,
      updated_at,
      subtitle,
      manufacturers(
        id, name, website_url, established, headquarters, business_type, 
        company_overview, business_overview, key_milestones, 
        annual_revenue, sales_markets, logo, building, 
        linkedin_link, facebook_link, country_id, role,
        manufacturer_images(image_url, description),
        countries(id, name)
      ),
      images(id, url, title, description),
      product_documents(
        document_id,
        documents(id, title, url, type_id, created_at, updated_at)
      ),
      product_features(
        feature_id,
        description,
        features(id, name, description)
      ),
      product_applications(
        application_id,
        applications(id, name, description)
      ),
      product_certifications(
        certification_id,
        certifications(id, name, description)
      ),
      product_categories(
        category_id,
        categories(id, name)
      )
    `)
    .eq('id', params.id)
    .single();

  if (error || !product) {
    console.error("Error fetching product:", error);
    notFound();
  }

  // 데이터 병합
  const productWithExtra = {
    ...product,
    categories: product.product_categories?.map(item => item.categories) || [],
    country: product.manufacturers?.countries?.name || null,
    product_features: product.product_features || [],
    product_applications: product.product_applications || [],
    product_certifications: product.product_certifications || [],
    images: product.images || []
  };

  return (
    <ProductDetailClient product={productWithExtra} />
  );
}
