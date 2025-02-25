'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import QuoteList from './QuoteList';
import { Product, CartItem } from './types';

// 클라이언트 컴포넌트를 동적으로 불러오기
const QuoteSummary = dynamic(() => import('./QuoteSummary'), { ssr: false });
const QuoteRecommendation = dynamic(() => import('./QuoteRecommendation'), { ssr: false });

interface QuoteClientContainerProps {
  initialProducts: Product[] | null;
  initialSimilarProducts: Product[] | null;
}

export default function QuoteClientContainer({ 
  initialProducts = [], 
  initialSimilarProducts = [] 
}: QuoteClientContainerProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('quoteCart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  
  // 제품이 null이나 undefined인 경우 안전하게 처리
  const safeProducts = initialProducts || [];
  const safeSimilarProducts = initialSimilarProducts || [];
  
  // 선택된 제품 상태 관리 추가
  const [selectedProducts, setSelectedProducts] = useState<number[]>(() => {
    // 기본적으로 모든 제품 선택
    return [...safeProducts, ...safeSimilarProducts].map(product => product.id);
  });
  
  // localStorage에서 제거된 제품 필터링
  const filteredProducts = safeProducts.filter(product => {
    if (typeof window !== 'undefined') {
      const removedProducts = localStorage.getItem('removedProducts');
      if (removedProducts) {
        const removedIds = JSON.parse(removedProducts);
        return !removedIds.includes(product.id);
      }
    }
    return true;
  });
  
  const addToCart = (product: Product) => {
    if (!product || product.id === undefined) {
      setSnackbarMessage('제품 정보가 올바르지 않습니다.');
      setSnackbarOpen(true);
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      let newCart;
      if (existingItem) {
        newCart = prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 0) + 1 } 
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1, note: '' }];
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteCart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
    
    setSnackbarMessage('제품이 견적서에 추가되었습니다.');
    setSnackbarOpen(true);
  };

  const removeFromCart = (productId: number | undefined) => {
    if (productId === undefined) {
      setSnackbarMessage('제품 정보가 올바르지 않습니다.');
      setSnackbarOpen(true);
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      let newCart;
      if (existingItem && existingItem.quantity > 1) {
        newCart = prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        newCart = prevCart.filter(item => item.id !== productId);
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteCart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  };

  const updateNote = (productId: number | undefined, note: string) => {
    if (productId === undefined) return;
    
    setCart(prevCart => {
      const newCart = prevCart.map(item => 
        item.id === productId 
          ? { ...item, note: note || '' } 
          : item
      );
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteCart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  };

  const calculateTotal = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const sendQuoteByEmail = () => {
    if (!cart || cart.length === 0) {
      setSnackbarMessage('견적서에 제품이 없습니다. 제품을 추가해주세요.');
      setSnackbarOpen(true);
      return;
    }
    setSnackbarMessage('견적서가 이메일로 전송되었습니다!');
    setSnackbarOpen(true);
  };

  const sendQuoteByKakao = () => {
    if (!cart || cart.length === 0) {
      setSnackbarMessage('견적서에 제품이 없습니다. 제품을 추가해주세요.');
      setSnackbarOpen(true);
      return;
    }
    setSnackbarMessage('견적서가 카카오톡으로 전송되었습니다!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleProductSelection = (productIds: number[]) => {
    setSelectedProducts(productIds);
  };

  const navigateToQuoteOptions = () => {
    // 견적 받기 버튼 클릭 시 다음 페이지로 이동하는 로직
    // 현재는 스낵바로 표시
    setSnackbarMessage('다음 단계: 견적 수신 방법 선택 페이지로 이동합니다.');
    setSnackbarOpen(true);
    // 실제 구현 시 라우팅 코드 추가
    // router.push('/quote/options');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* 탭 네비게이션 */}
            <div className="mb-6">
              <div className="flex space-x-8 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`pb-4 px-1 text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeTab === 'products'
                      ? 'text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  주요 제품
                </button>
                <button
                  onClick={() => setActiveTab('similar')}
                  className={`pb-4 px-1 text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeTab === 'similar'
                      ? 'text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  유사 제품
                </button>
              </div>
            </div>

            {/* 제품 목록 */}
            {activeTab === 'products' ? (
              <QuoteList 
                products={filteredProducts} 
                addToCart={addToCart} 
                selectedProducts={selectedProducts}
                onSelectionChange={handleProductSelection}
              />
            ) : (
              <QuoteList 
                products={safeSimilarProducts} 
                addToCart={addToCart}
                selectedProducts={selectedProducts}
                onSelectionChange={handleProductSelection}
              />
            )}
          </div>

          {/* 견적 요약 */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <QuoteSummary 
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateNote={updateNote}
                calculateTotal={calculateTotal}
                sendQuoteByEmail={sendQuoteByEmail}
                sendQuoteByKakao={sendQuoteByKakao}
                selectedProducts={selectedProducts}
                navigateToQuoteOptions={navigateToQuoteOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 스낵바 */}
      {snackbarOpen && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-blue-100 p-4 max-w-sm animate-slide-up z-50">
          <div className="flex items-center text-blue-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm sm:text-base">{snackbarMessage}</p>
          </div>
          <button 
            onClick={handleCloseSnackbar}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}