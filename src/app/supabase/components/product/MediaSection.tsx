import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Upload, File, Image, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues, DocumentType } from "../../types/product";

interface MediaSectionProps {
  form: UseFormReturn<FormValues>;
  documentTypes: DocumentType[];
}

export default function MediaSection({ form, documentTypes }: MediaSectionProps) {
  const [imagePreviewUrls, setImagePreviewUrls] = useState<Record<string, string>>({});
  const [documentFileNames, setDocumentFileNames] = useState<Record<string, string>>({});

  // FormField getter를 위한 함수
  const getFormFieldValue = (name: string) => {
    return form.getValues(name as any) || [];
  };
  
  // FormField setter를 위한 함수
  const setFormFieldValue = (name: string, value: any) => {
    form.setValue(name as any, value, { shouldValidate: true });
  };

  return (
    <Card className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="bg-gray-900/70 border-b border-gray-700">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-blue-300">
          <FileText className="h-5 w-5" />
          미디어
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pt-6 text-white">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-white font-medium">이미지</FormLabel>
              <FormControl>
                <div className="space-y-6">
                  {field.value?.map((image: any, index: number) => (
                    <div key={index} className="p-5 border border-gray-700 rounded-lg bg-gray-900/30 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                        <h4 className="font-medium text-blue-300 flex items-center gap-2">
                          <Image className="h-4 w-4" />
                          이미지 {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-gray-300 hover:text-red-400 hover:bg-red-900/20"
                          onClick={() => {
                            const newImages = [...field.value];
                            newImages.splice(index, 1);
                            field.onChange(newImages);
                            
                            // 이미지 미리보기 제거
                            const newPreviewUrls = { ...imagePreviewUrls };
                            delete newPreviewUrls[index];
                            setImagePreviewUrls(newPreviewUrls);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {imagePreviewUrls[index] && (
                        <div className="relative w-full h-40 mb-4 bg-gray-950/50 p-2 rounded-md border border-gray-700">
                          <img 
                            src={imagePreviewUrls[index]}
                            alt={`이미지 ${index + 1} 미리보기`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <label className="text-sm font-medium text-white mb-1.5 block">파일</label>
                          <Input
                            type="file"
                            accept="image/*"
                            className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              
                              const newImages = [...field.value];
                              newImages[index] = {
                                ...newImages[index],
                                file
                              };
                              field.onChange(newImages);
                              
                              // 이미지 미리보기 설정
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setImagePreviewUrls({
                                  ...imagePreviewUrls,
                                  [index]: event.target?.result as string
                                });
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-white mb-1.5 block">제목</label>
                          <Input
                            value={image.title || ''}
                            className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => {
                              const newImages = [...field.value];
                              newImages[index] = {
                                ...newImages[index],
                                title: e.target.value
                              };
                              field.onChange(newImages);
                            }}
                            placeholder="이미지 제목"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-white mb-1.5 block">설명</label>
                          <Textarea
                            value={image.description || ''}
                            className="bg-gray-900 border-gray-700 min-h-[80px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => {
                              const newImages = [...field.value];
                              newImages[index] = {
                                ...newImages[index],
                                description: e.target.value
                              };
                              field.onChange(newImages);
                            }}
                            placeholder="이미지 설명"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-blue-900/30 border-blue-700/50 text-blue-100 hover:bg-blue-800/40"
                    onClick={() => {
                      field.onChange([...field.value, {}]);
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" /> 이미지 추가
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="documents"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-white font-medium">문서</FormLabel>
              <FormControl>
                <div className="space-y-6">
                  {field.value?.map((doc: any, index: number) => (
                    <div key={index} className="p-5 border border-gray-700 rounded-lg bg-gray-900/30 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                        <h4 className="font-medium text-blue-300 flex items-center gap-2">
                          <File className="h-4 w-4" />
                          문서 {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-gray-300 hover:text-red-400 hover:bg-red-900/20"
                          onClick={() => {
                            const newDocs = [...field.value];
                            newDocs.splice(index, 1);
                            field.onChange(newDocs);
                            
                            // 파일명 상태 제거
                            const newDocNames = { ...documentFileNames };
                            delete newDocNames[index];
                            setDocumentFileNames(newDocNames);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <label className="text-sm font-medium text-white mb-1.5 block">파일</label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                
                                const newDocs = [...field.value];
                                newDocs[index] = {
                                  ...newDocs[index],
                                  file
                                };
                                field.onChange(newDocs);
                                
                                // 파일명 상태 설정
                                setDocumentFileNames({
                                  ...documentFileNames,
                                  [index]: file.name
                                });
                              }}
                            />
                          </div>
                          {documentFileNames[index] && (
                            <p className="mt-2 text-sm text-blue-300 flex items-center gap-1">
                              <File className="h-3 w-3" /> {documentFileNames[index]}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-white mb-1.5 block">제목</label>
                          <Input
                            value={doc.title || ''}
                            className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => {
                              const newDocs = [...field.value];
                              newDocs[index] = {
                                ...newDocs[index],
                                title: e.target.value
                              };
                              field.onChange(newDocs);
                            }}
                            placeholder="문서 제목"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-white mb-1.5 block">유형</label>
                          <Select
                            value={doc.type_id?.toString() || ''}
                            onValueChange={(value) => {
                              const newDocs = [...field.value];
                              newDocs[index] = {
                                ...newDocs[index],
                                type_id: value
                              };
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
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-blue-900/30 border-blue-700/50 text-blue-100 hover:bg-blue-800/40"
                    onClick={() => {
                      field.onChange([...field.value, {}]);
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" /> 문서 추가
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 