import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageX, Tag, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  manufacturer_id: number;
  image_url?: string;
  image?: string;
  subtitle?: string;
}

export const ProductList = ({ products }: { products: Product[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <PackageX className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-medium mb-2 text-gray-400">등록된 제품이 없습니다</h3>
        <p className="text-sm text-gray-500">아직 등록된 제품 정보가 없습니다.</p>
      </div>
    );
  }

  // Get unique categories from products using filter
  const categories = products
    .map((product) => product.category)
    .filter((category, index, self) => 
      self.indexOf(category) === index
    );

  // Filter products by selected category
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Only show the first 20 products
  const displayProducts = filteredProducts.slice(0, 20);
  const hasMoreProducts = filteredProducts.length > 20;

  return (
    <div className="space-y-6">
      {/* Category filter tabs */}
      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
      >
        <TabsList className="bg-gray-900 border border-gray-800 rounded-lg h-auto p-1 w-full flex flex-wrap">
          <TabsTrigger 
            value="all" 
            className="rounded-md data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 px-3 py-1.5 text-sm font-medium transition-all"
          >
            전체 제품
          </TabsTrigger>
          
          {categories.map((category) => (
            <TabsTrigger 
              key={category}
              value={category} 
              className="rounded-md data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 px-3 py-1.5 text-sm font-medium transition-all"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* "See More" button if there are more than 20 products */}
      {hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <Link href="/product/list">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              제조사 제품 더 보러가기 ({filteredProducts.length - 20}개 더)
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  // Use image from Supabase first, then fall back to image_url or default
  const imagePath = product.image || product.image_url || `/images/products/default-product.jpg`;
  // Use description as subtitle if subtitle doesn't exist
  const subtitle = product.subtitle || product.description;

  return (
    <Link href={`/products/detail/${product.id}`}>
      <Card className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 hover:bg-gray-900/90 transition-all duration-300 overflow-hidden h-full group">
        <div className="relative aspect-video bg-gray-800 overflow-hidden">
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-blue-500/90 border-none text-white">
              {product.category}
            </Badge>
          </div>
          
          <Image 
            src={imagePath}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = '/images/products/default-product.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {subtitle}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-gray-500">
              {product.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
