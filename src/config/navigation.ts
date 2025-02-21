import { 
  Cpu, 
  Microchip, 
  Power, 
  Aperture, 
  Plug, 
  Link, 
  Layers, 
  Package,
  LucideIcon  
} from "lucide-react";

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

interface SubCategory {
  title: string;
  link: string;
  seo: SEOMetadata;
  children?: {
    title: string;
    link: string;
    seo: SEOMetadata;
  }[];
}

interface ProductCategory {
  title: string;
  link: string;
  seo: SEOMetadata;
  icon?: LucideIcon;
  content?: SubCategory[];
}

interface Partner {
  title: string;
  description: string;
  icon: string;
  categories: string[];
  country: string;
  type: string;
  subtitle: string;
  details: string[];
  link: string;
  seo: SEOMetadata;
  partnerStory: {
    image: string;
    text: string;
    learnMoreLink: string;
  };
}

export interface NavigationConfig {
  company: {
    title: string;
    link: string;
    seo: SEOMetadata;
    items: {
      title: string;
      description: string;
      link: string;
      seo: SEOMetadata;
    }[];
  };
  products: {
    title: string;
    link: string;
    seo: SEOMetadata;
    categories: ProductCategory[];
  };
  partners: {
    title: string;
    link: string;
    seo: SEOMetadata;
    items: Partner[];
  };
  support: {
    title: string;
    link: string;
    seo: SEOMetadata;
    inquiry: {
      title: string;
      link: string;
      seo: SEOMetadata;
      items: { title: string; link: string; seo: SEOMetadata; }[];
    };
    contact: {
      title: string;
      link: string;
      seo: SEOMetadata;
      items: { title: string; link: string; seo: SEOMetadata; }[];
    };
    resources: {
      title: string;
      link: string;
      seo: SEOMetadata;
      items: { title: string; link: string; seo: SEOMetadata; }[];
    };
  };
}

