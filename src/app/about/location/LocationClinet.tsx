"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Train, ParkingSquare, Clock, Phone, Building, Share2, Copy, ClipboardCopy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

export default function LocationClient({ data }: { data: any }) {
    const [selectedMap, setSelectedMap] = useState<number>(1);
    const [map, setMap] = useState<any>(null);
    const { toast } = useToast();

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      toast({
        title: "복사 완료",
        description: "클립보드에 복사되었습니다.",
        duration: 2000,
      });
    };

    const shareLocation = () => {
      if (navigator.share) {
        navigator.share({
          title: data.title,
          text: data.description,
          url: window.location.href,
        }).catch((error) => console.log('공유 실패:', error));
      }
    };

    useEffect(() => {
        const initializeMap = () => {
            if (typeof window !== "undefined" && window.naver && window.naver.maps) {
                const location = new window.naver.maps.LatLng(
                    data.locations[0].lat,
                    data.locations[0].lng
                );

                const mapOptions = {
                    center: location,
                    zoom: 17,
                    zoomControl: true,
                };

                const mapDiv = document.getElementById("map");
                const newMap = new window.naver.maps.Map(mapDiv, mapOptions);

                setMap(newMap);
            }
        };

        initializeMap();
    }, [data]);

    useEffect(() => {
        if (map && window.naver) {
            const selectedLocation = data.locations[0];

            const newLocation = new window.naver.maps.LatLng(
                selectedLocation.lat,
                selectedLocation.lng
            );
            map.setCenter(newLocation);

            const marker = new window.naver.maps.Marker({
                position: newLocation,
                map,
            });

            const contentString = `
                <div class="bg-white p-4 rounded-lg shadow-md min-w-[280px]">
                    <h3 class="text-base font-semibold mb-2">${selectedLocation.name}</h3>
                    <p class="text-sm text-gray-600 mb-2">${selectedLocation.address}</p>
                    <p class="text-sm text-gray-600">${selectedLocation.contact}</p>
                </div>
            `;

            const infowindow = new window.naver.maps.InfoWindow({
                content: contentString,
                maxWidth: 320,
                backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                disableAnchor: true,
                pixelOffset: new window.naver.maps.Point(0, -10)
            });

            window.naver.maps.Event.addListener(marker, "click", function() {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker);
                }
            });

            infowindow.open(map, marker);
        }
    }, [selectedMap, map, data]);

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col items-center mb-8">
                <MapPin className="w-12 h-12 mb-4 text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{data.title}</h1>
                <p className="text-sm text-gray-600 mb-4 text-center max-w-xl whitespace-pre-line">{data.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="px-2 py-1 text-xs" variant="outline">#구로구</Badge>
                    <Badge className="px-2 py-1 text-xs" variant="outline">#중앙유통단지</Badge>
                    <Badge className="px-2 py-1 text-xs" variant="outline">#주차2시간무료</Badge>
                    <Badge className="px-2 py-1 text-xs" variant="outline">#구로역10분</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                    <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
                        <div id="map" style={{ width: "100%", height: "100%" }}></div>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button 
                                        onClick={shareLocation}
                                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                                    >
                                        <Share2 className="w-5 h-5 text-gray-600" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>공유하기</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button 
                                        onClick={() => copyToClipboard(window.location.href)}
                                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                                    >
                                        <ClipboardCopy className="w-5 h-5 text-gray-600" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>URL 복사</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/10 rounded-lg p-3 shrink-0">
                                <MapPin className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button 
                                                onClick={() => copyToClipboard(data.locations[0].address)}
                                                className="w-full text-left space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                            >
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {data.locations[0].name}
                                                </h3>
                                                <p className="text-xs text-gray-600">주소 : {data.locations[0].address}</p>
                                                <p className="text-xs text-gray-500">연락처 : {data.locations[0].contact}</p>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>클릭하여 복사</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>

                    {[
                        { icon: Train, info: data.transportInfo },
                        { icon: ParkingSquare, info: data.parkingInfo },
                        { icon: Clock, info: data.operationTimeInfo }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-500/10 rounded-lg p-3 shrink-0">
                                    <item.icon className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button 
                                                    onClick={() => copyToClipboard(`${item.info.title || item.info.time}\n${item.info.details}\n${item.info.extra}`)}
                                                    className="w-full text-left space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                                                        {item.info.title || item.info.time}
                                                    </h3>
                                                    <div className="space-y-1">
                                                        <p className="text-xs text-gray-600 whitespace-pre-line">{item.info.details}</p>
                                                        <p className="text-xs text-gray-600 whitespace-pre-line">{item.info.extra}</p>
                                                    </div>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>클릭하여 복사</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
