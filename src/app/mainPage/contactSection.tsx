'use client'

import Link from 'next/link';
import { CircleHelpIcon, ChevronRightIcon, BookOpenIcon, FileSearchIcon, UserPlusIcon, MapPinIcon, ArrowRightIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { RiKakaoTalkFill } from '@react-icons/all-files/ri/RiKakaoTalkFill';
import { RiYoutubeFill } from '@react-icons/all-files/ri/RiYoutubeFill';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

const contactInfo = {
  social: {
    kakao: "http://pf.kakao.com/_xjFMxbM",
    blog: "https://blog.naver.com/daehanplus",
    youtube: "https://youtube.com/@daehanplus"
  },
  location: {
    address: "서울특별시 구로구 경인로 53길 15 중앙유통단지 바동 3217 ~ 3218호",
    mapLink: "/location",
    coordinates: {
      lat: 37.40189,
      lng: 127.10374
    }
  },
  phone: {
    main: {
      number: "82-2-6679-5025",
      description: "대표번호"
    },
    sales: {
      number: "82-2-6679-5026",
      description: "제품 문의 및 견적"
    },
    support: {
      number: "82-2-6679-5025", 
      description: "기술 문의 및 AS"
    }
  },
  email: {
    main: {
      address: "dhes@dhes.co.kr",
      description: "대표 이메일"
    },
    info: {
      address: "dhes2@dhes.co.kr",
      description: "견적 및 일반 상담"
    },
    support: {
      address: "kimyg@dhes.co.kr",
      description: "기술 문의 및 장애 대응"
    }
  }
};

// 임시 데이터
const newsData = {
  notices: [
    {
      id: 1,
      title: "MBI5353 제품 단종 안내",
      content: "MBI5353 제품의 단종이 결정되었습니다. 대체 제품으로 MBI5354를 추천드립니다.",
      date: "2024.01.15",
      category: "단종"
    },
    {
      id: 2,
      title: "MBI6651 제품 단종 예정 안내", 
      content: "MBI6651 제품이 2024년 하반기 단종 예정입니다.",
      date: "2024.01.10",
      category: "단종"
    }
  ],
  releases: [
    {
      id: 3,
      title: "신제품 출시: 차량용 LED 드라이버 IC MBI5124",
      content: "AEC-Q100 인증을 획득한 신제품 MBI5124가 출시되었습니다.",
      date: "2024.01.20",
      category: "제품 출시"
    },
    {
      id: 4,
      title: "신제품 출시: 고효율 LED 드라이버 IC MBI6754",
      content: "에너지 효율이 개선된 신제품 MBI6754가 출시되었습니다.",
      date: "2024.01.18",
      category: "제품 출시"
    }
  ],
  events: [
    {
      id: 5,
      title: "2024 한국전자전 참가 안내",
      content: "10월 코엑스에서 열리는 한국전자전에 참가합니다.",
      date: "2024.01.25",
      category: "이벤트"
    },
    {
      id: 6,
      title: "LED & OLED EXPO 2024 참가 안내",
      content: "6월 일산 KINTEX에서 열리는 LED & OLED EXPO에 참가합니다.",
      date: "2024.01.22",
      category: "이벤트"
    }
  ],
  announcements: [
    {
      id: 7,
      title: "2024년 설 연휴 휴무 안내",
      content: "2024년 설 연휴 기간 동안 고객센터 운영이 중단됩니다.",
      date: "2024.01.30",
      category: "공지사항"
    },
    {
      id: 8,
      title: "홈페이지 개편 안내",
      content: "더 나은 서비스 제공을 위해 홈페이지가 개편되었습니다.",
      date: "2024.01.28",
      category: "공지사항"
    }
  ],
  techBlogs: [
    {
      id: 9,
      title: "LED 드라이버 IC의 발전 과정",
      content: "LED 드라이버 IC의 기술 발전 과정과 미래 전망을 소개합니다.",
      date: "2024.01.27",
      category: "기술블로그"
    },
    {
      id: 10,
      title: "차량용 LED 조명의 기술 동향",
      content: "자동차 산업에서의 LED 조명 기술 동향을 분석합니다.",
      date: "2024.01.26",
      category: "기술블로그"
    }
  ]
};

// ContactSection 컴포넌트
export default function ContactSection() {
    const { toast } = useToast();
    
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      toast({
        title: "복사 완료",
        description: "클립보드에 복사되었습니다.",
        duration: 2000,
      });
    };

    const [activeCategory, setActiveCategory] = useState("전체");
    
    const getFilteredNews = () => {
      if (activeCategory === "전체") {
        return [...newsData.notices, ...newsData.releases, ...newsData.events, ...newsData.announcements, ...newsData.techBlogs]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
      }
      
      const categoryMap: Record<string, Array<{id: number, title: string, content: string, date: string, category: string}>> = {
        "단종": newsData.notices,
        "제품 출시": newsData.releases,
        "이벤트": newsData.events,
        "공지사항": newsData.announcements,
        "기술블로그": newsData.techBlogs
      };
      
      return categoryMap[activeCategory] || [];
    };
  
    return (
      <div className="container py-12 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 오른쪽 컬럼 */}
          <div className="order-2 lg:order-1 lg:col-span-8 grid gap-4 grid-cols-1">
            {/* 찾아오시는 길 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">찾아오시는 길</h3>
              <Link 
                href={contactInfo.location.mapLink}
                className="block p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <MapPinIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">본사</p>
                    <p className="text-sm text-gray-600">{contactInfo.location.address}</p>
                    <span className="inline-flex items-center text-sm font-medium text-blue-600">
                      지도로 보기
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* 연락처 정보 */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* 전화/팩스 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-left">전화/팩스</h3>
                <div className="p-4 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-start gap-4">
                    <PhoneIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <div className="space-y-3 w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={() => copyToClipboard(contactInfo.phone.main.number)}
                              className="w-full space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors text-left"
                            >
                              <p className="font-medium text-gray-900">대표전화</p>
                              <p className="text-sm text-gray-600">{contactInfo.phone.main.number}</p>
                              <p className="text-xs text-gray-500">{contactInfo.phone.main.description}</p>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>클릭하여 복사</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="h-px bg-gray-100" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={() => copyToClipboard(contactInfo.phone.sales.number)}
                              className="w-full space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors text-left"
                            >
                              <p className="font-medium text-gray-900">영업부</p>
                              <p className="text-sm text-gray-600">{contactInfo.phone.sales.number}</p>
                              <p className="text-xs text-gray-500">{contactInfo.phone.sales.description}</p>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>클릭하여 복사</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="h-px bg-gray-100" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={() => copyToClipboard(contactInfo.phone.support.number)}
                              className="w-full space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors text-left"
                            >
                              <p className="font-medium text-gray-900">기술지원팀</p>
                              <p className="text-sm text-gray-600">{contactInfo.phone.support.number}</p>
                              <p className="text-xs text-gray-500">{contactInfo.phone.support.description}</p>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>클릭하여 복사</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* 이메일 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-left">이메일</h3>
                <div className="p-4 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-start gap-4">
                    <MailIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <div className="space-y-3 w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={() => copyToClipboard(contactInfo.email.main.address)}
                              className="w-full space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors text-left"
                            >
                              <p className="font-medium text-gray-900">대표 이메일</p>
                              <p className="text-sm text-gray-600">{contactInfo.email.main.address}</p>
                              <p className="text-xs text-gray-500">{contactInfo.email.main.description}</p>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>클릭하여 복사</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="h-px bg-gray-100" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={() => copyToClipboard(contactInfo.email.info.address)}
                              className="w-full space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors text-left"
                            >
                              <p className="font-medium text-gray-900">일반 문의</p>
                              <p className="text-sm text-gray-600">{contactInfo.email.info.address}</p>
                              <p className="text-xs text-gray-500">{contactInfo.email.info.description}</p>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>클릭하여 복사</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="h-px bg-gray-100" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={() => copyToClipboard(contactInfo.email.support.address)}
                              className="w-full space-y-1 hover:bg-blue-50 p-2 rounded-lg transition-colors text-left"
                            >
                              <p className="font-medium text-gray-900">기술 지원</p>
                              <p className="text-sm text-gray-600">{contactInfo.email.support.address}</p>
                              <p className="text-xs text-gray-500">{contactInfo.email.support.description}</p>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>클릭하여 복사</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 뉴스 섹션 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">최신 소식</h3>
                <Link 
                  href="/news"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  더 알아보기
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["전체", "단종", "제품 출시", "이벤트", "공지사항", "기술블로그"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {getFilteredNews().map((news) => (
                  <div
                    key={news.id}
                    className="p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-300 transition-all"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{news.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{news.content}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">{news.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 왼쪽 컬럼 */}
          <div className="order-1 lg:order-2 lg:col-span-4 space-y-8">
            <div className="p-8 bg-gradient-to-br from-gray-50/80 to-white rounded-3xl border border-gray-100/80 shadow-lg backdrop-blur-sm">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                    Contact Us
                  </h1>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                  <p className="text-lg font-medium text-gray-700">
                    언제든 연락주세요
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-600">
                    <strong className="text-gray-900 font-semibold">대한플러스전자(주)</strong>는 
                    고객님의 문의사항에 신속하고 정확하게 답변드리겠습니다.
                  </p>
                </div>
              </div>
            </div>
  
            {/* 기술지원 & 리소스 */}
            <div className="space-y-4">
              <Link 
                href="/support/faq"
                className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <CircleHelpIcon className="w-6 h-6 text-blue-600" />
                <span className="font-medium">자주 묻는 질문 (FAQ)</span>
                <ChevronRightIcon className="w-4 h-4 ml-auto" />
              </Link>
              <Link 
                href="/support/guides"
                className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <BookOpenIcon className="w-6 h-6 text-green-600" />
                <span className="font-medium">제품 선택 가이드</span>
                <ChevronRightIcon className="w-4 h-4 ml-auto" />
              </Link>
              <Link 
                href="/support/datasheets"
                className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <FileSearchIcon className="w-6 h-6 text-purple-600" />
                <span className="font-medium">데이터시트 모음</span>
                <ChevronRightIcon className="w-4 h-4 ml-auto" />
              </Link>
              <Link 
                href="/careers"
                className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <UserPlusIcon className="w-6 h-6 text-orange-600" />
                <span className="font-medium">채용 공고</span>
                <ChevronRightIcon className="w-4 h-4 ml-auto" />
              </Link>
            </div>
  
            {/* 소셜 미디어 링크 */}
            <div className="flex justify-between gap-3">
              <Link 
                href={contactInfo.social.kakao}
                className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg hover:text-gray-900"
              >
                <RiKakaoTalkFill size={20} color="#FFEB00" />
                <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">카카오톡 채널</span>
              </Link>
              <Link 
                href={contactInfo.social.blog}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z"></path></svg>
                <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">네이버 블로그</span>
              </Link>
              <Link 
                href={contactInfo.social.youtube}
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
              >
                <RiYoutubeFill size={20} color="#FF0000" />
                <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">유튜브 채널</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };