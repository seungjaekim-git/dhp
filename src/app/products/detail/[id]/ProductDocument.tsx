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
        {Object.entries(groupedByCategory).map(([category, documents]) => (
          <div key={category} className="mb-10 last:mb-0">
            <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center">
              {documentTypeIcons[category] && (
                <span className="mr-2">{documentTypeIcons[category]}</span>
              )}
              {category}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className={cn(
                    "group relative p-4 rounded-xl border border-gray-200",
                    "hover:border-blue-300 hover:shadow-md transition-all duration-200",
                    "bg-gradient-to-br from-white to-gray-50"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600">
                        {doc.title}
                      </h4>
                      {doc.document_types?.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {doc.document_types.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <span>{doc.document_types?.name || '기타'}</span>
                        <span>•</span>
                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "ml-2 transition-all duration-200",
                        "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200",
                        "focus:ring-2 focus:ring-blue-100"
                      )}
                      onClick={() => window.open(doc.url, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      다운로드
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
