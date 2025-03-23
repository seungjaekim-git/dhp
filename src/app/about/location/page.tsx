import React from "react";
import AboutLayout from "../AboutLayout";
import LocationClient from "./LocationClinet";
import { MapPin } from "lucide-react";

const breadcrumb = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "찾아오시는길" },
];

const badges = [
  { text: "구로구", bgColor: "bg-emerald-500/20", textColor: "text-emerald-400", hoverColor: "hover:bg-emerald-500/30" },
  { text: "중앙유통단지", bgColor: "bg-blue-500/20", textColor: "text-blue-400", hoverColor: "hover:bg-blue-500/30" },
  { text: "주차정보", bgColor: "bg-amber-500/20", textColor: "text-amber-400", hoverColor: "hover:bg-amber-500/30" },
];

const description = "우리를 찾아오시는 길을 안내해드립니다. 아래 지도와 정보를 참고해주세요.";
const data = {
  title: "찾아오시는길",
  description: "서울 구로구에 위치한 저희 사무실을 방문해 주세요. \n 출발하시전에 연락주시면 출입을 도와드리겠습니다.",
  icon: "MapPin",
  locations: [
    { 
      id: 1, 
      name: "대한플러스전자(주)", 
      lat: 37.500933,
      lng: 126.875695, 
      address: "서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217 ~ 3218호", 
      contact: "02-6679-5025",
      icon: "Building2"
    }
  ],
  transportInfo: {
    title: "대중교통 정보",
    details: "지하철: 1호선 구로역 2번 출구에서 도보 10분",
    extra: "버스: 구로역 정류장 하차 (5619, 6512, 6513)",
    icon: "Train"
  },
  parkingInfo: {
    title: "주차 정보",
    details: "건물 내 지하주차장 이용 가능 (무료 2시간)",
    extra: "전기차 충전소: 지하 1층 주차장 내 2대 설치 (DC콤보, AC3상)",
    icon: "ParkingSquare" 
  },
  operationTimeInfo: {
    time: "운영시간",
    details: "평일 : 09:00 ~ 18:00",
    extra: "점심시간 12:00 ~ 13:00 \n 토/일/공휴일 휴무",
    icon: "Clock"
  },
  contactInfo: {
    title: "연락처",
    details: "전화: 02-6679-5025 \n 02-6679-5026",
    extra: "팩스: 02-6679-5027 \n 이메일: dhes@dhes.co.kr",
    icon: "Phone"
  },
  facilityInfo: {
    title: "시설 안내",
    details: "회의실, 창고, 주차장",
    extra: "장애인 편의시설 완비",
    icon: "Building"
  }
};

export default function LocationPage() {
  return (
    <AboutLayout
      icon={<MapPin className="w-6 h-6 text-blue-400" />}
      title="찾아오시는 길"
      breadcrumb={breadcrumb}
      description={description}
      badges={badges}
    >
      <LocationClient data={data} />
    </AboutLayout>
  );
}
