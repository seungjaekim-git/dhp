"use client";


import { Button } from "@/components/ui/button";

import {
  Form,
} from "@/components/ui/form";
import BasicInfoSection from './components/product/BasicInfoSection';
import SpecificationsSection from './components/product/SpecificationsSection';
import CategoriesSection from './components/product/CategoriesSection';
import MediaSection from './components/product/MediaSection';
import { useProductForm } from './hooks/useProductForm';

export default function CreateProduct() {
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
    onSubmit
  } = useProductForm();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">새 제품 등록</h1>
      
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "처리 중..." : "제품 등록"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

