import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import Image from "next/image";

interface Certificate {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export const CertificateList = ({ certificates }: { certificates: Certificate[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 4개씩 3줄 = 12개

  if (!certificates || certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <Award className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-medium mb-2">등록된 인증서가 없습니다</h3>
        <p className="text-sm">아직 등록된 인증서가 없습니다.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCertificates = certificates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentCertificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4">
              <div className="relative w-full h-48">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardTitle className="text-lg">{certificate.title}</CardTitle>
              <p className="text-sm text-gray-600">{certificate.description}</p>
              <div className="flex flex-wrap gap-2">
                {certificate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
