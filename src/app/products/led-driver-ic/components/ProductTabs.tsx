'use client'

import React, { useState } from 'react'
import { 
  Info, Zap, Cpu, Box, ExternalLink, HelpCircle
} from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface ProductTabsProps {
  specifications: any;
  className?: string;
}

// 사양 항목별 툴팁 텍스트
const tooltips: Record<string, string> = {
  channels: "LED 드라이버가 제어할 수 있는 독립 LED 채널의 수",
  topology: "LED 드라이버 IC의 내부 회로 구성 방식",
  dimming_method: "LED 밝기를 제어하는 방식",
  internal_switch: "LED 드라이버 IC 내부에 스위치가 내장되어 있는지 여부",
  input_voltage: "LED 드라이버 IC의 입력 전압 범위",
  output_voltage: "LED 드라이버 IC에서 출력되는 전압 범위",
  output_current: "LED 드라이버 IC에서 출력되는 전류 범위",
  current_accuracy: "채널 간 또는 IC 간의 전류 정확도",
  operating_temperature: "IC의 정상 작동 가능한 온도 범위",
  package_type: "IC의 물리적 패키지 유형",
  thermal_pad: "열 발산을 위한 패드 존재 여부",
  switching_frequency: "LED 드라이버의 스위칭 주파수",
  gray_scale_clock: "그레이스케일 디밍에 사용되는 클럭 주파수",
  data_clock: "데이터 전송에 사용되는 클럭 주파수",
  transmission_interface: "데이터 전송에 사용되는 인터페이스 방식",
  communication_interface: "IC 제어를 위한 통신 인터페이스",
  pwm: "펄스 폭 변조 신호 특성",
  led_matrix: "LED 매트릭스 구성 정보",
};

interface SpecItem {
  label: string;
  value: string | number | boolean;
  tooltipKey?: string;
}

