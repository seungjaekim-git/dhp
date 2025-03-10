"use client";

import React, { useState } from "react";
import { Package, Briefcase, ExternalLink, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";

// 타입 정의
interface Feature {
  id: number;
  name: string;
  description?: string;
  category?: string;
  icon?: string;
}

interface Application {
  id: number;
  name: string;
  description?: string;
  image?: string;
  category?: string;
}

interface ProductFeatureProps {
  feature_id: number;
  description?: string;
  features: {
    id: number;
    name: string;
    description?: string;
  };
}

interface ProductApplicationProps {
  application_id: number;
  applications: {
    id: number;
    name: string;
    description?: string;
  };
}

interface ProductFeaturesApplicationsProps {
  productFeatures: ProductFeatureProps[];
  productApplications: ProductApplicationProps[];
}

export default function ProductFeaturesApplications({ 
  productFeatures, 
  productApplications 
}: ProductFeaturesApplicationsProps) {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [expandedFeatures, setExpandedFeatures] = useState<boolean>(false);
  const [expandedApplications, setExpandedApplications] = useState<boolean>(false);

  // 특징과 응용분야를 카테고리별로 정렬
  const sortedFeatures = React.useMemo(() => 
    [...productFeatures].sort((a, b) => 
      a.features.name.localeCompare(b.features.name)
    ), 
    [productFeatures]
  );

  // 카테고리별로 그룹화
  const groupedApplications = React.useMemo(() => {
    const groups: Record<string, ProductApplicationProps[]> = {};
    
    productApplications.forEach(app => {
      const category = app.applications.category || "기타";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(app);
    });
    
    return groups;
  }, [productApplications]);

  const hasFeatures = productFeatures.length > 0;
  const hasApplications = productApplications.length > 0;
  
  // 표시할 특징 수 제한
  const initialFeatureCount = 6;
  const shouldShowFeatureExpand = productFeatures.length > initialFeatureCount;
  const visibleFeatures = expandedFeatures 
    ? productFeatures 
    : productFeatures.slice(0, initialFeatureCount);
    
  // 표시할 응용분야 수 제한
  const initialApplicationCount = 6;
  const shouldShowApplicationExpand = productApplications.length > initialApplicationCount;
  const visibleApplications = expandedApplications 
    ? productApplications 
    : productApplications.slice(0, initialApplicationCount);

  return (
    <div className="space-y-8">
      {/* 주요 특징 섹션 */}
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-blue-50">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">주요 특징</h2>
          </div>
          {hasFeatures && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              {productFeatures.length}개
            </Badge>
          )}
        </div>
        
        <div className="p-6">
          {hasFeatures ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {visibleFeatures.map((item) => (
                  <Button
                    key={item.features.id}
                    variant="outline"
                    onClick={() => setSelectedFeature(item.features)}
                    className="justify-start text-left h-auto py-3 px-4 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    <span className="truncate">{item.features.name}</span>
                  </Button>
                ))}
              </div>
              
              {shouldShowFeatureExpand && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setExpandedFeatures(!expandedFeatures)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    {expandedFeatures ? (
                      <>
                        <Minus className="w-4 h-4 mr-2" />
                        접기
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        {productFeatures.length - initialFeatureCount}개 더 보기
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <EmptyState 
              icon={<Package className="w-10 h-10 text-blue-400" />}
              title="등록된 특징이 없습니다"
              description="아직 이 제품에 대한 특징 정보가 등록되지 않았습니다."
              color="blue"
            />
          )}
        </div>
      </section>
      
      {/* 응용 분야 섹션 */}
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-green-50">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">응용 분야</h2>
          </div>
          {hasApplications && (
            <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
              {productApplications.length}개
            </Badge>
          )}
        </div>
        
        <div className="p-6">
          {hasApplications ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {visibleApplications.map(app => (
                  <Dialog key={app.applications.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3 px-4 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                      >
                        <span className="truncate">{app.applications.name}</span>
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{app.applications.name}</DialogTitle>
                        {app.applications.category && (
                          <DialogDescription>
                            <Badge variant="outline">{app.applications.category}</Badge>
                          </DialogDescription>
                        )}
                      </DialogHeader>
                      
                      <div className="py-4">
                        {app.applications.image && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={app.applications.image}
                              alt={app.applications.name}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                        
                        <p className="text-gray-700 leading-relaxed">
                          {app.applications.description || "응용 분야에 대한 상세 정보가 준비 중입니다."}
                        </p>
                      </div>
                      
                      <DialogFooter className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" /> 관련 자료
                        </Button>
                        <Button size="sm">
                          관련 제품 보기
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              
              {shouldShowApplicationExpand && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setExpandedApplications(!expandedApplications)}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    {expandedApplications ? (
                      <>
                        <Minus className="w-4 h-4 mr-2" />
                        접기
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        {productApplications.length - initialApplicationCount}개 더 보기
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <EmptyState 
              icon={<Briefcase className="w-10 h-10 text-green-400" />}
              title="등록된 응용분야가 없습니다"
              description="아직 이 제품에 대한 응용분야 정보가 등록되지 않았습니다."
              color="green"
            />
          )}
        </div>
      </section>

      {/* 특징 상세 다이얼로그 */}
      <Dialog open={selectedFeature !== null} onOpenChange={(open) => !open && setSelectedFeature(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedFeature?.name}</DialogTitle>
            {selectedFeature?.category && (
              <DialogDescription>
                <Badge variant="outline">{selectedFeature.category}</Badge>
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-gray-700 leading-relaxed">
              {selectedFeature?.description || "이 특징에 대한 상세 설명이 없습니다."}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setSelectedFeature(null)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 빈 상태 컴포넌트
function EmptyState({ 
  icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  color: "blue" | "green"
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-8 bg-${color}-50/50 rounded-lg border border-${color}-100`}>
      {icon}
      <h3 className={`text-lg font-semibold text-${color}-900`}>{title}</h3>
      <p className={`text-${color}-600 text-center`}>
        {description}
      </p>
    </div>
  );
}