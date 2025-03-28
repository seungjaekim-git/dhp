"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Scale, ChevronRight, ArrowUpDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCompareStore } from "../hooks/useCompare";

interface CompareItem {
  id: number;
  name: string;
  manufacturer: string;
  part_number: string;
  thumbnail: string;
  category: string;
  specifications?: {
    input_voltage?: {
      min: number;
      max: number;
    };
    output_current?: {
      min: number;
      max: number;
    };
    channels?: number;
    topology?: string[];
    dimming_method?: string[];
    package_type?: string;
    operating_temperature?: {
      min: number;
      max: number;
    };
    efficiency?: number;
    switching_frequency?: number;
    internal_switch?: boolean;
    thermal_pad?: boolean;
  };
  certifications?: Array<{ certification: { name: string } }>;
  applications?: Array<{ application: { name: string } }>;
}

export default function CompareDialog() {
  const { items, clearItems, removeItem, isCompareDialogOpen, closeCompareDialog } = useCompareStore();
  
  // 비교할 항목이 없으면 렌더링하지 않음
  if (!items || items.length === 0) return null;
  
  const renderSpecification = (item: CompareItem, spec: string) => {
    switch (spec) {
      case 'input_voltage':
        return item.specifications?.input_voltage 
          ? `${item.specifications.input_voltage.min}V ~ ${item.specifications.input_voltage.max}V`
          : '-';
      case 'output_current':
        return item.specifications?.output_current
          ? `${item.specifications.output_current.min}mA ~ ${item.specifications.output_current.max}mA`
          : '-';
      case 'channels':
        return item.specifications?.channels ? `${item.specifications.channels}채널` : '-';
      case 'topology':
        return item.specifications?.topology?.join(', ') || '-';
      case 'dimming_method':
        return item.specifications?.dimming_method?.join(', ') || '-';
      case 'package_type':
        return item.specifications?.package_type || '-';
      case 'operating_temperature':
        return item.specifications?.operating_temperature
          ? `${item.specifications.operating_temperature.min}°C ~ ${item.specifications.operating_temperature.max}°C`
          : '-';
      case 'efficiency':
        return item.specifications?.efficiency ? `${item.specifications.efficiency}%` : '-';
      case 'switching_frequency':
        return item.specifications?.switching_frequency ? `${item.specifications.switching_frequency}kHz` : '-';
      case 'internal_switch':
        return item.specifications?.internal_switch ? '있음' : '없음';
      case 'thermal_pad':
        return item.specifications?.thermal_pad ? '있음' : '없음';
      case 'certifications':
        return item.certifications?.map(c => c.certification.name).join(', ') || '-';
      case 'applications':
        return item.applications?.map(a => a.application.name).join(', ') || '-';
      default:
        return '-';
    }
  };

  const specifications = [
    { key: 'input_voltage', label: '입력 전압' },
    { key: 'output_current', label: '출력 전류' },
    { key: 'channels', label: '채널 수' },
    { key: 'topology', label: '토폴로지' },
    { key: 'dimming_method', label: '디밍 방식' },
    { key: 'package_type', label: '패키지 타입' },
    { key: 'operating_temperature', label: '동작 온도' },
    { key: 'efficiency', label: '효율' },
    { key: 'switching_frequency', label: '스위칭 주파수' },
    { key: 'internal_switch', label: '내부 스위치' },
    { key: 'thermal_pad', label: '써멀 패드' },
    { key: 'certifications', label: '인증' },
    { key: 'applications', label: '응용 분야' }
  ];
  
  return (
    <>
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white shadow-lg border-blue-200 hover:bg-blue-50"
        onClick={useCompareStore.getState().openCompareDialog}
      >
        <Scale className="h-4 w-4 text-blue-500" />
        <span className="font-medium">
          {items.length}개 제품 비교하기
        </span>
      </Button>
      
      <Dialog open={isCompareDialogOpen} onOpenChange={closeCompareDialog}>
        <DialogContent className="max-w-5xl w-[95vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-500" />
              LED 드라이버 IC 제품 비교
            </DialogTitle>
            <DialogDescription>
              선택한 {items.length}개 제품의 특성을 비교합니다. 최대 4개까지 비교 가능합니다.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh]">
            <div className="grid grid-cols-1 gap-6 p-1">
              {/* 제품 헤더 */}
              <div className="grid grid-cols-5 gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  비교 항목
                </div>
                {items.map(item => (
                  <div key={item.id} className="relative">
                    <div className="rounded-lg border p-4 h-full">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-200 hover:bg-slate-300"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      
                      <div className="mb-3 flex justify-center">
                        <div className="relative h-20 w-20 overflow-hidden">
                          <Image
                            src={item.thumbnail || "/placeholder.webp"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          {item.manufacturer}
                        </div>
                        <div className="font-medium text-sm mb-1">
                          {item.part_number || item.name}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 text-xs h-7 w-full"
                          asChild
                        >
                          <Link href={`/products/detail/${item.id}`}>
                            상세 정보
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 스펙 비교 행 */}
              {specifications.map(spec => (
                <div key={spec.key} className="grid grid-cols-5 gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-sm font-medium flex items-center">
                    {spec.label}
                  </div>
                  {items.map(item => (
                    <div key={`${item.id}-${spec.key}`} className="p-2 rounded-lg border text-sm">
                      {renderSpecification(item, spec.key)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={clearItems}>
              <X className="h-4 w-4 mr-2" />
              비교 목록 비우기
            </Button>
            <Button variant="outline" size="sm" onClick={closeCompareDialog}>
              닫기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 