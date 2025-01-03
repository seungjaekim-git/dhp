"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function ApplicationsTabs({ applications }: { applications: any[] }) {
  if (!applications || applications.length === 0) {
    return <p className="text-gray-600 text-sm">적용 사례가 없습니다.</p>;
  }

  return (
    <Tabs defaultValue={applications[0]?.title || "default"} className="w-full space-y-6">
      {/* Tab 목록 */}
      <TabsList className="flex border-b border-gray-200 bg-white">
        {applications.map((app) => (
          <TabsTrigger
            key={app.title}
            value={app.title}
            className="px-6 py-3 text-center text-sm font-medium text-gray-500 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 hover:text-blue-500 transition-colors"
          >
            {app.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab 콘텐츠 */}
      {applications.map((app) => (
        <TabsContent key={app.title} value={app.title} className="space-y-6">
          <div className="md:flex md:gap-6">
            {/* 이미지 영역 */}
            <div className="relative h-48 md:h-56 md:w-1/2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
              {app.images && app.images[0] ? (
                <>
                  <Image
                    src={app.images[0].src}
                    alt={app.images[0].name}
                    fill
                    className="object-cover transition-all duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm rounded-b-lg">
                    <h3 className="font-semibold">{app.images[0].name}</h3>
                    <p className="text-xs">{app.images[0].description}</p>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 text-sm">이미지가 없습니다.</p>
              )}
            </div>

            {/* 설명 및 텍스트 영역 */}
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-inner border border-gray-200 md:w-1/2">
              <Badge variant="secondary" className="text-xs bg-blue-500 text-white">
                {app.title}
              </Badge>
              <p className="text-sm text-gray-600 leading-relaxed">
                {app.description}
              </p>
              <div className="flex gap-3 overflow-x-auto py-2">
                {app.images && app.images.length > 0 ? (
                  app.images.map((image, i) => (
                    <button
                      key={i}
                      className="px-3 py-1 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors whitespace-nowrap shadow-sm"
                      onClick={() => {
                        const imgContainer = document.querySelector(`[data-app="${app.title}"]`);
                        if (imgContainer) {
                          const imgElement = imgContainer.querySelector('img') as HTMLImageElement;
                          const titleElement = imgContainer.querySelector('h3');
                          const descElement = imgContainer.querySelector('p');
                          if (imgElement && titleElement && descElement) {
                            imgElement.src = image.src;
                            imgElement.alt = image.name;
                            titleElement.textContent = image.name;
                            descElement.textContent = image.description;
                          }
                        }
                      }}
                    >
                      {image.name}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">이미지가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
