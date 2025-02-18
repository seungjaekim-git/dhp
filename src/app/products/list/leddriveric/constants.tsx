"use client";

import { supabase } from "@/lib/supabase-client";
import { ENUMS } from "@/constants/enum";
import { LEDDriverICInfoSchema } from "@/app/supabase/LEDDriverIC";

export const getData = async () => {
  // Enum 데이터를 가져옵니다
  const enums = await ENUMS;

  // LED Driver IC 제품들을 가져옵니다
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      part_number,
      description,
      subtitle,
      specifications,
      storage_type_id,
      storage_types(
        id,
        name,
        description,
        category
      ),
      manufacturer:manufacturers(
        id,
        name,
        website,
        established,
        headquarters,
        business_type,
        company_overview,
        business_overview,
        key_milestones,
        annual_revenue,
        sales_markets,
        logo,
        building,
        linkedin_link,
        facebook_link,
        role
      ),
      images(
        id,
        title,
        url,
        description,
        created_at,
        updated_at
      ),
      product_categories(
        categories(
          id,
          name,
          description,
          parent_id
        )
      ),
      product_documents(
        documents(
          id,
          title,
          url,
          type_id,
          created_at,
          updated_at,
          document_types(
            id,
            name,
            description,
            category
          )
        )
      ),
      product_applications(
        applications(
          id,
          name,
          description,
          parent_id
        )
      ),
      product_features(
        features(
          id,
          name,
          description
        ),
        description
      ),
      product_certifications(
        certifications(
          id,
          name,
          description,
          applicable_categories,
          certification_body,
          certification_type
        )
      )
    `);

  if (productsError) {
    console.error('제품 데이터 가져오기 오류:', productsError);
    return {
      products: [],
      filterOptions: {
        categories: [],
        storageTypes: [],
        certifications: [], 
        applications: [],
        topologies: [],
        mountingStyles: [],
        packageTypes: [],
        voltageRange: {
          input: { min: 3.3, max: 60, step: 0.1 },
          output: { min: 1, max: 60, step: 0.1 }
        },
        currentRange: {
          output: { min: 20, max: 1500, step: 10 }
        }
      }
    };
  }

  // 필터 옵션용 고유 값들을 추출
  const categories = new Set<string>();
  const storageTypes = new Set<string>();
  const certifications = new Set<string>();
  const applications = new Set<string>();
  const topologies = new Set<string>();
  const mountingStyles = new Set<string>();
  const packageTypes = new Set<string>();

  // 제품 데이터를 스키마에 맞게 변환하고 필터 옵션도 추출합니다
  const mergedData = products.map(product => {
    try {
      // 필터 옵션 추출
      product.product_categories?.forEach(pc => {
        if (pc.categories?.name) categories.add(pc.categories.name);
      });

      if (product.storage_types?.name) {
        storageTypes.add(product.storage_types.name);
      }

      product.product_certifications?.forEach(cert => {
        if (cert.certifications?.name) certifications.add(cert.certifications.name);
      });

      product.product_applications?.forEach(app => {
        if (app.applications?.name) applications.add(app.applications.name);
      });

      const specs = LEDDriverICInfoSchema.parse(product.specifications);
      if (specs?.topology) {
        specs.topology.forEach(t => topologies.add(t));
      }
      if (specs?.mounting_type) mountingStyles.add(specs.mounting_type);
      if (specs?.package_type) packageTypes.add(specs.package_type);
      
      const ledDriverIC = {
        ...product,
        ...specs,
        categories: product.product_categories?.map(pc => ({
          category: pc.categories
        })) || [],
        certifications: product.product_certifications?.map(cert => ({
          certification: cert.certifications
        })) || [],
        features: product.product_features?.map(feat => ({
          ...feat.features,
          description: feat.description
        })) || [],
        applications: product.product_applications?.map(app => ({
          application: app.applications
        })) || [],
        documents: product.product_documents?.map(doc => ({
          document: {
            ...doc.documents,
            type: doc.documents.document_types
          }
        })) || []
      };
      return ledDriverIC;
    } catch (error) {
      console.error('데이터 파싱 오류:', error);
      console.error('문제가 발생한 제품:', product);
      return null;
    }
  }).filter(Boolean);

  return {
    products: mergedData,
    filterOptions: {
      categories: Array.from(categories),
      storageTypes: Array.from(storageTypes), 
      certifications: Array.from(certifications),
      applications: Array.from(applications),
      topologies: Array.from(topologies),
      mountingStyles: Array.from(mountingStyles),
      packageTypes: Array.from(packageTypes),
      voltageRange: {
        input: { min: 3.3, max: 60, step: 0.1 },
        output: { min: 1, max: 60, step: 0.1 }
      },
      currentRange: {
        output: { min: 20, max: 1500, step: 10 }
      }
    }
  };
};

export const data: any[] = [];
