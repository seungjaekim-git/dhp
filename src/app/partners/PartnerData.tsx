import { Building2, Globe2, Users2, Mail, Phone, Printer, Link2, CalendarClock, MapPin, DollarSign, Building, Briefcase, Component, FileText, Factory } from "lucide-react";

export interface PartnerData {
  name: string;
  established: string; 
  country: string;
  headquarters: string;
  business_type: string;
  main_products: string[];
  main_product_categories: Array<"LED 드라이버 IC" | "전원관리 IC" | "다이오드" | "수동소자" | "케이블&커넥터" | "센서" | "자동차 인증 부품">;
  employees: string;
  company_overview: string;
  business_overview: string;
  emails: string[];
  phones: string[];
  faxes: string[];
  website: string;
  key_milestones: Array<{
    year: string;
    event: string;
  }>;
  branches: string[];
  annual_revenue: string;
  sales_markets: string[];
  images: {
    logo: string;
    building: string;
    products: string[];
  };
  links: {
    website: string;
    linkedin: string;
    facebook: string;
  };
}

export const PARTNER_FIELD_ICONS = {
  name: Building2,
  established: CalendarClock,
  country: Globe2,
  headquarters: MapPin,
  business_type: Factory,
  main_products: Component,
  employees: Users2,
  company_overview: FileText,
  business_overview: Briefcase,
  email: Mail,
  phone: Phone,
  fax: Printer,
  website: Link2,
  key_milestones: CalendarClock,
  branches: Building,
  annual_revenue: DollarSign,
  sales_markets: Globe2
} as const;

export type PartnerFieldKey = keyof typeof PARTNER_FIELD_ICONS;

