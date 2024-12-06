export async function getCompanyData() {
    return {
        hero: {
            title: "최고의 기술, 최적의 방법으로",
            subtitle: "기업들의 디지털 혁신을 실현합니다",
            description:
                "대한플러스전자는 25년의 IT 경험과 노하우를 바탕으로 더 나은 디지털 세상을 만들어 나가고 있습니다",
            link: { text: "대표이사 인사말", href: "#" },
        },
        intro: {
            paragraphs: [
                "[회사명]은 1997년에 설립되어 25년이 넘는 시간 동안 반도체 유통업에 종사하며, 신뢰할 수 있는 글로벌 반도체 유통 파트너로 자리매김했습니다. 특히 LED 드라이버 IC를 포함한 다양한 반도체 부품을 Turn key 방식으로 제공하며, 고객에게 최적의 솔루션을 제안하고 있습니다.",
                "끊임없이 변화하는 기술 시장에 대응하기 위해 [회사명]은 LED 클러스터 R&D와 기술 개발 사업을 활발히 진행하고 있으며, 지속적인 연구와 협력을 통해 반도체 유통업계의 혁신을 이끌어가고 있습니다.",
            ],
            buttonText: "회사소개서",
        },
        cards: [
            {
                title: "연혁",
                description: "1997년 설립 이후 28년 간의 전문성과 노하우",
                link: { text: "회사연혁 바로가기", href: "/company/history" },
                icon: "CalendarDays",
            },
            {
                title: "본사",
                description: "서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217-3218호",
                link: { text: "찾아오시는 길", href: "/company/location" },
                icon: "Building",
            },
            {
                title: "대표이사",
                description: "김영구\nKim Young Goo",
                link: { text: "대표이사 인사말", href: "/company/ceo" },
                icon: "UserCircle2",
            },
            {
                title: "주력사업",
                description: "LED Driver IC &\n전자부품 유통",
                link: { text: "파트너사", href: "/products" },
                icon: "Cpu",
            },
        ],
        carouselItems: [
            {
                quote: "최고의 품질과 서비스로 고객만족을 실현합니다.",
                name: "품질 경영",
                title: "Quality Management",
                backgroundImage: "/images/automotive_category_banner.png",
            },
            {
                quote: "지속적인 혁신과 기술개발로 미래를 선도합니다.",
                name: "기술 혁신",
                title: "Technical Innovation",
                backgroundImage: "/images/automotive_category_banner.png",
            },
            {
                quote: "글로벌 시장을 선도하는 전자부품 전문기업입니다.",
                name: "글로벌 리더십",
                title: "Global Leadership",
                backgroundImage: "/images/automotive_category_banner.png",
            },
            {
                quote: "고객과의 신뢰를 바탕으로 함께 성장합니다.",
                name: "고객 중심",
                title: "Customer Focus",
                backgroundImage: "/images/automotive_category_banner.png",
            },
            {
                quote: "환경과 사회적 책임을 다하는 기업이 되겠습니다.",
                name: "사회적 책임",
                title: "Social Responsibility",
                backgroundImage: "/images/automotive_category_banner.png",
            },
        ],
    };
}
