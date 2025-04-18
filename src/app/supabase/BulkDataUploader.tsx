'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Database, FileSpreadsheet, X, Download, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"

interface BulkDataUploaderProps {
  onUploaded?: (data: any[]) => void;
  templateFields?: string[];
  entityType: string;
  uploadFunction: (data: any) => Promise<any>;
  productType?: "leddriverIC" | "diode" | "transistor" | "ic";
}

export default function BulkDataUploader({
  onUploaded,
  templateFields = [],
  entityType,
  uploadFunction,
  productType
}: BulkDataUploaderProps) {
  const [bulkData, setBulkData] = useState<string>("");
  const [bulkUploadFormat, setBulkUploadFormat] = useState<"json" | "csv">("json");
  const [bulkUploadTemplate, setBulkUploadTemplate] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [manufacturers, setManufacturers] = useState<{id: number, name: string}[]>([]);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toast } = useToast();

  // 제조사 및 카테고리 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 제조사 로드
        const { data: manufacturersData, error: manufacturersError } = await supabase
          .from('manufacturers')
          .select('id, name')
          .order('name');
          
        if (manufacturersError) throw manufacturersError;
        setManufacturers(manufacturersData || []);
        
        // 제품 타입에 맞는 카테고리 로드
        if (productType) {
          let categoryTable = '';
          
          switch(productType) {
            case 'leddriverIC':
              categoryTable = 'led_driver_ic_categories';
              break;
            case 'diode':
              categoryTable = 'diode_categories';
              break;
            case 'transistor':
              categoryTable = 'transistor_categories';
              break;
            case 'ic':
              categoryTable = 'ic_categories';
              break;
          }
          
          if (categoryTable) {
            const { data: categoryData, error: categoryError } = await supabase
              .from(categoryTable)
              .select('id, name')
              .order('name');
              
            if (categoryError) throw categoryError;
            setCategories(categoryData || []);
          }
        }
      } catch (error) {
        console.error("데이터 로드 오류:", error);
        toast({
          title: "데이터 로드 실패",
          description: "제조사 및 카테고리 데이터를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      }
    };
    
    fetchData();
  }, [productType, toast]);

  // CSV 파일에서 데이터 추출하는 함수
  const parseCSV = (csv: string) => {
    const lines = csv.split("\n");
    const headers = lines[0].split(",").map(header => header.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const data = lines[i].split(",");
      const obj: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        const value = data[index]?.trim();
        if (value) {
          // 숫자 변환 (필요한 경우)
          if (!isNaN(Number(value)) && value !== "") {
            obj[header] = Number(value);
          } else if (value.toLowerCase() === "true") {
            obj[header] = true;
          } else if (value.toLowerCase() === "false") {
            obj[header] = false;
          } else if (value.startsWith("[") && value.endsWith("]")) {
            // 배열 처리
            try {
              obj[header] = JSON.parse(value);
            } catch {
              // 파싱 실패 시 문자열로 처리
              obj[header] = value;
            }
          } else {
            obj[header] = value;
          }
        }
      });
      
      result.push(obj);
    }
    
    return result;
  };

  // 대량 데이터 업로드 처리
  const handleBulkUpload = async () => {
    try {
      if (!bulkData.trim()) {
        toast({
          title: "데이터가 비어 있습니다",
          description: "업로드할 데이터를 입력해주세요.",
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      let parsedData = [];
      
      if (bulkUploadFormat === "json") {
        parsedData = JSON.parse(bulkData);
        if (!Array.isArray(parsedData)) {
          parsedData = [parsedData];
        }
      } else if (bulkUploadFormat === "csv") {
        parsedData = parseCSV(bulkData);
      }
      
      // 결과를 저장할 배열
      const results = [];
      const errors = [];
      
      // 각 항목을 저장
      for (const item of parsedData) {
        try {
          // 카테고리가 선택되었으면 모든 아이템에 카테고리 ID 추가
          if (selectedCategory && !item.category_id) {
            item.category_id = parseInt(selectedCategory);
          }
          
          const result = await uploadFunction(item);
          results.push(result);
        } catch (error) {
          console.error(`항목 업로드 오류:`, error);
          errors.push({ item, error });
        }
      }
      
      if (errors.length === 0) {
        toast({
          title: "대량 업로드 완료",
          description: `${results.length}개의 ${entityType} 항목이 성공적으로 업로드되었습니다.`,
        });
      } else {
        toast({
          title: `일부 항목 업로드 실패 (${errors.length}/${parsedData.length})`,
          description: "자세한 오류는 콘솔을 확인하세요.",
          variant: "destructive",
        });
      }
      
      if (onUploaded && results.length > 0) {
        onUploaded(results);
      }
      
      setIsUploading(false);
    } catch (error) {
      console.error("대량 업로드 오류:", error);
      toast({
        title: "대량 업로드 실패",
        description: "데이터 형식을 확인해주세요.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  // 템플릿 다운로드
  const downloadTemplate = () => {
    let content = "";
    const filename = `${entityType.toLowerCase().replace(/\s+/g, '_')}_template`;
    
    if (bulkUploadFormat === "json") {
      // 기본 JSON 템플릿 생성
      const template = templateFields.reduce((obj, field) => {
        obj[field] = "";
        return obj;
      }, {} as Record<string, any>);
      
      // 선택된 카테고리가 있으면 템플릿에 추가
      if (selectedCategory) {
        template['category_id'] = parseInt(selectedCategory);
      }
      
      content = JSON.stringify([template], null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
    } else if (bulkUploadFormat === "csv") {
      // CSV 템플릿 생성
      // 카테고리가 선택되었으면 템플릿 필드에 추가
      let finalFields = [...templateFields];
      if (selectedCategory && !templateFields.includes('category_id')) {
        finalFields.push('category_id');
      }
      
      content = finalFields.join(',') + '\n';
      
      // 선택된 카테고리가 있으면 기본값 행에 추가
      if (selectedCategory) {
        const values = finalFields.map(field => {
          if (field === 'category_id') return selectedCategory;
          return '';
        });
        content += values.join(',') + '\n';
      }
      
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      
      URL.revokeObjectURL(url);
    }
  };

  // CSV 템플릿 생성
  const generateTemplate = () => {
    if (bulkUploadFormat === "json") {
      // 기본 JSON 템플릿 생성
      const template = templateFields.reduce((obj, field) => {
        // 필드 타입에 따라 기본값 세팅
        if (field.includes('_id')) {
          obj[field] = 1;
        } else if (field.includes('number') || field.includes('min') || field.includes('max')) {
          obj[field] = 0;
        } else if (field.includes('is_') || field.includes('has_')) {
          obj[field] = false;
        } else if (field.includes('array') || field.includes('list') || field === 'topologies' || field === 'dimming_methods') {
          obj[field] = [];
        } else {
          obj[field] = `${field} 값`;
        }
        return obj;
      }, {} as Record<string, any>);
      
      // 선택된 카테고리가 있으면 템플릿에 추가
      if (selectedCategory) {
        template['category_id'] = parseInt(selectedCategory);
      }
      
      setBulkUploadTemplate(JSON.stringify([template], null, 2));
    } else if (bulkUploadFormat === "csv") {
      // 기본 CSV 템플릿 생성
      // 카테고리가 선택되었으면 템플릿 필드에 추가
      let finalFields = [...templateFields];
      if (selectedCategory && !templateFields.includes('category_id')) {
        finalFields.push('category_id');
      }
      
      const headerRow = finalFields.join(',');
      const valueRow = finalFields.map(field => {
        if (field === 'category_id' && selectedCategory) {
          return selectedCategory;
        } else if (field.includes('_id')) {
          return '1';
        } else if (field.includes('number') || field.includes('min') || field.includes('max')) {
          return '0';
        } else if (field.includes('is_') || field.includes('has_')) {
          return 'false';
        } else if (field.includes('array') || field.includes('list') || field === 'topologies' || field === 'dimming_methods') {
          return '[]';
        } else {
          return `${field} 값`;
        }
      }).join(',');
      
      setBulkUploadTemplate(`${headerRow}\n${valueRow}`);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-white">대량 {entityType} 데이터 업로드</CardTitle>
        <CardDescription className="text-gray-400">
          JSON, CSV 형식으로 여러 {entityType} 정보를 한 번에 업로드하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-white font-medium">카테고리 선택</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">
                선택한 카테고리는 모든 항목에 적용됩니다. 개별 항목에서 재정의할 수도 있습니다.
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-white font-medium">업로드 형식</label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={bulkUploadFormat === "json" ? "default" : "outline"}
                onClick={() => setBulkUploadFormat("json")}
                className={bulkUploadFormat === "json" 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"}
              >
                <Database className="w-4 h-4 mr-2" />
                JSON
              </Button>
              <Button
                type="button"
                variant={bulkUploadFormat === "csv" ? "default" : "outline"}
                onClick={() => setBulkUploadFormat("csv")}
                className={bulkUploadFormat === "csv" 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-white font-medium">데이터 입력</label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={downloadTemplate}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-1" />
                  템플릿 다운로드
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateTemplate}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  샘플 보기
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBulkData("")}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Textarea
              placeholder={`여기에 ${bulkUploadFormat.toUpperCase()} 형식의 데이터를 입력하세요`}
              className="min-h-[300px] bg-gray-800 border-gray-700 text-white"
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
            />
          </div>
          
          {bulkUploadTemplate && (
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-white font-medium">참고 템플릿</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBulkUploadTemplate("")}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Alert variant="default" className="bg-blue-900/20 border-blue-800">
                <AlertTitle className="text-blue-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  샘플 템플릿
                </AlertTitle>
                <AlertDescription>
                  <pre className="mt-2 whitespace-pre-wrap break-all text-xs text-blue-300 font-mono bg-gray-800 p-4 rounded border border-gray-700 overflow-auto max-h-[300px]">
                    {bulkUploadTemplate}
                  </pre>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleBulkUpload} 
          disabled={isUploading} 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isUploading ? (
            <>
              <span className="animate-spin mr-2">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              업로드 중...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              데이터 업로드
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 