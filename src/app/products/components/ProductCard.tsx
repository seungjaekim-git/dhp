"use client";

import { Product } from "../list/page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/detail/${product.id}`}>
      <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors h-full">
        <div className="relative aspect-square bg-gray-800 flex items-center justify-center">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-3"
            />
          ) : (
            <div className="text-gray-500 text-center">
              <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">이미지 없음</p>
            </div>
          )}
          
          {product.stock_status && (
            <div className="absolute top-2 right-2">
              <Badge className={
                product.stock_status === "재고 있음" 
                  ? "bg-green-500/10 text-green-300 border-green-500/20" 
                  : "bg-amber-500/10 text-amber-300 border-amber-500/20"
              }>
                {product.stock_status}
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="text-lg font-medium text-gray-100 hover:text-blue-400 transition-colors line-clamp-1 mt-2 group-hover:text-blue-400">
            {product.name}
          </h3>
          
          <div className="text-sm text-gray-400 mb-1 mt-1 font-mono">
            {product.partNumber}
          </div>
          
          <p className="text-sm text-gray-300 flex items-center mt-1">
            {product.manufacturer_name}
          </p>
          
          {product.applications && product.applications.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {product.applications.slice(0, 2).map((app, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="text-xs bg-gray-800 text-gray-300 border-gray-700"
                >
                  {app}
                </Badge>
              ))}
              {product.applications.length > 2 && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-gray-800 text-gray-400 border-gray-700"
                >
                  +{product.applications.length - 2}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 px-6">
          <div className="w-full flex justify-end mt-2">
            <Badge variant="secondary" className="gap-1 bg-gray-800 hover:bg-gray-700 cursor-pointer group">
              <span>상세 보기</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 