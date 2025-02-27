import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";

export default function ProductManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="create">제품 생성</TabsTrigger>
          <TabsTrigger value="update">제품 수정</TabsTrigger>
          <TabsTrigger value="search">제품 검색</TabsTrigger>
          <TabsTrigger value="inventory">재고 관리</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <Card>
            <CardContent className="pt-6">
              <CreateProduct />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="update">
          <Card>
            <CardContent className="pt-6">
              <UpdateProduct />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">제품 검색</h2>
              <p>제품 검색 기능은 개발 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">재고 관리</h2>
              <p>재고 관리 기능은 개발 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">분석</h2>
              <p>분석 기능은 개발 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}