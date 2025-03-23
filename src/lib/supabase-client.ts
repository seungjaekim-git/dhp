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
