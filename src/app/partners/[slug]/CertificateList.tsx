import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

interface Certificate {
  id: number;
  name: string;
  description: string;
  issue_date: string;
  expiry_date?: string;
  issuer: string;
  manufacturer_id: number;
  image_url?: string;
}

export const CertificateList = ({ certificates }: { certificates: Certificate[] }) => {
  if (!certificates || certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <Award className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-medium mb-2 text-gray-400">등록된 인증서가 없습니다</h3>
        <p className="text-sm text-gray-500">아직 등록된 인증서 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certificates.map((certificate) => (
        <Card key={certificate.id} className="bg-gray-900/70 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{certificate.name}</h3>
              <p className="text-sm text-gray-400">{certificate.description}</p>
              <div className="flex flex-col text-xs text-gray-500">
                <span>발급기관: {certificate.issuer}</span>
                <span>발급일: {new Date(certificate.issue_date).toLocaleDateString('ko-KR')}</span>
                {certificate.expiry_date && (
                  <span>만료일: {new Date(certificate.expiry_date).toLocaleDateString('ko-KR')}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
