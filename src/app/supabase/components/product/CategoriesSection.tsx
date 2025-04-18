import { useState } from 'react';
import { supabase } from "@/lib/supabase-client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Layers, FileText } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import { FormValues, Category, Application, Certification, Feature } from "../../types/product";

interface CategoriesSectionProps {
  form: UseFormReturn<FormValues>;
  categories: Category[];
  applications: Application[];
  certifications: Certification[];
  features: Feature[];
  filteredFeatures?: Feature[];
  setFilteredFeatures: (features: Feature[]) => void;
  addApplication: (name: string, parentId?: number) => Promise<void>;
}

export default function CategoriesSection({ 
  form, 
  categories, 
  applications, 
  certifications, 
  features, 
  filteredFeatures = features,
  setFilteredFeatures,
  addApplication
}: CategoriesSectionProps) {
  const [featureSearchTerm, setFeatureSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  
  return (
    <Card className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="bg-gray-900/70 border-b border-gray-700">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-blue-300">
          <Layers className="h-5 w-5" />
          분류 및 특성
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pt-6 text-white">
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-white font-medium">카테고리</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {field.value?.map((categoryId: string) => {
                    const category = categories.find(c => c.id.toString() === categoryId);
                    return category ? (
                      <Badge key={categoryId} variant="secondary" className="flex items-center gap-1 bg-blue-900/30 border border-blue-700/50 text-blue-100 hover:bg-blue-800/30">
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
                      <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-800 hover:bg-gray-700 hover:text-white">
                        <Plus className="h-4 w-4 mr-1" /> 카테고리 선택
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] max-h-[600px] overflow-y-auto border-gray-700 bg-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-blue-300">카테고리 선택</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <Input
                          type="search"
                          placeholder="카테고리 검색..."
                          className="mb-4 bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          onChange={(e) => {
                            const searchInput = e.target.value.toLowerCase();
                            setFilteredCategories(
                              categories.filter(category =>
                                category.name.toLowerCase().includes(searchInput)
                              )
                            );
                          }}
                        />
                        <div className="space-y-3">
                          {filteredCategories.map((category) => (
                            <div key={category.id} className="flex items-center gap-2 text-gray-300">
                              <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={field.value?.includes(category.id.toString())}
                                className="rounded text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-600"
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
                        <Button type="button" variant="secondary" 
                          className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                          onClick={() => field.onChange([])}>
                          초기화
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applications"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-white font-medium">응용 분야</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((appId: string) => {
                      const app = applications.find(a => a.id.toString() === appId);
                      return app ? (
                        <Button
                          key={appId}
                          variant="outline"
                          size="sm"
                          className="h-8 flex items-center gap-1 bg-blue-900/30 border border-blue-700/50 text-blue-100 hover:bg-blue-800/40"
                          onClick={() => {
                            const newValue = field.value.filter((id: string) => id !== appId);
                            field.onChange(newValue);
                          }}
                        >
                          {app.name}
                          <X className="h-3 w-3" />
                        </Button>
                      ) : null;
                    })}
                  </div>

                  <div className="space-y-2">
                    <Textarea 
                      placeholder="name&#10;응용분야1&#10;응용분야2"
                      className="min-h-[100px] bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      id="applications-textarea"
                    />
                    <div className="mt-2 mb-3 text-sm text-gray-300">
                      <p>각 줄에 하나의 응용분야 이름을 입력하세요</p>
                      <p>첫 줄에 <code className="bg-gray-700 px-1 rounded">name</code> 헤더를 포함할 수 있습니다</p>
                    </div>
                    <div className="border border-gray-700 bg-gray-900/50 rounded-md p-4 mb-3 max-h-[150px] overflow-y-auto">
                      <p className="text-sm font-medium mb-2 text-blue-300">입력 미리보기:</p>
                      <div id="applications-preview" className="text-sm text-gray-300">
                        아직 입력된 내용이 없습니다
                      </div>
                    </div>
                    <Button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={async () => {
                        const textareaElement = document.getElementById('applications-textarea') as HTMLTextAreaElement;
                        const previewElement = document.getElementById('applications-preview');
                        if (!textareaElement || !previewElement) return;
                        
                        const text = textareaElement.value;
                        const rows = text.split('\n');
                        const allApplicationIds: string[] = [];
                        const newApplications: {name: string}[] = [];
                        const invalidRows: string[] = [];
                        const previewItems: string[] = [];

                        // 파싱 및 검증
                        for (const row of rows) {
                          const appName = row.trim().replace(/^"|"$/g, '');
                          
                          // 헤더 행 또는 빈 행 건너뛰기
                          if (!appName || appName.toLowerCase() === 'name') continue;

                          const app = applications.find(a => 
                            a.name.toLowerCase() === appName.toLowerCase()
                          );
                          
                          if (app) {
                            allApplicationIds.push(app.id.toString());
                            previewItems.push(`<b>${appName}</b> (기존 항목)`);
                          } else {
                            const { data: existingApps } = await supabase
                              .from('applications')
                              .select('name')
                              .ilike('name', appName);

                            if (existingApps && existingApps.length > 0) {
                              invalidRows.push(`${appName}: 이미 존재하는 응용분야 (대소문자 구분 없음)`);
                              previewItems.push(`<span class="text-red-500">${appName}: 중복 항목</span>`);
                              continue;
                            }

                            newApplications.push({ name: appName });
                            previewItems.push(`<b>${appName}</b> (새 항목)`);
                          }
                        }

                        // 미리보기 업데이트
                        if (previewItems.length > 0) {
                          previewElement.innerHTML = previewItems.map(item => `• ${item}`).join('<br>');
                        } else {
                          previewElement.textContent = '아직 입력된 내용이 없습니다';
                        }

                        // 오류 표시
                        if (invalidRows.length > 0) {
                          alert(`다음 항목들에 문제가 있습니다:\n\n${invalidRows.join('\n')}`);
                          return;
                        }

                        if (allApplicationIds.length > 0 || newApplications.length > 0) {
                          const existingIds = field.value || [];
                          const uniqueAllIds = Array.from(new Set([...existingIds, ...allApplicationIds]));
                          
                          const appsToAdd = applications.filter(app => 
                            allApplicationIds.includes(app.id.toString())
                          );
                          
                          let confirmMessage = '';
                          if (appsToAdd.length > 0) {
                            confirmMessage += `[기존 응용분야]\n${appsToAdd.map(app => `- ${app.name}`).join('\n')}\n\n`;
                          }
                          if (newApplications.length > 0) {
                            confirmMessage += `[새로운 응용분야]\n${newApplications.map(f => `- ${f.name}`).join('\n')}`;
                          }

                          const dialog = window.confirm(`다음 응용분야들을 추가하시겠습니까?\n\n${confirmMessage}`);

                          if (dialog) {
                            if (newApplications.length > 0) {
                              const newApplicationIds = await Promise.all(newApplications.map(async (application) => {
                                const { data, error } = await supabase
                                  .from('applications')
                                  .insert([application])
                                  .select('id');
                                if (error) {
                                  console.error('새 응용분야 추가 실패:', error);
                                  alert(`새 응용분야 추가 실패: ${error.message}`);
                                  return null;
                                }
                                return data[0].id.toString();
                              }));
                              
                              const validNewIds = newApplicationIds.filter(id => id !== null) as string[];
                              const newValue = [...uniqueAllIds, ...validNewIds];
                              field.onChange(newValue);
                            } else {
                              field.onChange(uniqueAllIds);
                            }
                          }
                        }
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" /> 분석 및 적용
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">인증</FormLabel>
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
                            // 필터링 코드
                          }}
                        />
                        <div className="space-y-2">
                          {certifications.map((cert) => (
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
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">특징</FormLabel>
              <FormControl>
                <div className="space-y-4">
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
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea 
                      placeholder="name,description&#10;특징1,설명1&#10;특징2,설명2"
                      className="min-h-[100px]"
                      id="features-textarea"
                    />
                    <div className="mt-2 mb-3 text-sm text-gray-300">
                      <p>CSV 형식으로 입력: <code>이름,설명</code> (각 줄에 하나씩)</p>
                      <p>첫 줄에 <code>name,description</code> 헤더를 포함할 수 있습니다</p>
                      <p>설명은 제품-특징 관계에 대한 설명입니다 (제품 저장 시 적용됩니다)</p>
                    </div>
                    <div className="border rounded p-3 mb-3 max-h-[150px] overflow-y-auto">
                      <p className="text-sm font-medium mb-2">입력 미리보기:</p>
                      <div id="features-preview" className="text-sm">
                        아직 입력된 내용이 없습니다
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={async () => {
                        const textareaElement = document.getElementById('features-textarea') as HTMLTextAreaElement;
                        const previewElement = document.getElementById('features-preview');
                        if (!textareaElement || !previewElement) return;
                        
                        const text = textareaElement.value;
                        const rows = text.split('\n');
                        const allFeatureIds: string[] = [];
                        const newFeatures: {name: string}[] = [];
                        const featureDescriptions: Record<string, string> = {};
                        const invalidRows: string[] = [];
                        const previewItems: string[] = [];

                        // CSV 파싱 및 검증
                        for (const row of rows) {
                          const parts = row.split(',').map(part => part.trim());
                          const featureName = parts[0]?.replace(/^"|"$/g, '');
                          const description = parts[1] || '';
                          
                          // 헤더 행 또는 빈 행 건너뛰기
                          if (!featureName || featureName.toLowerCase() === 'name') continue;

                          const feature = features.find(f => 
                            f.name.toLowerCase() === featureName.toLowerCase()
                          );
                          
                          if (feature) {
                            const featureId = feature.id.toString();
                            allFeatureIds.push(featureId);
                            if (description) {
                              featureDescriptions[featureId] = description;
                            }
                            previewItems.push(`<b>${featureName}</b> (기존 항목)${description ? ' - 설명: ' + description : ''}`);
                          } else {
                            const { data: existingFeatures } = await supabase
                              .from('features')
                              .select('name')
                              .ilike('name', featureName);

                            if (existingFeatures && existingFeatures.length > 0) {
                              invalidRows.push(`${featureName}: 이미 존재하는 특징 (대소문자 구분 없음)`);
                              previewItems.push(`<span class="text-red-500">${featureName}: 중복 항목</span>`);
                              continue;
                            }

                            newFeatures.push({
                              name: featureName
                            });
                            previewItems.push(`<b>${featureName}</b> (새 항목)${description ? ' - 설명: ' + description : ''}`);
                          }
                        }

                        // 미리보기 업데이트
                        if (previewItems.length > 0) {
                          previewElement.innerHTML = previewItems.map(item => `• ${item}`).join('<br>');
                        } else {
                          previewElement.textContent = '아직 입력된 내용이 없습니다';
                        }

                        // 오류 표시
                        if (invalidRows.length > 0) {
                          alert(`다음 항목들에 문제가 있습니다:\n\n${invalidRows.join('\n')}`);
                          return;
                        }

                        if (allFeatureIds.length > 0 || newFeatures.length > 0) {
                          const existingIds = field.value || [];
                          const uniqueAllIds = Array.from(new Set([...existingIds, ...allFeatureIds]));
                          
                          const featuresToAdd = features.filter(feature => 
                            allFeatureIds.includes(feature.id.toString())
                          );
                          
                          let confirmMessage = '';
                          if (featuresToAdd.length > 0) {
                            confirmMessage += `[기존 특징]\n${featuresToAdd.map(feature => `- ${feature.name}`).join('\n')}\n\n`;
                          }
                          if (newFeatures.length > 0) {
                            confirmMessage += `[새로운 특징]\n${newFeatures.map(f => `- ${f.name}`).join('\n')}`;
                          }

                          const dialog = window.confirm(`다음 특징들을 추가하시겠습니까?\n\n${confirmMessage}`);

                          if (dialog) {
                            // 새 특징 추가 및 ID 수집
                            const newFeatureIds: string[] = [];
                            
                            if (newFeatures.length > 0) {
                              for (const feature of newFeatures) {
                                const { data, error } = await supabase
                                  .from('features')
                                  .insert([{ name: feature.name }])
                                  .select('id');
                                
                                if (error) {
                                  console.error('새 특징 추가 실패:', error);
                                  alert(`새 특징 추가 실패: ${error.message}`);
                                  continue;
                                }
                                
                                if (data && data[0]) {
                                  const featureId = data[0].id.toString();
                                  newFeatureIds.push(featureId);
                                  
                                  // 해당 행에서 description 찾기
                                  const rowIndex = rows.findIndex(row => {
                                    const parts = row.split(',').map(part => part.trim());
                                    return parts[0]?.replace(/^"|"$/g, '').toLowerCase() === feature.name.toLowerCase();
                                  });
                                  
                                  if (rowIndex !== -1) {
                                    const parts = rows[rowIndex].split(',').map(part => part.trim());
                                    const description = parts[1] || '';
                                    if (description) {
                                      featureDescriptions[featureId] = description;
                                    }
                                  }
                                }
                              }
                              
                              // 새 특징을 features 배열에 추가
                              if (newFeatureIds.length > 0) {
                                // 새로 추가된 특징을 features 배열에 추가
                                for (let i = 0; i < newFeatureIds.length; i++) {
                                  const newFeature = {
                                    id: parseInt(newFeatureIds[i]),
                                    name: newFeatures[i].name
                                  };
                                  features.push(newFeature);
                                }
                                // 검색 필터링된 목록도 업데이트
                                setFilteredFeatures([...filteredFeatures, ...newFeatures.map((feature, i) => ({
                                  id: parseInt(newFeatureIds[i]),
                                  name: feature.name
                                }))]);
                              }
                            }
                            
                            // 모든 특징 ID 업데이트
                            const allNewIds = [...uniqueAllIds, ...newFeatureIds];
                            field.onChange(allNewIds);
                            
                            // 설명 데이터 저장 (form 상태에 저장)
                            if (Object.keys(featureDescriptions).length > 0) {
                              // 기존 데이터와 병합
                              const existingDescriptions = form.getValues('feature_descriptions') || {};
                              const mergedDescriptions = { ...existingDescriptions, ...featureDescriptions };
                              
                              // 폼 상태에 저장 (feature_descriptions 필드가 폼에 정의되어 있어야 함)
                              try {
                                form.setValue('feature_descriptions', mergedDescriptions);
                              } catch (error) {
                                console.warn('feature_descriptions 필드를 설정할 수 없습니다:', error);
                                // 대안으로 window 객체에 임시 저장
                                (window as any).tempFeatureDescriptions = mergedDescriptions;
                                console.info('특징 설명이 window.tempFeatureDescriptions에 임시 저장되었습니다');
                              }
                            }
                            
                            // 성공 후 텍스트 영역 초기화
                            textareaElement.value = '';
                            previewElement.textContent = '아직 입력된 내용이 없습니다';
                          }
                        }
                      }}
                    >
                      입력하기
                    </Button>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <Plus className="h-4 w-4" /> 특징 검색하여 선택
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
                          value={featureSearchTerm}
                          onChange={(e) => {
                            const searchInput = e.target.value.toLowerCase();
                            setFeatureSearchTerm(searchInput);
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
          )}
        />
      </CardContent>
    </Card>
  );
} 