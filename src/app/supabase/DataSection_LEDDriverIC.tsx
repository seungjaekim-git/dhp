"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { z } from "zod";
import { LEDDriverICInfoSchema } from './LEDDriverIC';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DataSection_LEDDriverICProps {
  data: z.infer<typeof LEDDriverICInfoSchema>;
  title: string;
}

const DataSection_LEDDriverIC: React.FC<DataSection_LEDDriverICProps> = ({ data, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      if ('min' in value || 'max' in value || 'typ' in value) {
        const parts = [];
        if ('min' in value && value.min !== null) parts.push(`Min: ${value.min}`);
        if ('typ' in value && value.typ !== null) parts.push(`Typ: ${value.typ}`);
        if ('max' in value && value.max !== null) parts.push(`Max: ${value.max}`);
        return (
          <div className="flex flex-wrap gap-2">
            {parts.map((part, i) => (
              <Badge key={i} variant="outline">{part}{value.unit || ''}</Badge>
            ))}
          </div>
        );
      }
      if ('between_ics' in value || 'between_channels' in value) {
        return (
          <div className="flex flex-col gap-1">
            {Object.entries(value).map(([k, v]) => (
              <Badge key={k} variant="secondary">
                {k.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}: ±{v}%
              </Badge>
            ))}
          </div>
        );
      }
    }
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, i) => (
            <Badge key={i} variant="outline">{item}</Badge>
          ))}
        </div>
      );
    }
    return String(value);
  };

  const renderBasicInfo = () => (
    <ScrollArea className="h-full w-full rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Object.entries(data)
          .filter(([key]) => key !== 'tables')
          .map(([key, value]) => (
            <div key={key} className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-all">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
              <div className="text-base text-foreground">
                {renderValue(value)}
              </div>
            </div>
          ))}
      </div>
    </ScrollArea>
  );

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader 
        className="cursor-pointer select-none hover:bg-accent/10 transition-colors"
        onClick={toggleCollapse}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            {title}
            <Badge variant="outline" className="text-xs">
              {isCollapsed ? "접기" : "펼치기"}
            </Badge>
          </CardTitle>
          {isCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="p-6">
          {renderBasicInfo()}
          <Separator className="my-6" />
          {data.tables && data.tables.map((table: any, index: number) => (
            <div key={index} className="mb-8 last:mb-0">
              <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                {table.title}
              </h3>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {table.columns.map((column: string, colIndex: number) => (
                        <TableHead 
                          key={colIndex}
                          className="font-semibold text-sm h-11 px-6"
                        >
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.data.map((row: any[], rowIndex: number) => (
                      <TableRow 
                        key={rowIndex}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        {row.map((cell: any, cellIndex: number) => (
                          <TableCell 
                            key={cellIndex}
                            className="text-sm px-6 py-3"
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default DataSection_LEDDriverIC;