export default function ProductTabs({ specifications, className }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  // 데이터가 없는 경우 빈 컴포넌트 반환
  if (!specifications) return null;
  
  // 사양 항목의 툴팁 키를 가져오는 함수
  const getTooltipKey = (label: string): string => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('채널')) return 'channels';
    if (lowerLabel.includes('토폴로지')) return 'topology';
    if (lowerLabel.includes('디밍')) return 'dimming_method';
    if (lowerLabel.includes('내부 스위치')) return 'internal_switch';
    if (lowerLabel.includes('입력 전압')) return 'input_voltage';
    if (lowerLabel.includes('출력 전압')) return 'output_voltage';
    if (lowerLabel.includes('출력 전류')) return 'output_current';
    if (lowerLabel.includes('전류 정확도')) return 'current_accuracy';
    if (lowerLabel.includes('동작 온도')) return 'operating_temperature';
    if (lowerLabel.includes('패키지')) return 'package_type';
    if (lowerLabel.includes('thermal')) return 'thermal_pad';
    if (lowerLabel.includes('스위칭 주파수')) return 'switching_frequency';
    if (lowerLabel.includes('그레이스케일')) return 'gray_scale_clock';
    if (lowerLabel.includes('데이터 클럭')) return 'data_clock';
    if (lowerLabel.includes('전송 인터페이스')) return 'transmission_interface';
    if (lowerLabel.includes('통신 인터페이스')) return 'communication_interface';
    if (lowerLabel.includes('pwm')) return 'pwm';
    if (lowerLabel.includes('led 매트릭스')) return 'led_matrix';
    return '';
  };

  // 기본 정보 탭 (채널, 토폴로지, 디밍 방식, 내부 스위치) - 탭 0
  const basicSpecs: SpecItem[] = [
    specifications.channels && { 
      label: "채널", 
      value: specifications.channels,
      tooltipKey: 'channels'
    },
    specifications.topology && { 
      label: "토폴로지", 
      value: Array.isArray(specifications.topology) 
        ? specifications.topology.join(', ') 
        : specifications.topology,
      tooltipKey: 'topology'
    },
    specifications.dimming_method && { 
      label: "디밍 방식", 
      value: Array.isArray(specifications.dimming_method) 
        ? specifications.dimming_method.join(', ') 
        : specifications.dimming_method,
      tooltipKey: 'dimming_method'
    },
    specifications.internal_switch !== undefined && { 
      label: "내부 스위치", 
      value: specifications.internal_switch ? "내장" : "외장",
      tooltipKey: 'internal_switch'
    }
  ].filter(Boolean) as SpecItem[];

  // 전기적 특성 탭 (전압, 전류, 스위칭 주파수) - 탭 1
  const electricalSpecs: SpecItem[] = [
    specifications.input_voltage && { 
      label: "입력 전압", 
      value: `${specifications.input_voltage.min || '?'}-${specifications.input_voltage.max || '?'}${specifications.input_voltage.unit || 'V'}`,
      tooltipKey: 'input_voltage'
    },
    specifications.output_voltage && { 
      label: "출력 전압", 
      value: `${specifications.output_voltage.min || '?'}-${specifications.output_voltage.max || '?'}${specifications.output_voltage.unit || 'V'}`,
      tooltipKey: 'output_voltage'
    },
    specifications.output_current && { 
      label: "출력 전류", 
      value: `${specifications.output_current.min || '?'}-${specifications.output_current.max || '?'}${specifications.output_current.unit || 'mA'}`,
      tooltipKey: 'output_current'
    },
    specifications.switching_frequency && { 
      label: "스위칭 주파수", 
      value: `${specifications.switching_frequency.min || '?'}-${specifications.switching_frequency.max || '?'}${specifications.switching_frequency.unit || 'kHz'}`,
      tooltipKey: 'switching_frequency'
    }
  ].filter(Boolean) as SpecItem[];

  // 물리적 특성 (패키지 타입, Thermal Pad, 온도) - 탭 2
  const physicalSpecs: SpecItem[] = [
    specifications.package_type && { 
      label: "패키지 타입", 
      value: specifications.package_type,
      tooltipKey: 'package_type'
    },
    specifications.thermal_pad !== undefined && { 
      label: "Thermal Pad", 
      value: specifications.thermal_pad ? "있음" : "없음",
      tooltipKey: 'thermal_pad'
    },
    specifications.operating_temperature && { 
      label: "동작 온도", 
      value: `${specifications.operating_temperature.min || '?'}~${specifications.operating_temperature.max || '?'}${specifications.operating_temperature.unit || '°C'}`,
      tooltipKey: 'operating_temperature'
    },
    specifications.package_case && { 
      label: "패키지/케이스", 
      value: specifications.package_case
    },
    specifications.mounting_type && { 
      label: "실장 유형", 
      value: specifications.mounting_type
    },
    specifications.supply_package && { 
      label: "공급 패키지", 
      value: specifications.supply_package
    }
  ].filter(Boolean) as SpecItem[];

  // 고급 특성 (통신 인터페이스, PWM, LED 매트릭스) - 탭 3
  const advancedSpecs: SpecItem[] = [
    specifications.communication_interface?.type && {
      label: "통신 인터페이스",
      value: specifications.communication_interface.type,
      tooltipKey: 'communication_interface'
    },
    specifications.pwm?.resolution && {
      label: "PWM 해상도",
      value: Array.isArray(specifications.pwm.resolution) 
        ? specifications.pwm.resolution.join(', ') 
        : specifications.pwm.resolution,
      tooltipKey: 'pwm'
    },
    specifications.led_matrix?.max_pixels && {
      label: "최대 RGB LED 픽셀",
      value: specifications.led_matrix.max_pixels,
      tooltipKey: 'led_matrix'
    },
    specifications.transmission_interface?.topology && {
      label: "전송 인터페이스",
      value: specifications.transmission_interface.topology,
      tooltipKey: 'transmission_interface'
    },
    specifications.current_accuracy?.between_channels && {
      label: "채널 간 전류 정확도",
      value: `${specifications.current_accuracy.between_channels}%`,
      tooltipKey: 'current_accuracy'
    },
    specifications.gray_scale_clock_frequency && {
      label: "그레이스케일 주파수",
      value: `${specifications.gray_scale_clock_frequency.min || '?'}-${specifications.gray_scale_clock_frequency.max || '?'}${specifications.gray_scale_clock_frequency.unit || 'Hz'}`,
      tooltipKey: 'gray_scale_clock'
    }
  ].filter(Boolean) as SpecItem[];

  // 4개 탭에 대한 데이터 배열
  const tabs = [
    { id: 0, label: '기본 정보', icon: <Info className="w-4 h-4" />, data: basicSpecs },
    { id: 1, label: '전기적 특성', icon: <Zap className="w-4 h-4" />, data: electricalSpecs },
    { id: 2, label: '물리적 특성', icon: <Box className="w-4 h-4" />, data: physicalSpecs },
    { id: 3, label: '고급 특성', icon: <Cpu className="w-4 h-4" />, data: advancedSpecs }
  ];

  // 데이터가 있는 탭만 표시
  const filteredTabs = tabs.filter(tab => tab.data.length > 0);

  return (
    <div className={cn("w-full", className)}>
      {/* 모던 스타일의 탭 네비게이션 */}
      <div className="flex w-full mb-4 overflow-x-auto scrollbar-thin">
        {filteredTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-3 min-w-[90px] transition-all duration-200 text-center relative",
              activeTab === tab.id 
                ? "text-[var(--brand-primary)]" 
                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-11 h-11 mb-2 rounded-xl transition-all duration-200",
              activeTab === tab.id 
                ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                : "bg-[var(--bg-tertiary)]/50"
            )}>
              {tab.icon}
            </div>
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--brand-primary)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div className="bg-[var(--bg-tertiary)]/30 rounded-lg border border-[var(--border-primary)] overflow-hidden">
        {filteredTabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "transition-all duration-200",
              activeTab === tab.id ? "block" : "hidden"
            )}
          >
            <div className="p-4 space-y-4">
              {tab.data.length > 0 ? (
                <div className="space-y-3">
                  {tab.data.map((spec, index) => (
                    <div key={index} className="flex justify-between items-start gap-4">
                      <div className="flex items-center text-[var(--text-tertiary)] text-sm">
                        {spec.label}
                        {spec.tooltipKey && tooltips[spec.tooltipKey] && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="ml-1 text-[var(--text-disabled)] hover:text-[var(--text-tertiary)]">
                                  <HelpCircle className="w-3 h-3" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] max-w-[250px]">
                                <p>{tooltips[spec.tooltipKey]}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className={cn(
                        "text-sm font-medium text-right",
                        // 값이 숫자인 경우 브랜드 색상으로 강조
                        !isNaN(Number(spec.value)) 
                          ? "text-[var(--brand-primary)]" 
                          : "text-[var(--text-primary)]"
                      )}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-[var(--text-disabled)] text-sm">
                  이 카테고리에 대한 정보가 없습니다.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 