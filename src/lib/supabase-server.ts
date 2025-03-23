import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServerKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This client should only be used in server components or server actions
export const supabaseServer = createClient(supabaseUrl, supabaseServerKey, {
  auth: {
    persistSession: false,
  },
});

// Function to get all manufacturers
export async function getAllManufacturers() {
  const { data, error } = await supabaseServer
    .from('manufacturers')
    .select('*')
    .eq('role', 'partner')
    .order('name');

  if (error) {
    console.error('Error fetching manufacturers:', error);
    return [];
  }

  return data || [];
}

// Function to get manufacturer by slug
export async function getManufacturerBySlug(slug: string) {
  const { data, error } = await supabaseServer
    .from('manufacturers')
    .select('*')
    .eq('role', 'partner')
    .ilike('name', slug.replace(/-/g, '%'))
    .single();

  if (error) {
    console.error('Error fetching manufacturer:', error);
    return null;
  }

  return data;
}

// Function to get products by manufacturer ID
export async function getProductsByManufacturerId(manufacturerId: number) {
  const { data, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('manufacturer_id', manufacturerId)
    .order('name');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
} 