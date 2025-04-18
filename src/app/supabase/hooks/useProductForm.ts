import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';
import { 
  INITIAL_FORM_VALUES, 
  FormValues, 
  Manufacturer, 
  Country, 
  StorageType,
  Category,
  Application,
  Certification,
  Feature,
  DocumentType
} from '../types/product';

export function useProductForm() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [storageTypes, setStorageTypes] = useState<StorageType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [productForms, setProductForms] = useState<FormValues[]>([INITIAL_FORM_VALUES]);

  const form = useForm<FormValues>({
    defaultValues: INITIAL_FORM_VALUES
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchRelatedData = async (table: string) => {
        const { data, error } = await supabase
          .from(table)
          .select("*");
        if (error) console.error(`Error fetching ${table}:`, error);
        return data || [];
      };

      const [
        manufacturersData,
        countriesData,
        storageTypesData,
        categoriesData,
        applicationsData,
        certificationsData,
        featuresData,
        documentTypesData
      ] = await Promise.all([
        fetchRelatedData("manufacturers"),
        fetchRelatedData("countries"),
        fetchRelatedData("storage_types"),
        fetchRelatedData("categories"),
        fetchRelatedData("applications"),
        fetchRelatedData("certifications"),
        fetchRelatedData("features"),
        fetchRelatedData("document_types")
      ]);

      setManufacturers(manufacturersData);
      setCountries(countriesData);
      setStorageTypes(storageTypesData);
      setCategories(categoriesData);
      setApplications(applicationsData);
      setCertifications(certificationsData);
      setFeatures(featuresData);
      setFilteredFeatures(featuresData);
      setDocumentTypes(documentTypesData);
    };

    fetchData();
  }, []);

  const addApplication = async (name: string, parentId?: number) => {
    const { data: maxIdResult } = await supabase
      .from("applications")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    const nextId = (maxIdResult?.id || 0) + 1;

    const { data: newApp, error: appError } = await supabase
      .from("applications")
      .insert([{
        id: nextId,
        name,
        parent_id: parentId
      }])
      .select()
      .single();

    if (appError) throw appError;
    setApplications([...applications, newApp]);
  };

  // 단일 제품 저장 함수 (여러 제품을 병렬로 처리하기 위해 분리)
  const saveProduct = async (data: FormValues, index: number): Promise<{ success: boolean; productId?: number; error?: any }> => {
    try {
      // 새로운 응용 분야 추가
      if (data.newApplication) {
        const { data: newApp, error: appError } = await supabase
          .from('applications')
          .insert([{ name: data.newApplication }])
          .select()
          .single();
          
        if (appError) throw appError;
        setApplications(prevApps => [...prevApps, newApp]);
      }

      // 새로운 인증 추가
      if (data.newCertification) {
        const { data: newCert, error: certError } = await supabase
          .from('certifications')
          .insert([{ name: data.newCertification }])
          .select()
          .single();
          
        if (certError) throw certError;
        setCertifications(prevCerts => [...prevCerts, newCert]);
      }

      // 새로운 특징 추가 (name만 features 테이블에 저장)
      let newFeatureId;
      if (data.newFeature) {
        const { data: newFeat, error: featError } = await supabase
          .from('features')
          .insert([{ name: data.newFeature }])
          .select()
          .single();
          
        if (featError) throw featError;
        newFeatureId = newFeat.id;
        setFeatures(prevFeats => [...prevFeats, newFeat]);
      }

      // 이미지 업로드 처리
      const imageUrls = await Promise.all((data.images || []).map(async (image: any) => {
        if (!image.file) return null;
        const folderPath = `${data.name}/`;
        const fileName = `${folderPath}${Date.now()}-${image.file.name}`;
        await supabase.storage.from("product-images").upload(fileName, image.file);
        const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
        return {
          url: publicUrl,
          title: image.title || image.file.name,
          description: image.description
        };
      }));

      // 문서 업로드 처리
      const documentUrls = await Promise.all((data.documents || []).map(async (doc: any) => {
        if (!doc.file) return null;
        const folderPath = `${data.name}/`;
        const fileName = `${folderPath}${Date.now()}-${doc.file.name}`;
        await supabase.storage.from("product-documents").upload(fileName, doc.file);
        const { data: { publicUrl } } = supabase.storage.from("product-documents").getPublicUrl(fileName);
        return {
          title: doc.title || doc.file.name,
          url: publicUrl,
          type_id: doc.type_id || null,
          updated_at: new Date().toISOString()
        };
      }));

      // 제품 데이터 저장 (새로운 'tables' 필드 포함)
      const { data: product, error } = await supabase
        .from("products")
        .insert([{
          name: data.name,
          subtitle: data.subtitle,
          manufacturer_id: data.manufacturer_id,
          part_number: data.part_number,
          specifications: data.specifications,
          tables: data.tables,
          description: data.description,
          storage_type_id: data.storage_type_id,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // 관계 데이터 저장 (카테고리, 응용 분야, 인증, 특징)
      const relations = [
        {
          table: "product_categories",
          data: data.categories?.map((categoryId: string) => ({
            product_id: product.id,
            category_id: parseInt(categoryId)
          })) || []
        },
        {
          table: "product_applications", 
          data: data.applications?.map((applicationId: string) => ({
            product_id: product.id,
            application_id: parseInt(applicationId)
          })) || []
        },
        {
          table: "product_certifications",
          data: data.certifications?.map((certificationId: string) => ({
            product_id: product.id,
            certification_id: parseInt(certificationId)
          })) || []
        },
        {
          table: "product_features",
          data: data.features?.map((featureId: string) => ({
            product_id: product.id,
            feature_id: parseInt(featureId),
            description: (data.feature_descriptions || {})[featureId]
          })) || []
        }
      ];

      // 관계 데이터 병렬 저장
      const relationSaves = relations.map(async rel => {
        if (rel.data.length === 0) return;
        const { error } = await supabase.from(rel.table).insert(rel.data);
        if (error) throw error;
      });

      // 이미지 및 문서 정보 저장
      const media = [
        {
          table: "product_images",
          data: imageUrls.filter(Boolean).map((img: any) => ({
            product_id: product.id,
            url: img.url,
            title: img.title,
            description: img.description
          }))
        },
        {
          table: "product_documents",
          data: documentUrls.filter(Boolean).map((doc: any) => ({
            product_id: product.id,
            document_id: doc.id || null,
            title: doc.title,
            url: doc.url,
            type_id: doc.type_id
          }))
        }
      ];

      // 미디어 데이터 병렬 저장
      const mediaSaves = media.map(async m => {
        if (m.data.length === 0) return;
        const { error } = await supabase.from(m.table).insert(m.data);
        if (error) throw error;
      });

      // 모든 작업이 완료될 때까지 대기
      await Promise.all([...relationSaves, ...mediaSaves]);

      return { success: true, productId: product.id };
    } catch (error) {
      console.error(`제품 ${index + 1} 저장 오류:`, error);
      return { success: false, error };
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      // 현재는 단일 제품 폼만 처리하지만, 나중에 여러 제품을 처리할 수 있도록 확장
      const results = await saveProduct(data, 0);
      
      if (results.success) {
        toast.success("제품이 성공적으로 등록되었습니다.");
        form.reset(INITIAL_FORM_VALUES);
      } else {
        toast.error("제품 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("제품 등록 중 오류 발생:", error);
      toast.error("제품 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 여러 제품 동시 저장
  const saveMultipleProducts = async (productsData: FormValues[]) => {
    setLoading(true);
    
    const results = await Promise.all(
      productsData.map((productData, index) => saveProduct(productData, index))
    );
    
    // 결과 처리
    const successCount = results.filter(r => r.success).length;
    const failedCount = results.length - successCount;
    
    if (successCount === results.length) {
      toast.success(`${successCount}개 제품이 성공적으로 등록되었습니다.`);
      form.reset(INITIAL_FORM_VALUES);
    } else if (successCount > 0) {
      toast.success(`${successCount}개 제품이 등록되었지만, ${failedCount}개는 실패했습니다.`);
    } else {
      toast.error("모든 제품 등록에 실패했습니다.");
    }
    
    setLoading(false);
    return { successCount, failedCount };
  };

  return {
    form,
    loading,
    manufacturers,
    countries,
    storageTypes,
    categories,
    applications,
    certifications,
    features,
    filteredFeatures,
    documentTypes,
    setFilteredFeatures,
    addApplication,
    handleSubmit: form.handleSubmit,
    onSubmit,
    saveMultipleProducts,
    productForms,
    setProductForms
  };
} 