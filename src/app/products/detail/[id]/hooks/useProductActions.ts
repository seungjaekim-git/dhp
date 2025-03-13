import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBookmarkStore, BookmarkedProduct } from "@/store/bookmarkStore";

export const useProductActions = (product: {
  id: number;
  name: string;
  subtitle: string;
  manufacturerName: string;
  manufacturerId: number;
  imageUrl?: string;
  packageType?: string;
  category?: string;
}) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const { toast } = useToast();

  const handleBookmarkToggle = useCallback(() => {
    const productIsBookmarked = isBookmarked(product.id);
    
    if (productIsBookmarked) {
      removeBookmark(product.id);
    } else {
      const bookmarkItem: BookmarkedProduct = {
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        manufacturerName: product.manufacturerName,
        manufacturerId: product.manufacturerId,
        addedAt: new Date().toISOString(),
        imageUrl: product.imageUrl,
        packageType: product.packageType,
        category: product.category
      };
      addBookmark(bookmarkItem);
    }
    
    toast({
      title: productIsBookmarked ? "북마크가 해제되었습니다" : "북마크에 추가되었습니다",
      description: productIsBookmarked 
        ? "관심제품 목록에서 제거되었습니다." 
        : "마이페이지 관심제품 목록에서 확인하실 수 있습니다.",
      variant: "default",
    });
  }, [product, isBookmarked, addBookmark, removeBookmark, toast]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      }).catch(err => {
        console.error('공유 실패:', err);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  }, [product.name, product.subtitle]);

  const fallbackShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "링크가 복사되었습니다",
      description: "원하는 곳에 붙여넣기 하세요",
      variant: "default",
    });
  }, [toast]);

  return {
    isBookmarked: isBookmarked(product.id),
    handleBookmarkToggle,
    handleShare
  };
}; 