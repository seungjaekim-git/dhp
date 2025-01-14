"use client";

interface Column {
  key: string;
  header: string;
  subheader?: string;
  filterType?: 'text' | 'range' | 'select';
  filterOptions?: string[];
  render?: (row: any) => React.ReactNode;
}

export const useColumns = (): Column[] => {
  return [
    {
      key: "name",
      header: "제품명",
      filterType: 'text',
      render: (row) => (
        <div className="flex flex-col bg-blue-50/20 p-2">
          <div className="max-w-fit line-clamp-2 font-medium">{row.name}</div>
          <span className="text-muted-foreground text-sm">{row.subtitle}</span>
        </div>
      )
    },
    {
      key: "category",
      header: "제품 분류",
      subheader: "카테고리",
      filterType: 'select',
      filterOptions: ['LED Driver', 'Power IC', 'Other'],
      render: (row) => (
        <div className="max-w-fit line-clamp-2 bg-blue-50/20 p-1">
          {row.category.name}
        </div>
      )
    },
    {
      key: "number_of_outputs",
      header: "전기적 특성",
      subheader: "출력 수",
      filterType: 'select',
      filterOptions: ['1', '2', '3', '4+'],
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
