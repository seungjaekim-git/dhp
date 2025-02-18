"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LEDDriverICInfoSchema } from "@/app/supabase/LEDDriverIC";
import { z } from "zod";
import { 
  CircuitBoard, 
  Zap, 
  Thermometer, 
  Package, 
  Cpu, 
  Wifi, 
  Grid, 
  Settings,
  Gauge,
  Layers,
  ChevronRight
} from "lucide-react";

interface ProductMainSpecsProps {
  product: {
    specifications: z.infer<typeof LEDDriverICInfoSchema>;
  };
}

export default function ProductMainSpecs({ product }: ProductMainSpecsProps) {
  const specs = product.specifications;
  if (!specs) return null;

  const SpecItem = ({ label, value, unit = "", className = "" }: any) => (
    value && (
      <div className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 ${className}`}>
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">
          {value} {unit}
        </span>
      </div>
    )
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 왼쪽 컬럼 */}
        <div className="space-y-6">
          {/* 전기적 특성 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              전기적 특성
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <SpecItem 
                label="입력 전압" 
                value={`${specs.input_voltage?.min} ~ ${specs.input_voltage?.max}`} 
                unit={specs.input_voltage?.unit} 
              />
              <SpecItem 
                label="출력 전압"
                value={`${specs.output_voltage?.min} ~ ${specs.output_voltage?.max}`}
                unit={specs.output_voltage?.unit}
              />
              <SpecItem 
                label="출력 전류"
                value={`${specs.output_current?.min} ~ ${specs.output_current?.max}`}
                unit={specs.output_current?.unit}
              />
            </div>
          </div>

          {/* 채널 및 토폴로지 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CircuitBoard className="w-5 h-5 text-green-500" />
              채널 및 토폴로지
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <SpecItem label="채널 수" value={specs.channels} />
              {specs.topology && (
                <div className="flex items-center justify-between p-3">
                  <span className="text-gray-600">토폴로지</span>
                  <div className="flex gap-2">
                    {specs.topology.map((topo, i) => (
                      <Badge key={i} variant="secondary" className="bg-green-100 text-green-700">
                        {topo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="space-y-6">
          {/* 패키지 정보 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              패키지 정보
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <SpecItem label="패키지 타입" value={specs.package_type} />
              <SpecItem label="실장 유형" value={specs.mounting_type} />
              {specs.thermal_pad !== undefined && (
                <div className="flex items-center justify-between p-3">
                  <span className="text-gray-600">써멀 패드</span>
                  <Badge variant="secondary" className={specs.thermal_pad ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {specs.thermal_pad ? "포함" : "미포함"}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* 통신 인터페이스 */}
          {specs.communication_interface && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Wifi className="w-5 h-5 text-purple-500" />
                통신 인터페이스
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <SpecItem 
                  label="인터페이스 타입" 
                  value={specs.communication_interface.type} 
                />
                <SpecItem 
                  label="통신 속도" 
                  value={specs.communication_interface.speed}
                  unit="MHz"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
