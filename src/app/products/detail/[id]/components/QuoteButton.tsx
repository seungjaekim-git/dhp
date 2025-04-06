'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

interface QuoteButtonProps {
  product: Product;
}

export default function QuoteButton({ product }: QuoteButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToQuote = () => {
    // 견적 추가 로직
    setIsInCart(true);
    
    toast({
      title: "견적에 추가되었습니다",
      description: `${product.name} 제품이 견적함에 ${quantity}개 추가되었습니다.`,
      variant: "default",
    });
    
    setIsDialogOpen(false);
    setQuantity(1); // 수량 초기화
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          className={
            isInCart 
              ? "w-full bg-green-500/10 border-green-700 text-green-400 hover:bg-green-500/20 hover:text-green-300" 
              : "w-full bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all"
          }
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isInCart ? '견적함에 추가(수량 변경)' : '견적함에 추가하기'}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-gray-900 border-gray-700 text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-white">견적함에 추가하기</DialogTitle>
          <DialogDescription className="text-gray-400">
            {product.name} 제품을 견적함에 추가합니다. 원하는 수량을 입력하세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-gray-300">수량</Label>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                className="text-center bg-gray-800 border-gray-700 text-white"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={increaseQuantity}
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="secondary" 
            onClick={() => setIsDialogOpen(false)}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            취소
          </Button>
          <Button 
            onClick={handleAddToQuote}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            견적함에 추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 