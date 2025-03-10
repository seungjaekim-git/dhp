"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, CircuitBoard, Video, File, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";

interface DocumentType {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
}

interface Document {
  id: number;
  title: string;
  url: string;
  type_id: number;
  created_at: string;
  updated_at: string;
  document_types?: DocumentType;
}

interface ProductDocumentProps {
  product: {
    product_documents: {
      documents: Document;
    }[];
  };
}

const documentTypeIcons: Record<string, JSX.Element> = {
  "데이터시트": <FileText className="w-6 h-6 text-blue-500" />,
  "매뉴얼": <Book className="w-6 h-6 text-green-500" />,
  "회로도": <CircuitBoard className="w-6 h-6 text-purple-500" />,
  "동영상": <Video className="w-6 h-6 text-red-500" />,
  "기타": <File className="w-6 h-6 text-gray-500" />
};

export default function ProductDocument({ product }: ProductDocumentProps) {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('document_types')
          .select('*');
        
        if (error) throw error;
        setDocumentTypes(data);
      } catch (error) {
        console.error('문서 타입을 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentTypes();
  }, []);

  const groupedByCategory = product.product_documents.reduce((acc, curr) => {
    const docType = documentTypes.find(type => type.id === curr.documents.type_id);
    const category = docType?.category || '기타';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      ...curr.documents,
      document_types: docType
    });
    return acc;
  }, {} as Record<string, Document[]>);

  const documents = product.product_documents.map(item => item.documents);

  if (!product.product_documents.length) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg font-medium">등록된 문서가 없습니다</p>
          <p className="text-gray-500 text-sm mt-2">현재 제품에 대한 문서 자료가 준비되지 않았습니다</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">문서 자료</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {documents.map((doc, idx) => (
            <DocumentCard key={idx} document={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
