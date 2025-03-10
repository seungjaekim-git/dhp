import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, AlertCircle } from "lucide-react";
import { ProductProps, Post } from "../../types/product";
import { formatDate, categoryKoreanMap, categoryColorMap } from "../../utils";

interface PostsTabProps {
  product: ProductProps;
}

const POSTS_PER_PAGE = 6;

export const PostsTab = ({ product }: PostsTabProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [ref, inView] = useInView();

  const fetchPosts = async () => {
    setIsLoading(true);
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
    setIsLoading(false);

    // Count posts by category
    if (page === 1) {
      const counts: Record<string, number> = {};
      data.forEach(post => {
        counts[post.category] = (counts[post.category] || 0) + 1;
      });
      setCategoryCounts(counts);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-100">
        <AlertCircle className="w-12 h-12 text-blue-400" />
        <h3 className="text-xl font-semibold text-blue-900">관련 글이 없습니다</h3>
        <p className="text-blue-600 text-center">
          아직 이 제품에 대한 게시글이 작성되지 않았습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-2xl border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          카테고리별 게시글
        </h3>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(categoryKoreanMap).map(([key, value]) => {
            if (!categoryCounts[key]) return null;
            return (
              <Badge 
                key={key} 
                className={`${categoryColorMap[key]} px-4 py-1.5 rounded-lg text-sm font-medium`}
              >
                {value} ({categoryCounts[key]})
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card 
            key={post.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl border border-blue-100 hover:border-blue-200"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Badge className={`${categoryColorMap[post.category]} rounded-lg px-3 py-1`}>
                  {categoryKoreanMap[post.category]}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.created_at)}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {post.summary || post.content}
                </p>
              </div>

              {post.image_url && (
                <div className="relative h-48 rounded-xl overflow-hidden">
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
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
        </div>
      )}
    </div>
  );
}; 