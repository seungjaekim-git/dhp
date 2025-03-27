"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from 'next/link';
import { ProductSchema } from './leddrivericListPage';
import { Download, ExternalLink } from 'lucide-react';

interface SheetDetailsContentProps {
  product: ProductSchema;
}

export function SheetDetailsContent({ product }: SheetDetailsContentProps) {
  const [activeTab, setActiveTab] = React.useState('overview');

  if (!product) return <div>제품 정보를 불러오는 중입니다...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-sm text-muted-foreground">{product.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/products/detail/${product.id}`} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                상세 페이지
              </Link>
            </Button>
            
            {product.datasheet_url && (
              <Button asChild variant="default" size="sm">
                <a href={product.datasheet_url} target="_blank" rel="noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Datasheet
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-blue-50">
            {product.manufacturer?.name || 'Unknown Manufacturer'}
          </Badge>
          {product.package_type && (
            <Badge variant="outline" className="bg-green-50">
              {product.package_type}
            </Badge>
          )}
          {product.category && (
            <Badge variant="outline" className="bg-amber-50">
              {product.category.name}
            </Badge>
          )}
          {product.specifications?.topology && product.specifications.topology.map((item: string) => (
            <Badge key={item} variant="outline" className="bg-purple-50">
              {item}
            </Badge>
          ))}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b">
          <TabsList className="ml-4 mt-2">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="specifications">상세 스펙</TabsTrigger>
            <TabsTrigger value="features">특징</TabsTrigger>
            <TabsTrigger value="applications">응용분야</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <TabsContent value="overview" className="h-full">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">기본 정보</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-muted-foreground">제조사</div>
                    <div>{product.manufacturer?.name || 'N/A'}</div>
                    <div className="text-muted-foreground">부품 번호</div>
                    <div>{product.part_number || 'N/A'}</div>
                    <div className="text-muted-foreground">패키지</div>
                    <div>{product.package_type || 'N/A'}</div>
                    <div className="text-muted-foreground">카테고리</div>
                    <div>{product.category?.name || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">전기적 특성</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-muted-foreground">입력 전압</div>
                    <div>
                      {product.specifications?.input_voltage ? 
                        `${product.specifications.input_voltage.min || 0}~${product.specifications.input_voltage.max || 0}V` : 
                        'N/A'}
                    </div>
                    <div className="text-muted-foreground">출력 전압</div>
                    <div>
                      {product.specifications?.output_voltage ? 
                        `${product.specifications.output_voltage.min || 0}~${product.specifications.output_voltage.max || 0}V` : 
                        'N/A'}
                    </div>
                    <div className="text-muted-foreground">출력 전류</div>
                    <div>
                      {product.specifications?.output_current ? 
                        `${product.specifications.output_current.min || 0}~${product.specifications.output_current.max || 0}mA` : 
                        'N/A'}
                    </div>
                    <div className="text-muted-foreground">토폴로지</div>
                    <div>{product.specifications?.topology?.join(', ') || 'N/A'}</div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-2">제품 설명</h3>
                <p className="text-sm">{product.description || '제품 설명이 제공되지 않았습니다.'}</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-2">응용 분야</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications && product.applications.length > 0 ? 
                    product.applications.map((app: any) => (
                      <Badge key={app.application.id} variant="secondary">
                        {app.application.name}
                      </Badge>
                    )) : 
                    <span className="text-sm text-muted-foreground">응용 분야 정보가 없습니다.</span>
                  }
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="h-full overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">특성</TableHead>
                  <TableHead>값</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">입력 전압 (VIN)</TableCell>
                  <TableCell>
                    {product.specifications?.input_voltage ? 
                      `${product.specifications.input_voltage.min || 0}~${product.specifications.input_voltage.max || 0}V${product.specifications.input_voltage.typ ? ` (typ. ${product.specifications.input_voltage.typ}V)` : ''}` : 
                      'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">출력 전압 (VOUT)</TableCell>
                  <TableCell>
                    {product.specifications?.output_voltage ? 
                      `${product.specifications.output_voltage.min || 0}~${product.specifications.output_voltage.max || 0}V${product.specifications.output_voltage.typ ? ` (typ. ${product.specifications.output_voltage.typ}V)` : ''}` : 
                      'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">출력 전류 (IOUT)</TableCell>
                  <TableCell>
                    {product.specifications?.output_current ? 
                      `${product.specifications.output_current.min || 0}~${product.specifications.output_current.max || 0}mA${product.specifications.output_current.typ ? ` (typ. ${product.specifications.output_current.typ}mA)` : ''}` : 
                      'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">전류 정확도</TableCell>
                  <TableCell>
                    {product.specifications?.current_accuracy ? 
                      `채널 간: ±${product.specifications.current_accuracy.between_channels || 'N/A'}%, IC 간: ±${product.specifications.current_accuracy.between_ics || 'N/A'}%` : 
                      'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">동작 온도</TableCell>
                  <TableCell>
                    {product.specifications?.operating_temperature ? 
                      `${product.specifications.operating_temperature.min || 0}~${product.specifications.operating_temperature.max || 0}°C` : 
                      'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">스위칭 주파수</TableCell>
                  <TableCell>
                    {product.specifications?.switching_frequency ? 
                      `${product.specifications.switching_frequency.min || 0}~${product.specifications.switching_frequency.max || 0}kHz${product.specifications.switching_frequency.typ ? ` (typ. ${product.specifications.switching_frequency.typ}kHz)` : ''}` : 
                      'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">채널 수</TableCell>
                  <TableCell>{product.specifications?.channels || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">토폴로지</TableCell>
                  <TableCell>{product.specifications?.topology?.join(', ') || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">디밍 방식</TableCell>
                  <TableCell>{product.specifications?.dimming_method?.join(', ') || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">패키지 타입</TableCell>
                  <TableCell>{product.specifications?.package_type || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">실장 방식</TableCell>
                  <TableCell>{product.specifications?.mounting_type || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">써멀패드</TableCell>
                  <TableCell>{product.specifications?.thermal_pad === true ? 'Yes' : product.specifications?.thermal_pad === false ? 'No' : 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="features" className="h-full">
            <div className="space-y-4">
              {product.description ? (
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              ) : (
                <div className="text-muted-foreground italic">특징 정보가 제공되지 않았습니다.</div>
              )}
              
              {product.specifications && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="topology">
                    <AccordionTrigger>토폴로지</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {product.specifications.topology ? 
                          product.specifications.topology.map((item: string) => (
                            <Badge key={item} variant="outline" className="bg-blue-50">
                              {item}
                            </Badge>
                          )) : 
                          <span className="text-sm text-muted-foreground">토폴로지 정보가 없습니다.</span>
                        }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="dimming">
                    <AccordionTrigger>디밍 방식</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {product.specifications.dimming_method ? 
                          product.specifications.dimming_method.map((item: string) => (
                            <Badge key={item} variant="outline" className="bg-green-50">
                              {item}
                            </Badge>
                          )) : 
                          <span className="text-sm text-muted-foreground">디밍 방식 정보가 없습니다.</span>
                        }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="package">
                    <AccordionTrigger>패키지 정보</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="text-muted-foreground">패키지 타입</div>
                        <div>{product.specifications.package_type || 'N/A'}</div>
                        <div className="text-muted-foreground">써멀패드</div>
                        <div>{product.specifications.thermal_pad === true ? 'Yes' : product.specifications.thermal_pad === false ? 'No' : 'N/A'}</div>
                        <div className="text-muted-foreground">패키지/케이스</div>
                        <div>{product.package_case || 'N/A'}</div>
                        <div className="text-muted-foreground">공급 방식</div>
                        <div>{product.supply_package || 'N/A'}</div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="h-full">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">응용 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications && product.applications.length > 0 ? 
                      product.applications.map((app: any) => (
                        <Badge key={app.application.id} variant="outline" className="bg-blue-50">
                          {app.application.name}
                        </Badge>
                      )) : 
                      <span className="text-sm text-muted-foreground">응용 분야 정보가 없습니다.</span>
                    }
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">인증</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications && product.certifications.length > 0 ? 
                      product.certifications.map((cert: any) => (
                        <Badge key={cert.certification.id} variant="outline" className="bg-green-50">
                          {cert.certification.name}
                        </Badge>
                      )) : 
                      <span className="text-sm text-muted-foreground">인증 정보가 없습니다.</span>
                    }
                  </div>
                </div>
              </div>
              
              {product.description && (
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">제품 설명</h3>
                  <p className="text-sm">{product.description}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
