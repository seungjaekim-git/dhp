import { supabase } from '@/lib/supabase-client';
import { Product } from './types';

export async function fetchProducts(): Promise<{
  products: Product[];
  similarProducts: Product[];
  error?: string;
}> {
  try {
    // 로컬 스토리지에서 제품 아이디 가져오기
    // 클라이언트 사이드에서만 실행되도록 확인
    let productIds: number[] = [15, 104]; // 임시로 15번과 104번 제품 추가
    if (typeof window !== 'undefined') {
      const storedIds = localStorage.getItem('productIds');
      if (storedIds) {
        const parsedIds = JSON.parse(storedIds);
        // 중복 제거하면서 15번과 104번 제품 추가
        productIds = [...new Set([...productIds, ...parsedIds])];
      }
    }

    // 저장된 아이디가 없는 경우 빈 배열 반환
    if (productIds.length === 0) {
      return {
        products: [],
        similarProducts: [],
      };
    }

    // 제품 정보 조회 (관련 테이블 포함)
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        manufacturers(id, name, logo),
        images(*),
        product_categories(
          category_id,
          categories(id, name, description)
        ),
        product_features(
          feature_id,
          description,
          features(id, name, description)
        )
      `)
      .in('id', productIds);
    
    if (error) throw error;
    
    if (data) {
      // 데이터 변환 및 정리
      const formattedProducts: Product[] = data.map(product => {
        // 카테고리 정보 추출
        const categories = product.product_categories?.map((pc: any) => ({
          product_id: product.id,
          category_id: pc.category_id,
          category: pc.categories
        })) || [];
        
        // 첫 번째 카테고리 이름을 기본 카테고리로 사용
        const primaryCategory = categories.length > 0 ? categories[0].category?.name : '기타';
        
        // 기능 정보 추출
        const features = product.product_features?.map((pf: any) => ({
          product_id: product.id,
          feature_id: pf.feature_id,
          description: pf.description,
          feature: pf.features
        })) || [];
        
        // 임의의 가격 설정 (실제로는 가격 정보가 있어야 함)
        const price = Math.floor(Math.random() * 1000000) + 10000;
        
        return {
          ...product,
          manufacturer: product.manufacturers,
          categories,
          features,
          category: primaryCategory, // 단순화된 카테고리
          price // 임시 가격
        };
      });
      
      // 유사 제품 추천을 위한 임의의 제품 선택
      const randomProducts = [...formattedProducts]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(4, formattedProducts.length));
      
      // 서버 사이드에서 데이터 가져오는 지연 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        products: formattedProducts,
        similarProducts: randomProducts
      };
    }
    
    return {
      products: [],
      similarProducts: [],
      error: '데이터를 불러오지 못했습니다.'
    };
  } catch (error) {
    console.error('제품을 불러오는 중 오류가 발생했습니다:', error);
    return {
      products: [],
      similarProducts: [],
      error: '제품을 불러오는 중 오류가 발생했습니다.'
    };
  }
}
