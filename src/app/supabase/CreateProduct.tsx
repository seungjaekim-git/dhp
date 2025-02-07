"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DataSection_LEDDriverIC from "./DataSection_LEDDriverIC";
import TableDataSection from "./TableDataSetcion";
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

interface Application {
  id: number;
  name: string;
  parent_id?: number;
}

interface Category {
  id: number;
  name: string;
  parent_id?: number;
}

interface Certification {
  id: number;
  name: string;
}

interface Feature {
  id: number;
  name: string;
}

interface DocumentType {
  id: number;
  name: string;
}

interface Manufacturer {
  id: number;
  name: string;
}

interface StorageType {
  id: number;
  name: string;
}

const INITIAL_FORM_VALUES = {
  name: "",
  subtitle: "",
  manufacturer_id: "",
  part_number: "",
  specifications: {},
  tables: [], // 새로 추가된 테이블 형식 사양 데이터 (JSON)
  description: "",
  storage_type_id: "",
  categories: [] as string[],
  applications: [] as string[],
  certifications: [] as string[],
  features: [] as string[],
  documents: [] as File[],
  images: [] as File[],
  specificationSchema: "",
  newApplication: "",
  newCertification: "",
  newFeature: ""
};

export default function CreateProduct() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [countries, setCountries] = useState<Array<{id: number, name: string}>>([]);
  const [storageTypes, setStorageTypes] = useState<StorageType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

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

  const TestDocumentUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    };

    const handleUpload = async () => {
      if (!file) {
        alert('파일을 선택해주세요');
        return;
      }

      setLoading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `documents/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-documents')
          .getPublicUrl(filePath);

        setResult(`업로드 성공! URL: ${publicUrl}`);
      } catch (error) {
        console.error('업로드 에러:', error);
        setResult('업로드 실패');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>문서 업로드 테스트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              type="file" 
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
            <Button 
              onClick={handleUpload} 
              disabled={loading}
              className="w-full"
            >
              {loading ? '업로드 중...' : '테스트 업로드'}
            </Button>
            {result && (
              <div className="p-4 bg-slate-100 rounded">
                {result}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const onSubmit = async (data: any) => {
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
          data: data.features?.map((featureId: string) => ({
            product_id: product.id,
            feature_id: parseInt(featureId)
          })) || []
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
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* TestDocumentUpload 컴포넌트 등 필요 시 추가 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제품명</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>부제목</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="manufacturer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제조사</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="제조사 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {manufacturers.map((manufacturer) => (
                          <SelectItem key={manufacturer.id} value={manufacturer.id.toString()}>
                            {manufacturer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="storage_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>보관 유형</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="보관 유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {storageTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="part_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>부품 번호</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제품 사양 (JSON)</FormLabel>
                  <FormControl>
                    <Textarea 
                      value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value}
                      onChange={(e) => {
                        try {
                          const jsonValue = JSON.parse(e.target.value);
                          field.onChange(jsonValue);
                        } catch (err) {
                          field.onChange(e.target.value);
                        }
                      }}
                      placeholder="제품 사양을 JSON 형식으로 입력하세요"
                      className="font-mono min-h-[200px]"
                    />
                  </FormControl>
                  <FormLabel className="text-2xl font-bold tracking-tight text-gray-900 mt-8 mb-4">사양 미리보기</FormLabel>
                  {typeof field.value === 'object' && <DataSection_LEDDriverIC data={field.value} />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control} 
              name="tables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>테이블 데이터 (JSON)</FormLabel>
                  <FormControl>
                    <Textarea
                      value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value}
                      onChange={(e) => {
                        try {
                          const jsonValue = JSON.parse(e.target.value);
                          field.onChange(jsonValue);
                        } catch (err) {
                          field.onChange(e.target.value);
                        }
                      }}
                      placeholder="테이블 데이터를 JSON 형식으로 입력하세요"
                      className="font-mono min-h-[200px]"
                    />
                  </FormControl>
                  <FormLabel className="mt-4 mb-2">테이블 미리보기</FormLabel>
                  {typeof field.value === 'object' && <TableDataSection data={field.value} />}
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>분류 및 특성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => {
                const [filteredCategories, setFilteredCategories] = useState(categories);
                return (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((categoryId: string) => {
                        const category = categories.find(c => c.id.toString() === categoryId);
                        return category ? (
                          <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                            {category.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => {
                                field.onChange(field.value.filter((id: string) => id !== categoryId));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <Plus className="h-4 w-4" /> 카테고리 선택
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[400px] max-h-[600px] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>카테고리 선택</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Input
                              type="search"
                              placeholder="카테고리 검색..."
                              className="mb-4"
                              onChange={(e) => {
                                const searchInput = e.target.value.toLowerCase();
                                setFilteredCategories(
                                  categories.filter(category =>
                                    category.name.toLowerCase().includes(searchInput)
                                  )
                                );
                              }}
                            />
                            <div className="space-y-2">
                              {filteredCategories.map((category) => (
                                <div key={category.id} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    checked={field.value?.includes(category.id.toString())}
                                    onChange={(e) => {
                                      const categoryId = category.id.toString();
                                      if (e.target.checked) {
                                        field.onChange([...(field.value || []), categoryId]);
                                      } else {
                                        field.onChange(field.value?.filter((id: string) => id !== categoryId));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`category-${category.id}`}>{category.name}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => field.onChange([])}>
                              초기화
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </FormControl>
                </FormItem>
              )}}
            />

            <FormField
              control={form.control}
              name="applications" 
              render={({ field }) => {
                const [filteredApplications, setFilteredApplications] = useState(applications);
                return (
                <FormItem>
                  <FormLabel>응용 분야</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((appId: string) => {
                        const app = applications.find(a => a.id.toString() === appId);
                        return app ? (
                          <Badge key={appId} variant="secondary" className="flex items-center gap-1">
                            {app.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => {
                                field.onChange(field.value.filter((id: string) => id !== appId));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <Plus className="h-4 w-4" /> 응용 분야 선택
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[400px] max-h-[600px] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>응용 분야 선택</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Input
                              type="search"
                              placeholder="응용 분야 검색..."
                              className="mb-4"
                              onChange={(e) => {
                                const searchInput = e.target.value.toLowerCase();
                                setFilteredApplications(
                                  applications.filter(app =>
                                    app.name.toLowerCase().includes(searchInput)
                                  )
                                );
                              }}
                            />
                            <div className="space-y-2">
                              {filteredApplications.map((app) => (
                                <div key={app.id} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`app-${app.id}`}
                                    checked={field.value?.includes(app.id.toString())}
                                    onChange={(e) => {
                                      const appId = app.id.toString();
                                      if (e.target.checked) {
                                        field.onChange([...(field.value || []), appId]);
                                      } else {
                                        field.onChange(field.value?.filter((id: string) => id !== appId));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`app-${app.id}`}>{app.name}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => field.onChange([])}>
                              초기화
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </FormControl>
                </FormItem>
              )}}
            />

            <FormField
              control={form.control}
              name="certifications"
              render={({ field }) => {
                const [filteredCertifications, setFilteredCertifications] = useState(certifications);
                return (
                <FormItem>
                  <FormLabel>인증</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((certId: string) => {
                        const cert = certifications.find(c => c.id.toString() === certId);
                        return cert ? (
                          <Badge key={certId} variant="secondary" className="flex items-center gap-1">
                            {cert.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => {
                                field.onChange(field.value.filter((id: string) => id !== certId));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <Plus className="h-4 w-4" /> 인증 선택
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[400px] max-h-[600px] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>인증 선택</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Input
                              type="search"
                              placeholder="인증 검색..."
                              className="mb-4"
                              onChange={(e) => {
                                const searchInput = e.target.value.toLowerCase();
                                setFilteredCertifications(
                                  certifications.filter(cert =>
                                    cert.name.toLowerCase().includes(searchInput)
                                  )
                                );
                              }}
                            />
                            <div className="space-y-2">
                              {filteredCertifications.map((cert) => (
                                <div key={cert.id} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`cert-${cert.id}`}
                                    checked={field.value?.includes(cert.id.toString())}
                                    onChange={(e) => {
                                      const certId = cert.id.toString();
                                      if (e.target.checked) {
                                        field.onChange([...(field.value || []), certId]);
                                      } else {
                                        field.onChange(field.value?.filter((id: string) => id !== certId));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`cert-${cert.id}`}>{cert.name}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => field.onChange([])}>
                              초기화
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </FormControl>
                </FormItem>
              )}}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => {
                const [filteredFeatures, setFilteredFeatures] = useState(features);
                return (
                <FormItem>
                  <FormLabel>특징</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((featureId: string) => {
                        const feature = features.find(f => f.id.toString() === featureId);
                        return feature ? (
                          <Badge key={featureId} variant="secondary" className="flex items-center gap-1">
                            {feature.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => {
                                field.onChange(field.value.filter((id: string) => id !== featureId));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <Plus className="h-4 w-4" /> 특징 선택
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[400px] max-h-[600px] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>특징 선택</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Input
                              type="search"
                              placeholder="특징 검색..."
                              className="mb-4"
                              onChange={(e) => {
                                const searchInput = e.target.value.toLowerCase();
                                setFilteredFeatures(
                                  features.filter(feature =>
                                    feature.name.toLowerCase().includes(searchInput)
                                  )
                                );
                              }}
                            />
                            <div className="space-y-2">
                              {filteredFeatures.map((feature) => (
                                <div key={feature.id} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`feature-${feature.id}`}
                                    checked={field.value?.includes(feature.id.toString())}
                                    onChange={(e) => {
                                      const featureId = feature.id.toString();
                                      if (e.target.checked) {
                                        field.onChange([...(field.value || []), featureId]);
                                      } else {
                                        field.onChange(field.value?.filter((id: string) => id !== featureId));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`feature-${feature.id}`}>{feature.name}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => field.onChange([])}>
                              초기화
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </FormControl>
                </FormItem>
              )}}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>이미지 및 문서</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이미지</FormLabel>
                      <div className="space-y-2">
                        <Button
                          type="button"
                          onClick={() => {
                            field.onChange([...(field.value || []), { file: null, title: '', description: '' }]);
                          }}
                        >
                          이미지 추가
                        </Button>
                        {field.value?.map((image: any, index: number) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                const newImages = field.value.map((img: any, i: number) =>
                                  i === index ? { ...img, file, title: file?.name || '' } : img
                                );
                                field.onChange(newImages);
                              }}
                            />
                            <Input
                              type="text"
                              placeholder="이미지 제목"
                              value={image.title || ''}
                              onChange={(e) => {
                                const newImages = field.value.map((img: any, i: number) =>
                                  i === index ? { ...img, title: e.target.value } : img
                                );
                                field.onChange(newImages);
                              }}
                            />
                            <Input
                              type="text"
                              placeholder="이미지 설명"
                              value={image.description || ''}
                              onChange={(e) => {
                                const newImages = field.value.map((img: any, i: number) =>
                                  i === index ? { ...img, description: e.target.value } : img
                                );
                                field.onChange(newImages);
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const newImages = field.value.filter((_: any, i: number) => i !== index);
                                field.onChange(newImages);
                              }}
                            >
                              삭제
                            </Button>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="documents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>문서</FormLabel>
                      <div className="space-y-2">
                        <Button
                          type="button"
                          onClick={() => {
                            field.onChange([...(field.value || []), { file: null, title: '', type_id: '' }]);
                          }}
                        >
                          문서 추가
                        </Button>
                        {field.value?.map((doc: any, index: number) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                const newDocs = field.value.map((d: any, i: number) =>
                                  i === index ? { ...d, file, title: file?.name || '' } : d
                                );
                                field.onChange(newDocs);
                              }}
                            />
                            <Input
                              type="text"
                              placeholder="문서 제목"
                              value={doc.title || ''}
                              onChange={(e) => {
                                const newDocs = field.value.map((d: any, i: number) =>
                                  i === index ? { ...d, title: e.target.value } : d
                                );
                                field.onChange(newDocs);
                              }}
                            />
                            <Select
                              value={doc.type_id || ''}
                              onValueChange={(value) => {
                                const newDocs = field.value.map((d: any, i: number) =>
                                  i === index ? { ...d, type_id: value } : d
                                );
                                field.onChange(newDocs);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="문서 유형 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {documentTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id.toString()}>
                                    {type.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const newDocs = field.value.filter((_: any, i: number) => i !== index);
                                field.onChange(newDocs);
                              }}
                            >
                              삭제
                            </Button>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "처리 중..." : "제품 등록"}
            </Button>
          </form>
        </Form>
  );
}

