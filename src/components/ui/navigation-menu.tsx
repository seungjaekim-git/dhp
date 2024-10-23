/*
네비게이션 메뉴의 반응형 크기 조절 방법:

1. 컨테이너 너비 조절
- max-w-screen-2xl 사용하여 화면 크기에 맞춤
- 화면 크기별 너비 조절을 위해 container 클래스 추가
- 예: className="container mx-auto max-w-screen-2xl"

2. 뷰포트 크기별 여백 조정 
- 기본 여백: p-4
- sm: p-6  
- md: p-8
- lg: p-10
- xl: p-12
- 2xl: p-16

3. 메뉴 아이템 크기와 간격
- text-sm (기본)
- sm:text-base
- md:text-lg
- lg:text-xl
- 아이템 간 간격: space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8

4. 드롭다운 메뉴 너비 조절
- w-screen (모바일)
- sm:w-[80vw]
- md:w-[70vw]
- lg:w-[60vw]
- xl:w-[50vw]

5. 반응형 레이아웃
- flex-col (모바일)
- sm:flex-row
- gap 조정: gap-2 sm:gap-4 md:gap-6 lg:gap-8
- 여백 자동 조정으로 화면에 맞춤

사용 예시:
<NavigationMenu className="container mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10">
  <NavigationMenuContent className="w-screen sm:w-[80vw] md:w-[70vw] lg:w-[60vw]">
    ...
  </NavigationMenuContent>
</NavigationMenu>
*/

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
 
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex w-screen max-w-screen-2xl flex-1 items-center justify-center px-4 sm:px-4 md:px-6",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName
 
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex w-max flex-1 list-none items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName


 
const NavigationMenuItem = NavigationMenuPrimitive.Item
 
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-auto items-center justify-center rounded-md bg-background px-3 py-2 text-sm sm:h-12 sm:px-4 sm:py-3 sm:text-base  font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)
 
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName
 
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-screen sm:w-[90vw] md:w-[80vw] lg:w-[70vw] overflow-clip p-4 sm:p-6 md:p-8 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName
 
const NavigationMenuLink = NavigationMenuPrimitive.Link
 
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center w-full")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative h-[var(--radix-navigation-menu-viewport-height)] w-full rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName
 
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName
 
export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}