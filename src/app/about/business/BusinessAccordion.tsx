"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export function BusinessAccordion({ businessAreas }: { businessAreas: any[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="w-full space-y-4"
    >
      {businessAreas.map((area, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className={clsx(
            "rounded-lg border border-gray-200 bg-gray-50 shadow-md transition-transform hover:shadow-lg hover:scale-[1.02]",
            "data-[state=open]:bg-white data-[state=open]:border-blue-500"
          )}
        >
          {/* 트리거 영역 */}
          <AccordionTrigger className="flex items-start gap-4 px-5 py-3 bg-gray-50 hover:bg-gray-100">
            {area.icon}
            <span className="text-base md:text-lg font-medium text-gray-800">
              {area.title}
            </span>
          </AccordionTrigger>

          {/* 콘텐츠 영역 */}
          <AccordionContent>
            <div className="md:flex md:gap-6 p-5">
              {/* 이미지 영역 */}
              <div className="relative h-48 md:h-56 md:w-1/3 rounded-lg overflow-hidden shadow">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>

              {/* 텍스트와 배지 영역 */}
              <div className="bg-white p-4 rounded-lg shadow-inner md:w-2/3 space-y-3 border border-gray-200">
                <Badge variant="secondary" className="text-sm bg-blue-500 text-white">
                  {area.badge}
                </Badge>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {area.description}
                </p>
                <ul className="space-y-2">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
