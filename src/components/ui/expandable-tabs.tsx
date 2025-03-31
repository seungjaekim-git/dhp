"use client";

import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
  defaultSelectedIndex?: number;
}

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
  defaultSelectedIndex = 0,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(defaultSelectedIndex);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    // 외부 클릭 시 선택 상태 유지 (기본값은 0)
    if (selected !== defaultSelectedIndex) {
      setSelected(defaultSelectedIndex);
      onChange?.(defaultSelectedIndex);
    }
  });

  React.useEffect(() => {
    // 컴포넌트 마운트 시 기본 선택 탭 설정
    if (selected === null && defaultSelectedIndex !== null) {
      setSelected(defaultSelectedIndex);
      onChange?.(defaultSelectedIndex);
    }
  }, []);

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm",
        className
      )}
    >
      <TooltipProvider>
        {tabs.map((tab, index) => {
          if (tab.type === "separator") {
            return <Separator key={`separator-${index}`} />;
          }

          const Icon = tab.icon;
          return (
            <Tooltip key={`tab-${index}`}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleSelect(index)}
                  className={cn(
                    "relative flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300",
                    selected === index
                      ? cn("bg-muted", activeColor)
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon size={20} />
                  {selected === index && <span className="ml-2">{tab.title}</span>}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tab.title}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}