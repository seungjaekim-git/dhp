"use client";

import React, { useState } from "react";
import { HelpCircle, MessageSquarePlus, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function FaqClient() {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      category: "",
      subject: "",
      message: "",
      email: "",
    },
  });

  const faqCategories = [
    { id: "product", name: "제품", count: 15 },
    { id: "service", name: "서비스", count: 8 },
    { id: "company", name: "회사", count: 5 },
  ];

  const [selectedCategory, setSelectedCategory] = useState("product");

  const onSubmit = (data: any) => {
    toast({
      title: "문의가 접수되었습니다",
      description: "빠른 시일 내에 답변 드리도록 하겠습니다.",
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* 카테고리 버튼 그룹 */}
      <div className="flex flex-wrap gap-2">
        {faqCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            {category.name}
            <Badge variant="secondary">{category.count}</Badge>
          </Button>
        ))}
      </div>

      {/* FAQ 아코디언 */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge variant="outline">제품</Badge>
              LED 드라이버 IC의 주요 특징은 무엇인가요?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            당사의 LED 드라이버 IC는 고효율, 저전력 소비, 뛰어난 열 관리 기능을 
            제공합니다. 또한 다양한 디밍 옵션과 보호 회로를 내장하고 있어 안정적인 
            LED 조명 제어가 가능합니다.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge variant="outline">서비스</Badge>
              기술 지원은 어떻게 받을 수 있나요?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            당사는 이메일, 전화, 원격 지원 등 다양한 채널을 통해 기술 지원을 
            제공하고 있습니다. 또한 정기적인 기술 세미나와 워크샵을 통해 
            고객사의 엔지니어링 역량 향상을 돕고 있습니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* 문의하기 다이얼로그 */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <MessageSquarePlus className="h-4 w-4" />
            문의하기
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>문의하기</DialogTitle>
            <DialogDescription>
              제품, 서비스, 회사에 대해 궁금하신 점을 문의해주세요.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>문의 유형</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="문의 유형을 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="product">제품 문의</SelectItem>
                        <SelectItem value="service">서비스 문의</SelectItem>
                        <SelectItem value="company">회사 문의</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="문의 제목을 입력해주세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>문의 내용</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="문의하실 내용을 자세히 적어주세요" 
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="답변받으실 이메일을 입력해주세요" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">문의하기</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
