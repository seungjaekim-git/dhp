"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LEDDriverICInfoSchema } from "@/app/supabase/LEDDriverIC";
import { z } from "zod";
import { CircuitBoard, Zap, Thermometer, Package, Cpu, Wifi, Grid, Settings } from "lucide-react";

interface ProductMainSpecsProps {
  product: {
    specifications: z.infer<typeof LEDDriverICInfoSchema>;
  };
}

export default function ProductMainSpecs({ product }: ProductMainSpecsProps) {
  const specs = product.specifications;
  if (!specs) return null;

  const SpecCard = ({ icon: Icon, title, children }: any) => (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        </div>
        <div className="space-y-3">{children}</div>
      </CardContent>
    </Card>
  );

  const SpecItem = ({ label, value, unit, description }: any) => (
    value && (
      <div className="flex justify-between items-center group relative">
        <span className="text-gray-600">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            {value} {unit}
          </span>
          {description && (
            <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-2 rounded text-sm -top-8 right-0 w-48 z-10">
              {description}
            </div>
          )}
        </div>
      </div>
    )
  );

  const RangeSpec = ({ data, label }: any) => (
    data && (
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">{label}</span>
          <span className="text-gray-900 font-medium">{data.unit}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          {data.min !== undefined && <Badge variant="outline">Min: {data.min}</Badge>}
          {data.typ !== undefined && <Badge variant="secondary">Typ: {data.typ}</Badge>}
          {data.max !== undefined && <Badge variant="outline">Max: {data.max}</Badge>}
        </div>
        {data.description && (
          <p className="text-sm text-gray-500 mt-1">{data.description}</p>
        )}
      </div>
    )
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 전기적 특성 */}
        <SpecCard icon={Zap} title="전기적 특성">
          <RangeSpec data={specs.input_voltage} label="입력 전압" />
          {specs.output_voltage && <Separator className="my-3" />}
          <RangeSpec data={specs.output_voltage} label="출력 전압" />
          {specs.output_current && <Separator className="my-3" />}
          <RangeSpec data={specs.output_current} label="출력 전류" />
          {specs.current_accuracy && (
            <>
              <Separator className="my-3" />
              <div className="space-y-2">
                <span className="text-gray-600">전류 정확도</span>
                <div className="grid grid-cols-2 gap-2">
                  {specs.current_accuracy.between_ics && (
                    <Badge variant="outline">
                      IC 간: {specs.current_accuracy.between_ics}%
                    </Badge>
                  )}
                  {specs.current_accuracy.between_channels && (
                    <Badge variant="outline">
                      채널 간: {specs.current_accuracy.between_channels}%
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </SpecCard>

        {/* 채널 및 인터페이스 */}
        <SpecCard icon={CircuitBoard} title="채널 및 인터페이스">
          <SpecItem label="채널 수" value={specs.channels} />
          {specs.topology && (
            <>
              <Separator className="my-3" />
              <div className="space-y-2">
                <span className="text-gray-600">토폴로지</span>
                <div className="flex flex-wrap gap-2">
                  {specs.topology.map((topo, i) => (
                    <Badge key={i} variant="outline">{topo}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}
          {specs.dimming_method && (
            <>
              <Separator className="my-3" />
              <div className="space-y-2">
                <span className="text-gray-600">조광 방식</span>
                <div className="flex flex-wrap gap-2">
                  {specs.dimming_method.map((method, i) => (
                    <Badge key={i} variant="secondary">{method}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </SpecCard>

        {/* 주파수 특성 */}
        {(specs.switching_frequency || specs.data_clock_frequency || specs.gray_scale_clock_frequency) && (
          <SpecCard icon={Cpu} title="주파수 특성">
            <RangeSpec data={specs.switching_frequency} label="스위칭 주파수" />
            {specs.data_clock_frequency && <Separator className="my-3" />}
            <RangeSpec data={specs.data_clock_frequency} label="데이터 클럭" />
            {specs.gray_scale_clock_frequency && <Separator className="my-3" />}
            <RangeSpec data={specs.gray_scale_clock_frequency} label="그레이스케일 클럭" />
          </SpecCard>
        )}

        {/* 패키지 정보 */}
        {(specs.package_type || specs.mounting_type || specs.thermal_pad !== undefined || specs.internal_switch !== undefined) && (
          <SpecCard icon={Package} title="패키지 정보">
            <SpecItem label="패키지 타입" value={specs.package_type} />
            {specs.mounting_type && <Separator className="my-3" />}
            <SpecItem label="실장 유형" value={specs.mounting_type} />
            {specs.thermal_pad !== undefined && (
              <>
                <Separator className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">써멀 패드</span>
                  <Badge variant="outline">
                    {specs.thermal_pad ? "포함" : "미포함"}
                  </Badge>
                </div>
              </>
            )}
            {specs.internal_switch !== undefined && (
              <>
                <Separator className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">내부 스위치</span>
                  <Badge variant="outline">
                    {specs.internal_switch ? "있음" : "없음"}
                  </Badge>
                </div>
              </>
            )}
          </SpecCard>
        )}

        {/* 통신 인터페이스 */}
        {specs.communication_interface && (
          <SpecCard icon={Wifi} title="통신 인터페이스">
            <SpecItem 
              label="인터페이스 타입" 
              value={specs.communication_interface.type} 
            />
            {specs.communication_interface.speed && (
              <>
                <Separator className="my-3" />
                <SpecItem 
                  label="통신 속도" 
                  value={specs.communication_interface.speed}
                  unit="MHz"
                />
              </>
            )}
            {specs.communication_interface.description && (
              <>
                <Separator className="my-3" />
                <p className="text-sm text-gray-600">{specs.communication_interface.description}</p>
              </>
            )}
          </SpecCard>
        )}

        {/* LED 매트릭스 */}
        {specs.led_matrix && (
          <SpecCard icon={Grid} title="LED 매트릭스">
            {specs.led_matrix.max_pixels && (
              <SpecItem 
                label="최대 픽셀 수" 
                value={specs.led_matrix.max_pixels} 
              />
            )}
            {specs.led_matrix.configuration && (
              <>
                <Separator className="my-3" />
                <SpecItem 
                  label="매트릭스 구성" 
                  value={specs.led_matrix.configuration}
                />
              </>
            )}
            {specs.led_matrix.description && (
              <>
                <Separator className="my-3" />
                <p className="text-sm text-gray-600">{specs.led_matrix.description}</p>
              </>
            )}
          </SpecCard>
        )}

        {/* PWM 특성 */}
        {specs.pwm && (
          <SpecCard icon={Settings} title="PWM 특성">
            {specs.pwm.resolution && (
              <SpecItem 
                label="PWM 해상도" 
                value={specs.pwm.resolution}
              />
            )}
            {specs.pwm.frequency && (
              <>
                <Separator className="my-3" />
                <SpecItem 
                  label="PWM 주파수" 
                  value={specs.pwm.frequency}
                  unit="kHz"
                />
              </>
            )}
            {specs.pwm.description && (
              <>
                <Separator className="my-3" />
                <p className="text-sm text-gray-600">{specs.pwm.description}</p>
              </>
            )}
          </SpecCard>
        )}
      </div>
    </div>
  );
}
