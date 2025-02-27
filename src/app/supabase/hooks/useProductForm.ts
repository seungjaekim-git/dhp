import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase-client';
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

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // 새로운 응용 분야 추가
      if (data.newApplication) {
        const { data: newApp, error: appError } = await supabase
          .from('applications')
          .insert([{ name: data.newApplication }])
          .select()
          .single();
          
        if (appError) throw appError;
        setApplications([...applications, newApp]);
      }

      // 새로운 인증 추가
      if (data.newCertification) {
        const { data: newCert, error: certError } = await supabase
          .from('certifications')
          .insert([{ name: data.newCertification }])
          .select()
          .single();
          
        if (certError) throw certError;
        setCertifications([...certifications, newCert]);
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
        setFeatures([...features, newFeat]);
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

      // LEDDriverIC 스키마의 단위 기준으로 specifications 데이터 변환
      const convert = require('convert-units');
      let convertedSpecs = { ...data.specifications };
      
      if (convertedSpecs.input_voltage) {
        ['min', 'max', 'typ'].forEach(key => {
          if (convertedSpecs.input_voltage[key]) {
            convertedSpecs.input_voltage[key] = convert(convertedSpecs.input_voltage[key])
              .from(convertedSpecs.input_voltage.unit)
              .to('V');
          }
        });
        convertedSpecs.input_voltage.unit = 'V';
      }

      if (convertedSpecs.output_current) {
        ['min', 'max', 'typ'].forEach(key => {
          if (convertedSpecs.output_current[key]) {
            convertedSpecs.output_current[key] = convert(convertedSpecs.output_current[key])
              .from(convertedSpecs.output_current.unit)
              .to('mA');
          }
        });
        convertedSpecs.output_current.unit = 'mA';
      }

      if (convertedSpecs.switching_frequency) {
        ['min', 'max', 'typ'].forEach(key => {
          if (convertedSpecs.switching_frequency[key]) {
            convertedSpecs.switching_frequency[key] = convert(convertedSpecs.switching_frequency[key])
              .from(convertedSpecs.switching_frequency.unit)
              .to('kHz');
          }
        });
        convertedSpecs.switching_frequency.unit = 'kHz';
      }

      // 제품 데이터 저장 (새로운 'tables' 필드 포함)
      const { data: product, error } = await supabase
        .from("products")
        .insert([{
          name: data.name,
          subtitle: data.subtitle,
          manufacturer_id: data.manufacturer_id,
          part_number: data.part_number,
          specifications: convertedSpecs,
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
          data: [
            // 기존 특징들
            ...(data.features?.map((featureId: string) => ({
              product_id: product.id,
              feature_id: parseInt(featureId),
              description: data.featureDescriptions?.[featureId] || null
            })) || []),
            // 새로 추가된 특징 (있는 경우)
            ...(newFeatureId ? [{
              product_id: product.id,
              feature_id: newFeatureId,
              description: data.newFeatureDescription || null
            }] : [])
          ]
        }
      ];

      // 이미지 저장
      if (imageUrls.length > 0) {
        const { error: imgError } = await supabase
          .from("images")
          .insert(imageUrls.filter(Boolean).map(img => ({
            ...img,
            product_id: product.id,
            updated_at: new Date().toISOString()
          })));
        if (imgError) throw imgError;
      }

      // 문서 저장 및 product_documents 관계 생성
      if (documentUrls.length > 0) {
        const { data: savedDocs, error: docError } = await supabase
          .from("documents")
          .insert(documentUrls.filter(Boolean))
          .select();
          
        if (docError) throw docError;

        const productDocumentsData = savedDocs.map(doc => ({
          product_id: product.id,
          document_id: doc.id
        }));

        const { error: prodDocError } = await supabase
          .from("product_documents")
          .insert(productDocumentsData);
        if (prodDocError) throw prodDocError;
      }

      // 관계 테이블에 데이터 저장
      for (const relation of relations) {
        if (relation.data.length > 0) {
          const { error: relError } = await supabase
            .from(relation.table)
            .insert(relation.data);
          if (relError) throw relError;
        }
      }

      alert("제품이 성공적으로 등록되었습니다");
      form.reset();
    } catch (error) {
      console.error("제품 생성 오류:", error);
      alert("제품 등록 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit } = form;

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
    handleSubmit,
    onSubmit,
    setFeatures
  };
} 