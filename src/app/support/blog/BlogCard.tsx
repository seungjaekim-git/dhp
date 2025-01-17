"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Eye, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: number;
  comments: number;
}

export default function BlogCard({
  id,
  title,
  description,
  category,
  thumbnail,
  author,
  publishDate,
  readTime,
  views,
  comments,
}: BlogCardProps) {
  return (
    <Link href={`/support/blog/${id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
            {category}
          </Badge>
        </div>
        <CardHeader>
          <h3 className="text-xl font-bold line-clamp-2 hover:text-primary">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{author}</span>
            <span>•</span>
            <span>{readTime} 읽기</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{publishDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{comments}</span>
            </div>
          </div>
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
