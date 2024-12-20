export const productCategoryItems = [
    // LED Driver IC
    {
        title: "LED Driver IC",
        link: "/products/list/led-driver",
        content: [
            {
                title: "DC-DC LED 드라이버",
                link: "/products/list/led-driver?category=dc-dc-led-driver",
                children: [
                    { title: "벅 컨버터 타입", link: "/products/list/led-driver?category=buck-converter", icon: "tailwind" },
                    { title: "부스트 컨버터 타입", link: "/products/list/led-driver?category=boost-converter", icon: "bootstrap" },
                    { title: "벅-부스트 컨버터 타입", link: "/products/list/led-driver?category=buck-boost-converter", icon: "angular" },
                    { title: "정전류 제어형", link: "/products/list/led-driver?category=constant-current", icon: "react" },
                    { title: "디밍 제어형", link: "/products/list/led-driver?category=dimming-control", icon: "vue" },
                ],
            },
            {
                title: "AC-DC LED 드라이버",
                link: "/products/list/led-driver?category=ac-dc-led-driver",
                children: [
                    { title: "단상 입력형", link: "/products/list/led-driver?category=single-phase", icon: "tailwind" },
                    { title: "삼상 입력형", link: "/products/list/led-driver?category=three-phase", icon: "bootstrap" },
                    { title: "역률 보정형", link: "/products/list/led-driver?category=pfc", icon: "angular" },
                    { title: "절연형", link: "/products/list/led-driver?category=isolation", icon: "react" },
                    { title: "비절연형", link: "/products/list/led-driver?category=non-isolation", icon: "vue" },
                ],
            },
            {
                title: "LED 매트릭스 드라이버",
                link: "/products/list/led-driver?category=led-matrix-driver",
                children: [
                    { title: "정전류 매트릭스", link: "/products/list/led-driver?category=current-matrix", icon: "tailwind" },
                    { title: "PWM 제어형", link: "/products/list/led-driver?category=pwm-control", icon: "bootstrap" },
                    { title: "RGB LED 컨트롤러", link: "/products/list/led-driver?category=rgb-controller", icon: "angular" },
                    { title: "디스플레이용 드라이버", link: "/products/list/led-driver?category=display-driver", icon: "react" },
                    { title: "사이니지용 드라이버", link: "/products/list/led-driver?category=signage-driver", icon: "vue" },
                ],
            },
        ],
    },
    // 다이오드
    {
        title: "다이오드",
        link: "/products/list/diode",
        content: [
            {
                title: "정류 다이오드",
                link: "/products/list/diode?category=rectifier-diode",
                children: [
                    { title: "일반용 정류 다이오드", link: "/products/list/diode?category=general", icon: "tailwind" },
                    { title: "고속 정류 다이오드", link: "/products/list/diode?category=high-speed", icon: "bootstrap" },
                    { title: "브리지 정류기", link: "/products/list/diode?category=bridge", icon: "angular" },
                    { title: "고전압용 정류기", link: "/products/list/diode?category=high-voltage", icon: "react" },
                    { title: "저전압용 정류기", link: "/products/list/diode?category=low-voltage", icon: "vue" },
                ],
            },
            {
                title: "쇼트키 다이오드",
                link: "/products/list/diode?category=schottky-diode",
                children: [
                    { title: "저전압용 쇼트키", link: "/products/list/diode?category=low-voltage", icon: "tailwind" },
                    { title: "고전압용 쇼트키", link: "/products/list/diode?category=high-voltage", icon: "bootstrap" },
                    { title: "듀얼 쇼트키", link: "/products/list/diode?category=dual", icon: "angular" },
                    { title: "SiC 쇼트키", link: "/products/list/diode?category=sic", icon: "react" },
                    { title: "전력용 쇼트키", link: "/products/list/diode?category=power", icon: "vue" },
                ],
            },
            {
                title: "제너 다이오드",
                link: "/products/list/diode?category=zener-diode",
                children: [
                    { title: "저전압 제너", link: "/products/list/diode?category=low-voltage-zener", icon: "tailwind" },
                    { title: "고전압 제너", link: "/products/list/diode?category=high-voltage-zener", icon: "bootstrap" },
                    { title: "정밀 제너", link: "/products/list/diode?category=precision-zener", icon: "angular" },
                    { title: "가변 제너", link: "/products/list/diode?category=variable-zener", icon: "react" },
                    { title: "양방향 제너", link: "/products/list/diode?category=bidirectional-zener", icon: "vue" },
                ],
            },
            {
                title: "TVS 다이오드",
                link: "/products/list/diode?category=tvs-diode",
                children: [
                    { title: "단방향 TVS", link: "/products/list/diode?category=unidirectional-tvs", icon: "tailwind" },
                    { title: "양방향 TVS", link: "/products/list/diode?category=bidirectional-tvs", icon: "bootstrap" },
                    { title: "배열형 TVS", link: "/products/list/diode?category=array-tvs", icon: "angular" },
                    { title: "ESD 보호용", link: "/products/list/diode?category=esd-protection", icon: "react" },
                    { title: "서지 보호용", link: "/products/list/diode?category=surge-protection", icon: "vue" },
                ],
            },
        ],
    },
    // 커넥터
    {
        title: "커넥터",
        link: "/products/list/connector",
        content: [
            {
                title: "원형 커넥터",
                link: "/products/list/connector?category=circular-connector",
                children: [
                    { title: "M8 커넥터", link: "/products/list/connector?category=m8", icon: "tailwind" },
                    { title: "M12 커넥터", link: "/products/list/connector?category=m12", icon: "bootstrap" },
                    { title: "군용 원형 커넥터", link: "/products/list/connector?category=military", icon: "angular" },
                    { title: "방수 원형 커넥터", link: "/products/list/connector?category=waterproof", icon: "react" },
                    { title: "푸시풀 커넥터", link: "/products/list/connector?category=push-pull", icon: "vue" },
                ],
            },
            {
                title: "보드 대 보드",
                link: "/products/list/connector?category=board-to-board",
                children: [
                    { title: "BTB 커넥터", link: "/products/list/connector?category=btb", icon: "tailwind" },
                    { title: "FPC/FFC 커넥터", link: "/products/list/connector?category=fpc-ffc", icon: "bootstrap" },
                    { title: "메자닌 커넥터", link: "/products/list/connector?category=mezzanine", icon: "angular" },
                    { title: "고속전송용 커넥터", link: "/products/list/connector?category=high-speed", icon: "react" },
                    { title: "전원용 커넥터", link: "/products/list/connector?category=power", icon: "vue" },
                ],
            },
        ],
    },
    // 센서
    {
        title: "센서",
        link: "/products/list/sensor",
        content: [
            {
                title: "온도 센서",
                link: "/products/list/sensor?category=temperature-sensor",
                children: [
                    { title: "써미스터", link: "/products/list/sensor?category=thermistor", icon: "tailwind" },
                    { title: "RTD 센서", link: "/products/list/sensor?category=rtd", icon: "bootstrap" },
                    { title: "열전대", link: "/products/list/sensor?category=thermocouple", icon: "angular" },
                    { title: "IC 타입 온도센서", link: "/products/list/sensor?category=ic-type", icon: "react" },
                    { title: "적외선 온도센서", link: "/products/list/sensor?category=infrared", icon: "vue" },
                ],
            },
            {
                title: "압력 센서",
                link: "/products/list/sensor?category=pressure-sensor",
                children: [
                    { title: "피에조 저항형", link: "/products/list/sensor?category=piezoresistive", icon: "tailwind" },
                    { title: "정전용량형", link: "/products/list/sensor?category=capacitive", icon: "bootstrap" },
                    { title: "광학식 압력센서", link: "/products/list/sensor?category=optical", icon: "angular" },
                    { title: "MEMS 압력센서", link: "/products/list/sensor?category=mems", icon: "react" },
                    { title: "차압 센서", link: "/products/list/sensor?category=differential", icon: "vue" },
                ],
            },
            {
                title: "가속도 센서",
                link: "/products/list/sensor?category=accelerometer",
                children: [
                    { title: "1축 가속도센서", link: "/products/list/sensor?category=1-axis", icon: "tailwind" },
                    { title: "2축 가속도센서", link: "/products/list/sensor?category=2-axis", icon: "bootstrap" },
                    { title: "3축 가속도센서", link: "/products/list/sensor?category=3-axis", icon: "angular" },
                    { title: "MEMS 가속도센서", link: "/products/list/sensor?category=mems", icon: "react" },
                    { title: "진동 센서", link: "/products/list/sensor?category=vibration", icon: "vue" },
                ],
            },
            {
                title: "근접 센서",
                link: "/products/list/sensor?category=proximity-sensor",
                children: [
                    { title: "정전용량형", link: "/products/list/sensor?category=capacitive", icon: "tailwind" },
                    { title: "유도형", link: "/products/list/sensor?category=inductive", icon: "bootstrap" },
                    { title: "광학식", link: "/products/list/sensor?category=optical", icon: "angular" },
                    { title: "초음파식", link: "/products/list/sensor?category=ultrasonic", icon: "react" },
                    { title: "자기식", link: "/products/list/sensor?category=magnetic", icon: "vue" },
                ],
            },
        ],
    },
    // 수동소자
    {
        title: "수동소자",
        link: "/products/list/passive",
        content: [
            {
                title: "저항기",
                link: "/products/list/passive?category=resistor",
                children: [
                    { title: "칩 저항", link: "/products/list/passive?category=chip", icon: "tailwind" },
                    { title: "금속피막 저항", link: "/products/list/passive?category=metal-film", icon: "bootstrap" },
                    { title: "와이어와운드 저항", link: "/products/list/passive?category=wire-wound", icon: "angular" },
                    { title: "SMD 저항", link: "/products/list/passive?category=smd", icon: "react" },
                    { title: "고정밀 저항", link: "/products/list/passive?category=precision", icon: "vue" },
                ],
            },
            {
                title: "커패시터",
                link: "/products/list/passive?category=capacitor",
                children: [
                    { title: "세라믹 커패시터", link: "/products/list/passive?category=ceramic", icon: "tailwind" },
                    { title: "전해 커패시터", link: "/products/list/passive?category=electrolytic", icon: "bootstrap" },
                    { title: "탄탈 커패시터", link: "/products/list/passive?category=tantalum", icon: "angular" },
                    { title: "필름 커패시터", link: "/products/list/passive?category=film", icon: "react" },
                    { title: "MLCC", link: "/products/list/passive?category=mlcc", icon: "vue" },
                ],
            },
            {
                title: "인덕터",
                link: "/products/list/passive?category=inductor",
                children: [
                    { title: "칩 인덕터", link: "/products/list/passive?category=chip", icon: "tailwind" },
                    { title: "파워 인덕터", link: "/products/list/passive?category=power", icon: "bootstrap" },
                    { title: "SMD 인덕터", link: "/products/list/passive?category=smd", icon: "angular" },
                    { title: "페라이트 비드", link: "/products/list/passive?category=ferrite-bead", icon: "react" },
                    { title: "RF 인덕터", link: "/products/list/passive?category=rf", icon: "vue" },
                ],
            },
        ],
    },
    // 전원관리 IC
    {
        title: "전원관리 IC",
        link: "/products/list/power-ic",
        content: [
            {
                title: "DC-DC 컨버터",
                link: "/products/list/power-ic?category=dc-dc-converter",
                children: [
                    { title: "벅 컨버터", link: "/products/list/power-ic?category=buck", icon: "tailwind" },
                    { title: "부스트 컨버터", link: "/products/list/power-ic?category=boost", icon: "bootstrap" },
                    { title: "벅-부스트 컨버터", link: "/products/list/power-ic?category=buck-boost", icon: "angular" },
                    { title: "POL 컨버터", link: "/products/list/power-ic?category=pol", icon: "react" },
                    { title: "절연형 컨버터", link: "/products/list/power-ic?category=isolation", icon: "vue" },
                ],
            },
            {
                title: "배터리 관리 IC",
                link: "/products/list/power-ic?category=battery-management",
                children: [
                    { title: "충전 컨트롤러", link: "/products/list/power-ic?category=charger", icon: "tailwind" },
                    { title: "BMS IC", link: "/products/list/power-ic?category=bms", icon: "bootstrap" },
                    { title: "보호 IC", link: "/products/list/power-ic?category=protection", icon: "angular" },
                    { title: "연료게이지 IC", link: "/products/list/power-ic?category=fuel-gauge", icon: "react" },
                    { title: "밸런싱 IC", link: "/products/list/power-ic?category=balancing", icon: "vue" },
                ],
            },
        ],
    },
];



