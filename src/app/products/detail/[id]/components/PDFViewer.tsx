'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-[520px]">
        <iframe
          src={url}
          width="100%"
          height="100%"
          title="PDF Viewer"
          className="border-0 rounded-lg bg-gray-900"
        />
      </div>
      
      <div className="flex items-center justify-end p-3 bg-gray-800 border-t border-gray-700">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white border-none"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Download className="w-4 h-4 mr-1" />
            다운로드
          </a>
        </Button>
      </div>
    </div>
  );
} 