export const PARTNER_DATA: PartnerData[] = [
  {
    name: "Macroblock",
    established: "1999",
    country: "대만",
    headquarters: "대만 신주시 푸딩로 18번지 300047",
    business_type: "제조업, 상장기업",
    main_products: ["LED Driver IC"],
    main_product_categories: ["LED 드라이버 IC"],
    employees: "200+",
    company_overview: "A Driver IC Like No OtherMacroblock은 1999년 6월 대만 신주에서 설립된 회사로, 혼합 신호 드라이버 IC 설계 전문 기업입니다. 특히 전력 관리와 광전자 응용 분야에 중점을 두고 있습니다. 2017년 4월에는 ISO 9001:2015 인증을 획득하여, 최고 품질의 제품을 지속적으로 제공하며 전 세계 고객의 신뢰를 얻고 있습니다.또한, 2014년 IHS Research에서 LED 드라이버 IC 시장 점유율 3위로 선정되었으며, 디스플레이, 백라이트, 조명 애플리케이션에서 최고의 LED 성능을 제공하는 것을 목표로 하고 있습니다.Macroblock Inc.는 현재 대만의 타이베이 증권거래소(Taipei Exchange, TPEx)에 상장되어 있습니다.",
    business_overview: "Macroblock은 LED 디스플레이 및 조명 애플리케이션을 위한 고성능 드라이버 IC 설계에 주력하는 세계적인 기업입니다. 20년 이상의 경험을 바탕으로, 대량 전송 및 미니 LED 기술을 활용하여 혁신적인 모듈 솔루션을 제공합니다.",
    emails: ["info@mblock.com.tw"],
    phones: ["+886-3-579-0068*7707"],
    faxes: ["+886-3-579-7534"],
    website: "https://www.mblock.com.tw/en",
    key_milestones: [
      { year: "1999", event: "대만 신주에서 설립, 전력 관리 및 광전자 응용에 중점을 둔 혼합 신호 드라이버 IC 설계 전문 기업으로 출발" },
      { year: "2005", event: "세계 최초로 특허받은 S-PWM 기술이 적용된 16비트 PWM 내장형 LED 드라이버를 개발" },
      { year: "2008", event: "베이징 올림픽에서 제품 활용" },
      { year: "2010", event: "상하이 엑스포에서 제품 활용" },
      { year: "2014", event: "IHS Research에서 발표한 LED 드라이버 IC 시장 점유율 순위에서 세계 3위에 오름" },
      { year: "2017", event: "ISO 9001:2015 품질 경영 시스템 인증을 획득" },
      { year: "2019", event: "마이크로 LED 디스플레이용 드라이버 개발 진행, 대만의 ITRI와 협력" },
      { year: "2022", event: "자동차용 미니 LED 백라이트 제품을 중국의 여러 자동차 제조사에 공급" }
    ],
    branches: ["중국 선전", "대한민국 서울"],
    annual_revenue: "5,707만 미국 달러(USD) (2024 회계기준)",
    sales_markets: ["중국 선전", "대한민국 서울"],
    images: {
      logo: "/logos/macroblock-logo.png",
      building: "/images/partners/macroblock/building.jpg",
      products: ["/images/partners/macroblock/product1.jpg", "/images/partners/macroblock/product2.jpg"]
    },
    links: {
      website: "https://www.mblock.com.tw/en",
      linkedin: "https://www.linkedin.com/company/macroblock",
      facebook: "https://www.facebook.com/MacroblockInc"
    }
  },
  {
    name: "Zowie",
    established: "1994",
    country: "대만",
    headquarters: "대만 신베이시 신뎬구 푸싱로 43번지 3층",
    business_type: "제조업",
    main_products: ["쇼트키 다이오드(Schottky Diode)", "브리지 정류기(Bridge Rectifier)", "Glass Passivated Rectifier Chip (GPRC)", "SuperChip Diode (SCD)"],
    main_product_categories: ["다이오드"],
    employees: "",
    company_overview: "ZOWIE Technology Corporation은 1994년 대만에서 설립된 반도체 제조 기업으로, 중·저전력 다이오드 및 정류기 설계와 생산에 특화되어 있습니다.",
    business_overview: "ZOWIE는 다양한 산업 분야에 적용되는 고신뢰성의 다이오드 및 정류기 제품을 제공합니다.",
    emails: ["inquiry@zowie.com.tw"],
    phones: ["+886-2-2219-5533"],
    faxes: ["+886-2-2219-1133"],
    website: "http://www.zowie.com.tw",
    key_milestones: [
      { year: "1994", event: "Glass Passivated Rectifier Chip(GPRC) 개발 시작" },
      { year: "1995", event: "GPRC의 첫 시험 생산 성공" },
      { year: "1998", event: "GPRC 제품 공식 출시" }
    ],
    branches: [],
    annual_revenue: "",
    sales_markets: ["중국 쿤산"],
    images: {
      logo: "/logos/zowie-logo.png",
      building: "/images/partners/zowie/building.jpg",
      products: ["/images/partners/zowie/product1.jpg", "/images/partners/zowie/product2.jpg"]
    },
    links: {
      website: "http://www.zowie.com.tw",
      linkedin: "https://www.linkedin.com/company/zowie-technology",
      facebook: ""
    }
  },
  {
    name: "LLT",
    established: "2001",
    country: "중국",
    headquarters: "중국 광둥성 선전시 룽강구 핑후가도 지아후로 1-38번지",
    business_type: "제조업",
    main_products: ["방수 커넥터 및 플러그", "항공 플러그", "셀프 록킹 및 퀵 커넥터"],
    main_product_categories: ["케이블&커넥터", "자동차 인증 부품"],
    employees: "300-349",
    company_overview: "Shenzhen Lilutong Electronic Technology Co., Ltd.는 2000년에 설립된 중국 선전 기반의 하이테크 기업입니다.",
    business_overview: "방수 커넥터의 연구개발, 생산 및 판매를 전문으로 하는 기업입니다.",
    emails: ["sales@llt.cn"],
    phones: ["+86-755-xxxx-xxxx"],
    faxes: ["+86-755-xxxx-xxxx"],
    website: "http://www.llt.cn",
    key_milestones: [],
    branches: [],
    annual_revenue: "",
    sales_markets: [],
    images: {
      logo: "/logos/llt-logo.png",
      building: "/images/partners/llt/building.jpg",
      products: ["/images/partners/llt/product1.jpg", "/images/partners/llt/product2.jpg"]
    },
    links: {
      website: "http://www.llt.cn",
      linkedin: "https://www.linkedin.com/company/llt-electronic",
      facebook: ""
    }
  },
  {
    name: "KubeElectronics",
    established: "1981",
    country: "스위스",
    headquarters: "스위스 고사우 인더스트리슈트라세 55번지, 8625",
    business_type: "제조업, 가족기업",
    main_products: ["PIR 센서"],
    main_product_categories: ["센서", "자동차 인증 부품"],
    employees: "10+",
    company_overview: "KUBE Electronics AG는 스위스에 본사를 둔 기업으로, 1980년대 초부터 수동 적외선(PIR) 산업을 위한 윈도우 소재를 생산해 왔습니다.",
    business_overview: "KUBE Electronics AG는 PIR 투과성 사출 성형용 HDPE 그라뉼, 윈도우 필름, 다양한 PIR 렌즈 및 센서를 설계하고 생산합니다.",
    emails: ["info@kube.ch"],
    phones: ["+41 43 928 05 50"],
    faxes: ["+41 43 928 05 51"],
    website: "https://www.kube.ch/home.htm",
    key_milestones: [
      { year: "1980", event: "스위스 슈메리콘에서 PIR 산업용 윈도우 소재 생산 시작" },
      { year: "1981", event: "KUBE Electronics AG 설립" }
    ],
    branches: [],
    annual_revenue: "",
    sales_markets: [],
    images: {
      logo: "/logos/kube-logo.png",
      building: "/images/partners/kube/building.jpg",
      products: ["/images/partners/kube/product1.jpg", "/images/partners/kube/product2.jpg"]
    },
    links: {
      website: "https://www.kube.ch",
      linkedin: "https://www.linkedin.com/company/kube-electronics",
      facebook: ""
    }
  },
  {
    name: "XLSEMI",
    established: "2012", 
    country: "중국",
    headquarters: "중국 상하이시 자유무역시험구 신진차오로 1888번지 18동",
    business_type: "제조업",
    main_products: ["전원 관리(Power Management)", "신호 체인(Signal Chain)", "오디오 증폭기(Audio Amplifier)", "MEMS 센서"],
    main_product_categories: ["전원관리 IC", "센서"],
    employees: "50+",
    company_overview: "XLSEMI는 고성능 전력관리 반도체 솔루션을 전문적으로 개발하는 회사입니다.",
    business_overview: "XLSEMI는 LED 조명, 가전제품, 전력변환 및 스마트 전자기기에 사용되는 전원관리 솔루션을 제공합니다.",
    emails: ["sales@xlsemi.com"],
    phones: ["+86 (21) 3382-2315"],
    faxes: ["+86 (21) 3382-2313"],
    website: "https://www.xlsemi.com/",
    key_milestones: [
      { year: "2012", event: "XLSEMI 설립" },
      { year: "2020", event: "약 930만 달러의 후속 단계 벤처 캐피털 투자 유치" }
    ],
    branches: [],
    annual_revenue: "",
    sales_markets: [],
    images: {
      logo: "/logos/xlsemi-logo.png",
      building: "/images/partners/xlsemi/building.jpg",
      products: ["/images/partners/xlsemi/product1.jpg", "/images/partners/xlsemi/product2.jpg"]
    },
    links: {
      website: "https://www.xlsemi.com",
      linkedin: "https://www.linkedin.com/company/xlsemi",
      facebook: ""
    }
  },
  {
    name: "Powtech",
    established: "2003",
    country: "중국",
    headquarters: "중국 광둥성 선전시 난산구 커위안난로 비소닉 소프트웨어 파크",
    business_type: "제조업",
    main_products: ["전력 관리 IC", "지능형 센서"],
    main_product_categories: ["전원관리 IC", "센서"],
    employees: "",
    company_overview: "PowTech는 CR Micro의 전력 관리 IC 및 지능형 센서 솔루션 전문 브랜드입니다.",
    business_overview: "PowTech는 전력 관리 IC, 지능형 센서, 모터 및 배터리 제어 솔루션 등 다양한 제품군을 보유하고 있습니다.",
    emails: ["wangyan1519@powtech.crmicro.com"],
    phones: ["+86-21-60738989 내선 341"],
    faxes: ["+86-510-85872470"],
    website: "https://www.crmicro.com/",
    key_milestones: [
      { year: "2003", event: "CR Micro 설립" },
      { year: "2003", event: "PowTech 설립" },
      { year: "2005", event: "첫 전력 관리 IC 제품 출시" }
    ],
    branches: ["우시 생산기지", "상하이 지사"],
    annual_revenue: "",
    sales_markets: [],
    images: {
      logo: "/logos/powtech-logo.png",
      building: "/images/partners/powtech/building.jpg",
      products: ["/images/partners/powtech/product1.jpg", "/images/partners/powtech/product2.jpg"]
    },
    links: {
      website: "https://www.crmicro.com",
      linkedin: "https://www.linkedin.com/company/cr-micro",
      facebook: ""
    }
  },
  {
    name: "GTM",
    established: "2000", 
    country: "대만",
    headquarters: "대만 타이베이시 네이후구 저우쯔가 112호 6층",
    business_type: "제조업, 대기업 계열사",
    main_products: [],
    main_product_categories: ["전원관리 IC"],
    employees: "",
    company_overview: "GTM Electronics는 2000년에 설립되어 전력 소자 조립 OEM 서비스를 제공하며, 전력 소자 제품의 직접 판매를 진행해 왔습니다. 2015년에는 GTM 그룹에서 분사하여 Linpo Holdings Corporation의 자회사로 독립하였으며, 2016년에는 OEM에서 OBM(Original Brand Manufacturer)으로 사업 모델을 전환하여 전력 소자 개발 및 판매에 집중하고 있습니다.",
    business_overview: "GTM Electronics는 전문적인 제조 경험과 유통 팀을 통해 우수한 품질의 제품과 서비스를 제공하며, 고객에게 경쟁 우위를 제공합니다. 제품 응용 분야는 PC, 서버, 전원 공급 장치, 통신 장비, 휴대용 기기, 소비자 전자 제품 및 자동차 주변 전자 장치 등을 포함합니다.",
    emails: ["weiting@linpotek.com.tw"],
    phones: ["+886-2-8797-1297"],
    faxes: ["+886-2-8797-1570"],
    website: "https://www.linpotek.com.tw/",
    key_milestones: [
      { year: "2000", event: "GTM Electronics Co., Ltd. 설립, 전력 소자 조립 OEM 서비스 시작" },
      { year: "2015", event: "GTM 그룹에서 분사하여 Linpo Holdings Corporation의 자회사로 독립" },
      { year: "2016", event: "OEM에서 OBM(Original Brand Manufacturer) 사업 모델로 전환, 전력 소자 개발 및 판매에 집중" }
    ],
    branches: [],
    annual_revenue: "",
    sales_markets: [],
    images: {
      logo: "/logos/gtm-logo.png",
      building: "/images/partners/gtm/building.jpg",
      products: ["/images/partners/gtm/product1.jpg", "/images/partners/gtm/product2.jpg"]
    },
    links: {
      website: "https://www.linpotek.com.tw",
      linkedin: "",
      facebook: ""
    }
  },
 
  {
    name: "Morethanall",
    established: "1983",
    country: "대만",
    headquarters: "8층, No.659-2, Zhongzheng Rd., Xinzhuang Dist., New Taipei City 24257, Taiwan (R.O.C.)",
    business_type: "제조업",
    main_products: [
      "보드 투 보드 커넥터: 핀 헤더, 여성 헤더, 점퍼, DIN 41612, LCM",
      "보드 투 와이어 커넥터: 웨이퍼, 하우징, 터미널, 와이어 투 와이어",
      "리본 케이블 커넥터: 시리얼 ATA 커넥터, IDC 소켓, IDC 플러그, IDC 헤더, 박스 헤더, 래치 헤더, 이젝션 헤더, 카드 엣지 커넥터",
      "FPC/FFC 소켓 및 케이블: ZIF 또는 비 ZIF 타입",
      "IC/메모리 카드 커넥터: PCMCIA, 컴팩트 플래시, SD 카드, 메모리 스틱, XD 카드, 스마트 카드, SIM 카드, 게임 카트리지, 엣지 슬롯, AGP 슬롯, PCI 슬롯",
      "소켓형 커넥터: 배터리 홀더, DIMM 소켓, SIMM 소켓, SOJ 소켓, PLCC 소켓, IC 소켓",
      "직사각형 I/O 커넥터: USB, 미니 USB, D-sub, 고밀도, 하프 피치, SCA, SCSI, 1394, 1394a, 1394b, V.35, 휴대폰 커넥터",
      "원형 I/O 커넥터: 잭 및 플러그, DC, 이어폰, RCA, 원형 DIN, 미니 DIN, 동축 커넥터",
      "통신 I/O 커넥터: RJ11, RJ12, RJ45, 모듈러 잭 및 플러그, 전화 스플라이스",
      "터미널 및 터미널 블록: 배리어 타입, 유로 PCB 타입, 플러그인, IDC-클램프, 스크류-클램프, 케이지-클램프, 스프링-클램프, 스크류리스, 자동차용 터미널 및 하우징",
      "맞춤형 커넥터 및 케이블 어셈블리: 고객의 요구에 따른 커넥터 및 케이블 어셈블리 제작"
    ],
    main_product_categories: ["케이블&커넥터"],
    employees: "300-349",
    company_overview: "Morethanall Co., Ltd.는 1983년에 설립된 대만의 커넥터 전문 제조업체로, 컴퓨터, 소비자 전자기기, 통신, 자동차 등 다양한 분야에 적용되는 커넥터를 설계하고 생산합니다. 설립 이후 38년간 축적된 경험을 바탕으로, 전 세계 50개 이상의 국가에 제품을 공급하며 우수한 품질과 신뢰성을 인정받고 있습니다.",
    business_overview: "Morethanall은 고객의 다양한 요구를 충족시키기 위해 폭넓고 다양한 제품군을 제공합니다. 주요 제품으로는 보드 투 보드 커넥터(핀 헤더, 여성 헤더, 점퍼, DIN 41612, LCM), 보드 투 와이어 커넥터(웨이퍼, 하우징, 터미널, 와이어 투 와이어), 리본 케이블 커넥터(시리얼 ATA 커넥터, IDC 소켓, IDC 플러그, IDC 헤더, 박스 헤더, 래치 헤더, 이젝션 헤더, 카드 엣지 커넥터), FPC/FFC 소켓 및 케이블(ZIF 또는 비 ZIF), IC/메모리 카드 커넥터(PCMCIA, 컴팩트 플래시, SD 카드, 메모리 스틱, XD 카드, 스마트 카드, SIM 카드, 게임 카트리지, 엣지 슬롯, AGP 슬롯, PCI 슬롯), 소켓형 커넥터(배터리 홀더, DIMM 소켓, SIMM 소켓, SOJ 소켓, PLCC 소켓, IC 소켓), 직사각형 I/O 커넥터(USB, 미니 USB, D-sub, 고밀도, 하프 피치, SCA, SCSI, 1394, 1394a, 1394b, V.35, 휴대폰 커넥터), 원형 I/O 커넥터(잭 및 플러그, DC, 이어폰, RCA, 원형 DIN, 미니 DIN, 동축 커넥터), 통신 I/O 커넥터(RJ11, RJ12, RJ45, 모듈러 잭 및 플러그, 전화 스플라이스), 터미널 및 터미널 블록(배리어 타입, 유로 PCB 타입, 플러그인, IDC-클램프, 스크류-클램프, 케이지-클램프, 스프링-클램프, 스크류리스, 자동차용 터미널 및 하우징) 등이 있습니다. 또한, 고객 맞춤형 커넥터와 케이블 어셈블리도 제공합니다. MoreThanAllMorethanall은 대만과 중국 본토에 위치한 시설을 통해 고객의 사양을 충족시키며, 지속적으로 신제품을 개발하여 고객에게 다양한 선택지를 제공합니다.",
    emails: ["mta@morethanall.com"],
    phones: ["886-2-29082428"],
    faxes: ["886-2-29082429"],
    website: "www.morethanall.com",
    key_milestones: [
      { year: "1983", event: "Morethanall Co., Ltd. 설립" },
      { year: "1990", event: "대만 지룽시에 공장 설립" },
      { year: "2000", event: "중국 선전에 공장 설립" },
      { year: "2024", event: "전 세계 50개국 이상에 제품 수출" }
    ],
    branches: [],
    annual_revenue: "US$25,000,000 - 29,999,999",
    sales_markets: [],
    images: {
      logo: "/logos/morethanall-logo.png",
      building: "/images/partners/morethanall/building.jpg",
      products: ["/images/partners/morethanall/product1.jpg", "/images/partners/morethanall/product2.jpg"]
    },
    links: {
      website: "https://www.morethanall.com",
      linkedin: "",
      facebook: ""
    }
  }
];
