"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LEDDriverICInfoSchema } from "@/app/supabase/schemas/LEDDriverIC";
import { z } from "zod";
import React from "react";
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
  ChevronRight,
  Clock,
  Activity,
  Maximize,
  Radio
} from "lucide-react";

interface ProductMainSpecsProps {
  product: {
    specifications: z.infer<typeof LEDDriverICInfoSchema>;
  };
}

export default function ProductMainSpecs({ product }: ProductMainSpecsProps) {
  const specs = product.specifications.led_driver_ic;
  if (!specs) return null;

  // 값이 존재하는지 확인하는 헬퍼 함수
  const hasValue = (value: any) => value !== null && value !== undefined;
  
  // 값 포맷팅 헬퍼 함수
  const formatValue = (min: any, max: any, typ: any, unit: string = "") => {
    if (hasValue(typ)) return `${typ} ${unit}`.trim();
    if (hasValue(min) && hasValue(max)) return `${min} ~ ${max} ${unit}`.trim();
    if (hasValue(min)) return `최소 ${min} ${unit}`.trim();
    if (hasValue(max)) return `최대 ${max} ${unit}`.trim();
    return null;
  };

  // 스펙 아이템 컴포넌트
  const SpecItem = ({ 
    icon, 
    label, 
    value, 
    unit = "", 
    className = "",
    color = "text-gray-500"
  }: any) => {
    if (!hasValue(value)) return null;
    
    return (
      <div className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${className}`}>
        <div className="flex items-center gap-2">
          {icon && <span className={`${color}`}>{icon}</span>}
          <span className="text-gray-600">{label}</span>
        </div>
        <span className="font-medium text-gray-900">
          {value} {unit}
        </span>
      </div>
    );
  };

  // 스펙 그룹 컴포넌트
  const SpecGroup = ({ 
    title, 
    children, 
    className = "", 
    titleColor = "text-gray-700" 
  }: any) => {
    if (!children || React.Children.count(children) === 0) return null;
    
    return (
      <div className={`mb-4 ${className}`}>
        <h4 className={`text-sm font-medium mb-1 ${titleColor} pl-3`}>{title}</h4>
        <div className="pl-2">
          {children}
        </div>
      </div>
    );
  };

  // LED 드라이버 IC 사양 표시를 위한 코드 예시
  const LEDDriverSpecs = ({ specs }: { specs: z.infer<typeof LEDDriverICInfoSchema> }) => {
    if (!specs) return null;
    
  return (
      <div className="space-y-6">
          {/* 전기적 특성 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">전기적 특성</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.input_voltage && (
              <SpecCard 
                title="입력 전압" 
                value={`${specs.input_voltage.min || '?'} ~ ${specs.input_voltage.max || '?'} ${specs.input_voltage.unit || 'V'}`}
                icon={<Gauge className="w-5 h-5 text-blue-500" />}
              />
            )}
            
            {specs.output_voltage && (
              <SpecCard 
                title="출력 전압" 
                value={`${specs.output_voltage.min || '?'} ~ ${specs.output_voltage.max || '?'} ${specs.output_voltage.unit || 'V'}`}
                icon={<Gauge className="w-5 h-5 text-green-500" />}
              />
            )}
            
            {specs.output_current && (
              <SpecCard 
                title="출력 전류" 
                value={`${specs.output_current.min || '?'} ~ ${specs.output_current.max || '?'} ${specs.output_current.unit || 'mA'}`}
                icon={<Gauge className="w-5 h-5 text-amber-500" />}
              />
            )}
            
            {specs.switching_frequency && (
              <SpecCard 
                title="스위칭 주파수" 
                value={`${specs.switching_frequency.typ || '?'} ${specs.switching_frequency.unit || 'kHz'}`}
                icon={<Gauge className="w-5 h-5 text-purple-500" />}
              />
            )}
          </div>
        </div>
        
        {/* 패키지 정보 */}
        {specs.package_type && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">패키지 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpecCard 
                title="패키지 타입" 
                value={specs.package_type}
                icon={<Package className="w-5 h-5 text-slate-500" />}
              />
              {specs.thermal_pad !== undefined && (
                <SpecCard 
                  title="써멀 패드" 
                  value={specs.thermal_pad ? "있음" : "없음"}
                  icon={<CircuitBoard className="w-5 h-5 text-slate-500" />}
                />
              )}
            </div>
          </div>
        )}
        
        {/* 토폴로지 정보 */}
        {specs.topology && specs.topology.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">토폴로지</h3>
            <div className="flex flex-wrap gap-2">
              {specs.topology.map((topo, idx) => (
                <Badge key={idx} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {topo}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* 추가 특성들 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">추가 특성</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.channels && (
              <SpecCard 
                title="채널 수" 
                value={specs.channels.toString()}
                icon={<Layers className="w-5 h-5 text-indigo-500" />}
              />
            )}
            
            {specs.dimming_method && specs.dimming_method.length > 0 && (
              <SpecCard 
                title="조정 방법" 
                value={specs.dimming_method.join(', ')}
                icon={<Layers className="w-5 h-5 text-indigo-500" />}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  // 스펙 카드 컴포넌트
  const SpecCard = ({ title, value, icon }: { title: string, value: string, icon?: React.ReactNode }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="font-medium">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 왼쪽 컬럼 */}
        <div className="space-y-8">
          {/* 전기적 특성 */}
          {(hasValue(specs.input_voltage) || hasValue(specs.output_voltage) || hasValue(specs.output_current) || 
            (hasValue(specs.current_accuracy) && specs.channels > 1)) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-600">
                <Zap className="w-5 h-5" />
                전기적 특성
              </h3>
              <div className="rounded-xl p-4 space-y-1 border border-blue-300">
                <SpecGroup title="전압 특성" titleColor="text-blue-600">
                  <SpecItem 
                    icon={<Gauge className="w-4 h-4" />}
                    label="입력 전압" 
                    value={formatValue(
                      specs.input_voltage?.min, 
                      specs.input_voltage?.max, 
                      specs.input_voltage?.typ
                    )} 
                    unit={specs.input_voltage?.unit || "V"} 
                    color="text-blue-500"
                  />
                  <SpecItem 
                    icon={<Gauge className="w-4 h-4" />}
                    label="출력 전압"
                    value={formatValue(
                      specs.output_voltage?.min, 
                      specs.output_voltage?.max, 
                      specs.output_voltage?.typ
                    )}
                    unit={specs.output_voltage?.unit || "V"}
                    color="text-blue-500"
                  />
                </SpecGroup>
                
                <SpecGroup title="전류 특성" titleColor="text-blue-600">
                  <SpecItem 
                    icon={<Activity className="w-4 h-4" />}
                    label="출력 전류"
                    value={formatValue(
                      specs.output_current?.min, 
                      specs.output_current?.max, 
                      specs.output_current?.typ
                    )}
                    unit={specs.output_current?.unit || "mA"}
                    color="text-blue-500"
                  />
                  
                  {hasValue(specs.current_accuracy) && specs.channels > 1 && (
                    <>
                      <SpecItem 
                        icon={<Maximize className="w-4 h-4" />}
                        label="IC 간 정확도" 
                        value={specs.current_accuracy?.between_ics} 
                        unit="%" 
                        color="text-blue-500"
                      />
                      <SpecItem 
                        icon={<Maximize className="w-4 h-4" />}
                        label="채널 간 정확도" 
                        value={specs.current_accuracy?.between_channels} 
                        unit="%" 
                        color="text-blue-500"
                      />
                    </>
                  )}
                </SpecGroup>
              </div>
            </div>
          )}

          {/* 주파수 특성 */}
          {(hasValue(specs.switching_frequency) || hasValue(specs.gray_scale_clock_frequency) || 
            hasValue(specs.data_clock_frequency)) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-600">
                <Clock className="w-5 h-5" />
                주파수 특성
              </h3>
              <div className="rounded-xl p-4 space-y-1 border border-purple-300">
                <SpecItem 
                  icon={<Radio className="w-4 h-4" />}
                  label="스위칭 주파수" 
                  value={formatValue(
                    specs.switching_frequency?.min, 
                    specs.switching_frequency?.max, 
                    specs.switching_frequency?.typ
                  )} 
                  unit={specs.switching_frequency?.unit || "kHz"} 
                  color="text-purple-500"
                />
                <SpecItem 
                  icon={<Radio className="w-4 h-4" />}
                  label="그레이스케일 클럭 주파수" 
                  value={formatValue(
                    specs.gray_scale_clock_frequency?.min, 
                    specs.gray_scale_clock_frequency?.max, 
                    specs.gray_scale_clock_frequency?.typ
                  )} 
                  unit={specs.gray_scale_clock_frequency?.unit || "Hz"} 
                  color="text-purple-500"
                />
                <SpecItem 
                  icon={<Radio className="w-4 h-4" />}
                  label="데이터 클럭 주파수" 
                  value={formatValue(
                    specs.data_clock_frequency?.min, 
                    specs.data_clock_frequency?.max, 
                    specs.data_clock_frequency?.typ
                  )} 
                  unit={specs.data_clock_frequency?.unit || "Hz"} 
                  color="text-purple-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="space-y-8">
          {/* 채널 및 토폴로지 */}
          {(hasValue(specs.channels) || hasValue(specs.internal_switch) || 
            (specs.topology && specs.topology.length > 0) || 
            (specs.dimming_method && specs.dimming_method.length > 0)) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600">
                <CircuitBoard className="w-5 h-5" />
                채널 및 토폴로지
              </h3>
              <div className="rounded-xl p-4 space-y-1 border border-green-300">
                <SpecGroup title="채널 구성" titleColor="text-green-600">
                  <SpecItem 
                    icon={<Grid className="w-4 h-4" />}
                    label="채널 수" 
                    value={specs.channels} 
                    color="text-green-500"
                  />
                  {hasValue(specs.internal_switch) && (
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">내부 스위치</span>
                      </div>
                      <Badge variant="secondary" className={specs.internal_switch ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}>
                        {specs.internal_switch ? "포함" : "미포함"}
                      </Badge>
                    </div>
                  )}
                </SpecGroup>
                
                {specs.topology && specs.topology.length > 0 && (
                  <SpecGroup title="회로 구성" titleColor="text-green-600">
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <CircuitBoard className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">토폴로지</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {specs.topology.map((topo, i) => (
                          <Badge key={i} variant="secondary" className="bg-green-100 text-green-700 border border-green-200">
                            {topo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </SpecGroup>
                )}
                
                {specs.dimming_method && specs.dimming_method.length > 0 && (
                  <SpecGroup title="제어 방식" titleColor="text-green-600">
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">조정 방법</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {specs.dimming_method.map((method, i) => (
                          <Badge key={i} variant="secondary" className="bg-green-100 text-green-700 border border-green-200">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </SpecGroup>
                )}
              </div>
            </div>
          )}

          {/* 패키지 정보 */}
          {(hasValue(specs.package_type) || hasValue(specs.package_case) || 
            hasValue(specs.supply_package) || hasValue(specs.mounting_type) || 
            hasValue(specs.thermal_pad) || hasValue(specs.operating_temperature)) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-600">
                <Package className="w-5 h-5" />
                패키지 정보
              </h3>
              <div className="rounded-xl p-4 space-y-1 border border-orange-300">
                <SpecGroup title="패키지 유형" titleColor="text-orange-600">
                  <SpecItem 
                    icon={<Package className="w-4 h-4" />}
                    label="패키지 타입" 
                    value={specs.package_type} 
                    color="text-orange-500"
                  />
                  <SpecItem 
                    icon={<Package className="w-4 h-4" />}
                    label="패키지/케이스" 
                    value={specs.package_case} 
                    color="text-orange-500"
                  />
                  <SpecItem 
                    icon={<Package className="w-4 h-4" />}
                    label="공급 장치 패키지" 
                    value={specs.supply_package} 
                    color="text-orange-500"
                  />
                </SpecGroup>
                
                <SpecGroup title="실장 특성" titleColor="text-orange-600">
                  <SpecItem 
                    icon={<Layers className="w-4 h-4" />}
                    label="실장 유형" 
                    value={specs.mounting_type} 
                    color="text-orange-500"
                  />
                  {hasValue(specs.thermal_pad) && (
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-600">써멀 패드</span>
                      </div>
                      <Badge variant="secondary" className={specs.thermal_pad ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}>
                        {specs.thermal_pad ? "포함" : "미포함"}
                      </Badge>
                    </div>
                  )}
                </SpecGroup>
                
                <SpecGroup title="환경 특성" titleColor="text-orange-600">
                  <SpecItem 
                    icon={<Thermometer className="w-4 h-4" />}
                    label="동작 온도" 
                    value={formatValue(
                      specs.operating_temperature?.min, 
                      specs.operating_temperature?.max, 
                      null
                    )} 
                    unit={specs.operating_temperature?.unit || "°C"} 
                    color="text-orange-500"
                  />
                </SpecGroup>
              </div>
            </div>
          )}

          {/* 통신 인터페이스 */}
          {hasValue(specs.communication_interface) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                <Wifi className="w-5 h-5" />
                통신 인터페이스
              </h3>
              <div className="rounded-xl p-4 space-y-1 border border-indigo-300">
                <SpecItem 
                  icon={<Wifi className="w-4 h-4" />}
                  label="인터페이스 타입" 
                  value={specs.communication_interface?.type} 
                  color="text-indigo-500"
                />
                <SpecItem 
                  icon={<Activity className="w-4 h-4" />}
                  label="통신 속도" 
                  value={specs.communication_interface?.speed}
                  unit="MHz"
                  color="text-indigo-500"
                />
                {hasValue(specs.communication_interface?.proprietary) && (
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-indigo-500" />
                      <span className="text-gray-600">독점 프로토콜</span>
                    </div>
                    <Badge variant="secondary" className={specs.communication_interface?.proprietary ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}>
                      {specs.communication_interface?.proprietary ? "독점" : "표준"}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
