"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function LocationClient({ data }: { data: any }) {
    const [selectedMap, setSelectedMap] = useState<number>(1);
    const [map, setMap] = useState<any>(null);

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
            const selectedLocation = data.locations.find((loc: any) => loc.id === selectedMap);

            if (selectedLocation) {
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
                    <div class="bg-white p-4 rounded-lg shadow-lg min-w-[300px]">
                        <h3 class="text-lg font-bold mb-2">${selectedLocation.name}</h3>
                        <p class="text-gray-600 text-sm mb-2">${selectedLocation.address}</p>
                        <p class="text-gray-600 text-sm">${selectedLocation.contact}</p>
                    </div>
                `;

                const infowindow = new window.naver.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 400,
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
        }
    }, [selectedMap, map, data]);

    return (
        <main className="container mx-auto px-4 lg:px-16 py-8">
            <div className="flex flex-col items-center mb-8">
                <MapPin className="w-16 h-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
                <p className="text-lg text-gray-900 my-4">{data.description}</p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">#Location</Badge>
                </div>
            </div>

            <div className="flex justify-center gap-4 my-8">
                {data.locations.map((loc: any) => (
                    <Button
                        key={loc.id}
                        variant={selectedMap === loc.id ? "default" : "outline"}
                        onClick={() => setSelectedMap(loc.id)}
                        className="w-32"
                    >
                        {loc.name}
                    </Button>
                ))}
            </div>

            <div className="w-full h-[600px] rounded-lg overflow-hidden mb-8">
                <div id="map" style={{ width: "100%", height: "100%" }}></div>
            </div>

            <div className="mt-4">
                <div className="flex items-center gap-4 p-6 border rounded-lg shadow-sm">
                    <div className="bg-blue-500 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 10h18"></path>
                            <path d="M3 14h18"></path>
                            <path d="M3 6h18"></path>
                            <path d="M3 18h18"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{data.transportInfo.title}</h3>
                        <p className="text-sm text-gray-500">{data.transportInfo.details}</p>
                        <p className="text-sm text-gray-500">{data.transportInfo.extra}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-center gap-4 p-6 border rounded-lg shadow-sm">
                    <div className="bg-blue-500 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <path d="M7 8h10"></path>
                            <path d="M7 12h10"></path>
                            <path d="M7 16h10"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{data.parkingInfo.title}</h3>
                        <p className="text-sm text-gray-500">{data.parkingInfo.details}</p>
                        <p className="text-sm text-gray-500">{data.parkingInfo.extra}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-center gap-4 p-6 border rounded-lg shadow-sm">
                    <div className="bg-blue-500 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 10h18"></path>
                            <path d="M3 14h18"></path>
                            <path d="M3 6h18"></path>
                            <path d="M3 18h18"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">회사 정보</h3>
                        <p className="text-sm text-gray-500">회사명: {data.companyInfo.name}</p>
                        <p className="text-sm text-gray-500">대표: {data.companyInfo.ceo}</p>
                        <p className="text-sm text-gray-500">설립일: {data.companyInfo.established}</p>
                        <p className="text-sm text-gray-500">사업자 등록번호: {data.companyInfo.businessNumber}</p>
                        <p className="text-sm text-gray-500">법인 등록번호: {data.companyInfo.corporationNumber}</p>
                        <p className="text-sm text-gray-500">주소: {data.companyInfo.address}</p>
                        <p className="text-sm text-gray-500">전화: {data.companyInfo.contact.tel}</p>
                        <p className="text-sm text-gray-500">팩스: {data.companyInfo.contact.fax}</p>
                        <p className="text-sm text-gray-500">이메일: {data.companyInfo.contact.email}</p>
                        <p className="text-sm text-gray-500">웹사이트: {data.companyInfo.contact.website}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
