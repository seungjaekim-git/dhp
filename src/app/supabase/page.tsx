import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Cpu, Microchip, Component, Server } from "lucide-react";
import SupabaseLayout from "./SupabaseLayout";
import Link from "next/link";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";

export default function ProductManagementPage() {
  // 대량 업로드 카드를 보여주는 함수
  const renderBulkUploadCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gray-900 border-gray-800 shadow-md hover:shadow-lg transition-all hover:border-blue-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Microchip className="w-5 h-5 text-blue-400" />
            LED Driver IC
          </CardTitle>
          <CardDescription className="text-gray-400">
            LED 드라이버 IC 대량 등록
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-gray-300 pb-2">
          LED Driver IC 제품 데이터를 JSON 또는 CSV 형식으로 대량 등록합니다.
        </CardContent>
        <CardFooter>
          <Link href="/supabase/leddriverIC-bulk" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Microchip className="w-4 h-4 mr-2" />
              LED Driver IC 등록
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="bg-gray-900 border-gray-800 shadow-md hover:shadow-lg transition-all hover:border-blue-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Component className="w-5 h-5 text-blue-400" />
            다이오드
          </CardTitle>
          <CardDescription className="text-gray-400">
            다이오드 제품 대량 등록
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-gray-300 pb-2">
          다이오드 제품 데이터를 JSON 또는 CSV 형식으로 대량 등록합니다.
        </CardContent>
        <CardFooter>
          <Link href="/supabase/diode-bulk" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Component className="w-4 h-4 mr-2" />
              다이오드 등록
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="bg-gray-900 border-gray-800 shadow-md hover:shadow-lg transition-all hover:border-gray-700 opacity-60">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            트랜지스터
          </CardTitle>
          <CardDescription className="text-gray-400">
            트랜지스터 제품 대량 등록
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-gray-300 pb-2">
          준비 중입니다. 트랜지스터 제품 데이터 일괄 등록 기능이 곧 제공됩니다.
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gray-700 hover:bg-gray-800" disabled>
            <Server className="w-4 h-4 mr-2" />
            준비 중
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-gray-900 border-gray-800 shadow-md hover:shadow-lg transition-all hover:border-gray-700 opacity-60">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            기타 IC
          </CardTitle>
          <CardDescription className="text-gray-400">
            기타 IC 제품 대량 등록
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-gray-300 pb-2">
          준비 중입니다. 다양한 IC 제품 데이터 일괄 등록 기능이 곧 제공됩니다.
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gray-700 hover:bg-gray-800" disabled>
            <Cpu className="w-4 h-4 mr-2" />
            준비 중
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <SupabaseLayout
      title="제품 데이터 관리"
      icon={<Database className="w-10 h-10 text-blue-400" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품 데이터 관리" },
      ]}
      description="반도체 제품 데이터를 관리하고 다양한 제품 정보를 등록, 수정, 검색할 수 있습니다."
      badges={[
        {
          text: "데이터 관리",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
          hoverColor: "hover:bg-blue-500/30",
        },
      ]}
    >
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">대량 데이터 업로드</h2>
          <p className="text-gray-300 mb-6">
            각 제품별 템플릿을 사용하여 JSON 또는 CSV 형식으로 대량의 제품 데이터를 한 번에 업로드할 수 있습니다.
          </p>
          {renderBulkUploadCards()}
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 text-gray-300">
            <TabsTrigger value="create" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">제품 생성</TabsTrigger>
            <TabsTrigger value="update" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">제품 수정</TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">제품 검색</TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">재고 관리</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">분석</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <CreateProduct />
          </TabsContent>
          
          <TabsContent value="update">
            <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
              <CardContent className="pt-6">
                <UpdateProduct />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="search">
            <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-white">제품 검색</h2>
                <p className="text-gray-300">제품 검색 기능은 개발 중입니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-white">재고 관리</h2>
                <p className="text-gray-300">재고 관리 기능은 개발 중입니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-white">분석</h2>
                <p className="text-gray-300">분석 기능은 개발 중입니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SupabaseLayout>
  );
}