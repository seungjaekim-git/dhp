import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileX } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  manufacturer_id: number;
}

export const PostList = ({ posts }: { posts: Post[] }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <FileX className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-medium mb-2 text-gray-400">등록된 게시물이 없습니다</h3>
        <p className="text-sm text-gray-500">아직 등록된 뉴스나 게시물이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{post.title}</h3>
              <p className="text-sm text-gray-400">{post.content}</p>
              <div className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
