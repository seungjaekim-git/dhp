"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  category: 'news_event' | 'notice' | 'tech_blog' | 'discontinued' | 'product_launch';
  summary: string;
  image_url: string;
  created_at: string;
}

interface ProductPostProps {
  product: {
    id: BigInt;
    manufacturer_id: BigInt;
  };
}

const POSTS_PER_PAGE = 6;

const categoryKoreanMap = {
  news_event: '뉴스/이벤트',
  notice: '공지사항',
  tech_blog: '기술 블로그',
  discontinued: '단종 안내',
  product_launch: '신제품 출시'
};

const categoryColorMap = {
  news_event: 'bg-blue-100 text-blue-800',
  notice: 'bg-gray-100 text-gray-800',
  tech_blog: 'bg-green-100 text-green-800',
  discontinued: 'bg-red-100 text-red-800',
  product_launch: 'bg-purple-100 text-purple-800'
};

export default function ProductPost({ product }: ProductPostProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_products!inner(product_id),
        post_manufacturers!inner(manufacturer_id)
      `)
      .eq('post_products.product_id', product.id.toString())
      .eq('post_manufacturers.manufacturer_id', product.manufacturer_id.toString())
      .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    if (data.length < POSTS_PER_PAGE) {
      setHasMore(false);
    }

    setPosts(prev => [...prev, ...data]);
  };

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(categoryKoreanMap).map(([key, value]) => (
          <Badge key={key} variant="secondary" className="text-sm">
            {value}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card 
            key={post.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Badge className={`${categoryColorMap[post.category]}`}>
                  {categoryKoreanMap[post.category]}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.created_at)}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {post.summary || post.content}
                </p>
              </div>

              {post.image_url && (
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="h-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
}
