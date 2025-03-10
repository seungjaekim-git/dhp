import React from "react";
import { 
  CircuitBoard, 
  Zap, 
  Package, 
  Cpu, 
  Gauge,
  Layers,
  Radio,
  Thermometer,
  Activity,
  Settings
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductProps } from "../../types/product";
import { SpecCard } from "../ui/SpecCard";
import { hasValue, formatValue } from "../../utils";

interface MainSpecsTabProps {
  product: ProductProps;
}

export const MainSpecsTab = ({ product }: MainSpecsTabProps) => {
  const specs = product.specifications;
  if (!specs) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 왼쪽 컬럼 */}
        <div className="space-y-8">
          {/* 전기적 특성 */}
          {(hasValue(specs.input_voltage) || hasValue(specs.output_voltage) || hasValue(specs.output_current)) && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-600">
                <Zap className="w-5 h-5" />
                전기적 특성
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {specs.input_voltage && (
                  <SpecCard 
                    title="입력 전압" 
                    value={formatValue(
                      specs.input_voltage.min, 
                      specs.input_voltage.max, 
                      specs.input_voltage.typ,
                      specs.input_voltage.unit || "V"
                    ) || "N/A"}
                    icon={<Gauge className="w-5 h-5 text-blue-500" />}
                  />
                )}
                
                {specs.output_voltage && (
                  <SpecCard 
                    title="출력 전압" 
                    value={formatValue(
                      specs.output_voltage.min, 
                      specs.output_voltage.max, 
                      specs.output_voltage.typ,
                      specs.output_voltage.unit || "V"
                    ) || "N/A"}
                    icon={<Gauge className="w-5 h-5 text-green-500" />}
                  />
                )}
                
                {specs.output_current && (
                  <SpecCard 
                    title="출력 전류" 
                    value={formatValue(
                      specs.output_current.min, 
                      specs.output_current.max, 
                      specs.output_current.typ,
                      specs.output_current.unit || "mA"
                    ) || "N/A"}
                    icon={<Activity className="w-5 h-5 text-amber-500" />}
                  />
                )}
              </div>
            </div>
          )}

          {/* 주파수 특성 */}
          {hasValue(specs.switching_frequency) && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-600">
                <Radio className="w-5 h-5" />
                주파수 특성
              </h3>
              <SpecCard 
                title="스위칭 주파수" 
                value={formatValue(
                  specs.switching_frequency.min, 
                  specs.switching_frequency.max, 
                  specs.switching_frequency.typ,
                  specs.switching_frequency.unit || "kHz"
                ) || "N/A"}
                icon={<Radio className="w-5 h-5 text-purple-500" />}
              />
            </div>
          )}
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="space-y-8">
          {/* 패키지 정보 */}
          {hasValue(specs.package_type) && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-600">
                <Package className="w-5 h-5" />
                패키지 정보
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <SpecCard 
                  title="패키지 타입" 
                  value={specs.package_type || "N/A"}
                  icon={<Package className="w-5 h-5 text-orange-500" />}
                />
                {specs.thermal_pad !== undefined && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Thermometer className="w-5 h-5 text-orange-500" />
                        <p className="text-sm text-gray-500">써멀 패드</p>
                      </div>
                      <Badge 
                        className={`${specs.thermal_pad ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {specs.thermal_pad ? "있음" : "없음"}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 토폴로지 정보 */}
          {specs.topology && specs.topology.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600">
                <CircuitBoard className="w-5 h-5" />
                토폴로지
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Settings className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-gray-500">지원 토폴로지</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {specs.topology.map((topo, idx) => (
                    <Badge key={idx} className="bg-green-100 text-green-800 hover:bg-green-200">
                      {topo}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 채널 정보 */}
          {specs.channels && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                <Layers className="w-5 h-5" />
                채널 정보
              </h3>
              <SpecCard 
                title="채널 수" 
                value={specs.channels.toString()}
                icon={<Layers className="w-5 h-5 text-indigo-500" />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 