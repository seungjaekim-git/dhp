"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LEDDriverICColumnSchema } from "./schema";

interface SheetDetailsContentProps extends React.HTMLAttributes<HTMLDListElement> {
  data?: LEDDriverICColumnSchema;
}

export function SheetDetailsContent({
  data,
  ...props
}: SheetDetailsContentProps) {
  if (!data) return <SheetDetailsContentSkeleton />;

  return (
    <dl {...props}>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">제품명</dt>
        <dd className="font-mono truncate">{data.subtitle}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">카테고리</dt>
        <dd className="font-mono truncate">{data.category.name}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">출력 수</dt>
        <dd className="font-mono truncate">{data.number_of_outputs}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">입력 전압</dt>
        <dd className="font-mono truncate">
          {data.input_voltage_range && (
            <>
              {JSON.parse(data.input_voltage_range)[0]}V ~ {JSON.parse(data.input_voltage_range)[1]}V
            </>
          )}
        </dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">출력 전류</dt>
        <dd className="font-mono truncate">
          {data.output_current_range && (
            <>
              {JSON.parse(data.output_current_range)[0]}mA ~ {JSON.parse(data.output_current_range)[1]}mA
            </>
          )}
        </dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">동작 온도</dt>
        <dd className="font-mono truncate">
          {data.operating_temperature && (
            <>
              {JSON.parse(data.operating_temperature)[0]}°C ~ {JSON.parse(data.operating_temperature)[1]}°C
            </>
          )}
        </dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">실장 방식</dt>
        <dd className="font-mono truncate">{data.options[0]?.mounting_style}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">보관 방식</dt>
        <dd className="font-mono truncate">{data.options[0]?.storage_type}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">패키지 타입</dt>
        <dd className="font-mono truncate">{data.options[0]?.package_types[0]?.package_type.name}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">토폴로지</dt>
        <dd className="flex flex-wrap gap-1">
          {data.topologies?.map((topology) => (
            <Badge key={topology}>
              {topology}
            </Badge>
          ))}
        </dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">디밍 방식</dt>
        <dd className="flex flex-wrap gap-1">
          {data.dimming_methods?.map((method) => (
            <Badge key={method}>
              {method}
            </Badge>
          ))}
        </dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">인증</dt>
        <dd className="flex flex-wrap gap-1">
          {data.certifications?.map((cert) => (
            <Badge key={cert.certification.name}>
              {cert.certification.name}
            </Badge>
          ))}
        </dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">응용 분야</dt>
        <dd className="flex flex-wrap gap-1">
          {data.applications?.map((app) => (
            <Badge key={app.application.name}>
              {app.application.name}
            </Badge>
          ))}
        </dd>
      </div>
    </dl>
  );
}

const skeleton = {
  "제품명": "h-5 w-52",
  "카테고리": "h-5 w-24",
  "출력 수": "h-5 w-12",
  "입력 전압": "h-5 w-24",
  "출력 전류": "h-5 w-24",
  "동작 온도": "h-5 w-24",
  "실장 방식": "h-5 w-36",
  "보관 방식": "h-5 w-36",
  "패키지 타입": "h-5 w-36",
  "토폴로지": "h-5 w-56",
  "디밍 방식": "h-5 w-56",
  "인증": "h-5 w-56",
  "응용 분야": "h-5 w-56"
};

export function SheetDetailsContentSkeleton() {
  return (
    <dl className="space-y-4">
      {Object.entries(skeleton).map(([key, className]) => (
        <div key={key} className="flex gap-4 py-2 border-b text-sm justify-between items-center">
          <dt className="text-muted-foreground">{key}</dt>
          <dd>
            <Skeleton className={className} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
