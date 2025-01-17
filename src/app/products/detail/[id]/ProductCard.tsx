import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  FileText,
  Briefcase,
  Mail,
  Phone,
  Link2,
  Heart,
  DollarSign,
  Package,
  ShoppingCart
} from "lucide-react";
import { PartnerData } from "@/app/partners/PartnerData";
import React from "react";

interface ProductCardProps {
  partner: PartnerData;
  product: {
    id: string;
    name: string;
    description: string;
    part_number: string;
    specs: {
      topology: string;
      dimming_method: string;
      input_voltage: string;
      output_current: string;
      operating_freq: string;
    };
    features: string[];
    applications: string[];
    certifications: string[];
  };
}

export default function ProductCard({ partner, product }: ProductCardProps) {
  const [quantity, setQuantity] = React.useState("1-499");
  const [package_type, setPackageType] = React.useState("SOIC-16");
  
  return (
    <Card className="w-full max-w-[400px] rounded-[20px]">
      <CardHeader className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-between rounded-l-2xl rounded-r-lg hover:bg-slate-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="font-medium">Macroblock Inc.</h4>
                  <p className="text-sm text-muted-foreground">
                    대만 / LED 드라이버 IC
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                상세정보
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Macroblock Inc.</DialogTitle>
              <DialogDescription>
                <Accordion type="single" collapsible>
                  <AccordionItem value="overview">
                    <AccordionTrigger>
                      <FileText className="mr-2 h-4 w-4" />
                      회사 개요
                    </AccordionTrigger>
                    <AccordionContent>
                      Macroblock은 LED 드라이버 IC 분야의 선도적인 기업으로, 혁신적인 LED 구동 솔루션을 제공합니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="business">
                    <AccordionTrigger>
                      <Briefcase className="mr-2 h-4 w-4" />
                      사업 개요
                    </AccordionTrigger>
                    <AccordionContent>
                      LED 디스플레이, 조명, 자동차 조명 등 다양한 분야의 LED 드라이버 IC 개발 및 생산
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="contact">
                    <AccordionTrigger>
                      <Mail className="mr-2 h-4 w-4" />
                      연락처 정보
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p><Mail className="inline mr-2 h-4 w-4" />sales@mblock.com</p>
                        <p><Phone className="inline mr-2 h-4 w-4" />+886-3-579-0068</p>
                        <p><Link2 className="inline mr-2 h-4 w-4" />www.mblock.com.tw</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div>
          <h3 className="text-xl font-semibold">MBI6659 LED 드라이버 IC</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            고성능 LED 디스플레이용 16채널 정전류 LED 드라이버 IC
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">LED Driver IC</Badge>
          <Badge variant="outline">16CH</Badge>
          <Badge variant="outline">Constant Current</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">패키지 타입</span>
            </div>
            <Select value={package_type} onValueChange={setPackageType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOIC-16">SOIC-16</SelectItem>
                <SelectItem value="TSSOP-16">TSSOP-16</SelectItem>
                <SelectItem value="QFN-16">QFN-16</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">주문 수량</span>
            </div>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-499">1-499개</SelectItem>
                <SelectItem value="500-999">500-999개</SelectItem>
                <SelectItem value="1000+">1000개 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>단가 (개당)</span>
              <span className="font-medium">$2.50</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>수량 할인</span>
              <span className="font-medium text-green-600">-10%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>패키지 추가비용</span>
              <span className="font-medium text-red-600">+$0.20</span>
            </div>
            <div className="pt-2 border-t flex items-center justify-between">
              <span className="font-medium">최종 단가</span>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-lg font-bold">2.45</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full gap-4">
          <Button className="flex-1">견적 요청</Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
