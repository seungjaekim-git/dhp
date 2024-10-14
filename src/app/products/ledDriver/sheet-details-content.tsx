"use client";
import { ColumnSchema } from "./schema";
import { Check, FunctionSquare, X } from "lucide-react";
import * as React from "react";
import CopyToClipboardContainer from "@/components/custom/copy-to-clipboard-container";
import { cn } from "@/lib/utils";
import {
  getTimingColor,
  getTimingLabel,
  getTimingPercentage,
  timingPhases,
} from "@/lib/request/timing";
import {
  formatCompactNumber,
  formatDate,
  formatMilliseconds,
} from "@/lib/format";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/request/status-code";
import { regions } from "@/constants/region";
import { Skeleton } from "@/components/ui/skeleton";
import { Percentile, getPercentileColor } from "@/lib/request/percentile";

interface SheetDetailsContentProps
  extends React.HTMLAttributes<HTMLDListElement> {
  data?: ColumnSchema;
  percentiles?: Record<Percentile, number>;
  filterRows: number;
}

export function SheetDetailsContent({
  data,
  percentiles,
  filterRows,
  ...props
}: SheetDetailsContentProps) {
  const [open, setOpen] = React.useState(false);

  if (!data) return <SheetDetailsContentSkeleton />;

  let percentileArray = percentiles
    ? Object.entries(percentiles).map(([percentile, latency]) => [
        parseInt(percentile),
        latency,
      ])
    : [];


  return (
    <dl {...props}>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">URL</dt>
        <dd className="font-mono truncate">{data.url}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">P95</dt>
        <dd className="font-mono truncate">{data.p95}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">Public</dt>
        <dd className="font-mono truncate">{data.public ? "Yes" : "No"}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">Active</dt>
        <dd className="font-mono truncate">{data.active ? "Yes" : "No"}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">Regions</dt>
        <dd className="font-mono truncate">{data.regions.join(", ")}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">Tags</dt>
        <dd className="font-mono truncate">{data.tags.join(", ")}</dd>
      </div>
      <div className="flex gap-4 py-2 border-b text-sm justify-between items-center">
        <dt className="text-muted-foreground">Date</dt>
        <dd className="font-mono text-right">{formatDate(data.date)}</dd>
      </div>
    </dl>
  );
}

const skeleton = {
  URL: "h-5 w-52",
  P95: "h-5 w-5",
  Public: "h-5 w-36",
  Active: "h-5 w-12",
  Regions: "h-5 w-24",
  Tags: "h-5 w-56",
  Date: "h-5 w-12",
};

export function SheetDetailsContentSkeleton() {
  return (
    <dl>
      {Object.entries(skeleton).map(([key, size]) => (
        <div
          key={key}
          className="flex gap-4 py-2 border-b text-sm justify-between items-center"
        >
          <dt className="text-muted-foreground">{key}</dt>
          <dd>
            <Skeleton className={size} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
