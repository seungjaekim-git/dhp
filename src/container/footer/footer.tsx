"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { InstagramIcon, TwitterIcon, LinkedinIcon, GithubIcon } from 'lucide-react'

const footerSections = [
  {
    title: "회사소개",
    items: [
      { name: "인사말", href: "#" },
      { name: "회사 연혁", href: "#" },
      { name: "사업 소개", href: "#" },
      { name: "News", href: "#" },
    ],
  },
  {
    title: "제품",
    items: [
      { name: "LED DRIVER IC", href: "#" },
      { name: "기타 전원관리 IC", href: "#" },
      { name: "다이오드", href: "#" },
      { name: "센서", href: "#" },
      { name: "케이블", href: "#" },
      { name: "커넥터", href: "#" },
    ],
  },
  {
    title: "파트너사",
    items: [
      { name: "Macroblock", href: "#", icon: TwitterIcon },
      { name: "Zowie", href: "#", icon: InstagramIcon },
      { name: "XLSEMI", href: "#", icon: LinkedinIcon },
      { name: "LLT", href: "#", icon: GithubIcon },
      { name: "Kube Electronics AG", href: "#", icon: GithubIcon },
      { name: "Morethanall", href: "#", icon: GithubIcon },
      { name: "Powtech", href: "#", icon: GithubIcon },
      { name: "GTM", href: "#", icon: GithubIcon },


    ],
  },
  {
    title: "견적요청",
    items: [
      { name: "Terms", href: "#" },
      { name: "Privacy", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Licenses", href: "#" },
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
]

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
              <span className="font-bold text-xl">YourCompany</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Making the world a better place through constructing elegant hierarchies.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-500 hover:text-primary flex items-center"
                      >
                        {item.icon && <item.icon className="h-5 w-5 mr-2" />}
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
            <p className="text-sm text-gray-500">
              © 2024 YourCompany, Inc. All rights reserved.
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