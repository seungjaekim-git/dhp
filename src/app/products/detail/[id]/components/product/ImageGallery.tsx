import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Image } from "../../types/product";

interface ImageGalleryProps {
  images: Image[];
  productName: string;
}

export const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [galleryRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // 이미지가 없는 경우 기본 이미지 제공
  const displayImages = images.length > 0 
    ? images 
    : [{ url: "/placeholder.png", alt: productName }];

  return (
    <div ref={galleryRef} className="space-y-3 md:space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <div 
            className="w-full h-[300px] md:h-[350px] lg:h-[400px] bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            onClick={() => setIsZoomed(true)}
          >
            {inView ? (
              <img
                src={displayImages[selectedImage]?.url}
                alt={displayImages[selectedImage]?.alt || productName}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-4xl w-11/12 h-[80vh]">
          <DialogHeader>
            <DialogTitle>제품 이미지 상세보기</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center h-full">
            <img
              src={displayImages[selectedImage]?.url}
              alt={displayImages[selectedImage]?.alt || productName}
              className="max-w-full max-h-[calc(80vh-8rem)] object-contain"
            />
          </div>
          <DialogFooter>
            <div className="flex justify-center w-full overflow-x-auto py-2">
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 mx-1 rounded-lg overflow-hidden h-16 w-16 flex-shrink-0
                    ${selectedImage === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'}
                    transition-all duration-200 hover:border-blue-300`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${productName} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ScrollArea className="w-full">
        <div className="flex gap-2 md:gap-4 pb-2 w-max">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer border-2 rounded-lg overflow-hidden transform transition-all duration-200 hover:scale-105 flex-shrink-0
                ${selectedImage === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
              onClick={() => setSelectedImage(index)}
            >
              {inView ? (
                <img
                  src={image.url}
                  alt={image.alt || `${productName} ${index + 1}`}
                  className="w-20 h-20 object-cover"
                  loading="lazy"
                />
              ) : (
                <Skeleton className="w-20 h-20" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}; 