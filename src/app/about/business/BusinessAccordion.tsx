"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function BusinessAccordion({ businessAreas }: { businessAreas: any[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {businessAreas.map((area, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="flex items-center gap-3">
            {area.icon} {/* JSX 요소 또는 React 컴포넌트 렌더링 */}
            <span className="text-xl font-semibold">{area.title}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover"
                />
              </div>
              <Badge variant="secondary" className="text-sm">{area.badge}</Badge>
              <p className="text-gray-600">{area.description}</p>
              <div className="space-y-2">
                {area.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
