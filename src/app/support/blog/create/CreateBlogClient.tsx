"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { createBlogPostAction } from "./actions";

interface CreateBlogClientProps {
  initialCategories: string[];
}

export default function CreateBlogClient({ initialCategories }: CreateBlogClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("제품 소식");
  const [imageUrl, setImageUrl] = useState("/images/news-1.jpg");
  const [isPublished, setIsPublished] = useState(true);

  // Use the initialCategories from props
  const categories = initialCategories.length > 0 
    ? initialCategories 
    : ["제품 소식", "기술 자료", "회사 소식", "전시회", "공지사항"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Create form data to send to server action
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('imageUrl', imageUrl);
    formData.append('isPublished', isPublished.toString());
    
    startTransition(async () => {
      try {
        const result = await createBlogPostAction(formData);
        
        if (result.success) {
          toast({
            title: "블로그 작성 완료",
            description: "새로운 블로그 글이 작성되었습니다.",
          });
          router.push("/support/blog");
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error creating blog post:", error);
        toast({
          title: "오류 발생",
          description: "블로그 작성 중 오류가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">새 블로그 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">요약</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            className="min-h-[60px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">내용 (마크다운 형식으로 작성 가능)</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[300px] font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">카테고리</Label>
          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">이미지 URL</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isPublished"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <Label htmlFor="isPublished">공개 여부</Label>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : "저장하기"}
        </Button>
      </form>
    </div>
  );
} 