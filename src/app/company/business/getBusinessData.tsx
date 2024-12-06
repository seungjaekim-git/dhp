// lib/business-data.ts
export async function getBusinessData() {
    return [
        {
            id: 1,
            title: "LED Driver IC 사업",
            description:
                "세계적인 LED Driver IC 제조사인 Macroblock사의 국내 공식 대리점으로서, 고품질의 LED Driver IC를 국내 시장에 공급하고 있습니다.",
            image: "/images/led-driver.jpg",
            link: "#",
            gradient: "from-blue-500 to-blue-600",
        },
        {
            id: 2,
            title: "전자부품 유통사업",
            description:
                "28년간의 전자부품 유통 노하우를 바탕으로, 국내외 유수 제조사의 고품질 전자부품을 안정적으로 공급하고 있습니다.",
            image: "/images/electronic-parts.jpg",
            link: "#",
            gradient: "from-green-500 to-green-600",
        },
        {
            id: 3,
            title: "LED 모듈 개발사업",
            description:
                "고객사의 요구사항에 맞춘 맞춤형 LED 모듈을 개발하고, 최적화된 솔루션을 제공하고 있습니다.",
            image: "/images/led-module.jpg",
            link: "#",
            gradient: "from-purple-500 to-purple-600",
        },
        {
            id: 4,
            title: "기술지원 서비스",
            description:
                "전문 엔지니어들의 기술지원을 통해 고객사의 제품 개발과 생산을 지원하고 있습니다.",
            image: "/images/technical-support.jpg",
            link: "#",
            gradient: "from-red-500 to-red-600",
        },
    ];
}
