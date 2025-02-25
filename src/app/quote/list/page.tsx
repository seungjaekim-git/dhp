import { fetchProducts } from './fetchProduct';
import QuoteClientContainer from './QuoteClientContainer';

export default async function QuotePage() {
  // 서버 컴포넌트에서 데이터 페칭
  const { products, similarProducts } = await fetchProducts();
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-l-4 border-blue-500 pl-4 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            견적 리스트
          </h1>
          <p className="mt-2 text-gray-600">
            최적의 제품과 가격을 확인하세요
          </p>
        </div>
        
        <div className="flex justify-end mb-6 space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option>모든 상태</option>
            <option>진행 중</option>
            <option>완료됨</option>
            <option>취소됨</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option>최신순</option>
            <option>오래된순</option>
            <option>금액 높은순</option>
            <option>금액 낮은순</option>
          </select>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* 클라이언트 컴포넌트로 데이터 전달 */}
          <QuoteClientContainer 
            initialProducts={products} 
            initialSimilarProducts={similarProducts} 
          />
        </div>
      </div>
    </div>
  );
}
