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
        led_driver_ic!inner (
          *,
          led_driver_ic_certifications (certification_id),
          led_driver_ic_features (feature_id),
          led_driver_ic_applications (application_id),
          led_driver_ic_options (
            *,
            led_driver_ic_option_package_types (package_type_id)
          )
        ),
        images (*),
        documents (*)
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
