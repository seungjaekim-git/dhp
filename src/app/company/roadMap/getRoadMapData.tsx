// lib/roadmap-data.ts
export async function getRoadMapData() {
    return {
        title: "오시는길",
        description: "대한플러스전자㈜로 오시는 길을 안내해드리겠습니다.",
        locations: [
            {
                id: 1,
                name: "본사",
                lat: 37.5582585,
                lng: 126.8812829,
                address: "서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217-3218호",
                phone: "02-1234-4567",
            },
            {
                id: 2,
                name: "공장",
                lat: 37.5582585,
                lng: 126.8812829,
                address: "서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217-3218호",
                phone: "02-7654-3210",
            },
        ],
        subwayInfo: {
            title: "지하철 이용시",
            details: "2호선 부평삼거리역 | 선릉역",
            extra: "3번 출구에서 161m (도보 1분) 이내",
        },
        parkingInfo: {
            title: "주차 이용시",
            details: "2시간 주차권 지급",
            extra: "*전기차 충전소는 지상 1층에서 이용가능합니다",
        },
    };
}
