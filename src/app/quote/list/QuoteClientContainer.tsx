'use client';

import { useState, useEffect } from 'react';
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
  
  // 제품이 null이나 undefined인 경우 안전하게 처리
  const safeProducts = initialProducts || [];
  const safeSimilarProducts = initialSimilarProducts || [];
  
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
      
      // localStorage에 저장
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
      
      // localStorage에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteCart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  };

  const updateNote = (productId: number | undefined, note: string) => {
    if (productId === undefined) {
      return;
    }
    
    setCart(prevCart => {
      const newCart = prevCart.map(item => 
        item.id === productId 
          ? { ...item, note: note || '' } 
          : item
      );
      
      // localStorage에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteCart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  };

  const calculateTotal = () => {
    if (!cart || cart.length === 0) {
      return 0;
    }
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
    // 이메일 전송 로직 구현
    setSnackbarMessage('견적서가 이메일로 전송되었습니다!');
    setSnackbarOpen(true);
  };

  const sendQuoteByKakao = () => {
    if (!cart || cart.length === 0) {
      setSnackbarMessage('견적서에 제품이 없습니다. 제품을 추가해주세요.');
      setSnackbarOpen(true);
      return;
    }
    // 카카오 채널톡 전송 로직 구현
    setSnackbarMessage('견적서가 카카오톡으로 전송되었습니다!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="divide-y divide-gray-200">
      {/* 탭 네비게이션 */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex space-x-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-1 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'products'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            주요 제품
          </button>
          <button
            onClick={() => setActiveTab('similar')}
            className={`pb-4 px-1 font-medium text-sm transition-colors duration-200 ${
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
      <div className="px-6 py-6">
        {activeTab === 'products' ? (
          <ProductList products={filteredProducts} addToCart={addToCart} />
        ) : (
          <SimilarProductList products={safeSimilarProducts} addToCart={addToCart} />
        )}
      </div>
      
      {/* 견적 요약 및 옵션 (오른쪽) */}
      <div className="md:col-span-5">
        <QuoteSummary 
          cart={cart}
          sendQuoteByEmail={sendQuoteByEmail}
          sendQuoteByKakao={sendQuoteByKakao}
        />
      </div>
      
      {/* 스낵바 */}
      {snackbarOpen && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-blue-100 p-4 max-w-sm animate-slide-up">
          <div className="flex items-center text-blue-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>{snackbarMessage}</p>
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

function ProductList({ products, addToCart }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {product.category}
              </span>
            </div>
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">{product.price}원</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="inline-flex items-center px-3 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                견적 추가
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SimilarProductList({ products, addToCart }) {
  // 유사 제품 목록 구현 (ProductList와 유사하게 구현)
  // ...
} 