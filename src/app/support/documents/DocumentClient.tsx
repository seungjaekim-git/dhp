"use client";

import React, { useState } from "react";
import { FileText, Search, Download, Eye, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export default function DocumentsClient() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  
  const itemsPerPage = 9;
  const totalItems = 50; // 예시 데이터 수
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const documentTypes = [
    { id: "all", name: "전체", count: 50 },
    { id: "datasheet", name: "데이터시트", count: 25 },
    { id: "appnote", name: "응용자료", count: 15 },
    { id: "certification", name: "인증서", count: 10 },
  ];

  const sortOptions = [
    { id: "latest", name: "최신순" },
    { id: "oldest", name: "오래된순" },
    { id: "name", name: "이름순" },
    { id: "downloads", name: "다운로드순" },
  ];

  const handleDownload = (docName: string) => {
    toast({
      title: "다운로드 시작",
      description: `${docName} 문서 다운로드를 시작합니다.`,
    });
  };

  const handlePreview = (docName: string) => {
    toast({
      title: "미리보기",
      description: `${docName} 문서를 미리보기합니다.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 정렬 섹션 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="문서 검색..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              {sortOptions.find(opt => opt.id === sortBy)?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortOptions.map((option) => (
              <DropdownMenuItem 
                key={option.id}
                onClick={() => setSortBy(option.id)}
              >
                {option.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 카테고리 버튼 그룹 */}
      <div className="flex flex-wrap gap-2">
        {documentTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedCategory === type.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(type.id)}
            className="gap-2"
          >
            {type.name}
            <Badge variant="secondary">{type.count}</Badge>
          </Button>
        ))}
      </div>

      {/* 문서 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((doc) => (
          <Card key={doc} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    데이터시트
                  </Badge>
                  <h3 className="font-semibold">LED 드라이버 IC 데이터시트</h3>
                </div>
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                LED 드라이버 IC의 상세 스펙과 특성을 확인할 수 있습니다.
              </p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => handlePreview("LED 드라이버 IC")}
              >
                <Eye className="h-4 w-4" />
                미리보기
              </Button>
              <Button
                size="sm"
                className="gap-2"
                onClick={() => handleDownload("LED 드라이버 IC")}
              >
                <Download className="h-4 w-4" />
                다운로드
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
