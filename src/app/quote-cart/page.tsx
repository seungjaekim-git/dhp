import { Metadata } from "next";
import QuoteCartClient from "./components/QuoteCartClient";

export const metadata: Metadata = {
  title: "견적 장바구니 | DHP 전자부품",
  description: "견적 요청 제품 목록과 견적 요청 양식을 작성하세요."
};

export default function QuoteCartPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* 클라이언트 컴포넌트를 불러와서 렌더링 */}
      <QuoteCartClient />
    </div>
  );
} 