import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, CircuitBoard, Video, File, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { ProductProps, Document } from "../../types/product";
import { formatDate } from "../../utils";

interface DocumentsTabProps {
  product: ProductProps;
}

export const DocumentsTab = ({ product }: DocumentsTabProps) => {
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
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

  const documents = product.product_documents.map(item => item.documents);

  if (!documents.length) {
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

  const documentTypeIcons: Record<string, JSX.Element> = {
    "데이터시트": <FileText className="w-6 h-6 text-blue-500" />,
    "매뉴얼": <Book className="w-6 h-6 text-green-500" />,
    "회로도": <CircuitBoard className="w-6 h-6 text-purple-500" />,
    "동영상": <Video className="w-6 h-6 text-red-500" />,
    "기타": <File className="w-6 h-6 text-gray-500" />
  };

  const getDocumentIcon = (typeId: number | null) => {
    const docType = documentTypes.find(type => type.id === typeId);
    return docType ? documentTypeIcons[docType.name] || documentTypeIcons["기타"] : documentTypeIcons["기타"];
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">문서 자료</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {documents.map((doc, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {getDocumentIcon(doc.type_id)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{doc.title}</h4>
                  <p className="text-sm text-gray-500">
                    업데이트: {formatDate(doc.updated_at)}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300"
                onClick={() => window.open(doc.url, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                다운로드
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 