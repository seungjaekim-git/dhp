"use client";

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TableData {
  title: string;
  columns: string[];
  data: string[][];
}

interface TableDataSectionProps {
  data: TableData[] | { tables: TableData[] };
  className?: string;
}

export default function TableDataSection({ data, className = "" }: TableDataSectionProps) {
  // 데이터 형식 표준화
  const tables = Array.isArray(data) ? data : data.tables || [];
  
  if (tables.length === 0) {
    return <div className="text-muted-foreground text-sm">테이블 데이터가 없습니다.</div>;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {tables.map((table, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{table.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {table.columns.map((column, idx) => (
                      <TableHead key={idx} className="font-medium">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.data.map((row, rowIdx) => (
                    <TableRow key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <TableCell 
                          key={cellIdx}
                          className="py-2"
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 