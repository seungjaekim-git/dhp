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
      *,
      manufacturers (
        *,
        manufacturer_emails (*),
        manufacturer_phones (*),
        manufacturer_faxes (*),
        manufacturer_branches (*),
        manufacturer_images (*)
      ),
      images (*),
      product_documents (
        documents (*)
      ),
      product_features (
        features (*)
      ),
      product_applications (
        applications (*)
      ),
      product_certifications (
        certifications (*)
      )
    `)
    .eq('id', params.id)
    .single();

  if (error || !product) {
    console.error("Error fetching product:", error);
    notFound();
  }
  console.log(product);

  // 카테고리 데이터 조회
  const { data: categoryData } = await supabase
    .from('product_categories')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq('product_id', params.id);

  // 제조사의 국가 정보 조회
  const { data: countryData } = await supabase
    .from('countries')
    .select('name')
    .eq('id', product.manufacturers.country_id)
    .single();

  // 데이터 병합
  const productWithExtra = {
    ...product,
    categories: categoryData?.map(item => item.categories) || [],
    country: countryData?.name || null
  };

  return (
    <ProductDetailClient product={productWithExtra} />
  );
}
