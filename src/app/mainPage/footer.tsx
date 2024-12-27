"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { navigationConfig } from "@/config/navigation"

const footerSections = [
  {
    title: navigationConfig.company.title,
    items: navigationConfig.company.items.map(item => ({
      name: item.title,
      href: item.link
    }))
  },
  {
    title: navigationConfig.products.title,
    items: navigationConfig.products.categories.map(category => ({
      name: category.title,
      href: category.link
    }))
  },
  {
    title: "파트너사",
    items: navigationConfig.partners.items.map(partner => ({
      name: partner.title,
      href: partner.link,
      icon: <Image src={partner.icon} alt={partner.title} width={20} height={20} />
    }))
  },
  {
    title: navigationConfig.support.title,
    items: [
      ...navigationConfig.support.inquiry.items.map(item => ({
        name: item.title,
        href: item.link
      })),
      ...navigationConfig.support.contact.items.map(item => ({
        name: item.title,
        href: item.link
      })),
      ...navigationConfig.support.resources.items.map(item => ({
        name: item.title,
        href: item.link
      }))
    ]
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