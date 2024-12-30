import { Package } from "lucide-react";
import ProductsLayout from "./ProductsLayout";
import { ProductCategoryPage } from './categoryPage';

export default function ProductCategory() {
  return (
    <ProductsLayout
      title="제품 소개"
      icon={<Package className="w-6 h-6" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
      ]}
      description="대한플러스전자(주)의 제품 라인업을 소개합니다."
      badges={[
        {
          text: "LED 드라이버 IC",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700", 
          hoverColor: "hover:bg-blue-200"
        },
        {
          text: "전자부품",
          bgColor: "bg-sky-100",
          textColor: "text-sky-700",
          hoverColor: "hover:bg-sky-200"
        }
      ]}
    >
      <ProductCategoryPage />
    </ProductsLayout>
  );
}