export const navigationConfig: NavigationConfig = {
  company: {
    title: "회사소개",
    link: "/about",
    seo: {
      title: "대한플러스전자 회사소개 | 반도체 전문 기업",
      description: "대한플러스전자는 LED Driver IC, 다이오드, 전원관리 IC 등을 공급하는 반도체 전문 기업입니다.",
      keywords: ["대한플러스전자", "반도체", "회사소개", "전자부품"]
    },
    items: [
      {
        title: "대표이사인사말",
        description: "CEO-Greeting",
        link: "/about/greeting",
        seo: {
          title: "대표이사 인사말 | 대한플러스전자",
          description: "대한플러스전자 대표이사의 경영철학과 비전을 소개합니다.",
          keywords: ["대표이사", "인사말", "경영철학", "비전"]
        }
      },
      {
        title: "회사연혁",
        description: "About Our History",
        link: "/about/history",
        seo: {
          title: "회사연혁 | 대한플러스전자",
          description: "대한플러스전자의 설립부터 현재까지의 성장 과정과 주요 연혁을 소개합니다.",
          keywords: ["회사연혁", "성장과정", "주요연혁", "기업역사"]
        }
      },
      {
        title: "사업소개",
        description: "About Our Business",
        link: "/about/business",
        seo: {
          title: "사업소개 | 대한플러스전자",
          description: "LED Driver IC, 다이오드, 전원관리 IC 등 대한플러스전자의 주요 사업 영역을 소개합니다.",
          keywords: ["사업영역", "반도체사업", "전자부품", "기술력"]
        }
      },
      {
        title: "찾아오시는길",
        description: "Corporate Location",
        link: "/about/location",
        seo: {
          title: "찾아오시는 길 | 대한플러스전자",
          description: "대한플러스전자 본사 및 지사의 위치와 오시는 방법을 안내합니다.",
          keywords: ["회사위치", "오시는길", "본사위치", "교통안내"]
        }
      }
    ]
  },
  products: {
    title: "제품",
    link: "/products",
    seo: {
      title: "제품 소개 | 대한플러스전자",
      description: "LED Driver IC, 다이오드, 전원관리 IC 등 대한플러스전자의 모든 제품을 소개합니다.",
      keywords: ["LED Driver IC", "다이오드", "전원관리 IC", "반도체제품"]
    },
    categories: [
      {
        title: "전체제품",
        link: "/products",
        icon: Package,
        seo: {
          title: "전체제품 | 대한플러스전자",
          description: "대한플러스전자의 모든 제품을 한눈에 살펴보실 수 있습니다.",
          keywords: ["전체제품", "제품목록", "전자부품", "반도체"]
        },
      },
      {
        title: "LED Driver IC",
        link: "/products/led-driver",
        icon: Cpu,
        seo: {
          title: "LED Driver IC | 대한플러스전자",
          description: "고효율 LED Driver IC 제품군을 소개합니다. DC-DC, AC-DC, 매트릭스 드라이버 등 다양한 제품이 있습니다.",
          keywords: ["LED Driver", "DC-DC", "AC-DC", "매트릭스드라이버"]
        },
        content: [
          {
            title: "DC-DC LED 드라이버",
            link: "/products/led-driver/dc-dc",
            seo: {
              title: "DC-DC LED 드라이버 | 대한플러스전자",
              description: "고효율 DC-DC LED 드라이버 제품군을 소개합니다.",
              keywords: ["DC-DC", "LED드라이버", "전력변환", "벅컨버터"]
            },
            children: [
              {
                title: "벅 컨버터 타입",
                link: "/products/led-driver/dc-dc/buck",
                seo: {
                  title: "벅 컨버터 LED 드라이버 | 대한플러스전자",
                  description: "효율적인 전압 강하를 위한 벅 컨버터 타입 LED 드라이버입니다.",
                  keywords: ["벅컨버터", "전압강하", "LED드라이버"]
                }
              },
              {
                title: "부스트 컨버터 타입",
                link: "/products/led-driver/dc-dc/boost",
                seo: {
                  title: "부스트 컨버터 LED 드라이버 | 대한플러스전자",
                  description: "전압 승압이 필요한 LED 조명을 위한 부스트 컨버터 타입 드라이버입니다.",
                  keywords: ["부스트컨버터", "전압승압", "LED드라이버"]
                }
              },
              {
                title: "벅-부스트 컨버터 타입",
                link: "/products/led-driver/dc-dc/buck-boost",
                seo: {
                  title: "벅-부스트 컨버터 LED 드라이버 | 대한플러스전자",
                  description: "다양한 입력 전압에 대응 가능한 벅-부스트 컨버터 타입 LED 드라이버입니다.",
                  keywords: ["벅부스트", "전압변환", "LED드라이버"]
                }
              },
              {
                title: "정전류 제어형",
                link: "/products/led-driver/dc-dc/cc",
                seo: {
                  title: "정전류 제어형 LED 드라이버 | 대한플러스전자",
                  description: "안정적인 LED 밝기 제어를 위한 정전류 제어형 드라이버입니다.",
                  keywords: ["정전류제어", "밝기제어", "LED드라이버"]
                }
              },
              {
                title: "디밍 제어형",
                link: "/products/led-driver/dc-dc/dimming",
                seo: {
                  title: "디밍 제어형 LED 드라이버 | 대한플러스전자",
                  description: "다양한 디밍 방식을 지원하는 LED 드라이버입니다.",
                  keywords: ["디밍제어", "밝기조절", "LED드라이버"]
                }
              }
            ]
          },
          {
            title: "AC-DC LED 드라이버",
            link: "/products/led-driver/ac-dc",
            seo: {
              title: "AC-DC LED 드라이버 | 대한플러스전자",
              description: "AC 전원을 DC로 변환하여 LED를 구동하는 드라이버입니다.",
              keywords: ["AC-DC", "LED드라이버", "전원변환"]
            },
            children: [
              {
                title: "단상 입력형",
                link: "/products/led-driver/ac-dc/single-phase",
                seo: {
                  title: "단상 입력형 AC-DC LED 드라이버 | 대한플러스전자",
                  description: "단상 AC 전원용 LED 드라이버입니다.",
                  keywords: ["단상", "AC-DC", "LED드라이버"]
                }
              },
              {
                title: "삼상 입력형",
                link: "/products/led-driver/ac-dc/three-phase",
                seo: {
                  title: "삼상 입력형 AC-DC LED 드라이버 | 대한플러스전자",
                  description: "삼상 AC 전원용 LED 드라이버입니다.",
                  keywords: ["삼상", "AC-DC", "LED드라이버"]
                }
              },
              {
                title: "역률 보정형",
                link: "/products/led-driver/ac-dc/pfc",
                seo: {
                  title: "역률 보정형 AC-DC LED 드라이버 | 대한플러스전자",
                  description: "고효율 역률 보정 기능이 포함된 LED 드라이버입니다.",
                  keywords: ["역률보정", "PFC", "LED드라이버"]
                }
              },
              {
                title: "절연형",
                link: "/products/led-driver/ac-dc/isolated",
                seo: {
                  title: "절연형 AC-DC LED 드라이버 | 대한플러스전자",
                  description: "안전한 전기적 절연을 제공하는 LED 드라이버입니다.",
                  keywords: ["절연형", "안전설계", "LED드라이버"]
                }
              },
              {
                title: "비절연형",
                link: "/products/led-driver/ac-dc/non-isolated",
                seo: {
                  title: "비절연형 AC-DC LED 드라이버 | 대한플러스전자",
                  description: "비절연 방식의 컴팩트한 LED 드라이버입니다.",
                  keywords: ["비절연형", "컴팩트", "LED드라이버"]
                }
              }
            ]
          },
          {
            title: "LED 매트릭스 드라이버",
            link: "/products/led-driver/matrix",
            seo: {
              title: "LED 매트릭스 드라이버 | 대한플러스전자",
              description: "LED 디스플레이 및 매트릭스 제어용 드라이버입니다.",
              keywords: ["매트릭스", "디스플레이", "LED드라이버"]
            },
            children: [
              {
                title: "정전류 매트릭스",
                link: "/products/led-driver/matrix/cc",
                seo: {
                  title: "정전류 매트릭스 LED 드라이버 | 대한플러스전자",
                  description: "정전류 제어 방식의 LED 매트릭스 드라이버입니다.",
                  keywords: ["정전류", "매트릭스", "LED드라이버"]
                }
              },
              {
                title: "PWM 제어형",
                link: "/products/led-driver/matrix/pwm",
                seo: {
                  title: "PWM 제어형 LED 매트릭스 드라이버 | 대한플러스전자",
                  description: "PWM 방식의 밝기 제어가 가능한 매트릭스 드라이버입니다.",
                  keywords: ["PWM제어", "매트릭스", "LED드라이버"]
                }
              },
              {
                title: "RGB LED 컨트롤러",
                link: "/products/led-driver/matrix/rgb",
                seo: {
                  title: "RGB LED 컨트롤러 | 대한플러스전자",
                  description: "RGB LED 제어용 특수 드라이버입니다.",
                  keywords: ["RGB", "LED컨트롤러", "컬러제어"]
                }
              },
              {
                title: "디스플레이용 드라이버",
                link: "/products/led-driver/matrix/display",
                seo: {
                  title: "디스플레이용 LED 드라이버 | 대한플러스전자",
                  description: "LED 디스플레이 패널 구동용 전용 드라이버입니다.",
                  keywords: ["디스플레이", "패널구동", "LED드라이버"]
                }
              },
              {
                title: "사이니지용 드라이버",
                link: "/products/led-driver/matrix/signage",
                seo: {
                  title: "사이니지용 LED 드라이버 | 대한플러스전자",
                  description: "대형 LED 사이니지 구동을 위한 특수 드라이버입니다.",
                  keywords: ["사이니지", "대형디스플레이", "LED드라이버"]
                }
              }
            ]
          }
        ]
      },
      {
        title: "다이오드",
        link: "/products/diode",
        icon: Microchip,    
        seo: {
          title: "다이오드 제품군 | 대한플러스전자",
          description: "다양한 용도의 고품질 다이오드 제품을 제공합니다.",
          keywords: ["다이오드", "정류기", "쇼트키", "제너"]
        },
        content: [
          {
            title: "정류 다이오드",
            link: "/products/diode/rectifier",
            seo: {
              title: "정류 다이오드 | 대한플러스전자",
              description: "다양한 전압과 전류 범위의 정류 다이오드를 제공합니다.",
              keywords: ["정류다이오드", "정류기", "전력변환"]
            },
            children: [
              {
                title: "일반용 정류 다이오드",
                link: "/products/diode/rectifier/general",
                seo: {
                  title: "일반용 정류 다이오드 | 대한플러스전자",
                  description: "표준 정류 용도의 다이오드입니다.",
                  keywords: ["정류다이오드", "표준정류", "일반용도"]
                }
              },
              {
                title: "고속 정류 다이오드",
                link: "/products/diode/rectifier/fast",
                seo: {
                  title: "고속 정류 다이오드 | 대한플러스전자",
                  description: "빠른 스위칭이 필요한 용도의 정류 다이오드입니다.",
                  keywords: ["고속정류", "스위칭", "다이오드"]
                }
              },
              {
                title: "브리지 정류기",
                link: "/products/diode/rectifier/bridge",
                seo: {
                  title: "브리지 정류기 | 대한플러스전자",
                  description: "AC-DC 변환용 브리지 정류기입니다.",
                  keywords: ["브리지정류", "전파정류", "정류기"]
                }
              },
              {
                title: "고전압용 정류기",
                link: "/products/diode/rectifier/high-voltage",
                seo: {
                  title: "고전압용 정류기 | 대한플러스전자",
                  description: "고전압 애플리케이션용 정류 다이오드입니다.",
                  keywords: ["고전압", "정류기", "전력용"]
                }
              },
              {
                title: "저전압용 정류기",
                link: "/products/diode/rectifier/low-voltage",
                seo: {
                  title: "저전압용 정류기 | 대한플러스전자",
                  description: "저전압 회로용 정밀 정류 다이오드입니다.",
                  keywords: ["저전압", "정류기", "정밀정류"]
                }
              }
            ]
          },
          {
            title: "쇼트키 다이오드",
            link: "/products/diode/schottky",
            seo: {
              title: "쇼트키 다이오드 | 대한플러스전자",
              description: "저순방향 전압강하 특성의 쇼트키 다이오드입니다.",
              keywords: ["쇼트키", "저전압강하", "고효율"]
            },
            children: [
              {
                title: "저전압용 쇼트키",
                link: "/products/diode/schottky/low-voltage",
                seo: {
                  title: "저전압용 쇼트키 다이오드 | 대한플러스전자",
                  description: "저전압 회로에 최적화된 쇼트키 다이오드입니다.",
                  keywords: ["저전압", "쇼트키", "효율"]
                }
              },
              {
                title: "고전압용 쇼트키",
                link: "/products/diode/schottky/high-voltage",
                seo: {
                  title: "고전압용 쇼트키 다이오드 | 대한플러스전자",
                  description: "고전압 애플리케이션용 쇼트키 다이오드입니다.",
                  keywords: ["고전압", "쇼트키", "전력용"]
                }
              },
              {
                title: "듀얼 쇼트키",
                link: "/products/diode/schottky/dual",
                seo: {
                  title: "듀얼 쇼트키 다이오드 | 대한플러스전자",
                  description: "두 개의 쇼트키 다이오드가 통합된 제품입니다.",
                  keywords: ["듀얼쇼트키", "통합형", "효율"]
                }
              },
              {
                title: "SiC 쇼트키",
                link: "/products/diode/schottky/sic",
                seo: {
                  title: "SiC 쇼트키 다이오드 | 대한플러스전자",
                  description: "실리콘 카바이드 기반의 고성능 쇼트키 다이오드입니다.",
                  keywords: ["SiC", "고성능", "쇼트키"]
                }
              },
              {
                title: "전력용 쇼트키",
                link: "/products/diode/schottky/power",
                seo: {
                  title: "전력용 쇼트키 다이오드 | 대한플러스전자",
                  description: "대전력 처리가 가능한 쇼트키 다이오드입니다.",
                  keywords: ["전력용", "대전력", "쇼트키"]
                }
              }
            ]
          },
          {
            title: "제너 다이오드",
            link: "/products/diode/zener",
            seo: {
              title: "제너 다이오드 | 대한플러스전자",
              description: "정전압 특성의 제너 다이오드 제품군입니다.",
              keywords: ["제너", "정전압", "전압조정"]
            },
            children: [
              {
                title: "저전압 제너",
                link: "/products/diode/zener/low-voltage",
                seo: {
                  title: "저전압 제너 다이오드 | 대한플러스전자",
                  description: "저전압 정전압 용도의 제너 다이오드입니다.",
                  keywords: ["저전압", "제너", "정전압"]
                }
              },
              {
                title: "고전압 제너",
                link: "/products/diode/zener/high-voltage",
                seo: {
                  title: "고전압 제너 다이오드 | 대한플러스전자",
                  description: "고전압 정전압 용도의 제너 다이오드입니다.",
                  keywords: ["고전압", "제너", "정전압"]
                }
              },
              {
                title: "정밀 제너",
                link: "/products/diode/zener/precision",
                seo: {
                  title: "정밀 제너 다이오드 | 대한플러스전자",
                  description: "높은 정밀도의 전압 조정이 가능한 제너 다이오드입니다.",
                  keywords: ["정밀제너", "고정밀", "전압조정"]
                }
              },
              {
                title: "가변 제너",
                link: "/products/diode/zener/variable",
                seo: {
                  title: "가변 제너 다이오드 | 대한플러스전자",
                  description: "조정 가능한 제너 전압 특성을 가진 다이오드입니다.",
                  keywords: ["가변제너", "조정가능", "전압조정"]
                }
              },
              {
                title: "양방향 제너",
                link: "/products/diode/zener/bidirectional",
                seo: {
                  title: "양방향 제너 다이오드 | 대한플러스전자",
                  description: "양방향 전압 보호가 가능한 제너 다이오드입니다.",
                  keywords: ["양방향", "제너", "전압보호"]
                }
              }
            ]
          }
        ]
      },
      {
        title: "전원관리 IC",
        link: "/products/power-ic",
        icon: Power,  
        seo: {
          title: "전원관리 IC | 대한플러스전자",
          description: "고효율 전원관리 IC 제품군을 제공합니다.",
          keywords: ["전원관리", "PMIC", "전력변환"]
        },
        content: [
          {
            title: "DC-DC 컨버터",
            link: "/products/power-ic/dc-dc",
            seo: {
              title: "DC-DC 컨버터 IC | 대한플러스전자",
              description: "효율적인 DC 전압 변환을 위한 컨버터 IC입니다.",
              keywords: ["DC-DC", "전압변환", "전력변환"]
            },
            children: [
              {
                title: "벅 컨버터",
                link: "/products/power-ic/dc-dc/buck",
                seo: {
                  title: "벅 컨버터 IC | 대한플러스전자",
                  description: "강압형 DC-DC 컨버터 IC입니다.",
                  keywords: ["벅컨버터", "강압형", "DC-DC"]
                }
              },
              {
                title: "부스트 컨버터",
                link: "/products/power-ic/dc-dc/boost",
                seo: {
                  title: "부스트 컨버터 IC | 대한플러스전자",
                  description: "승압형 DC-DC 컨버터 IC입니다.",
                  keywords: ["부스트", "승압형", "DC-DC"]
                }
              },
              {
                title: "벅-부스트 컨버터",
                link: "/products/power-ic/dc-dc/buck-boost",
                seo: {
                  title: "벅-부스트 컨버터 IC | 대한플러스전자",
                  description: "승강압 가능한 DC-DC 컨버터 IC입니다.",
                  keywords: ["벅부스트", "승강압", "DC-DC"]
                }
              },
              {
                title: "POL 컨버터",
                link: "/products/power-ic/dc-dc/pol",
                seo: {
                  title: "POL 컨버터 IC | 대한플러스전자",
                  description: "Point of Load 전원 공급용 컨버터 IC입니다.",
                  keywords: ["POL", "포인트오브로드", "DC-DC"]
                }
              },
              {
                title: "절연형 컨버터",
                link: "/products/power-ic/dc-dc/isolated",
                seo: {
                  title: "절연형 컨버터 IC | 대한플러스전자",
                  description: "전기적 절연이 필요한 용도의 컨버터 IC입니다.",
                  keywords: ["절연형", "안전설계", "DC-DC"]
                }
              }
            ]
          },
          {
            title: "배터리 관리 IC",
            link: "/products/power-ic/battery",
            seo: {
              title: "배터리 관리 IC | 대한플러스전자",
              description: "효율적인 배터리 관리를 위한 전용 IC입니다.",
              keywords: ["배터리관리", "BMS", "충전제어"]
            },
            children: [
              {
                title: "충전 컨트롤러",
                link: "/products/power-ic/battery/charger",
                seo: {
                  title: "충전 컨트롤러 IC | 대한플러스전자",
                  description: "배터리 충전 제어용 전용 IC입니다.",
                  keywords: ["충전제어", "배터리충전", "컨트롤러"]
                }
              },
              {
                title: "BMS IC",
                link: "/products/power-ic/battery/bms",
                seo: {
                  title: "BMS IC | 대한플러스전자",
                  description: "배터리 관리 시스템용 통합 IC입니다.",
                  keywords: ["BMS", "배터리관리", "모니터링"]
                }
              },
              {
                title: "보호 IC",
                link: "/products/power-ic/battery/protection",
                seo: {
                  title: "배터리 보호 IC | 대한플러스전자",
                  description: "배터리 보호 기능을 제공하는 전용 IC입니다.",
                  keywords: ["배터리보호", "과충전방지", "안전설계"]
                }
              },
              {
                title: "연료게이지 IC",
                link: "/products/power-ic/battery/fuel-gauge",
                seo: {
                  title: "배터리 연료게이지 IC | 대한플러스전자",
                  description: "배터리 잔량 측정 및 표시용 IC입니다.",
                  keywords: ["연료게이지", "잔량측정", "배터리모니터링"]
                }
              },
              {
                title: "밸런싱 IC",
                link: "/products/power-ic/battery/balancing",
                seo: {
                  title: "배터리 밸런싱 IC | 대한플러스전자",
                  description: "다중 셀 배터리의 전압 균형을 맞추는 IC입니다.",
                  keywords: ["밸런싱", "셀밸런싱", "배터리관리"]
                }
              }
            ]
          }
        ]
      },
      {
        title: "센서",
        link: "/products/sensors",
        icon: Aperture,
        seo: {
          title: "센서 제품 | 대한플러스전자",
          description: "다양한 용도의 고성능 센서 제품을 제공합니다.",
          keywords: ["센서", "감지기", "측정장치"]
        },
        content: [
          {
            title: "온도 센서",
            link: "/products/sensors/temperature",
            seo: {
              title: "온도 센서 | 대한플러스전자",
              description: "정밀한 온도 측정이 가능한 센서입니다.",
              keywords: ["온도센서", "열감지", "온도측정"]
            },
          },
          {
            title: "압력 센서",
            link: "/products/sensors/pressure",
            seo: {
              title: "압력 센서 | 대한플러스전자",
              description: "다양한 압력 측정용 센서입니다.",
              keywords: ["압력센서", "압력측정", "하중감지"]
            }
          },
          {
            title: "가속도 센서",
            link: "/products/sensors/accelerometer",
            seo: {
              title: "가속도 센서 | 대한플러스전자",
              description: "움직임과 진동을 감지하는 센서입니다.",
              keywords: ["가속도센서", "진동감지", "모션센서"]
            }
          }
        ]
      },
      {
        title: "케이블",
        link: "/products/cables",
        icon: Plug,
        seo: {
          title: "케이블 제품 | 대한플러스전자",
          description: "다양한 용도의 고품질 케이블을 제공합니다.",
          keywords: ["케이블", "전선", "배선"]
        },
        content: [
          {
            title: "전원 케이블",
            link: "/products/cables/power",
            seo: {
              title: "전원 케이블 | 대한플러스전자",
              description: "안정적인 전원 공급을 위한 케이블입니다.",
              keywords: ["전원케이블", "전력선", "전기배선"]
            }
          },
          {
            title: "통신 케이블",
            link: "/products/cables/communication",
            seo: {
              title: "통신 케이블 | 대한플러스전자",
              description: "데이터 전송용 고성능 케이블입니다.",
              keywords: ["통신케이블", "데이터케이블", "신호선"]
            }
          }
        ]
      },
      {
        title: "커넥터",
        link: "/products/connectors",
        icon: Link,
        seo: {
          title: "커넥터 제품 | 대한플러스전자",
          description: "다양한 연결용 커넥터를 제공합니다.",
          keywords: ["커넥터", "연결단자", "접속부품"]
        },
        content: [
          {
            title: "전원 커넥터",
            link: "/products/connectors/power",
            seo: {
              title: "전원 커넥터 | 대한플러스전자",
              description: "전원 연결용 고품질 커넥터입니다.",
              keywords: ["전원커넥터", "전원단자", "전기연결"]  
            }
          },
          {
            title: "신호 커넥터",
            link: "/products/connectors/signal",
            seo: {
              title: "신호 커넥터 | 대한플러스전자",
              description: "신호 전송용 정밀 커넥터입니다.",
              keywords: ["신호커넥터", "데이터커넥터", "통신단자"]
            }
          }
        ]
      },
      {
        title: "수동 소자",
        link: "/products/passive",
        icon: Layers,
        seo: {
          title: "수동 소자 | 대한플러스전자",
          description: "고품질 수동 전자부품을 제공합니다.",
          keywords: ["수동소자", "저항", "커패시터"]
        },
        content: [
          {
            title: "저항",
            link: "/products/passive/resistors",
            seo: {
              title: "저항 제품 | 대한플러스전자",
              description: "다양한 용도의 정밀 저항입니다.",
              keywords: ["저항", "저항기", "전기저항"]
            }
          },
          {
            title: "커패시터",
            link: "/products/passive/capacitors",
            seo: {
              title: "커패시터 | 대한플러스전자",
              description: "고품질 커패시터 제품입니다.",
              keywords: ["커패시터", "축전기", "콘덴서"]
            }
          },
          {
            title: "인덕터",
            link: "/products/passive/inductors",
            seo: {
              title: "인덕터 | 대한플러스전자",
              description: "다양한 용도의 인덕터입니다.",
              keywords: ["인덕터", "코일", "초크"]
            }
          }
        ]
      },
      {
        title: "기타 부품",
        link: "/products/others",
        icon: Package,
        seo: {
          title: "기타 전자부품 | 대한플러스전자",
          description: "다양한 전자부품을 제공합니다.",
          keywords: ["전자부품", "기타부품", "전자소자"]
        },
        content: [
          {
            title: "스위치",
            link: "/products/others/switches",
            seo: {
              title: "스위치 제품 | 대한플러스전자",
              description: "다양한 용도의 스위치입니다.",
              keywords: ["스위치", "토글", "푸시버튼"]
            }
          },
          {
            title: "릴레이",
            link: "/products/others/relays",
            seo: {
              title: "릴레이 | 대한플러스전자",
              description: "신뢰성 높은 릴레이 제품입니다.",
              keywords: ["릴레이", "계전기", "스위칭"]
            }
          }
        ]
      }
    ]
  },
  partners: {
    title: "파트너사",
    link: "/partners",
    seo: {
      title: "파트너사 | 대한플러스전자",
      description: "대한플러스전자의 글로벌 파트너사를 소개합니다.",
      keywords: ["파트너사", "협력사", "제조사"]
    },
    items: [
      {
        title: "Macroblock",
        description: "LED Driver IC 전문 제조사",
        icon: "/logos/macroblock-logo.png",
        categories: ["LED 드라이버 IC", "전원관리 IC", "자동차 인증 부품"],
        country: "대만",
        type: "대기업",
        subtitle: "드라이버 IC 부문 세계 1위 기업",
        details: ["LED Driver IC 전문 제조사", "디스플레이/조명/자동차 전장용", "AEC-Q100 인증 보유", "1999년 설립"],
        link: "/partners/macroblock",
        seo: {
          title: "Macroblock | 대한플러스전자",
          description: "LED Driver IC 전문 제조사 Macroblock을 소개합니다.",
          keywords: ["매크로블록", "LED드라이버", "전장부품"]
        },
        partnerStory: {
          image: "/images/thumbnail-macroblock.webp",
          text: "LED Driver IC 부문 세계 1위 기업으로서 디스플레이, 조명, 자동차 전장용 제품을 제공합니다",
          learnMoreLink: "/partners/macroblock"
        }
      },
      {
        title: "Zowie", 
        description: "고성능 정류 다이오드 전문 기업",
        icon: "/icons/zowie-logo.png",
        categories: ["다이오드", "자동차 인증 부품"],
        country: "대만",
        type: "중소기업",
        subtitle: "고성능 정류 다이오드 전문 기업",
        details: ["다이오드 전문 제조", "TVS/쇼트키/정류기", "다양한 특허 및 인증 보유", "40년+ 기술력"],
        link: "/partners/zowie",
        seo: {
          title: "Zowie | 대한플러스전자",
          description: "고성능 정류 다이오드 전문 기업 Zowie를 소개합니다.",
          keywords: ["조위", "다이오드", "정류기"]
        },
        partnerStory: {
          image: "/images/thumbnail-zowie.webp",
          text: "고성능 정류 다이오드 전문 기업으로서 자동차 인증 보유 제품을 제공합니다",
          learnMoreLink: "/partners/zowie"
        }
      },
      {
        title: "LLT",
        description: "커넥터/케이블 전문 제조사",
        icon: "/icons/llt-logo.png", 
        categories: ["커넥터&케이블"],
        country: "중국",
        type: "대기업",
        subtitle: "가격, 성능, 신뢰성 보장하는 기업",
        details: ["커넥터/케이블 어셈블리", "산업용 커넥터 전문", "ISO 9001 인증", "맞춤형 솔루션"],
        link: "/partners/llt",
        seo: {
          title: "LLT | 대한플러스전자",
          description: "커넥터/케이블 전문 제조사 LLT를 소개합니다.",
          keywords: ["LLT", "커넥터", "케이블"]
        },
        partnerStory: {
          image: "/images/thumbnail-llt.webp",
          text: "커넥터/케이블 전문 제조사로서 산업용 커넥터 전문 제품을 제공합니다",
          learnMoreLink: "/partners/llt"
        }
      },
      {
        title: "Morethanall",
        description: "보드-보드/FPC 커넥터 전문",
        icon: "/icons/morethanall-logo.png",
        categories: ["커넥터&케이블"],
        country: "대만", 
        type: "중소기업",
        subtitle: "보드-보드/FPC 커넥터",
        details: ["보드-보드/FPC 커넥터", "자체 R&D 센터 보유", "맞춤형 설계 가능", "25년+ 경험"],
        link: "/partners/morethanall",
        seo: {
          title: "Morethanall | 대한플러스전자",
          description: "보드-보드/FPC 커넥터 전문 기업 Morethanall을 소개합니다.",
          keywords: ["모어댄올", "커넥터", "FPC"]
        },
        partnerStory: {
          image: "/images/thumbnail-morethanall.webp",
          text: "보드-보드/FPC 커넥터 전문 기업으로서 맞춤형 설계 가능한 제품을 제공합니다",
          learnMoreLink: "/partners/morethanall"
        }
      },
      {
        title: "Kube Electronics",
        description: "센서 전문 제조사",
        icon: "/icons/kube-logo.png",
        categories: ["센서"],
        country: "스위스",
        type: "가족기업", 
        subtitle: "센서 전문 기업",
        details: ["센서 전문 기업", "전문 제조사", "고신뢰성 제품", "생산"],
        link: "/partners/kube",
        seo: {
          title: "Kube Electronics | 대한플러스전자",
          description: "센서 전문 제조사 Kube Electronics를 소개합니다.",
          keywords: ["큐브일렉트로닉스", "센서", "스위스"]
        },
        partnerStory: {
          image: "/images/thumbnail-kube.webp",
          text: "센서 전문 기업으로서 고신뢰성 제품을 제공합니다",
          learnMoreLink: "/partners/kube"
        }
      },
      {
        title: "XLSEMI",
        description: "전원관리 IC 전문",
        icon: "/icons/xlsemi-logo.png",
        categories: ["전원관리 IC", "LED 드라이버 IC"],
        country: "중국",
        type: "중소기업",
        subtitle: "급성장중인 전원관리 IC 전문 기업",
        details: ["다양한 제품 스펙트럼", "설립 10년 이상", "급속 성장중", "전문 제조사"],
        link: "/partners/xlsemi",
        seo: {
          title: "XLSEMI | 대한플러스전자",
          description: "전원관리 IC 전문 기업 XLSEMI를 소개합니다.",
          keywords: ["엑셀세미", "전원관리", "LED드라이버"]
        },
        partnerStory: {
          image: "/images/thumbnail-xlsemi.webp",
          text: "전원관리 IC 전문 기업으로서 다양한 제품 스펙트럼을 제공합니다",
          learnMoreLink: "/partners/xlsemi"
        }
      },
      {
        title: "Powtech",
        description: "전원관리 IC 및 전장용 부품 전문 기업",
        icon: "/icons/powtech-logo.png",
        categories: ["전원관리 IC", "LED 드라이버 IC", "자동차 인증 부품"],
        country: "한국",
        type: "대기업",
        subtitle: "전원관리 IC 및 전장용 부품 전문 기업", 
        details: ["자동차 전장 전문", "글로벌 인증 보유", "품질 관리 시스템", "기술 지원"],
        link: "/partners/powtech",
        seo: {
          title: "Powtech | 대한플러스전자",
          description: "전원관리 IC 및 전장용 부품 전문 기업 Powtech를 소개합니다.",
          keywords: ["파워텍", "전원관리", "전장부품"]
        },
        partnerStory: {
          image: "/images/thumbnail-powtech.webp",
          text: "전원관리 IC 및 전장용 부품 전문 기업으로서 자동차 인증 보유 제품을 제공합니다",
          learnMoreLink: "/partners/powtech"
        }
      },
      {
        title: "GTM",
        description: "전원관리 IC 및 전장용 부품 전문 기업",
        icon: "/logos/gtm-logo.png",
        categories: ["전원관리 IC", "전장용 부품"],
        country: "대만",
        type: "중소기업",
        subtitle: "전원관리 IC 및 전장용 부품 전문 기업", 
        details: ["전원관리 IC 및 전장용 부품 전문 기업", "글로벌 인증 보유", "LDO 및 MOSFET 전문 제조사"],
        link: "/partners/gtm",
        seo: {
          title: "GTM | 대한플러스전자",
          description: "전원관리 IC 및 전장용 부품 전문 기업 GTM을 소개합니다.",
          keywords: ["지티엠", "전원관리", "전장부품"]
        },
        partnerStory: {
          image: "/images/thumbnail-gtm.webp",
          text: "전원관리 IC 및 전장용 부품 전문 기업으로서 자동차 인증 보유 제품을 제공합니다",
          learnMoreLink: "/partners/gtm"
        }
      }
    ]
  },
  support: {
    title: "고객 지원",
    link: "/support",
    seo: {
      title: "고객 지원 | 대한플러스전자",
      description: "대한플러스전자의 고객 지원 서비스를 안내합니다.",
      keywords: ["고객지원", "기술지원", "문의"]
    },
    inquiry: {
      title: "문의",
      link: "/support/inquiry",
      seo: {
        title: "문의 | 대한플러스전자",
        description: "대한플러스전자의 문의 서비스를 안내합니다.",
        keywords: ["문의", "문의하기", "문의처"]
      },
      items: [
        { 
          title: "FAQ",
          link: "/support/faq",
          seo: {
            title: "자주 묻는 질문 | 대한플러스전자",
            description: "자주 묻는 질문과 답변을 확인하실 수 있습니다.",
            keywords: ["FAQ", "질문답변", "문의"]
          }
        },
        {
          title: "제품 지원 문의",
          link: "/support/inquiry",
          seo: {
            title: "제품 지원 문의 | 대한플러스전자",
            description: "제품 관련 기술 지원 문의를 하실 수 있습니다.",
            keywords: ["기술지원", "제품문의", "상담"]
          }
        }
      ]
    },
    contact: {
      title: "연락처",
      link: "/support/contact",
      seo: {
        title: "연락처 | 대한플러스전자",
        description: "대한플러스전자의 연락처 정보를 안내합니다.",
        keywords: ["연락처", "전화번호", "이메일"]
      },
      items: [
        {
          title: "전화 및 이메일 정보",
          link: "/support/contact",
          seo: {
            title: "연락처 | 대한플러스전자",
            description: "대한플러스전자의 연락처 정보를 안내합니다.",
            keywords: ["연락처", "전화번호", "이메일"]
          }
        },
        {
          title: "오시는길",
          link: "/support/location",
          seo: {
            title: "오시는 길 | 대한플러스전자",
            description: "대한플러스전자의 위치와 찾아오시는 길을 안내합니다.",
            keywords: ["오시는길", "위치", "주소"]
          }
        }
      ]
    },
    resources: {
      title: "자료실",
      link: "/support/resources",
      seo: {
        title: "자료실 | 대한플러스전자",
        description: "대한플러스전자의 자료실을 안내합니다.",
        keywords: ["자료실", "데이터시트", "제품사양"]
      },
      items: [
        {
          title: "데이터 시트",
          link: "/support/datasheet",
          seo: {
            title: "데이터 시트 | 대한플러스전자",
            description: "제품별 상세 데이터 시트를 제공합니다.",
            keywords: ["데이터시트", "제품사양", "기술문서"]
          }
        },
        {
          title: "제품 선택 가이드",
          link: "/support/guide",
          seo: {
            title: "제품 선택 가이드 | 대한플러스전자",
            description: "제품 선택을 위한 가이드를 제공합니다.",
            keywords: ["선택가이드", "제품가이드", "사용안내"]
          }
        }
      ]
    }
  }
};