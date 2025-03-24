import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL과 Anonymous Key가 설정되지 않았습니다.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});

// Function to get all manufacturers
export async function getAllManufacturers() {
  const { data, error } = await supabase
    .from('manufacturers')
    .select(`
      id, 
      name, 
      website_url, 
      logo, 
      country_id, 
      established, 
      headquarters, 
      business_type,
      product_category,
      description,
      role
    `)
    .eq('role', 'partner')
    .order('id');

  if (error) {
    console.error('Error fetching manufacturers:', error);
    return [];
  }

  return data || [];
}

// 모든 카테고리 가져오기
export async function getAllCategories() {
  // 실제 API 연동 대신 정적 데이터 반환
  // 필요한 경우 supabase에서 카테고리 테이블을 쿼리로 대체 가능
  return [
    { id: 1, name: '마이크로컨트롤러', description: '단일 집적 회로에 마이크로프로세서와 주변 장치를 포함' },
    { id: 2, name: '센서', description: '물리적 환경 변화를 감지하고 전기 신호로 변환하는 장치' },
    { id: 3, name: '통신 모듈', description: '다양한 프로토콜을 사용하여 디바이스 간 통신을 지원하는 하드웨어' },
    { id: 4, name: '전력 관리', description: '전원 공급 및 에너지 효율 관리를 위한 솔루션' },
    { id: 5, name: '메모리', description: '데이터 저장을 위한 다양한 유형의 메모리 칩' },
    { id: 6, name: '인터페이스 IC', description: '다양한 시스템 간의 데이터 교환을 관리하는 집적 회로' },
    { id: 7, name: '개발 도구', description: '하드웨어 및 소프트웨어 개발을 위한 장비 및 키트' },
    { id: 8, name: '액추에이터', description: '전기 신호를 기계적 움직임으로 변환하는 장치' },
    { id: 9, name: '디스플레이', description: '정보를 시각적으로 표시하는 전자 부품' },
    { id: 10, name: '커넥터', description: '전기 회로 간 연결을 제공하는 기계적 장치' }
  ];
}

// 모든 응용 분야 가져오기
export async function getAllApplications() {
  // 실제 API 연동 대신 정적 데이터 반환
  return [
    { id: 1, name: '산업 자동화', description: '제조 및 생산 프로세스의 자동화' },
    { id: 2, name: '스마트 홈', description: '가정의 자동화 및 지능형 제어' },
    { id: 3, name: '의료 기기', description: '진단, 모니터링 및 치료를 위한 의료 장비' },
    { id: 4, name: '자동차 전자장치', description: '자동차의 제어, 안전 및 편의 시스템' },
    { id: 5, name: '웨어러블 기기', description: '몸에 착용할 수 있는 스마트 기기' },
    { id: 6, name: '로보틱스', description: '자율 또는 원격 제어 기계 장치' },
    { id: 7, name: '항공우주', description: '항공기 및 우주선용 전자 시스템' },
    { id: 8, name: '에너지 관리', description: '에너지 생산, 저장 및 분배 시스템' },
    { id: 9, name: '농업 기술', description: '농업 생산성 향상을 위한 기술' },
    { id: 10, name: '보안 시스템', description: '물리적 보안 및 데이터 보호 솔루션' },
    { id: 11, name: '통신', description: '유무선 통신 인프라 및 장비' },
    { id: 12, name: '인공지능', description: 'AI 및 머신러닝 구현을 위한 하드웨어' }
  ];
}

// Function to get manufacturer by slug
export async function getManufacturerBySlug(slug: string) {
  // First, try using ilike with the slug directly
  const { data, error } = await supabase
    .from('manufacturers')
    .select(`
      *,
      key_milestones,
      product_category,
      emails,
      phones,
      description,
      linkedin_url,
    `)
    .eq('role', 'partner')
    .ilike('name', `%${slug.replace(/-/g, '%')}%`)
    .single();

  if (error) {
    console.error('Error fetching manufacturer:', error);
    
    // If not found, try a more flexible approach by breaking the slug into parts
    // and searching for any matching part
    const slugParts = slug.split('-').filter(part => part.length > 1);
    if (slugParts.length > 0) {
      console.log('Trying more flexible search with parts:', slugParts);
      
      // Try searching for manufacturers that match any part of the slug
      try {
        for (const part of slugParts) {
          const { data: partData, error: partError } = await supabase
            .from('manufacturers')
            .select(`
              *,
              key_milestones,
              product_category,
              emails,
              phones
            `)
            .eq('role', 'partner')
            .ilike('name', `%${part}%`)
            .limit(1);
            
          if (!partError && partData && partData.length > 0) {
            // Fetch products for this manufacturer
            const products = await getProductsByManufacturerId(partData[0].id);
            return { ...partData[0], products };
          }
        }
      } catch (flexError) {
        console.error('Error in flexible search:', flexError);
      }
    }
    
    return null;
  }

  // Fetch products for this manufacturer
  if (data) {
    const products = await getProductsByManufacturerId(data.id);
    return { ...data, products };
  }

  return data;
}

// Function to get products by manufacturer ID
export async function getProductsByManufacturerId(manufacturerId: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('manufacturer_id', manufacturerId)
    .order('id');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  // If we found products, get the first image for each product
  if (data && data.length > 0) {
    const productsWithImages = await Promise.all(
      data.map(async (product) => {
        const image = await getFirstProductImage(product.id);
        return {
          ...product,
          image: image ? image.url : null
        };
      })
    );
    return productsWithImages;
  }

  return data || [];
}

// Function to get the first image for a product by product_id
export async function getFirstProductImage(productId: number) {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('product_id', productId)
    .order('id')
    .limit(1)
    .single();

  if (error) {
    console.error(`Error fetching image for product ID ${productId}:`, error);
    return null;
  }

  return data;
}

// Function to get all products
export async function getAllProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, 
        name, 
        part_number,
        description,
        manufacturer_id,
        manufacturers (name),
        category,
        applications,
        parameters,
        datasheet_url,
        stock_status
      `)
      .order('id');

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    // If we found products, get the first image for each product
    if (data && data.length > 0) {
      const productsWithImages = await Promise.all(
        data.map(async (product) => {
          const image = await getFirstProductImage(product.id);
          
          // 필요한 형식으로 데이터 변환
          return {
            id: product.id,
            name: product.name,
            part_number: product.part_number,
            partNumber: product.part_number,
            description: product.description || "",
            manufacturer_id: product.manufacturer_id,
            manufacturer_name: product.manufacturers?.name || "Unknown",
            manufacturer: product.manufacturers?.name || "Unknown",
            category: product.category || "",
            applications: product.applications || [],
            parameters: product.parameters || {},
            image: image ? image.url : null,
            datasheet_url: product.datasheet_url,
            stock_status: product.stock_status
          };
        })
      );
      return productsWithImages;
    }

    return [];
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return [];
  }
}
