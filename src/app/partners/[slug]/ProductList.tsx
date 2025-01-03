import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Package, PackageX } from "lucide-react";

export const ProductList = ({ products }: { products: any }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <PackageX className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-medium mb-2">등록된 제품이 없습니다</h3>
        <p className="text-sm">아직 등록된 제품 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {main_product_categories.map((category: string, index: number) => {
        const categoryProducts = products?.filter(
          (product: any) => product.category === category
        );

        if (!categoryProducts || categoryProducts.length === 0) {
          return null;
        }

        return (
          <Card key={index} className="bg-gradient-to-br from-white to-gray-50/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-full pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.map((product: any, productIndex: number) => (
                    <div 
                      key={productIndex}
                      className="p-4 rounded-lg border bg-white hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      {product.specifications && (
                        <>
                          <Separator className="my-2" />
                          <div className="text-xs text-gray-500">
                            <h4 className="font-medium mb-1">주요 사양:</h4>
                            <ul className="list-disc list-inside">
                              {product.specifications.map((spec: string, specIndex: number) => (
                                <li key={specIndex}>{spec}</li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
