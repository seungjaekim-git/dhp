"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function ApplicationsTabs({ applications }: { applications: any[] }) {
  if (!applications || applications.length === 0) {
    return <p className="text-gray-600">적용 사례가 없습니다.</p>;
  }

  return (
    <Tabs defaultValue={applications[0]?.title || "default"} className="w-full">
    <TabsList className="grid grid-cols-3 mb-6">
        {applications.map((app) => (
          <TabsTrigger key={app.title} value={app.title}>
            {app.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {applications.map((app) => (
        <TabsContent key={app.title} value={app.title}>
          <div className="space-y-6">
            <div className="relative h-64 rounded-lg overflow-hidden" data-app={app.title}>
              {app.images && app.images[0] ? (
                <>
                  <Image
                    src={app.images[0].src}
                    alt={app.images[0].name}
                    fill
                    className="object-cover transition-all duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                    <h3 className="text-lg font-semibold">{app.images[0].name}</h3>
                    <p className="text-sm text-gray-200">{app.images[0].description}</p>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">이미지가 없습니다.</p>
              )}
            </div>
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg">{app.title}</Badge>
              <div className="flex gap-2 overflow-x-auto py-2">
                {app.images && app.images.length > 0
                  ? app.images.map((image, i) => (
                      <button
                        key={i}
                        className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
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
                  : <p className="text-gray-600">이미지가 없습니다.</p>}
              </div>
              <p className="text-gray-700">{app.description}</p>
              
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
