"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Plus, Trash2, Cpu, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";

import BasicInfoSection from './components/product/BasicInfoSection';
import SpecificationsSection from './components/product/SpecificationsSection';
import CategoriesSection from './components/product/CategoriesSection';
import MediaSection from './components/product/MediaSection';
import { useProductForm } from './hooks/useProductForm';
import { FormValues, INITIAL_FORM_VALUES } from './types/product';

export default function CreateProduct() {
  const [productForms, setProductForms] = useState<FormValues[]>([{...INITIAL_FORM_VALUES}]);
  const [activeTab, setActiveTab] = useState<string>("0");
  
  const { 
    form, 
    loading, 
    manufacturers, 
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
    saveMultipleProducts
  } = useProductForm();

  const addNewProduct = () => {
    const newProductForms = [...productForms, {...INITIAL_FORM_VALUES}];
    setProductForms(newProductForms);
    setActiveTab((newProductForms.length - 1).toString());
  };

  const removeProduct = (index: number) => {
    if (productForms.length === 1) {
      return; // 최소 하나의 제품 폼은 유지
    }
    
    const newForms = [...productForms];
    newForms.splice(index, 1);
    setProductForms(newForms);
    
    // 제거된 탭이 현재 활성화된 탭이면, 첫 번째 탭으로 이동
    if (activeTab === index.toString()) {
      setActiveTab("0");
    } else if (parseInt(activeTab) > index) {
      // 제거된 탭 이후의 탭을 보고 있었다면, 탭 번호 조정
      setActiveTab((parseInt(activeTab) - 1).toString());
    }
  };

  const updateProductForm = (index: number, data: Partial<FormValues>) => {
    const newForms = [...productForms];
    newForms[index] = { ...newForms[index], ...data };
    setProductForms(newForms);
  };

  const handleFormSubmit = async () => {
    const formData = form.getValues();
    
    // 현재 활성화된 폼의 데이터 업데이트
    const currentTabIndex = parseInt(activeTab);
    const updatedForms = [...productForms];
    updatedForms[currentTabIndex] = formData;
    setProductForms(updatedForms);
    
    try {
      await saveMultipleProducts(updatedForms);
      // 성공 시 모든 폼 초기화
      setProductForms([{...INITIAL_FORM_VALUES}]);
      setActiveTab("0");
      form.reset(INITIAL_FORM_VALUES);
    } catch (error) {
      console.error("제품 등록 실패:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-white">
      <Toaster />
      <div className="flex items-center justify-between gap-3 mb-8 pb-5 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900/60 p-2 rounded-lg">
            <Cpu className="h-8 w-8 text-blue-300" />
          </div>
          <h1 className="text-3xl font-bold text-white">새 제품 등록</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={addNewProduct}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="h-4 w-4" /> 제품 추가
          </Button>
          
          <Button 
            type="button" 
            onClick={handleFormSubmit}
            disabled={loading} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="h-4 w-4" />
            {loading ? "처리 중..." : "모든 제품 등록"}
          </Button>
        </div>
      </div>
      
      {productForms.length > 1 && (
        <Alert className="mb-6 bg-blue-900/20 border-blue-800 text-blue-100">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            현재 {productForms.length}개의 제품을 등록할 수 있습니다. 각 탭에서 제품 정보를 입력하고 한 번에 모두 등록하세요.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-gray-800 p-1 text-white">
          {productForms.map((formData, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="flex items-center gap-2 data-[state=active]:bg-blue-900 data-[state=active]:text-white text-gray-300"
            >
              제품 {index + 1} {formData.name ? `: ${formData.name}` : ''}
              {productForms.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProduct(index);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {productForms.map((formData, index) => (
          <TabsContent key={index} value={index.toString()} className="mt-0">
            <Card className="border border-gray-700 bg-gray-900/50 shadow-xl mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-blue-300" /> 제품 {index + 1} 정보
                </h2>
                
                <Form {...form}>
                  <form className="space-y-10" onSubmit={(e) => {
                    e.preventDefault();
                    updateProductForm(index, form.getValues());
                  }}>
                    <BasicInfoSection 
                      form={form} 
                      manufacturers={manufacturers} 
                      storageTypes={storageTypes} 
                    />
                    
                    <SpecificationsSection form={form} />
                    
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
                    
                    <MediaSection 
                      form={form} 
                      documentTypes={documentTypes} 
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="pt-6 border-t border-gray-700 mt-6">
        <Button 
          type="button"
          onClick={handleFormSubmit}
          disabled={loading} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-medium"
        >
          {loading ? "처리 중..." : `${productForms.length}개 제품 등록하기`}
        </Button>
      </div>
    </div>
  );
}