import { supabase } from './supabase-client';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  keywords: string[];
  category: string;
  imageUrl?: string;
}

export async function fetchSearchData(): Promise<SearchResult[]> {
  try {
    // Fetch products from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description, category, specifications, manufacturer, part_number, image_url');

    if (error) {
      console.error('Error fetching products for search:', error);
      return [];
    }

    // Transform the data into search format
    const searchResults: SearchResult[] = products.map(product => ({
      id: product.id,
      title: product.name,
      description: product.description || `${product.manufacturer} ${product.part_number}`,
      url: `/products/detail/${product.id}`,
      keywords: [
        product.manufacturer,
        product.part_number,
        product.category,
        ...(product.specifications ? Object.values(product.specifications).filter(Boolean) : [])
      ].filter(Boolean) as string[],
      category: product.category || '기타 제품',
      imageUrl: product.image_url
    }));

    return searchResults;
  } catch (err) {
    console.error('Failed to fetch search data:', err);
    return [];
  }
}

// Cache search data
let searchDataCache: SearchResult[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getSearchData(): Promise<SearchResult[]> {
  const now = Date.now();
  
  // If cache is valid, return cached data
  if (searchDataCache && now - lastFetchTime < CACHE_DURATION) {
    return searchDataCache;
  }
  
  // Fetch new data
  const data = await fetchSearchData();
  searchDataCache = data;
  lastFetchTime = now;
  
  return data;
}

// Export dummy data for SSR/development without API calls
export const searchData: SearchResult[] = [
  {
    id: "p1",
    title: "LED 드라이버 MBI5353",
    description: "16채널 정전류 LED 드라이버 IC",
    url: "/products/detail/mbi5353",
    keywords: ["LED", "드라이버", "IC", "Macroblock", "MBI5353", "정전류"],
    category: "LED 드라이버 IC"
  },
  {
    id: "p2",
    title: "쇼트키 다이오드 SS34",
    description: "3A 40V 쇼트키 배리어 정류기",
    url: "/products/detail/ss34",
    keywords: ["쇼트키", "다이오드", "정류기", "Zowie", "SS34"],
    category: "다이오드"
  },
  {
    id: "p3",
    title: "DC-DC 컨버터 XL2009",
    description: "고효율 동기식 스텝-다운 컨버터",
    url: "/products/detail/xl2009",
    keywords: ["DC-DC", "컨버터", "전원관리", "XLSEMI", "XL2009"],
    category: "전원관리 IC"
  },
  {
    id: "p4",
    title: "온도 센서 KT-1000",
    description: "고정밀 산업용 온도 센서",
    url: "/products/detail/kt1000",
    keywords: ["온도", "센서", "측정", "Kube", "KT-1000"],
    category: "센서"
  },
  {
    id: "p5",
    title: "FPC 커넥터 MT24-30S",
    description: "24핀 0.3mm 피치 FPC 커넥터",
    url: "/products/detail/mt24-30s",
    keywords: ["FPC", "커넥터", "Morethanall", "MT24-30S"],
    category: "커넥터&케이블"
  },
  {
    id: "p6",
    title: "LED 매트릭스 드라이버 MBI5124",
    description: "16×32 RGB LED 매트릭스 드라이버",
    url: "/products/detail/mbi5124",
    keywords: ["LED", "매트릭스", "드라이버", "Macroblock", "MBI5124"],
    category: "LED 드라이버 IC"
  },
  {
    id: "p7",
    title: "자동차용 LDO 레귤레이터 PT7815",
    description: "AEC-Q100 인증 자동차용 저전압 레귤레이터",
    url: "/products/detail/pt7815",
    keywords: ["LDO", "레귤레이터", "자동차", "AEC-Q100", "Powtech", "PT7815"],
    category: "전원관리 IC"
  },
  {
    id: "p8",
    title: "산업용 커넥터 LL-HF20S",
    description: "20핀 고전류 산업용 원형 커넥터",
    url: "/products/detail/llhf20s",
    keywords: ["커넥터", "산업용", "원형", "LLT", "LL-HF20S"],
    category: "커넥터&케이블"
  }
]; 