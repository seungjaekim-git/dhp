"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";

export default function RoadMapClient({ data }: { data: any }) {
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
            }
        }
    }, [selectedMap, map, data]);

    return (
        <main className="container mx-auto px-4 lg:px-16 py-8">
            <div className="flex flex-col items-center mb-8">
                <History className="w-16 h-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
                <p className="text-lg text-gray-900 my-4">{data.description}</p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">#LED Driver IC</Badge>
                    <Badge variant="outline">#Macroblock</Badge>
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
                        <h3 className="text-lg font-semibold">{data.subwayInfo.title}</h3>
                        <p className="text-sm text-gray-500">{data.subwayInfo.details}</p>
                        <p className="text-sm text-gray-500">{data.subwayInfo.extra}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Download } from 'lucide-react';
// import { History } from 'lucide-react';

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuLabel,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ChevronDown } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';

// export default function RoadMap() {
//     const [selectedMap, setSelectedMap] = useState<number>(1);
//     const [map, setMap] = useState<any>(null);

//     useEffect(() => {
//         console.log('Window object:', typeof window !== 'undefined');
//         console.log('Naver object:', window?.naver);
        
//         const initializeMap = () => {
//             if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
//                 try {
//                     const location = new window.naver.maps.LatLng(37.5582585, 126.8812829);
//                     const mapOptions = {
//                         center: location,
//                         zoom: 17,
//                         zoomControl: true,
//                         zoomControlOptions: {
//                             position: window.naver.maps.Position.TOP_RIGHT
//                         }
//                     };

//                     const mapDiv = document.getElementById('map');
//                     if (!mapDiv) {
//                         console.error('Map div not found');
//                         return;
//                     }

//                     const newMap = new window.naver.maps.Map(mapDiv, mapOptions);
                    
//                     // 마커 생성
//                     const marker = new window.naver.maps.Marker({
//                         position: location,
//                         map: newMap
//                     });

//                     // 정보창 HTML 컨텐츠
//                     const contentString = [
//                         '<div class="bg-white p-4 rounded-lg shadow-lg min-w-[300px]">',
//                         '    <h3 class="text-lg font-bold mb-2">대한플러스전자(주)</h3>',
//                         '    <p class="text-gray-600 text-sm mb-2">서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217-3218호</p>',
//                         '    <p class="text-gray-600 text-sm">02-1234-4567</p>',
//                         '</div>'
//                     ].join('');

//                     // 정보창 생성
//                     const infowindow = new window.naver.maps.InfoWindow({
//                         content: contentString,
//                         maxWidth: 400,
//                         backgroundColor: "transparent",
//                         borderColor: "transparent",
//                         borderWidth: 0,
//                         disableAnchor: true,
//                         pixelOffset: new window.naver.maps.Point(0, -10)
//                     });

//                     // 마커 클릭 시 정보창 토글
//                     window.naver.maps.Event.addListener(marker, "click", function() {
//                         if (infowindow.getMap()) {
//                             infowindow.close();
//                         } else {
//                             infowindow.open(newMap, marker);
//                         }
//                     });

//                     // 초기에 정보창 표시
//                     infowindow.open(newMap, marker);

//                     setMap(newMap);
//                     console.log('Map initialized successfully');
//                 } catch (error) {
//                     console.error('Error initializing map:', error);
//                 }
//             } else {
//                 console.log('Naver maps SDK not loaded yet');
//             }
//         };

//         const timer = setTimeout(initializeMap, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     useEffect(() => {
//         if (map && window.naver) {
//             const locations = {
//                 1: { lat: 37.5582585, lng: 126.8812829 }, // 본사 위치
//                 2: { lat: 37.5582585, lng: 126.8812829 }  // 공장 위치 (임시로 같은 위치 사용)
//             };
            
//             const newLocation = new window.naver.maps.LatLng(
//                 locations[selectedMap as keyof typeof locations].lat,
//                 locations[selectedMap as keyof typeof locations].lng
//             );
            
