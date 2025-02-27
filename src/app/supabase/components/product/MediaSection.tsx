import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Upload, File } from "lucide-react";
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
    <Card>
      <CardHeader>
        <CardTitle>미디어</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value?.map((image: any, index: number) => (
                    <div key={index} className="p-4 border rounded-md space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">이미지 {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
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
                        <div className="relative w-full h-40 mb-4">
                          <img 
                            src={imagePreviewUrls[index]}
                            alt={`이미지 ${index + 1} 미리보기`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-sm font-medium">파일</label>
                          <Input
                            type="file"
                            accept="image/*"
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
                          <label className="text-sm font-medium">제목</label>
                          <Input
                            value={image.title || ''}
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
                          <label className="text-sm font-medium">설명</label>
                          <Textarea
                            value={image.description || ''}
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
                    onClick={() => {
                      field.onChange([...field.value, {}]);
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" /> 이미지 추가
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="documents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>문서</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value?.map((doc: any, index: number) => (
                    <div key={index} className="p-4 border rounded-md space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">문서 {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
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
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-sm font-medium">파일</label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                
                                const newDocs = [...field.value];
                                newDocs[index] = {
                                  ...newDocs[index],
                                  file,
                                  title: newDocs[index]?.title || file.name
                                };
                                field.onChange(newDocs);
                                
                                // 파일명 저장
                                setDocumentFileNames({
                                  ...documentFileNames,
                                  [index]: file.name
                                });
                              }}
                            />
                            {documentFileNames[index] && (
                              <div className="flex items-center text-sm text-gray-500">
                                <File className="h-4 w-4 mr-1" />
                                {documentFileNames[index]}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">제목</label>
                          <Input
                            value={doc.title || ''}
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
                          <label className="text-sm font-medium">유형</label>
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
                    onClick={() => {
                      field.onChange([...field.value, {}]);
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" /> 문서 추가
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 