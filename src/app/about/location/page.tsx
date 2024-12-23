import React from "react";
import AboutLayout from "../AboutLayout";
import LocationClient from "./LocationClinet";
import { MapPin } from "lucide-react";

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Location" },
];

const badges = [
  { text: "New", bgColor: "bg-green-100", textColor: "text-green-800", hoverColor: "hover:bg-green-200" },
];

const description = "우리를 찾아오시는 길을 안내해드립니다. 아래 지도를 참고해주세요.";

const data = {
  title: "찾아오시는 길",
  description: "서울 강남구에 위치한 저희 사무실을 방문해 주세요.",
  locations: [
    { id: 1, name: "Gangnam Office", lat: 37.49794297981256, lng: 127.0275833153107, address: "서울 강남구", contact: "02-123-4567" }
  ],
  transportInfo: {
    title: "대중교통 정보",
    details: "지하철 2호선 강남역 3번 출구에서 도보 5분 거리입니다.",
    extra: "버스 정류장도 근처에 위치해 있습니다."
  },
  parkingInfo: {
    title: "주차 정보",
    details: "건물 내 주차장이 마련되어 있습니다.",
    extra: "주차 공간이 협소하니 대중교통을 이용해 주세요."
  },
  companyInfo: {
    name: "대한플러스전자(주)",
    ceo: "김영구",
    established: "1997년 11월",
    businessNumber: "113-81-72420",
    corporationNumber: "110111-2358417",
    address: "서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217 ~ 3218호",
    contact: {
      tel: "02-6679-5025, 02-6679-5026",
      fax: "02-6679-5027",
      email: "dhes@dhes.co.kr",
      website: "http://www.dhes.co.kr"
    }
  }
};

export default function LocationPage() {
  return (
    <AboutLayout
      icon={<MapPin />}
      title="찾아오시는 길"
      breadcrumb={breadcrumb}
      description={description}
      badges={badges}
    >
      <LocationClient data={data} />
    </AboutLayout>
  );
}