//             map.setCenter(newLocation);
            
//             const marker = new window.naver.maps.Marker({
//                 position: newLocation,
//                 map: map
//             });

//             // 정보창 HTML 컨텐츠
//             const contentString = [
//                 '<div class="bg-white p-4 rounded-lg shadow-lg min-w-[300px]">',
//                 '    <h3 class="text-lg font-bold mb-2">대한플러스전자(주)</h3>',
//                 '    <p class="text-gray-600 text-sm mb-2">서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217-3218호</p>',
//                 '    <p class="text-gray-600 text-sm">02-1234-4567</p>',
//                 '    <a href="https://naver.me/FA2zsV5q" target="_blank" class="inline-block mt-2 px-4 py-2 bg-[#03C75A] text-white text-sm font-medium rounded hover:bg-[#02b350] transition-colors">',
//                 '        네이버 지도 앱으로 보기',
//                 '    </a>',
//                 '</div>'
//             ].join('');

//             const infowindow = new window.naver.maps.InfoWindow({
//                 content: contentString,
//                 maxWidth: 400,
//                 backgroundColor: "transparent",
//                 borderColor: "transparent",
//                 borderWidth: 0,
//                 disableAnchor: true,
//                 pixelOffset: new window.naver.maps.Point(0, -10)
//             });

//             window.naver.maps.Event.addListener(marker, "click", function() {
//                 if (infowindow.getMap()) {
//                     infowindow.close();
//                 } else {
//                     infowindow.open(map, marker);
//                 }
//             });

//             infowindow.open(map, marker);
//         }
//     }, [selectedMap, map]);

//     return (
//         <main className="container mx-auto px-4 lg:px-16 py-8">
                        
//         {/* Breadcrumb */}
//         <nav className="flex px-5 py-4 my-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
//         <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
//             <li className="inline-flex items-center">
//             <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
//                 <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
//                 </svg>
//                 Home
//             </a>
//             </li>
//             <li>
//             <div className="flex items-center">
//                 <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
//                 </svg>
//                 <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">회사소개</a>
//             </div>
//             </li>
//             <li aria-current="page">
//             <div className="flex items-center">
//                 <svg className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
//                 </svg>
//                 <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">회사연혁</span>
//             </div>
//             </li>
//         </ol>
//         </nav>


//         <div className="flex w-full flex-col h-auto md:mx-4 md:flex-row items-center mb-8 gap-4 md:divide-x-2">
//             <div className="flex grow flex-row items-center divide-x-2">
//                 <div className="flex grow-0 items-center justify-center">
//                     <History className="w-16 h-auto md:m-8 m-4" />
//                 </div>
//                 <div className="flex grow flex-col px-4">
//                     <h1 className="text-3xl font-bold text-gray-900">오시는길</h1>
//                     <p className="text-lg text-gray-900 my-4">대한플러스전자㈜로 오시는 길을 안내해드리겠습니다.</p>
//                     <br/>
//                     <div className='flex flex-wrap gap-2'>
//                         <Badge variant="outline" className='w-fit whitespace-nowrap'>#창사 28년</Badge>
//                         <Badge variant="outline" className='w-fit whitespace-nowrap'>#전자부품 유통</Badge>
//                         <Badge variant="outline"className='w-fit whitespace-nowrap'>#LED Driver IC 전문</Badge>
//                         <Badge variant="outline"className='w-fit whitespace-nowrap'>#Macroblock</Badge>
//                         <Badge variant="outline"className='w-fit whitespace-nowrap'>#LED 모듈 개발</Badge>
//                     </div>
                    
//                 </div>
//             </div>

