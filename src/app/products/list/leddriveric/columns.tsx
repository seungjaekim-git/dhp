"use client";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import convert from 'convert-units';
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Building } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TextFilter, SingleSliderFilter, DualSliderFilter, CheckboxFilter, SelectFilter, ComboboxFilter } from "./filter";

interface Column {
  key: string;
  header: string;
  subheader?: string;
  symbol?: React.ReactNode;
  filterType?: 'text' | 'single-slider' | 'dual-slider' | 'checkbox' | 'select' | 'combobox';
  filterOptions?: string[];
  unit?: {
    current: string;
    available: string[];
    onChange: (unit: string) => void;
  };
  render?: (row: any) => React.ReactNode;
  tooltip?: {
    title: string;
    description: string;
    specs?: Array<{
      label: string;
      value: string;
      unit?: string;
    }>;
    ranges?: {
      min: number;
      max: number;
      unit: string;
    };
  };
}

export const UnitSelector = ({ currentUnit, availableUnits, onUnitChange }: {
  currentUnit: string;
  availableUnits: string[];
  onUnitChange: (unit: string) => void;
}) => (
  <Select value={currentUnit} onValueChange={onUnitChange}>
    <SelectTrigger className="w-[60px] h-[25px] bg-white/50 hover:bg-white/80 transition-colors">
      <SelectValue>{currentUnit}</SelectValue>
    </SelectTrigger>
    <SelectContent>
      {availableUnits.map(unit => (
        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const formatValue = (value: number | undefined, fromUnit: string, toUnit: string) => {
  try {
    if (value === undefined) return 'N/A';
    if (fromUnit === toUnit) return value;
    const converted = convert(value).from(fromUnit).to(toUnit);
    return Number(converted.toFixed(2));
  } catch (e) {
    return value;
  }
};

interface FilterOptions {
  categories?: string[];
  certifications?: string[];
  applications?: string[];
  topologies?: string[];
  dimmingMethods?: string[];
  mountingStyles?: string[];
  storageTypes?: string[];
  packageTypes?: string[];
  thermalPadOptions?: string[];
  numberOfOutputs?: string[];
}

export const useColumns = (filterOptions: FilterOptions = {}): Column[] => {
  const [inputVoltageUnit, setInputVoltageUnit] = React.useState('V');
  const [outputVoltageUnit, setOutputVoltageUnit] = React.useState('V');
  const [currentUnit, setCurrentUnit] = React.useState('mA');
  const [tempUnit, setTempUnit] = React.useState('C');
  const [freqUnit, setFreqUnit] = React.useState('kHz');

  return [
    {
      key: "name",
      header: "기본 정보", 
      subheader: "제품명",
      filterType: 'text',
      tooltip: {
        title: "제품명",
        description: "제품의 공식 모델명과 부제목입니다.",
        specs: [
          { label: "명명 규칙", value: "시리즈-전압-전류" },
          { label: "예시", value: "LD5000-12V-350mA" }
        ]
      },
      render: (row) => (
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between w-full">
            <Link 
              href={`/partners/${row.manufacturer?.slug}`}
              className="flex items-center gap-2 hover:bg-blue-100/50 p-2 rounded-md transition-colors w-1/2"
            >
              <Building className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {row.manufacturer?.name || 'Unknown Manufacturer'}
              </span>
            </Link>

            <div className="flex items-center gap-2 w-1/2 justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-blue-100/50 w-32"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    펼쳐보기
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px]">
                  <SheetHeader>
                    <SheetTitle>{row.name}</SheetTitle>
                    <SheetDescription>{row.subtitle}</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">기본 정보</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>제조사</div>
                        <div>{row.manufacturer?.name}</div>
                        <div>카테고리</div>
                        <div>{row.categories?.map((cat: any) => cat.category.name).join(', ')}</div>
                        <div>토폴로지</div>
                        <div>{row.topologies?.join(', ')}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">전기적 특성</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>입력 전압</div>
                        <div>{row.input_voltage?.min} ~ {row.input_voltage?.max}V</div>
                        <div>출력 전압</div>
                        <div>{row.output_voltage?.min} ~ {row.output_voltage?.max}V</div>
                        <div>출력 전류</div>
                        <div>{row.output_current?.min} ~ {row.output_current?.max}mA</div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <Link href={`/products/detail/${row.id}`}>
            <div className="bg-blue-50/20 p-3 rounded-md shadow-lg max-w-sm hover:bg-blue-100/30 cursor-pointer transition-colors">
              <div className="flex flex-col">
                <div className="line-clamp-1 font-bold text-lg">{row.name || 'N/A'}</div>
                <span className="text-muted-foreground text-sm truncate">{row.subtitle || 'N/A'}</span>
              </div>
            </div>
          </Link>
        </div>
      )
    },
    {
      key: "categories",
      header: "기본 정보",
      subheader: "카테고리", 
      filterType: 'combobox',
      filterOptions: filterOptions.categories || [],
      tooltip: {
        title: "제품 카테고리",
        description: "제품이 속한 카테고리 분류입니다.",
      },
      render: (row) => {
        const validCategories = row.categories?.filter((cat: any) => cat.category?.name && cat.category?.parent_id != null) || [];
        
        if (validCategories.length === 0) {
          return (
            <div className="flex items-center h-[28px] px-1">
              <Badge 
                variant="outline" 
                className="bg-gray-50/50 text-gray-400 h-[24px] min-w-[60px] flex items-center justify-center"
              >
                N/A
              </Badge>
            </div>
          );
        }

        return (
          <div className="flex flex-wrap gap-1.5 px-1">
            {validCategories.map((cat: any) => (
              <Badge 
                key={cat.category.name}
                variant="outline"
                className="bg-blue-50/30 hover:bg-blue-100/40 text-blue-700 
                          transition-all duration-200 cursor-pointer
                          h-[24px] min-w-[80px] flex items-center justify-center
                          border border-blue-200 shadow-sm
                          font-medium text-xs"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('setFilter', {
                    detail: {
                      key: 'categories',
                      value: cat.category.name
                    }
                  }));
                }}
              >
                {cat.category.name}
              </Badge>
            ))}
          </div>
        );
      }
    },
    {
      key: "topologies",
      header: "기본 정보", 
      subheader: "토폴로지",
      filterType: 'checkbox',
      filterOptions: filterOptions.topologies || [],
      tooltip: {
        title: "전력 변환 토폴로지",
        description: "IC가 지원하는 전력 변환 방식입니다.",
        specs: [
          { label: "Buck", value: "강압형" },
          { label: "Boost", value: "승압형" },
          { label: "Buck-Boost", value: "승강압형" },
          { label: "Charge Pump", value: "전하 펌프" }
        ]
      },
      render: (row) => (
        <div className="flex flex-wrap gap-2 justify-end p-1">
          {!row.specifications?.topology || row.specifications.topology.length === 0 ? (
            <Badge variant="outline" className="bg-amber-50/20 hover:bg-amber-100/30 transition-colors px-3 py-1">N/A</Badge>
          ) : (
            row.specifications.topology.map((topology: string) => (
              <Badge key={topology} variant="outline" className="bg-amber-50/20 hover:bg-amber-100/30 transition-colors px-3 py-1">
                {topology}
              </Badge>
            ))
          )}
        </div>
      )
    },
    {
      key: "dimming_methods",
      header: "기본 정보",
      subheader: "디밍 방식",
      filterType: 'checkbox', 
      filterOptions: filterOptions.dimmingMethods || [],
      tooltip: {
        title: "밝기 조절 방식",
        description: "LED 밝기를 제어하는 방식입니다.",
        specs: [
          { label: "PWM", value: "펄스 폭 변조" },
          { label: "Analog", value: "아날로그 전류 제어" }
        ]
      },
      render: (row) => (
        <div className="flex flex-wrap gap-1 justify-end">
          {!row.specifications?.dimming_method || row.specifications.dimming_method.length === 0 ? (
            <Badge variant="outline" className="bg-amber-50/20 hover:bg-amber-100/30 transition-colors">N/A</Badge>
          ) : (
            row.specifications.dimming_method.map((method: string) => (
              <Badge key={method} variant="outline" className="bg-amber-50/20 hover:bg-amber-100/30 transition-colors">
                {method}
              </Badge>
            ))
          )}
        </div>
      )
    },
    {
      key: "number_of_outputs",
      header: "전기적 특성",
      subheader: "출력 수",
      symbol: <div>N<sub>ch</sub></div>,
      filterType: 'select',
      filterOptions: filterOptions.numberOfOutputs || [],
      tooltip: {
        title: "출력 채널 수",
        description: "LED 드라이버 IC가 지원하는 독립적인 출력 채널의 수입니다.",
        specs: [
          { label: "최소 출력", value: "1" },
          { label: "최대 출력", value: "4+" },
          { label: "병렬 연결", value: "지원" }
        ]
      },
      render: (row) => (
        <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 font-bold ml-auto rounded-md">
          {row.specifications?.channels || 'N/A'}
        </div>
      )
    },
    {
      key: "input_voltage_range",
      header: "전기적 특성",
      subheader: "입력 전압",
      symbol: <div>V<sub>IN</sub></div>,
      filterType: 'dual-slider',
      unit: {
        current: inputVoltageUnit,
        available: ['V', 'mV', 'kV'],
        onChange: setInputVoltageUnit
      },
      tooltip: {
        title: "입력 전압 범위",
        description: "IC의 정상 작동을 위한 입력 전압 범위입니다.",
        specs: [
          { label: "최소 전압", value: "3.3", unit: "V" },
          { label: "최대 전압", value: "60", unit: "V" },
          { label: "권장 동작 전압", value: "12-24", unit: "V" }
        ],
        ranges: {
          min: 3.3,
          max: 60,
          unit: "V"
        }
      },
      render: (row) => {
        const baseUnit = row.specifications?.input_voltage?.unit || 'V';
        const minV = row.specifications?.input_voltage?.min !== undefined ? formatValue(row.specifications.input_voltage.min, baseUnit, inputVoltageUnit) : null;
        const maxV = row.specifications?.input_voltage?.max !== undefined ? formatValue(row.specifications.input_voltage.max, baseUnit, inputVoltageUnit) : null;
        const typV = row.specifications?.input_voltage?.typical !== undefined ? formatValue(row.specifications.input_voltage.typical, baseUnit, inputVoltageUnit) : null;
        
        let displayText = 'N/A';
        if (minV !== null || maxV !== null) {
          if (minV !== null && maxV !== null) {
            displayText = `${minV} ~ ${maxV}`;
          } else if (minV !== null) {
            displayText = `>${minV}`;
          } else if (maxV !== null) {
            displayText = `<${maxV}`;
          }
          if (typV !== null) {
            displayText += ` (typ. ${typV})`;
          }
        }

        return (
          <div className="flex items-center gap-2 justify-end">
            <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 rounded-md">
              {displayText}
            </div>
          </div>
        );
      }
    },
    {
      key: "output_voltage_range",
      header: "전기적 특성",
      subheader: "출력 전압",
      symbol: <div>V<sub>OUT</sub></div>,
      filterType: 'dual-slider',
      unit: {
        current: outputVoltageUnit,
        available: ['V', 'mV', 'kV'],
        onChange: setOutputVoltageUnit
      },
      tooltip: {
        title: "출력 전압 범위",
        description: "LED 구동을 위한 출력 전압 범위입니다.",
        specs: [
          { label: "최소 전압", value: "1", unit: "V" },
          { label: "최대 전압", value: "60", unit: "V" }
        ],
        ranges: {
          min: 1,
          max: 60,
          unit: "V"
        }
      },
      render: (row) => {
        const baseUnit = row.specifications?.output_voltage?.unit || 'V';
        const minV = row.specifications?.output_voltage?.min !== undefined ? formatValue(row.specifications.output_voltage.min, baseUnit, outputVoltageUnit) : null;
        const maxV = row.specifications?.output_voltage?.max !== undefined ? formatValue(row.specifications.output_voltage.max, baseUnit, outputVoltageUnit) : null;
        const typV = row.specifications?.output_voltage?.typical !== undefined ? formatValue(row.specifications.output_voltage.typical, baseUnit, outputVoltageUnit) : null;
        
        let displayText = 'N/A';
        if (minV !== null || maxV !== null) {
          if (minV !== null && maxV !== null) {
            displayText = `${minV} ~ ${maxV}`;
          } else if (minV !== null) {
            displayText = `>${minV}`;
          } else if (maxV !== null) {
            displayText = `<${maxV}`;
          }
          if (typV !== null) {
            displayText += ` (typ. ${typV})`;
          }
        }

        return (
          <div className="flex items-center gap-2 justify-end">
            <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 rounded-md">
              {displayText}
            </div>
          </div>
        );
      }
    },
    {
      key: "output_current_range",
      header: "전기적 특성",
      subheader: "출력 전류",
      symbol: <div>I<sub>OUT</sub></div>,
      filterType: 'dual-slider',
      unit: {
        current: currentUnit,
        available: ['mA', 'A', 'µA'],
        onChange: setCurrentUnit
      },
      tooltip: {
        title: "출력 전류 범위",
        description: "IC가 제공할 수 있는 LED 구동 전류의 범위입니다.",
        specs: [
          { label: "최소 전류", value: "20", unit: "mA" },
          { label: "최대 전류", value: "1500", unit: "mA" },
          { label: "전류 정확도", value: "±3", unit: "%" }
        ],
        ranges: {
          min: 20,
          max: 1500,
          unit: "mA"
        }
      },
      render: (row) => {
        const baseUnit = row.specifications?.output_current?.unit || 'mA';
        const minA = row.specifications?.output_current?.min !== undefined ? formatValue(row.specifications.output_current.min, baseUnit, currentUnit) : null;
        const maxA = row.specifications?.output_current?.max !== undefined ? formatValue(row.specifications.output_current.max, baseUnit, currentUnit) : null;
        const typA = row.specifications?.output_current?.typical !== undefined ? formatValue(row.specifications.output_current.typical, baseUnit, currentUnit) : null;
        
        let displayText = 'N/A';
        if (minA !== null || maxA !== null) {
          if (minA !== null && maxA !== null) {
            displayText = `${minA} ~ ${maxA}`;
          } else if (minA !== null) {
            displayText = `>${minA}`;
          } else if (maxA !== null) {
            displayText = `<${maxA}`;
          }
          if (typA !== null) {
            displayText += ` (typ. ${typA})`;
          }
        }

        return (
          <div className="flex items-center gap-2 justify-end">
            <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 rounded-md">
              {displayText}
            </div>
          </div>
        );
      }
    },
    {
      key: "current_accuracy",
      header: "전기적 특성",
      subheader: "전류 정확도",
      symbol: <div>ΔI<sub>OUT</sub></div>,
      filterType: 'single-slider',
      tooltip: {
        title: "전류 정확도",
        description: "채널 간 및 IC 간의 전류 정확도입니다.",
        specs: [
          { label: "채널 간", value: "±3", unit: "%" },
          { label: "IC 간", value: "±5", unit: "%" }
        ]
      },
      render: (row) => (
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 rounded-md">
            Ch: ±{row.specifications?.current_accuracy?.between_channels || 'N/A'}%
          </div>
          <div className="font-mono bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 rounded-md">
            IC: ±{row.specifications?.current_accuracy?.between_ics || 'N/A'}%
          </div>
        </div>
      )
    },
    {
      key: "switching_frequency",
      header: "전기적 특성",
      subheader: "스위칭 주파수",
      symbol: <div>f<sub>SW</sub></div>,
      filterType: 'dual-slider',
      unit: {
        current: freqUnit,
        available: ['Hz', 'kHz', 'MHz'],
        onChange: setFreqUnit
      },
      tooltip: {
        title: "스위칭 주파수",
        description: "LED 드라이버의 동작 주파수입니다.",
        specs: [
          { label: "최소 주파수", value: "100", unit: "kHz" },
          { label: "최대 주파수", value: "2000", unit: "kHz" }
        ]
      },
      render: (row) => {
        const baseUnit = row.specifications?.switching_frequency?.unit || 'kHz';
        const minF = row.specifications?.switching_frequency?.min !== undefined ? formatValue(row.specifications.switching_frequency.min, baseUnit, freqUnit) : null;
        const maxF = row.specifications?.switching_frequency?.max !== undefined ? formatValue(row.specifications.switching_frequency.max, baseUnit, freqUnit) : null;
        const typF = row.specifications?.switching_frequency?.typical !== undefined ? formatValue(row.specifications.switching_frequency.typical, baseUnit, freqUnit) : null;
        
        let displayText = 'N/A';
        if (minF !== null || maxF !== null || typF !== null) {
          if (minF !== null && maxF !== null) {
            displayText = `${minF} ~ ${maxF}`;
          } else if (minF !== null) {
            displayText = `>${minF}`;
          } else if (maxF !== null) {
            displayText = `<${maxF}`;
          } else if (typF !== null) {
            displayText = `${typF}`;
          }
          if (typF !== null && (minF !== null || maxF !== null)) {
            displayText += ` (typ. ${typF})`;
          }
        }

        return (
          <div className="flex items-center gap-2 justify-end">
            <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 rounded-md">
              {displayText}
            </div>
          </div>
        );
      }
    },
    {
      key: "operating_temperature",
      header: "전기적 특성",
      subheader: "동작 온도",
      symbol: <div>T<sub>OPR</sub></div>,
      filterType: 'dual-slider',
      unit: {
        current: tempUnit,
        available: ['C', 'F', 'K'],
        onChange: setTempUnit
      },
      tooltip: {
        title: "동작 온도 범위",
        description: "IC가 안정적으로 동작할 수 있는 온도 범위입니다.",
        specs: [
          { label: "최소 온도", value: "-40", unit: "°C" },
          { label: "최대 온도", value: "125", unit: "°C" },
          { label: "권장 동작 온도", value: "-20~85", unit: "°C" }
        ],
        ranges: {
          min: -40,
          max: 125,
          unit: "°C"
        }
      },
      render: (row) => {
        const baseUnit = (row.specifications?.operating_temperature?.unit || '°C').replace('°', '');
        const minT = row.specifications?.operating_temperature?.min !== undefined ? formatValue(row.specifications.operating_temperature.min, baseUnit, tempUnit) : null;
        const maxT = row.specifications?.operating_temperature?.max !== undefined ? formatValue(row.specifications.operating_temperature.max, baseUnit, tempUnit) : null;
        const typT = row.specifications?.operating_temperature?.typical !== undefined ? formatValue(row.specifications.operating_temperature.typical, baseUnit, tempUnit) : null;
        
        let displayText = 'N/A';
        if (minT !== null || maxT !== null) {
          if (minT !== null && maxT !== null) {
            displayText = `${minT} ~ ${maxT}`;
          } else if (minT !== null) {
            displayText = `>${minT}`;
          } else if (maxT !== null) {
            displayText = `<${maxT}`;
          }
          if (typT !== null) {
            displayText += ` (typ. ${typT})`;
          }
        }

        return (
          <div className="flex items-center gap-2 justify-end">
            <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 hover:bg-green-100/30 transition-colors p-2 rounded-md">
              {displayText}
            </div>
          </div>
        );
      }
    },
    {
      key: "mounting_style",
      header: "패키지 정보",
      subheader: "실장 방식",
      filterType: 'select',
      filterOptions: filterOptions.mountingStyles || [],
      tooltip: {
        title: "실장 방식",
        description: "IC의 PCB 장착 방식입니다.",
        specs: [
          { label: "SMD", value: "표면 실장 부품" },
          { label: "Through Hole", value: "삽입 실장 부품" },
          { label: "권장 실장", value: "SMD" }
        ]
      },
      render: (row) => (
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 hover:bg-purple-100/30 transition-colors p-2 ml-auto rounded-md">
          {row.specifications?.mounting_type || 'N/A'}
        </div>
      )
    },
    {
      key: "storage_type",
      header: "패키지 정보", 
      subheader: "보관 유형",
      filterType: 'select',
      filterOptions: filterOptions.storageTypes || [],
      tooltip: {
        title: "보관 및 운송 방식",
        description: "IC의 패키징 및 운송을 위한 보관 방식입니다.",
        specs: [
          { label: "Tape & Reel", value: "자동화 조립용" },
          { label: "Tube", value: "수동 조립용" },
          { label: "Tray", value: "대량 보관용" }
        ]
      },
      render: (row) => (
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 hover:bg-purple-100/30 transition-colors p-2 ml-auto rounded-md">
          {row.supply_package || 'N/A'}
        </div>
      )
    },
    {
      key: "package_type",
      header: "패키지 정보",
      subheader: "패키지 타입",
      filterType: 'select',
      filterOptions: filterOptions.packageTypes || [],
      tooltip: {
        title: "패키지 유형",
        description: "IC의 물리적 패키지 형태입니다.",
        specs: [
          { label: "SOP", value: "Small Outline Package" },
          { label: "SOIC", value: "Small Outline IC" },
          { label: "QFN", value: "Quad Flat No-leads" },
          { label: "DIP", value: "Dual In-line Package" }
        ]
      },
      render: (row) => (
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 hover:bg-purple-100/30 transition-colors p-2 ml-auto rounded-md">
          {row.package_type || 'N/A'}
        </div>
      )
    },
    {
      key: "thermal_pad",
      header: "패키지 정보",
      subheader: "써멀패드",
      symbol: <div>T<sub>PAD</sub></div>,
      filterType: 'select',
      filterOptions: filterOptions.thermalPadOptions || [],
      tooltip: {
        title: "써멀패드 유무",
        description: "열 방출을 위한 써멀패드 포함 여부입니다.",
        specs: [
          { label: "열 방출", value: "향상된 방열 성능" },
          { label: "PCB 설계", value: "써멀패드 고려 필요" }
        ]
      },
      render: (row) => (
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 hover:bg-purple-100/30 transition-colors p-2 ml-auto rounded-md">
          {row.specifications?.thermal_pad === undefined ? 'N/A' : (row.specifications.thermal_pad ? 'Yes' : 'No')}
        </div>
      )
    },
    {
      key: "package_detail",
      header: "패키지 정보",
      subheader: "패키지 상세",
      filterType: 'text',
      tooltip: {
        title: "패키지 상세 정보",
        description: "IC 패키지의 상세 규격 정보입니다.",
        specs: [
          { label: "크기", value: "4x4mm" },
          { label: "높이", value: "0.9mm" },
          { label: "핀 수", value: "16-pin" }
        ]
      },
      render: (row) => (
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 hover:bg-purple-100/30 transition-colors p-2 ml-auto rounded-md">
          {row.package_case || 'N/A'}
        </div>
      )
    },
    {
      key: "certifications",
      header: "인증/응용",
      subheader: "인증",
      filterType: 'select',
      filterOptions: ['UL', 'CE', 'KC', 'CCC'],
      tooltip: {
        title: "획득 인증",
        description: "제품이 획득한 국제 안전 인증입니다.",
        specs: [
          { label: "UL", value: "미국 안전 인증" },
          { label: "CE", value: "유럽 안전 인증" },
          { label: "KC", value: "한국 안전 인증" },
          { label: "CCC", value: "중국 안전 인증" }
        ]
      },
      render: (row) => (
        <div className="flex flex-wrap gap-1 justify-end">
          {!row.certifications || row.certifications.length === 0 ? (
            <Badge variant="outline" className="bg-pink-50/20 hover:bg-pink-100/30 transition-colors">N/A</Badge>
          ) : (
            row.certifications.map((cert: any) => (
              <Badge key={cert.certification.name} variant="outline" className="bg-pink-50/20 hover:bg-pink-100/30 transition-colors">
                {cert.certification.name}
              </Badge>
            ))
          )}
        </div>
      )
    },
    {
      key: "applications",
      header: "인증/응용",
      subheader: "응용분야", 
      filterType: 'select',
      filterOptions: ['Lighting', 'Automotive', 'Industrial', 'Consumer'],
      tooltip: {
        title: "주요 응용 분야",
        description: "제품의 주요 사용 분야입니다.",
        specs: [
          { label: "Lighting", value: "조명" },
          { label: "Automotive", value: "자동차" },
          { label: "Industrial", value: "산업" },
          { label: "Consumer", value: "가전" }
        ]
      },
      render: (row) => (
        <div className="flex flex-wrap gap-1 justify-end">
          {!row.applications || row.applications.length === 0 ? (
            <Badge variant="outline" className="bg-pink-50/20 hover:bg-pink-100/30 transition-colors">N/A</Badge>
          ) : (
            <>
              {row.applications.slice(0, 2).map((app: any) => (
                <Badge key={app.application.name} variant="outline" className="bg-pink-50/20 hover:bg-pink-100/30 transition-colors">
                  {app.application.name}
                </Badge>
              ))}
              {row.applications.length > 2 && (
                <Badge variant="outline" className="bg-pink-50/20 hover:bg-pink-100/30 transition-colors">
                  +{row.applications.length - 2}
                </Badge>
              )}
            </>
          )}
        </div>
      )
    }
  ];
};
