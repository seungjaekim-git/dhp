import { supabase } from '@/lib/supabase-client'

export interface EnumData {
  MOUNTING_STYLE: string[];
  STORAGE_TYPE: string[];
  TOPOLOGY: string[];
  DIMMING_METHOD: string[];
  DOCUMENT_TYPE: string[];
  CERTIFICATION: { id: number; name: string }[];
  FEATURE: { id: number; name: string }[];
  APPLICATION: { id: number; name: string }[];
  DIVISION: { id: number; name: string }[];
  MANUFACTURER: { id: number; name: string }[];
  CATEGORY: { id: number; name: string }[];
  PACKAGE_TYPE: { id: number; name: string }[];
}

export async function fetchEnums(): Promise<EnumData> {
  const [
    { data: mountingStyles },
    { data: storageTypes },
    { data: topologies },
    { data: dimmingMethods },
    { data: certifications },
    { data: features },
    { data: applications },
    { data: divisions },
    { data: manufacturers },
    { data: categories },
    { data: packageTypes },
    { data: documentTypes }
  ] = await Promise.all([
    supabase.rpc('get_enum_values', { enum_type_name: 'mounting_style' }),
    supabase.rpc('get_enum_values', { enum_type_name: 'storage_type' }),
    supabase.rpc('get_enum_values', { enum_type_name: 'topology' }),
    supabase.rpc('get_enum_values', { enum_type_name: 'dimming_method' }),
    supabase.rpc('get_enum_values', { enum_type_name: 'document_type' }),
    supabase.from('certifications').select('*'),
    supabase.from('features').select('*'),
    supabase.from('applications').select('*'),
    supabase.from('divisions').select('*'),
    supabase.from('manufacturers').select('*'),
    supabase.from('categories').select('*'),
    supabase.from('package_types').select('*'),
  ])

  return {
    MOUNTING_STYLE: mountingStyles || [],
    STORAGE_TYPE: storageTypes || [],
    TOPOLOGY: topologies || [],
    DIMMING_METHOD: dimmingMethods || [],
    DOCUMENT_TYPE: documentTypes || [],
    CERTIFICATION: certifications || [],
    FEATURE: features || [],
    APPLICATION: applications || [],
    DIVISION: divisions || [],
    MANUFACTURER: manufacturers || [],
    CATEGORY: categories || [],
    PACKAGE_TYPE: packageTypes || []
  }
}

// SSG 빌드 시에는 아래 코드가 실행되어 상수로 저장됨
export const ENUMS = fetchEnums();
