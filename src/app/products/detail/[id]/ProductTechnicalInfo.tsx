"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, Table2, Download, Printer, Maximize2, ZoomIn, ZoomOut } from "lucide-react";

interface TableData {
  data: any[][];
  title: string | null;
  columns: string[];
}

interface Tab {
  id: string;
  title: string;
  type: "datasheet" | "table";
  content?: TableData;
}

interface ProductTechnicalInfoProps {
  product: {
    product_documents: {
      documents: {
        id: number;
        title: string;
        url: string;
        type_id: number;
      };
    }[];
    tables: TableData[];
  };
}

export default function ProductTechnicalInfo({ product }: ProductTechnicalInfoProps) {
  const datasheet = product.product_documents.find(
    doc => doc.documents.type_id === 1
  );

  console.log('product.tables의 상세 구조:', JSON.stringify(product.tables, null, 2));
  
  const tables = product.tables.tables;
  console.log(tables);
  
  const tabs: Tab[] = [
    {
      id: "datasheet",
      title: "데이터시트",
      type: "datasheet"
    },
    ...tables.map(table => ({
      id: table.title || "",
      title: table.title || "",
      type: "table" as const,
      content: table
    }))
  ];

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  return (
    <div className="flex gap-4">
      {/* 왼쪽 네비게이션 */}
      <div className="w-48 shrink-0">
        <ScrollArea className="h-[600px]">
          <div className="space-y-1.5 pr-2">
            {tabs.map((tab, index) => (
              <Button
                key={tab.id}
                variant={activeTab.id === tab.id ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => setActiveTab(tab)}
              >
                {tab.type === "datasheet" ? (
                  <FileText className="mr-2 h-4 w-4" />
                ) : (
                  <Table2 className="mr-2 h-4 w-4" />
                )}
                <span className="mr-2">{index + 1}.</span>
                {tab.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="flex-1">
        <Card>
          <CardContent className="p-6">
            {activeTab.type === "datasheet" ? (
              datasheet ? (
                <div className="space-y-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomOut}
                      title="축소"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomIn}
                      title="확대"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(datasheet.documents.url, '_blank')}
                      title="전체화면"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                      title="인쇄"
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = datasheet.documents.url;
                        link.download = `${datasheet.documents.title}.pdf`;
                        link.click();
                      }}
                      title="다운로드"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="w-full h-[550px]">
                    <iframe
                      src={`${datasheet.documents.url}#toolbar=0`}
                      className="w-full h-full rounded-lg border border-gray-200 transition-transform"
                      style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] text-gray-500">
                  데이터시트가 없습니다.
                </div>
              )
            ) : (
              <div className="space-y-8">
                {activeTab.content && (
                  <div className="overflow-hidden">
                    <h3 className="text-lg font-semibold mb-4">{activeTab.content.title}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {activeTab.content.columns.map((column, columnIndex) => (
                              <th
                                key={columnIndex}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {activeTab.content.data.map((row, rowIndex) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
