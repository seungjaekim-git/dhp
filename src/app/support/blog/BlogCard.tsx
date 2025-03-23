"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/support/blog/${post.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-48">
          <Image
            src={post.image_url || "/images/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Content */}
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2 bg-blue-100 hover:bg-blue-200 text-blue-800">
            {post.category}
          </Badge>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-slate-900">
            {post.title}
          </h3>
          
          <p className="text-slate-600 line-clamp-3 mb-4 text-sm">
            {post.summary}
          </p>
        </CardContent>
        
        {/* Footer */}
        <CardFooter className="px-4 py-3 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <span className="text-xs font-medium text-blue-600">자세히 보기</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

// 테스트용 더미 데이터
export const dummyBlogData: BlogCardProps = {
  id: "1",
  title: "새로운 IoT 센서 제품 라인업 출시 안내",
  description: "산업용 IoT 센서의 새로운 기준을 제시할 신제품을 소개합니다. 더욱 향상된 정확도와 신뢰성으로 스마트 팩토리의 혁신을 이끌어갑니다.",
  category: "제품소식",
  thumbnail: "/images/blog/iot-sensors.jpg",
  author: "김기술",
  publishDate: "2024-01-15",
  readTime: "5분",
  views: 1234,
  comments: 23
};
