'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  part_number?: string;
  description?: string;
  manufacturer_id?: number;
  manufacturer_name?: string;
  subtitle?: string;
  image?: string;
  parameters?: any;
}

interface BookmarkButtonProps {
  product: Product;
}

export default function BookmarkButton({ product }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = React.useState(false);
  
  const handleToggleBookmark = () => {
    setBookmarked(!bookmarked);
    
    if (bookmarked) {
      toast({
        title: "북마크가 삭제되었습니다",
        description: `${product.name} 제품이 북마크에서 제거되었습니다.`,
        variant: "default",
      });
    } else {
      toast({
        title: "북마크에 추가되었습니다",
        description: `${product.name} 제품이 북마크에 추가되었습니다.`,
        variant: "default",
      });
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleToggleBookmark}
      className={
        bookmarked 
          ? "w-full bg-yellow-500/10 border-yellow-700 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300" 
          : "w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-600 transition-all"
      }
    >
      <Bookmark className="h-4 w-4 mr-2" />
      {bookmarked ? '북마크 해제하기' : '북마크에 추가하기'}
    </Button>
  );
} 