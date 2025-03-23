"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Tag,
  ArrowLeft,
  Edit,
  Trash,
  Share,
  Bookmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPost } from "@/types/blog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";
import { getAllPosts } from "@/lib/blog";

interface BlogDetailClientProps {
  post: BlogPost | null;
}

export default function BlogDetailClient({ post: initialPost }: BlogDetailClientProps) {
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [isLoading, setIsLoading] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If we already have the post from SSG, just load related posts
    if (post) {
      loadRelatedPosts(post.category, post.slug);
    }
  }, [post]);

  // Load related posts with the same category
  const loadRelatedPosts = (category: string, currentSlug: string) => {
    setIsLoading(true);
    
    try {
      // Get all posts and filter for related ones
      const allPosts = getAllPosts();
      
      const related = allPosts
        .filter(p => p.category === category && p.slug !== currentSlug)
        .slice(0, 3);
      
      setRelatedPosts(related);
    } catch (error) {
      console.error("Error loading related posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="py-8 container mx-auto px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-8"
        onClick={() => router.push('/support/blog')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        블로그 목록으로
      </Button>
      
      {isLoading ? (
        <div>
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-4" />
        </div>
      ) : post ? (
        <article>
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">{post.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-slate-500 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
            </div>
            
            {post.image_url && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            {/* If we have pre-rendered HTML from markdown, use it */}
            {post.contentHtml ? (
              <div 
                className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-800" 
                dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
              />
            ) : (
              // Fallback to basic formatting if no HTML is available
              <div className="prose max-w-none">
                {post.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center py-4 border-t border-slate-200 mt-12">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                공유하기
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                저장하기
              </Button>
            </div>
            
            {/* 관리자만 볼 수 있는 버튼 */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                수정하기
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                <Trash className="h-4 w-4 mr-2" />
                삭제하기
              </Button>
            </div>
          </div>
          
          {/* 관련 게시물 */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">관련 게시물</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/support/blog/${relatedPost.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedPost.image_url || "/images/placeholder.jpg"}
                          alt={relatedPost.title}
                          width={300}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge className="mb-2">{relatedPost.category}</Badge>
                        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2">{relatedPost.summary}</p>
                        <div className="flex items-center mt-3 text-xs text-slate-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(relatedPost.created_at)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">게시물을 찾을 수 없습니다</h3>
          <p className="text-gray-500 mb-6">
            해당 게시물이 삭제되었거나 잘못된 URL입니다.
          </p>
          <Button 
            onClick={() => router.push('/support/blog')}
          >
            블로그 목록으로
          </Button>
        </div>
      )}
    </div>
  );
} 