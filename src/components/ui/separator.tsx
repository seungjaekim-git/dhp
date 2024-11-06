"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}, ref) => {
  // 방향에 따른 스타일 클래스 정의
  const getOrientationClass = () => {
    if (orientation === "vertical") {
      return "min-h-full w-[2px] m-0 p-0" // 세로선
    } else {
      return "w-full h-[1px]" // 가로선
    }
  }

  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-black bg-border",
        getOrientationClass(),
        className
      )}
      {...props}
    />
  )
})

Separator.displayName = "Separator"

export { Separator }
