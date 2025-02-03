"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
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
import { Checkbox } from "@/components/ui/checkbox";
import * as Schema from "./Schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


const INITIAL_FORM_VALUES = {
  name: "",
  subtitle: "",
  manufacturer_id: "",
  part_number: "",
  specifications: {},
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
  const [manufacturers, setManufacturers] = useState<Array<{id: number, name: string}>>([]);
  const [countries, setCountries] = useState<Array<{id: number, name: string}>>([]);
  const [storageTypes, setStorageTypes] = useState<Array<{id: number, name: string}>>([]);
  const [categories, setCategories] = useState<Array<{id: number, name: string, parent_id?: number}>>([]);
  const [applications, setApplications] = useState<Array<{id: number, name: string}>>([]);
  const [certifications, setCertifications] = useState<Array<{id: number, name: string}>>([]);
  const [features, setFeatures] = useState<Array<{id: number, name: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<Array<{id: number, name: string}>>([]);

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
    // 현재 최대 ID 값 조회
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
  }

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
      // 새로운 응용분야 추가
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
        
        // 제품 이름으로 폴더 경로 생성
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

        // 제품 이름으로 폴더 경로 생성
        const folderPath = `${data.name}/`;
        const fileName = `${folderPath}${Date.now()}-${doc.file.name}`;

        await supabase.storage.from("product-documents").upload(fileName, doc.file);
        const { data: { publicUrl } } = supabase.storage.from("product-documents").getPublicUrl(fileName);
        
        // documents 테이블 스키마에 맞게 데이터 구조 수정
        return {
          title: doc.title || doc.file.name,
          url: publicUrl,
          type_id: doc.type_id || null, // document_types 테이블의 FK
          updated_at: new Date().toISOString()
        };
      }));

      // 제품 데이터 저장
      const { data: product, error } = await supabase
        .from("products")
        .insert([{
          name: data.name,
          subtitle: data.subtitle,
          manufacturer_id: data.manufacturer_id,
          part_number: data.part_number,
          specifications: data.specifications,
          description: data.description,
          storage_type_id: data.storage_type_id,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // 관계 데이터 저장
      const relations = [
        {
          table: "_ProductCategories",
          data: data.categories?.map((categoryId: string) => ({
            product_id: product.id,
            category_id: parseInt(categoryId)
          })) || []
        },
        {
          table: "_ProductApplications", 
          data: data.applications?.map((applicationId: string) => ({
            product_id: product.id,
            application_id: parseInt(applicationId)
          })) || []
        },
        {
          table: "_ProductCertifications",
          data: data.certifications?.map((certificationId: string) => ({
            product_id: product.id,
            certification_id: parseInt(certificationId)
          })) || []
        },
        {
          table: "_ProductFeatures",
          data: data.features?.map((featureId: string) => ({
            product_id: product.id,
            feature_id: parseInt(featureId)
          })) || []
        }
      ];

      // 이미지와 문서는 직접 해당 테이블에 저장
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

      // 문서 데이터 저장 및 product_documents 관계 테이블 생성
      if (documentUrls.length > 0) {
        // 먼저 documents 테이블에 문서 정보 저장
        const { data: savedDocs, error: docError } = await supabase
          .from("documents")
          .insert(documentUrls.filter(Boolean))
          .select();
          
        if (docError) throw docError;

        // product_documents 관계 테이블에 연결 정보 저장
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
        <TestDocumentUpload />
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
                  <FormLabel>제품 사양</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="JSON 형식으로 사양을 입력하세요"
                      className="h-[400px] font-mono"
                      onChange={(e) => {
                        try {
                          const parsedValue = JSON.parse(e.target.value);
                          field.onChange(parsedValue);
                        } catch {
                          field.onChange(e.target.value);
                        }
                      }}
                      value={typeof field.value === 'object' ? 
                        JSON.stringify(field.value, null, 2) : 
                        field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    올바른 JSON 형식으로 입력해주세요
                  </FormDescription>
                  <FormMessage />
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((value) => {
                      const category = categories.find(c => c.id.toString() === value);
                      return (
                        <Button
                          key={value}
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            field.onChange(field.value.filter(v => v !== value));
                          }}
                        >
                          {category?.name} ✕
                        </Button>
                      );
                    })}
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {field.value.length > 0 ? (
                          `${field.value.length}개 선택됨`
                        ) : (
                          "카테고리 선택..."
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="카테고리 검색..." />
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-y-auto">
                          {categories.map(cat => {
                            const hasChildren = categories.some(c => c.parent_id === cat.id);
                            const isChild = cat.parent_id !== null;
                            return !isChild && (
                              <>
                                <CommandItem
                                  key={cat.id}
                                  onSelect={() => {
                                    const value = cat.id.toString();
                                    const newSelected = field.value.includes(value)
                                      ? field.value.filter(v => v !== value)
                                      : [...field.value, value];
                                    field.onChange(newSelected);
                                  }}
                                >
                                  <Checkbox
                                    checked={field.value.includes(cat.id.toString())}
                                    className="mr-2"
                                  />
                                  {cat.name}
                                </CommandItem>
                                {hasChildren && (
                                  <div className="ml-4">
                                    {categories
                                      .filter(child => child.parent_id === cat.id)
                                      .map(child => {
                                        const hasGrandChildren = categories.some(c => c.parent_id === child.id);
                                        return (
                                          <>
                                            <CommandItem
                                              key={child.id}
                                              onSelect={() => {
                                                const value = child.id.toString();
                                                const newSelected = field.value.includes(value)
                                                  ? field.value.filter(v => v !== value)
                                                  : [...field.value, value];
                                                field.onChange(newSelected);
                                              }}
                                            >
                                              <Checkbox
                                                checked={field.value.includes(child.id.toString())}
                                                className="mr-2"
                                              />
                                              {child.name}
                                            </CommandItem>
                                            {hasGrandChildren && (
                                              <div className="ml-4">
                                                {categories
                                                  .filter(grandChild => grandChild.parent_id === child.id)
                                                  .map(grandChild => {
                                                    const hasGreatGrandChildren = categories.some(c => c.parent_id === grandChild.id);
                                                    return (
                                                      <>
                                                        <CommandItem
                                                          key={grandChild.id}
                                                          onSelect={() => {
                                                            const value = grandChild.id.toString();
                                                            const newSelected = field.value.includes(value)
                                                              ? field.value.filter(v => v !== value)
                                                              : [...field.value, value];
                                                            field.onChange(newSelected);
                                                          }}
                                                        >
                                                          <Checkbox
                                                            checked={field.value.includes(grandChild.id.toString())}
                                                            className="mr-2"
                                                          />
                                                          {grandChild.name}
                                                        </CommandItem>
                                                        {hasGreatGrandChildren && (
                                                          <div className="ml-4">
                                                            {categories
                                                              .filter(greatGrandChild => greatGrandChild.parent_id === grandChild.id)
                                                              .map(greatGrandChild => (
                                                                <CommandItem
                                                                  key={greatGrandChild.id}
                                                                  onSelect={() => {
                                                                    const value = greatGrandChild.id.toString();
                                                                    const newSelected = field.value.includes(value)
                                                                      ? field.value.filter(v => v !== value)
                                                                      : [...field.value, value];
                                                                    field.onChange(newSelected);
                                                                  }}
                                                                >
                                                                  <Checkbox
                                                                    checked={field.value.includes(greatGrandChild.id.toString())}
                                                                    className="mr-2"
                                                                  />
                                                                  {greatGrandChild.name}
                                                                </CommandItem>
                                                              ))}
                                                          </div>
                                                        )}
                                                      </>
                                                    );
                                                  })}
                                              </div>
                                            )}
                                          </>
                                        );
                                      })}
                                  </div>
                                )}
                              </>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>응용 분야</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((value) => {
                      const application = applications.find(a => a.id.toString() === value);
                      return (
                        <Button
                          key={value}
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            field.onChange(field.value.filter(v => v !== value));
                          }}
                        >
                          {application?.name} ✕
                        </Button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="newApplication"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="새로운 최상위 응용 분야 입력" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="button"
                      onClick={() => {
                        form.setValue('newApplication', '');
                      }}
                    >
                      추가
                    </Button>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-2">
                        {field.value.length > 0 ? (
                          `${field.value.length}개 선택됨`
                        ) : (
                          "응용 분야 선택..."
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="응용 분야 검색..." />
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-y-auto">
                          {/* 1단계: 최상위 응용분야 */}
                          {applications
                            .filter(app => !app.parent_id)
                            .map(app => (
                              <>
                                <CommandItem
                                  key={app.id}
                                  onSelect={() => {
                                    const value = app.id.toString();
                                    const newSelected = field.value.includes(value)
                                      ? field.value.filter(v => v !== value)
                                      : [...field.value, value];
                                    field.onChange(newSelected);
                                  }}
                                >
                                  <Checkbox
                                    checked={field.value.includes(app.id.toString())}
                                    className="mr-2"
                                  />
                                  {app.name}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      const newApp = prompt("새로운 하위 응용분야 이름을 입력하세요");
                                      if (newApp) {
                                        try {
                                          const exists = applications.some(a => a.name === newApp);
                                          if (exists) {
                                            alert('이미 존재하는 응용분야입니다');
                                            return;
                                          }
                                          await addApplication(newApp, app.id);
                                        } catch (error) {
                                          console.error('하위 응용분야 추가 오류:', error);
                                          alert('하위 응용분야 추가 중 오류가 발생했습니다');
                                        }
                                      }
                                    }}
                                  >
                                    + 하위 추가
                                  </Button>
                                </CommandItem>
                                {/* 2단계: 중간 응용분야 */}
                                <div className="ml-4">
                                  {applications
                                    .filter(child => child.parent_id === app.id)
                                    .map(child => (
                                      <>
                                        <CommandItem
                                          key={child.id}
                                          onSelect={() => {
                                            const value = child.id.toString();
                                            const newSelected = field.value.includes(value)
                                              ? field.value.filter(v => v !== value)
                                              : [...field.value, value];
                                            field.onChange(newSelected);
                                          }}
                                        >
                                          <Checkbox
                                            checked={field.value.includes(child.id.toString())}
                                            className="mr-2"
                                          />
                                          {child.name}
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="ml-2"
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              const newApp = prompt("새로운 하위 응용분야 이름을 입력하세요");
                                              if (newApp) {
                                                try {
                                                  const exists = applications.some(a => a.name === newApp);
                                                  if (exists) {
                                                    alert('이미 존재하는 응용분야입니다');
                                                    return;
                                                  }
                                                  await addApplication(newApp, child.id);
                                                } catch (error) {
                                                  console.error('하위 응용분야 추가 오류:', error);
                                                  alert('하위 응용분야 추가 중 오류가 발생했습니다');
                                                }
                                              }
                                            }}
                                          >
                                            + 하위 추가
                                          </Button>
                                        </CommandItem>
                                        {/* 3단계: 최하위 응용분야 */}
                                        <div className="ml-4">
                                          {applications
                                            .filter(grandChild => grandChild.parent_id === child.id)
                                            .map(grandChild => (
                                              <CommandItem
                                                key={grandChild.id}
                                                onSelect={() => {
                                                  const value = grandChild.id.toString();
                                                  const newSelected = field.value.includes(value)
                                                    ? field.value.filter(v => v !== value)
                                                    : [...field.value, value];
                                                  field.onChange(newSelected);
                                                }}
                                              >
                                                <Checkbox
                                                  checked={field.value.includes(grandChild.id.toString())}
                                                  className="mr-2"
                                                />
                                                {grandChild.name}
                                              </CommandItem>
                                            ))}
                                        </div>
                                      </>
                                    ))}
                                </div>
                              </>
                            ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>인증</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((value) => {
                      const certification = certifications.find(c => c.id.toString() === value);
                      return (
                        <Button
                          key={value}
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            field.onChange(field.value.filter(v => v !== value));
                          }}
                        >
                          {certification?.name} ✕
                        </Button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="newCertification"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="새로운 인증 입력" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="button"
                      onClick={() => {
                        form.setValue('newCertification', '');
                      }}
                    >
                      추가
                    </Button>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-2">
                        {field.value.length > 0 ? (
                          `${field.value.length}개 선택됨`
                        ) : (
                          "인증 선택..."
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="인증 검색..." />
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-y-auto">
                          {certifications.map(cert => (
                            <CommandItem
                              key={cert.id}
                              onSelect={() => {
                                const value = cert.id.toString();
                                const newSelected = field.value.includes(value)
                                  ? field.value.filter(v => v !== value)
                                  : [...field.value, value];
                                field.onChange(newSelected);
                              }}
                            >
                              <Checkbox
                                checked={field.value.includes(cert.id.toString())}
                                className="mr-2"
                              />
                              {cert.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>특징</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((value) => {
                      const feature = features.find(f => f.id.toString() === value);
                      return (
                        <Button
                          key={value}
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            field.onChange(field.value.filter(v => v !== value));
                          }}
                        >
                          {feature?.name} ✕
                        </Button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="newFeature"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="새로운 특징 입력" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="button"
                      onClick={() => {
                        form.setValue('newFeature', '');
                      }}
                    >
                      추가
                    </Button>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-2">
                        {field.value.length > 0 ? (
                          `${field.value.length}개 선택됨`
                        ) : (
                          "특징 선택..."
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="특징 검색..." />
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-y-auto">
                          {features.map((feature) => (
                            <CommandItem
                              key={feature.id}
                              onSelect={() => {
                                const value = feature.id.toString();
                                const newSelected = field.value.includes(value)
                                  ? field.value.filter(v => v !== value)
                                  : [...field.value, value];
                                field.onChange(newSelected);
                              }}
                            >
                              <Checkbox
                                checked={field.value.includes(feature.id.toString())}
                                className="mr-2"
                              />
                              {feature.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />  
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
        </CardContent>
      </Card>
      </form>
      </Form>

  
  );

  
}