//             <div className="flex grow my-4 p-4 md:flex-col flex-row items-center md:gap-2 gap-4">
//                 <DropdownMenu modal={false} >
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline" className="flex items-center gap-2 w-full">
//                             <ChevronDown className="w-4 h-4" />
//                             {/* {viewMode === "detailed" ? "자세히 보기" : viewMode === "simple" ? "간단히 보기" : "보기 옵션"} */}
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="mx-4">
//                         <DropdownMenuLabel>보기 모드 선택</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuRadioGroup 
//                         // value={viewMode} onValueChange={setViewMode}
//                         >
//                             <DropdownMenuRadioItem value="detailed">자세히 보기</DropdownMenuRadioItem>
//                             <DropdownMenuRadioItem value="simple">간단히 보기</DropdownMenuRadioItem>
//                         </DropdownMenuRadioGroup>
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//                 <DropdownMenu modal={false}>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline" className="flex flex-grow items-center gap-2 w-full">
//                             <ChevronDown className="w-4 h-4" />
//                             {/* {sortMode === "descending" ? "최신순" : "오래된순"} */}
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="mx-4">
//                         <DropdownMenuLabel>정렬 순서 선택</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuRadioGroup 
//                         // value={sortMode} onValueChange={setSortMode}
//                         >
//                             <DropdownMenuRadioItem value="descending">최신순</DropdownMenuRadioItem>
//                             <DropdownMenuRadioItem value="ascending">오래된순</DropdownMenuRadioItem>
//                         </DropdownMenuRadioGroup>
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//                 <Button
//                     variant="outline"
//                     onClick={() => {}}
//                     className="flex items-center gap-2 w-full"
//                 >
//                     <Download className="w-4 h-4" />
//                     엑셀 다운로드
//                 </Button>
//             </div>
//             </div>

//             <div className='flex flex-col w-full'>
//                 <div className="flex justify-center gap-4 my-8">
//                     <Button 
//                         variant={selectedMap === 1 ? "default" : "outline"}
//                         onClick={() => setSelectedMap(1)}
//                         className="w-32"
//                     >
//                         본사
//                     </Button>
//                     <Button
//                         variant={selectedMap === 2 ? "default" : "outline"} 
//                         onClick={() => setSelectedMap(2)}
//                         className="w-32"
//                     >
//                         공장
//                     </Button>
//                 </div>

//                 <div className="w-full h-[600px] rounded-lg overflow-hidden">
//                     <div id="map" style={{ width: '100%', height: '100%' }}></div>
//                 </div>

//             <div className="mt-8">
//                 <div className="flex items-center gap-4 p-6 border rounded-lg shadow-sm">
//                     <div className="bg-blue-500 rounded-full p-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M3 10h18"></path>
//                             <path d="M3 14h18"></path>
//                             <path d="M3 6h18"></path>
//                             <path d="M3 18h18"></path>
//                         </svg>
//                     </div>
//                     <div className="flex flex-col">
//                         <h3 className="text-lg font-semibold">지하철 이용시</h3>
//                         <div className="flex items-center gap-2 text-gray-600">
//                             <span>2호선 부평삼거리역</span>
//                             <span className="text-gray-400">|</span>
//                             <span>선릉역</span>
//                         </div>
//                         <p className="text-sm text-gray-500 mt-1">3번 출구에서 161m (도보 1분) 이내</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-4">
//                 <div className="flex items-center gap-4 p-6 border rounded-lg shadow-sm">
//                     <div className="bg-blue-500 rounded-full p-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                             <path d="M7 8h10"></path>
//                             <path d="M7 12h10"></path>
//                             <path d="M7 16h10"></path>
//                         </svg>
//                     </div>
//                     <div className="flex flex-col">
//                         <h3 className="text-lg font-semibold">주차 이용시</h3>
//                         <p className="text-sm text-gray-500 mt-1">2시간 주차권 지급</p>
//                         <p className="text-sm text-gray-500 mt-1">*전기차 충전소는 지상 1층에서 이용가능합니다</p>
//                     </div>
//                 </div>
//             </div>
//             </div>

//         </main>
//     );
// }
