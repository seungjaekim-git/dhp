'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui/command";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BasicInfoSection from './components/product/BasicInfoSection';
import SpecificationsSection from './components/product/SpecificationsSection';
import CategoriesSection from './components/product/CategoriesSection';
import MediaSection from './components/product/MediaSection';

export default function UpdateProduct() {
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [countries, setCountries] = useState<Array<{id: number, name: string}>>([]);
  const [storageTypes, setStorageTypes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [filteredCertifications, setFilteredCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const INITIAL_FORM_VALUES = {
    name: "",
    subtitle: "",
    manufacturer_id: "",
    part_number: "",
    description: "",
    storage_type_id: "",
    categories: [],
    applications: [],
    certifications: [],
    features: [],
    featureDescriptions: {},
    specifications: {},
    tables: [],
    images: [],
    documents: [],
    newApplication: "",
    newCertification: "",
    newFeature: ""
  };

  const form = useForm({
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
        documentTypesData,
        productsData
      ] = await Promise.all([
        fetchRelatedData("manufacturers"),
        fetchRelatedData("countries"),
        fetchRelatedData("storage_types"),
        fetchRelatedData("categories"),
        fetchRelatedData("applications"),
        fetchRelatedData("certifications"),
        fetchRelatedData("features"),
        fetchRelatedData("document_types"),
        fetchRelatedData("products")
      ]);

      setManufacturers(manufacturersData);
      setCountries(countriesData);
      setStorageTypes(storageTypesData);
      setCategories(categoriesData);
      setApplications(applicationsData);
      setCertifications(certificationsData);
      setFeatures(featuresData);
      setFilteredFeatures(featuresData);
      setFilteredApplications(applicationsData);
      setFilteredCertifications(certificationsData);
      setDocumentTypes(documentTypesData);
      setProducts(productsData);
    };

    fetchData();
  }, []);

  const fetchProductDetails = async (productId: number) => {
    setLoading(true);
    try {
      // 제품 기본 정보 가져오기
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      
      if (error) throw error;
      
      // 관련 데이터 가져오기
      const [
        categoriesData,
        applicationsData,
        certificationsData,
        featuresData,
        imagesData,
        documentsData
      ] = await Promise.all([
        supabase.from("product_categories").select("category_id").eq("product_id", productId),
        supabase.from("product_applications").select("application_id").eq("product_id", productId),
        supabase.from("product_certifications").select("certification_id").eq("product_id", productId),
        supabase.from("product_features").select("feature_id, description").eq("product_id", productId),
        supabase.from("images").select("*").eq("product_id", productId),
        supabase.from("product_documents")
          .select(`
            document_id,
            documents:documents(id, title, url, type_id)
          `)
          .eq("product_id", productId)
      ]);
      
      // 특징 설명 객체 생성
      const featureDescriptions: Record<string, string> = {};
      featuresData.data?.forEach((item: any) => {
        featureDescriptions[item.feature_id] = item.description || '';
      });
      
      // 문서 데이터 변환
      const documents = documentsData.data?.map((item: any) => ({
        id: item.documents.id,
        title: item.documents.title,
        url: item.documents.url,
        type_id: item.documents.type_id?.toString() || '',
        file: null
      })) || [];
      
      // 폼 데이터 설정
      form.reset({
        name: product.name,
        subtitle: product.subtitle || '',
        manufacturer_id: product.manufacturer_id?.toString() || '',
        part_number: product.part_number || '',
        description: product.description || '',
        storage_type_id: product.storage_type_id?.toString() || '',
        categories: categoriesData.data?.map((item: any) => item.category_id.toString()) || [],
        applications: applicationsData.data?.map((item: any) => item.application_id.toString()) || [],
        certifications: certificationsData.data?.map((item: any) => item.certification_id.toString()) || [],
        features: featuresData.data?.map((item: any) => item.feature_id.toString()) || [],
        featureDescriptions,
        specifications: product.specifications || {},
        tables: product.tables || [],
        images: imagesData.data?.map((image: any) => ({
          id: image.id,
          url: image.url,
          title: image.title || '',
          description: image.description || '',
          file: null
        })) || [],
        documents,
        newApplication: '',
        newCertification: '',
        newFeature: ''
      });
      
      setSelectedProduct(product);
    } catch (error) {
      console.error("제품 상세 정보 가져오기 오류:", error);
      alert("제품 정보를 가져오는 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const addApplication = async (name: string, parentId?: number) => {
    const { data: newApp, error: appError } = await supabase
      .from("applications")
      .insert([{
        name,
        parent_id: parentId
      }])
      .select()
      .single();

    if (appError) throw appError;
    setApplications([...applications, newApp]);
  };

  const onSubmit = async (data: any) => {
    if (!selectedProduct) {
      alert("수정할 제품이 선택되지 않았습니다");
      return;
    }
    
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

      // 새로운 특징 추가
      if (data.newFeature) {
        const { data: newFeat, error: featError } = await supabase
          .from('features')
          .insert([{ name: data.newFeature }])
          .select()
          .single();
          
        if (featError) throw featError;
        setFeatures([...features, newFeat]);
      }

      // 이미지 업로드 처리
      const imageUrls = await Promise.all((data.images || []).map(async (image: any) => {
        // 기존 이미지는 그대로 유지
        if (image.id && !image.file) {
          return {
            id: image.id,
            url: image.url,
            title: image.title,
            description: image.description,
            product_id: selectedProduct.id
          };
        }
        
        // 새 이미지 업로드
        if (image.file) {
          const folderPath = `${data.name}/`;
          const fileName = `${folderPath}${Date.now()}-${image.file.name}`;
          await supabase.storage.from("product-images").upload(fileName, image.file);
          const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
          return {
            url: publicUrl,
            title: image.title || image.file.name,
            description: image.description,
            product_id: selectedProduct.id
          };
        }
        
        return null;
      }));

      // 문서 업로드 처리
      const documentUrls = await Promise.all((data.documents || []).map(async (doc: any) => {
        // 기존 문서는 그대로 유지
        if (doc.id && !doc.file) {
          return {
            id: doc.id,
            title: doc.title,
            url: doc.url,
            type_id: doc.type_id || null,
            updated_at: new Date().toISOString()
          };
        }
        
        // 새 문서 업로드
        if (doc.file) {
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
        }
        
        return null;
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

      // 제품 데이터 업데이트
      const { error } = await supabase
        .from("products")
        .update({
          name: data.name,
          subtitle: data.subtitle,
          manufacturer_id: data.manufacturer_id,
          part_number: data.part_number,
          specifications: convertedSpecs,
          tables: data.tables,
          description: data.description,
          storage_type_id: data.storage_type_id,
          updated_at: new Date().toISOString()
        })
        .eq("id", selectedProduct.id);

      if (error) throw error;

      // 관계 데이터 업데이트 (카테고리, 응용 분야, 인증, 특징)
      // 기존 관계 삭제 후 새로 추가
      const relations = [
        {
          table: "product_categories",
          data: data.categories?.map((categoryId: string) => ({
            product_id: selectedProduct.id,
            category_id: parseInt(categoryId)
          })) || []
        },
        {
          table: "product_applications", 
          data: data.applications?.map((applicationId: string) => ({
            product_id: selectedProduct.id,
            application_id: parseInt(applicationId)
          })) || []
        },
        {
          table: "product_certifications",
          data: data.certifications?.map((certificationId: string) => ({
            product_id: selectedProduct.id,
            certification_id: parseInt(certificationId)
          })) || []
        },
        {
          table: "product_features",
          data: data.features?.map((featureId: string) => ({
            product_id: selectedProduct.id,
            feature_id: parseInt(featureId),
            description: data.featureDescriptions?.[featureId] || null
          })) || []
        }
      ];

      // 관계 테이블 데이터 업데이트
      for (const relation of relations) {
        // 기존 관계 삭제
        await supabase
          .from(relation.table)
          .delete()
          .eq("product_id", selectedProduct.id);
          
        // 새 관계 추가
        if (relation.data.length > 0) {
          const { error: relError } = await supabase
            .from(relation.table)
            .insert(relation.data);
          if (relError) throw relError;
        }
      }

      // 이미지 업데이트
      // 기존 이미지 삭제 후 새로 추가
      await supabase
        .from("images")
        .delete()
        .eq("product_id", selectedProduct.id);
        
      if (imageUrls.length > 0) {
        const { error: imgError } = await supabase
          .from("images")
          .insert(imageUrls.filter(Boolean));
        if (imgError) throw imgError;
      }

      // 문서 업데이트
      // 기존 문서 관계 삭제
      await supabase
        .from("product_documents")
        .delete()
        .eq("product_id", selectedProduct.id);
        
      // 새 문서 추가 및 관계 생성
      if (documentUrls.length > 0) {
        // 기존 문서 ID 추출
        const existingDocIds = documentUrls
          .filter(doc => doc && doc.id)
          .map(doc => doc.id);
          
        // 새 문서만 필터링
        const newDocs = documentUrls.filter(doc => doc && !doc.id);
        
        // 새 문서 추가
        let savedDocs = [];
        if (newDocs.length > 0) {
          const { data: newSavedDocs, error: docError } = await supabase
            .from("documents")
            .insert(newDocs)
            .select();
            
          if (docError) throw docError;
          savedDocs = newSavedDocs;
        }
        
        // 모든 문서 ID 수집 (기존 + 새로 추가된)
        const allDocIds = [...existingDocIds, ...savedDocs.map(doc => doc.id)];
        
        // product_documents 관계 생성
        const productDocumentsData = allDocIds.map(docId => ({
          product_id: selectedProduct.id,
          document_id: docId
        }));

        if (productDocumentsData.length > 0) {
          const { error: prodDocError } = await supabase
            .from("product_documents")
            .insert(productDocumentsData);
          if (prodDocError) throw prodDocError;
        }
      }

      alert("제품이 성공적으로 수정되었습니다");
      
      // 제품 목록 새로고침
      const { data: refreshedProducts } = await supabase.from("products").select("*");
      if (refreshedProducts) setProducts(refreshedProducts);
      
    } catch (error) {
      console.error("제품 수정 오류:", error);
      alert("제품 수정 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit } = form;
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>제품 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="제품 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                disabled={!searchTerm}
              >
                초기화
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {products
                .filter(product => 
                  searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
                )
                .map(product => (
                  <Card 
                    key={product.id} 
                    className={`cursor-pointer hover:bg-slate-50 ${selectedProduct?.id === product.id ? 'border-2 border-primary' : ''}`}
                    onClick={() => fetchProductDetails(product.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      {product.subtitle && (
                        <p className="text-sm text-gray-500">{product.subtitle}</p>
                      )}
                    </CardHeader>
                  </Card>
                ))
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedProduct && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>기본 정보</CardTitle>
                <Button type="submit" disabled={loading}>
                  {loading ? '저장 중...' : '저장하기'}
                </Button>
              </CardHeader>
              <CardContent>
                <BasicInfoSection 
                  form={form} 
                  manufacturers={manufacturers} 
                  storageTypes={storageTypes} 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>사양 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <SpecificationsSection form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>분류 및 특징</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoriesSection 
                  form={form} 
                  categories={categories} 
                  applications={applications} 
                  certifications={certifications} 
                  features={features}
                  filteredFeatures={filteredFeatures}
                  setFilteredFeatures={setFilteredFeatures}
                  addApplication={addApplication}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>미디어</CardTitle>
              </CardHeader>
              <CardContent>
                <MediaSection 
                  form={form} 
                  documentTypes={documentTypes} 
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? '저장 중...' : '제품 수정 완료'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
