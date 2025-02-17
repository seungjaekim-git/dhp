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
  return (
    <ProductDetailClient product={product} />
  );
}
