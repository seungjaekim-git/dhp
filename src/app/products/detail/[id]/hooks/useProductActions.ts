import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export const useProductActions = (productName: string, productSubtitle: string) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const handleBookmarkToggle = useCallback(() => {
    setIsBookmarked((prev) => !prev);
    toast({
      title: isBookmarked ? "북마크가 해제되었습니다" : "북마크에 추가되었습니다",
      description: isBookmarked 
        ? "관심제품 목록에서 제거되었습니다." 
        : "마이페이지 관심제품 목록에서 확인하실 수 있습니다.",
      variant: "default",
    });
  }, [isBookmarked, toast]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: productSubtitle,
        url: window.location.href,
      }).catch(err => {
        console.error('공유 실패:', err);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  }, [productName, productSubtitle]);

  const fallbackShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "링크가 복사되었습니다",
      description: "원하는 곳에 붙여넣기 하세요",
      variant: "default",
    });
  }, [toast]);

  return {
    isBookmarked,
    handleBookmarkToggle,
    handleShare
  };
}; 