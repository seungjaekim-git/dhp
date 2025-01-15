"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Column {
  key: string;
  header: string;
  subheader?: string;
  filterType?: 'text' | 'range' | 'select';
  filterOptions?: string[];
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

export const useColumns = (): Column[] => {
  return [
    {
      key: "name",
      header: "제품명",
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
        <div className="flex flex-col bg-blue-50/20 p-2">
          <div className="max-w-fit line-clamp-2 font-medium">{row.name}</div>
          <span className="text-muted-foreground text-sm">{row.subtitle}</span>
        </div>
      )
    },
    {
      key: "number_of_outputs",
      header: "전기적 특성",
      subheader: "출력 수",
      filterType: 'select',
      filterOptions: ['1', '2', '3', '4+'],
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
        <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 p-1">
          {row.number_of_outputs}
        </div>
      )
    },
    {
      key: "input_voltage_range",
      header: "전기적 특성",
      subheader: "입력 전압",
      filterType: 'range',
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
        const [min, max] = JSON.parse(row.input_voltage_range || "[0,0]");
        return (
          <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 p-1">
            {min}V ~ {max}V
          </div>
        );
      }
    },
    {
      key: "output_current_range",
      header: "전기적 특성",
      subheader: "출력 전류",
      filterType: 'range',
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
        const [min, max] = JSON.parse(row.output_current_range || "[0,0]");
        return (
          <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 p-1">
            {min}mA ~ {max}mA
          </div>
        );
      }
    },
    {
      key: "operating_temperature",
      header: "전기적 특성",
      subheader: "동작 온도",
      filterType: 'range',
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
        const [min, max] = JSON.parse(row.operating_temperature || "[0,0]");
        return (
          <div className="font-mono max-w-fit line-clamp-2 bg-green-50/20 p-1">
            {min}°C ~ {max}°C
          </div>
        );
      }
    },
    {
      key: "mounting_style",
      header: "패키지 정보",
      subheader: "실장 방식",
      filterType: 'select',
      filterOptions: ['SMD', 'Through Hole'],
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
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 p-1">
          {row.options[0]?.mounting_style}
        </div>
      )
    },
    {
      key: "storage_type",
      header: "패키지 정보",
      subheader: "보관 유형",
      filterType: 'select',
      filterOptions: ['Tape & Reel', 'Tube', 'Tray'],
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
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 p-1">
          {row.options[0]?.storage_type}
        </div>
      )
    },
    {
      key: "package_type",
      header: "패키지 정보",
      subheader: "패키지 타입",
      filterType: 'select',
      filterOptions: ['SOP', 'SOIC', 'QFN', 'DIP'],
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
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 p-1">
          {row.options[0]?.package_types?.[0]?.package_type?.name}
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
        <div className="max-w-fit line-clamp-2 bg-purple-50/20 p-1">
          {row.options[0]?.package_detail}
        </div>
      )
    },
    {
      key: "topologies",
      header: "기술 정보",
      subheader: "토폴로지",
      filterType: 'select',
      filterOptions: ['Buck', 'Boost', 'Buck-Boost'],
      tooltip: {
        title: "전력 변환 토폴로지",
        description: "IC가 지원하는 전력 변환 방식입니다.",
        specs: [
          { label: "Buck", value: "강압형" },
          { label: "Boost", value: "승압형" },
          { label: "Buck-Boost", value: "승강압형" }
        ]
      },
      render: (row) => (
        <div className="text-muted-foreground max-w-fit line-clamp-2 bg-amber-50/20 p-1">
          {row.topologies?.join(", ")}
        </div>
      )
    },
    {
      key: "dimming_methods",
      header: "기술 정보",
      subheader: "디밍 방식",
      filterType: 'select',
      filterOptions: ['PWM', 'Analog', 'Hybrid'],
      tooltip: {
        title: "밝기 조절 방식",
        description: "LED 밝기를 제어하는 방식입니다.",
        specs: [
          { label: "PWM", value: "펄스 폭 변조" },
          { label: "Analog", value: "아날로그 전류 제어" },
          { label: "Hybrid", value: "PWM + Analog 복합" }
        ]
      },
      render: (row) => (
        <div className="text-muted-foreground max-w-fit line-clamp-2 bg-amber-50/20 p-1">
          {row.dimming_methods?.join(", ")}
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
      render: (row) => {
        const certNames = row.certifications?.map((c: any) => c.certification.name);
        return (
          <div className="text-muted-foreground max-w-fit line-clamp-2 bg-pink-50/20 p-1">
            {certNames?.join(", ")}
          </div>
        );
      }
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
      render: (row) => {
        const appNames = row.applications?.map((a: any) => a.application.name);
        return (
          <div className="text-muted-foreground max-w-fit line-clamp-2 bg-pink-50/20 p-1">
            {appNames?.join(", ")}
          </div>
        );
      }
    }
  ];
};
