"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface FilterDialogProps {
  categories: FilterOption[];
  manufacturers: FilterOption[];
  applications: FilterOption[];
  activeFilters: {
    category: string[];
    manufacturer: string[];
    application: string[];
  };
  trigger?: React.ReactNode;
  defaultTab?: string;
}

export function FilterDialog({
  categories,
  manufacturers,
  applications,
  activeFilters,
  trigger,
  defaultTab = "category"
}: FilterDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  
  // 현재 선택된 필터 상태
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    activeFilters.category || []
  );
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    activeFilters.manufacturer || []
  );
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    activeFilters.application || []
  );
  
  // 선택된 필터 토글
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers(prev => 
      prev.includes(manufacturer) 
        ? prev.filter(m => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };
  
  const toggleApplication = (application: string) => {
    setSelectedApplications(prev => 
      prev.includes(application) 
        ? prev.filter(a => a !== application)
        : [...prev, application]
    );
  };
  
  // 필터 적용
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // 기존 필터 제거
    params.delete('category');
    params.delete('manufacturer');
    params.delete('application');
    
    // 새 필터 추가
    selectedCategories.forEach(category => {
      params.append('category', category);
    });
    
    selectedManufacturers.forEach(manufacturer => {
      params.append('manufacturer', manufacturer);
    });
    
    selectedApplications.forEach(application => {
      params.append('application', application);
    });
    
    // 라우터로 URL 업데이트
    router.push(`/products/list?${params.toString()}`);
    setOpen(false);
  }, [router, searchParams, selectedCategories, selectedManufacturers, selectedApplications]);
  
  // 필터 초기화
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedManufacturers([]);
    setSelectedApplications([]);
  };
  
  // 활성화된 필터 수
  const activeFilterCount = 
    selectedCategories.length + 
    selectedManufacturers.length + 
    selectedApplications.length;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="border-gray-800 text-gray-300 hover:bg-gray-800">
            <Filter className="mr-2 h-4 w-4" />
            필터
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-blue-600 text-white hover:bg-blue-700">{activeFilterCount}</Badge>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>제품 필터</DialogTitle>
          <DialogDescription className="text-gray-400">
            원하는 필터를 선택하여 제품 목록을 필터링하세요.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="w-full mt-2">
          <TabsList className="grid grid-cols-3 bg-gray-800">
            <TabsTrigger value="category">카테고리</TabsTrigger>
            <TabsTrigger value="manufacturer">제조사</TabsTrigger>
            <TabsTrigger value="application">응용 분야</TabsTrigger>
          </TabsList>
          <TabsContent value="category" className="mt-4">
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-4">
                <Input
                  placeholder="카테고리 검색..."
                  className="bg-gray-800 border-gray-700"
                />
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                        className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {category.label}
                      </Label>
                      {category.count !== undefined && (
                        <span className="text-xs text-gray-400">{category.count}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="manufacturer" className="mt-4">
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-4">
                <Input
                  placeholder="제조사 검색..."
                  className="bg-gray-800 border-gray-700"
                />
                <div className="space-y-2">
                  {manufacturers.map((manufacturer) => (
                    <div key={manufacturer.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`manufacturer-${manufacturer.id}`}
                        checked={selectedManufacturers.includes(manufacturer.id)}
                        onCheckedChange={() => toggleManufacturer(manufacturer.id)}
                        className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <Label
                        htmlFor={`manufacturer-${manufacturer.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {manufacturer.label}
                      </Label>
                      {manufacturer.count !== undefined && (
                        <span className="text-xs text-gray-400">{manufacturer.count}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="application" className="mt-4">
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-4">
                <Input
                  placeholder="응용 분야 검색..."
                  className="bg-gray-800 border-gray-700"
                />
                <div className="space-y-2">
                  {applications.map((application) => (
                    <div key={application.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`application-${application.id}`}
                        checked={selectedApplications.includes(application.id)}
                        onCheckedChange={() => toggleApplication(application.id)}
                        className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <Label
                        htmlFor={`application-${application.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {application.label}
                      </Label>
                      {application.count !== undefined && (
                        <span className="text-xs text-gray-400">{application.count}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-2 bg-gray-800" />
        
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {selectedCategories.map(category => {
              const categoryObj = categories.find(c => c.id === category);
              return (
                <Badge 
                  key={`selected-category-${category}`}
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
                  onClick={() => toggleCategory(category)}
                >
                  {categoryObj?.label || category}
                  <span className="ml-1 cursor-pointer">×</span>
                </Badge>
              );
            })}
            
            {selectedManufacturers.map(manufacturer => {
              const manufacturerObj = manufacturers.find(m => m.id === manufacturer);
              return (
                <Badge 
                  key={`selected-manufacturer-${manufacturer}`}
                  variant="secondary"
                  className="bg-green-500/10 text-green-300 hover:bg-green-500/20"
                  onClick={() => toggleManufacturer(manufacturer)}
                >
                  {manufacturerObj?.label || manufacturer}
                  <span className="ml-1 cursor-pointer">×</span>
                </Badge>
              );
            })}
            
            {selectedApplications.map(application => {
              const applicationObj = applications.find(a => a.id === application);
              return (
                <Badge 
                  key={`selected-application-${application}`}
                  variant="secondary"
                  className="bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                  onClick={() => toggleApplication(application)}
                >
                  {applicationObj?.label || application}
                  <span className="ml-1 cursor-pointer">×</span>
                </Badge>
              );
            })}
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="secondary"
            onClick={resetFilters}
            className="bg-gray-800 text-gray-300 hover:bg-gray-700"
          >
            초기화
          </Button>
          <Button type="submit" onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700">
            필터 적용
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 