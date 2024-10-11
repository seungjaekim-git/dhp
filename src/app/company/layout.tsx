"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const NavigationMenu = ({ isDesktop }: { isDesktop: boolean }) => {
  const sections = [
    { id: 'section-1', title: 'CEO 인사말' },
    { id: 'section-2', title: '미션 & 비전 & 핵심 가치' },
    { id: 'section-3', title: '회사 연혁' },
    { id: 'section-4', title: '사업 영역과 파트너사' },
  ];

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDesktop) {
    return (
      <nav className="sticky top-20 p-4 bg-white shadow-md rounded-lg">
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <Link href={`#${section.id}`}>
                <span className={`cursor-pointer ${activeSection === section.id ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                  {section.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  } else {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="navigation">
          <AccordionTrigger>네비게이션</AccordionTrigger>
          <AccordionContent>
            <ul>
              {sections.map((section) => (
                <li key={section.id} className="mb-2">
                  <Link href={`#${section.id}`}>
                    <span className={`cursor-pointer ${activeSection === section.id ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                      {section.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${isDesktop ? 'flex' : 'block'}`}>
      {pathname.startsWith('/company') && (
        isDesktop ? (
          <aside className="w-64 p-4">
            <NavigationMenu isDesktop={true} />
          </aside>
        ) : (
          <div className="w-full p-4">
            <NavigationMenu isDesktop={false} />
          </div>
        )
      )}
      <main className="flex-1">{children}</main>
    </div>
  );
}
