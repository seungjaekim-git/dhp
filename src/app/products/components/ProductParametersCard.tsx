import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParameterType {
  value: string | number;
  unit?: string;
  description?: string;
}

interface ProductParametersCardProps {
  title: string;
  parameters: Record<string, string | number | ParameterType>;
}

export function ProductParametersCard({
  title,
  parameters
}: ProductParametersCardProps) {
  // 파라미터 값의 형식에 따라 적절히 렌더링
  const renderParameterValue = (key: string, param: string | number | ParameterType) => {
    if (typeof param === 'object' && param !== null) {
      // ParameterType 객체인 경우
      return (
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center text-gray-300">
            {param.description ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <span className="text-gray-400">{key}</span>
                      <Info className="h-3.5 w-3.5 text-gray-500 ml-1" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 border-gray-800 text-gray-300">
                    <p>{param.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span className="text-gray-400">{key}</span>
            )}
          </div>
          <div className="text-right font-medium">
            <span>{param.value}</span>
            {param.unit && <span className="text-gray-400 ml-1 text-sm">{param.unit}</span>}
          </div>
        </div>
      );
    } else {
      // 단순 문자열이나 숫자인 경우
      return (
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-400">{key}</span>
          <span className="font-medium">{param}</span>
        </div>
      );
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <CardHeader className="py-3 px-4 bg-gray-800/50">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-sm space-y-1">
          {Object.entries(parameters).map(([key, value], index, arr) => (
            <div key={key}>
              {renderParameterValue(key, value)}
              {index < arr.length - 1 && <Separator className="my-1 bg-gray-800" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 