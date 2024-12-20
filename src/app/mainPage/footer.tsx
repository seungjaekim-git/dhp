"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LinkedinIcon } from 'lucide-react'


const footerSections = [
  {
    title: "회사소개",
    items: [
      { name: "인사말", href: "/ceo" },
      { name: "회사 연혁", href: "/history" },
      { name: "사업 소개", href: "/business" },
      { name: "찾아오시는 길", href: "/location" },
    ],
  },
  {
    title: "제품",
    items: [
      { name: "LED DRIVER IC", href: "/products/led-driver-ic" },
      { name: "기타 전원관리 IC", href: "/products/other-power-management-ic" },
      { name: "다이오드", href: "/products/diode" },
      { name: "센서", href: "/products/sensor" },
      { name: "케이블&커넥터", href: "/products/cable&connector" },
    ],
  },
  {
    title: "파트너사",
    items: [
      { name: "Macroblock", href: "#", icon: <Image src="/logos/macroblock-logo.png" alt="Macroblock" width={20} height={20} /> },
      { name: "Zowie", href: "#", icon: <Image src="/logos/zowie-logo.png" alt="Zowie" width={20} height={20} /> },
      { name: "XLSEMI", href: "#", icon: <Image src="/logos/xlsemi-logo.png" alt="XLSEMI" width={20} height={20} /> },
      { name: "LLT", href: "#", icon: <Image src="/logos/llt-logo.png" alt="LLT" width={20} height={20} /> },
      { name: "Kube Electronics AG", href: "#", icon: <Image src="/logos/kube-logo.png" alt="Kube" width={20} height={20} /> },
      { name: "Morethanall", href: "#", icon: <Image src="/logos/morethanall-logo.png" alt="Morethanall" width={20} height={20} /> },
      { name: "Powtech", href: "#", icon: <Image src="/logos/powtech-logo.png" alt="Powtech" width={20} height={20} /> },
      { name: "GTM", href: "#", icon: <Image src="/logos/gtm-logo.png" alt="GTM" width={20} height={20} /> },

    ],
  },
  {
    title: "고객지원",
    items: [
      { name: "FAQ", href: "#" },
      { name: "제품 지원 문의", href: "#" },
      { name: "전화 및 이메일", href: "#" },
      { name: "오시는 길", href: "#" },
      { name: "데이터 시트", href: "#" },
      { name: "제품 선택 가이드", href: "#" },
    ],
  },
  {
    title: "견적요청",
    items: [
      { name: "견적요청", href: "/contact" },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logos/dhp-logo.png" alt="Logo" width={40} height={40} />
              <span className="font-bold text-xl truncate">대한플러스전자(주)</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 truncate">
              대한플러스전자(주)는 고객 요구와 만족을 위해 항상 노력하는 <br />LED 드라이버 IC 전문 유통기업입니다.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4 truncate">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-500 hover:text-primary flex items-center truncate"
                      >
                        {'icon' in item && item.icon && item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 truncate">
              © 2024 DHP&apos;s, Inc. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm">English</Button>
              <Button variant="ghost" size="sm">한국어</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer