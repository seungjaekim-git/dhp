import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"
import Head from 'next/head';
import Image from 'next/image'


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { MdPrecisionManufacturing } from "react-icons/md";
import { BiSolidBusiness } from "react-icons/bi";
import { GrContact } from "react-icons/gr";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Macroblock",
        href: "/docs/primitives/alert-dialog",
        description:
            "대만의 대표 LED Driver IC 전문 제조사 어쩌구 저쩌구",
    },
    {
        title: "Zowie",
        href: "/docs/primitives/hover-card",
        description:
            "대만의 다이오드 전문 제조사 어쩌구 저쩌구",
    },
    {
        title: "GTM",
        href: "/docs/primitives/progress",
        description:
            "GTM 내용 적어야함",
    },
    {
        title: "Morethanall",
        href: "/docs/primitives/scroll-area",
        description: "Morethanall 내용 적어야함",
    },
    {
        title: "KubeACG",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "XLSEMI",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export default function Navbar() {
    return (

        <nav className="bg-opacity-100 p-4">
            <div className="container mx-auto flex items-center">

            {/* <!-- Logo --> */}
            <Image className="w-1/4" src="/images/dh_logo.png" alt="나중에 적어야됨" width={400} height={150} />
            
            <NavigationMenu className="hidden md:flex space-x-4">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl">
                            <BiSolidBusiness className="mx-2"/>  회사소개</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <Icons.logo className="h-6 w-6" />
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                대한플러스전자
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                고품질 고사양 LED Driver IC 어쩌구 저쩌구.... 제조사 6개 적고 
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="CEO 인사말">
                                    CEO 김영구 의 인사말 및 리더십 어쩌구 저쩌구
                                </ListItem>
                                <ListItem href="/docs/installation" title="연혁">
                                    Since 1997 ~ ing / 30년 경력의 업체 연혁
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="회사 정보">
                                    위치, 전화번호, 이메일, 오시는 길
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl">
                            <MdPrecisionManufacturing className="mx-2"/>제조사</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref >
                            <NavigationMenuLink className={navigationMenuTriggerStyle() + "text-xl"} >
                                <GrContact className="mx-2"/>연락처
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex w-full justify-end">

            
            <div className="hidden md:flex w-full max-w-sm items-center space-x-4 mx-3 start-0">
                <Input type="text" placeholder="Search" />
                <Button type="submit">Search</Button>
            </div>
            {/* <!-- Login Button --> */}
            <div>
                <button dir="rtl" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded start-0">
                    Login
                </button>
                </div>
            </div>
            </div>

            {/* <!-- Mobile Menu --> */}
        <div id="mobile-menu" className="hidden md:hidden mt-2">
            <a href="#" className="block text-white py-2 px-4 hover:bg-gray-700">
                <i className="fas fa-home mr-2"></i> Home
            </a>
            <a href="#" className="block text-white py-2 px-4 hover:bg-gray-700">
                <i className="fas fa-info-circle mr-2"></i> About
            </a>
            <a href="#" className="block text-white py-2 px-4 hover:bg-gray-700">
                <i className="fas fa-envelope mr-2"></i> Contact
            </a>
            <a href="#" className="block text-white py-2 px-4 hover:bg-gray-700">
                <i className="fas fa-cog mr-2"></i> Services
            </a>
        </div>
        </nav>

    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-xl font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