export const partnersItems = [
    {
        title: "Macroblock",
        description: "Taiwan, LED Driver IC ",
        icon: "/logos/macroblock-logo.png",
        partnerStory: {
            image: "/banners/macroblock_banner.jpg",
            text: "Preline Docs have been a game-changer for our team's productivity.",
            learnMoreLink: "/stories/docs-impact"
        }
    },
    {
        title: "Zowie",
        description: "Diodie, Taiwan",
        icon: "/logos/zowie-logo.png",
        partnerStory: {
            image: "/banners/zowie_banner.jpg",
            text: "Preline's integrations have streamlined our workflow significantly.",
            learnMoreLink: "/stories/integration-success"
        }
    },
    {
        title: "XLSEMI",
        description: "China, LED Driver IC",
        icon: "/logos/xlsemi-logo.png",
        partnerStory: {
            image: "/banners/xlsemi_banner.jpg",
            text: "Our custom solution built on Preline's API has transformed our business.",
            learnMoreLink: "/stories/api-innovation"
        }
    },
    {
        title: "LLT",
        description: "China, Cable",
        icon: "/logos/llt-logo.png",
        partnerStory: {
            image: "/banners/llt_banner.jpg",
            text: "Preline's Help Center guided us through a seamless implementation.",
            learnMoreLink: "/stories/help-center-experience"
        }
    },
    {
        title: "Kube Electronics AG",
        description: "Swisis, Sensor",
        icon: "/logos/kube-logo.png",
        partnerStory: {
            image: "/banners/kube_banner.jpg",
            text: "The Developer Hub empowered us to create powerful custom features.",
            learnMoreLink: "/stories/developer-success"
        }
    },
    {
        title: "Morethanall",
        description: "China, Cable",
        icon: "/logos/morethanall-logo.png",
        partnerStory: {
            image: "/banners/morethanall_banner.png",
            text: "The Preline community has been an invaluable resource for our team.",
            learnMoreLink: "/stories/community-impact"
        }
    },
    {
        title: "Powtech",
        description: "China, LED Driver IC",
        icon: "/logos/powtech-logo.png",
        partnerStory: {
            image: "/banners/powtech_banner.jpg",
            text: "The Preline community has been an invaluable resource for our team.",
            learnMoreLink: "/stories/community-impact"
        }
    },
    {
        title: "GTM",
        description: "Taiwan, MOSFET",
        icon: "/logos/gtm-logo.png",
        partnerStory: {
            image: "/banners/gtm_banner.jpg",
            text: "The Preline community has been an invaluable resource for our team.",
            learnMoreLink: "/stories/community-impact"
        }
    },
];