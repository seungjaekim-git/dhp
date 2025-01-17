import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "기술 문서 | 파워반도체 기술지원",
  description: "데이터시트, 기술문서, 인증서 등 파워반도체 제품의 기술 문서를 검색하고 다운로드 할 수 있습니다.",
};

// 로딩 컴포넌트
function DocumentsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );
}

export default async function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">기술 문서</h1>
          <p className="text-lg text-muted-foreground">
            제품별 데이터시트, 기술문서, 인증서 등을 검색하고 다운로드하세요
          </p>
        </div>
        
        <Suspense fallback={<DocumentsLoading />}>
          {/* @ts-expect-error Async Server Component */}
          <DocumentsClientWrapper />
        </Suspense>
      </div>
    </div>
  );
}

async function DocumentsClientWrapper() {
  const { default: DocumentsClient } = await import("./DocumentClient");
  return <DocumentsClient />;
}

