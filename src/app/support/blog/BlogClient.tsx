"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Tag, 
  PlusCircle, 
  Search,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BlogPost } from "@/types/blog";
import { useToast } from "@/hooks/use-toast";
import BlogCard from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase-client";

interface BlogClientProps {
  initialPosts: BlogPost[];
  initialCategories: string[];
}

export default function BlogClient({ initialPosts, initialCategories }: BlogClientProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();
  
  // Use the provided categories or fallback if empty
  const categories = initialCategories.length > 0 
    ? initialCategories 
    : ["제품 소식", "기술 정보", "회사 소식", "전시회", "이벤트"];
  
  // Filter and sort posts
  const filteredPosts = React.useMemo(() => {
    return blogPosts
      .filter(post => {
        const matchesSearch = 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [blogPosts, searchQuery, selectedCategory, sortDirection]);
  
  return (
    <div className="py-8 container mx-auto px-4 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">블로그</h1>
        <p className="text-slate-600 max-w-3xl">
          대한플러스전자의 최신 소식, 제품 업데이트, 기술 자료를 확인하세요.
          전자부품 산업의 최신 트렌드와 함께 당사의 비즈니스 소식을 공유합니다.
        </p>
      </div>
      
      {/* 필터 및 검색 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="블로그 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
            title={sortDirection === "desc" ? "오래된 순으로 정렬" : "최신 순으로 정렬"}
          >
            {sortDirection === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
          </Button>
          
          <Link href="/support/blog/create">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="h-4 w-4" />
              <span>새 글 작성</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* 카테고리 필터 */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? "bg-blue-600" : ""}
        >
          전체
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-blue-600" : ""}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* 블로그 포스트 목록 */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden border border-gray-200">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500 mb-6">
            검색어를 변경하거나 다른 카테고리를 선택해보세요.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
            }}
          >
            필터 초기화
          </Button>
        </div>
      )}
    </div>
  );
}
