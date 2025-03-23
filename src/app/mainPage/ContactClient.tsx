"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowRightIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  GlobeIcon, 
  ClockIcon, 
  NewspaperIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  BuildingIcon,
  TagIcon,
  YoutubeIcon,
  MessageCircleIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

// Define TypeScript interfaces
interface ContactMethod {
  icon?: React.ElementType;
  title: string;
  value: string;
  description?: string;
  action: string;
  customIcon?: React.ReactNode;
  color?: string;
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  image: string;
  url: string;
}

// 연락처 정보
const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: PhoneIcon,
    title: "전화",
    value: "02-6679-5025",
    description: "평일 09:00 - 18:00",
    action: "tel:02-6679-5025"
  },
  {
    icon: MailIcon,
    title: "이메일",
    value: "dhes@dhes.co.kr",
    description: "24시간 문의 가능",
    action: "mailto:dhes@dhes.co.kr"
  },
  {
    icon: GlobeIcon,
    title: "웹사이트",
    value: "www.dhes.co.kr",
    description: "제품 정보 및 자료",
    action: "https://www.dhes.co.kr"
  },
  {
    icon: MapPinIcon,
    title: "주소",
    value: "서울시 구로구 경인로 53길 15",
    description: "중앙유통단지 바동 3217 ~ 3218호",
    action: "https://maps.google.com/?q=서울시+구로구+경인로+53길+15"
  }
];

// 소셜 미디어 정보
const SOCIAL_MEDIA: ContactMethod[] = [
  {
    icon: MessageCircleIcon,
    title: "카카오톡 채널",
    value: "@대한플러스전자",
    action: "https://pf.kakao.com/_daehanplus",
    color: "bg-[#FEE500]",
    description: "카카오톡으로 실시간 채팅 상담"
  },
  {
    title: "네이버 블로그",
    value: "대한플러스전자 공식 블로그",
    action: "https://blog.naver.com/daehanplus",
    color: "bg-[#03C75A]",
    description: "다양한 제품 후기 및 소식",
    customIcon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
      </svg>
    )
  },
  {
    icon: YoutubeIcon,
    title: "유튜브 채널",
    value: "대한플러스전자 TV",
    action: "https://youtube.com/@daehanplus",
    color: "bg-[#FF0000]",
    description: "제품 리뷰 및 튜토리얼 영상"
  }
];

// 회사 뉴스 데이터
const COMPANY_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "대한플러스전자, LED 드라이버 IC 신제품 출시",
    date: "2023-05-15",
    summary: "대한플러스전자가 에너지 효율이 30% 향상된 새로운 LED 드라이버 IC 제품군을 출시했습니다.",
    category: "제품 소식",
    image: "/images/news-1.jpg",
    url: "/news/led-driver-ic-release"
  },
  {
    id: "news-2",
    title: "자동차 전장 솔루션 전시회 참가 안내",
    date: "2023-06-10",
    summary: "오는 7월 15일부터 3일간 코엑스에서 열리는 자동차 전장 솔루션 전시회에 참가합니다.",
    category: "전시회",
    image: "/images/news-2.jpg",
    url: "/news/automotive-expo"
  },
  {
    id: "news-3",
    title: "2023년 2분기 실적 발표",
    date: "2023-07-20",
    summary: "대한플러스전자의 2023년 2분기 실적이 전년 동기 대비 15% 성장했습니다.",
    category: "경영 소식",
    image: "/images/news-3.jpg",
    url: "/news/q2-performance"
  }
];

// 연락처 카드 컴포넌트
const ContactCard = ({ icon: Icon, title, value, description, action, customIcon, color }: ContactMethod) => (
  <Link href={action} target={action.startsWith('http') ? '_blank' : undefined}>
    <div className="group relative h-full bg-white/5 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-blue-700 transition-all duration-300 hover:bg-blue-900/10 overflow-hidden">
      {/* 호버 시 상단 효과 */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="p-4 flex items-start gap-4">
        <div className={`rounded-lg ${color || "bg-blue-900/40"} p-3 text-white group-hover:scale-110 transition-all duration-300`}>
          {customIcon || (Icon && <Icon className="w-5 h-5" />)}
        </div>
        <div className="space-y-1 flex-grow">
          <h3 className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-base font-semibold text-white">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {description}
            </p>
          )}
        </div>
        <div className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300">
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  </Link>
);

// 뉴스 카드 컴포넌트
const NewsCard = ({ title, date, summary, category, image, url }: NewsItem) => (
  <Link href={url}>
    <div className="group h-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 transition-all duration-300 hover:border-blue-700 hover:bg-blue-900/10 flex flex-col">
      {/* 이미지 섹션 */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={image || "/images/placeholder.jpg"}
          alt={title}
          width={400}
          height={200}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 right-3 bg-black/80 hover:bg-black/90 text-white text-xs backdrop-blur-sm">
          {category}
        </Badge>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="flex-grow flex flex-col p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
        
        <h3 className="font-semibold text-base text-white group-hover:text-blue-400 transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-3">
          {summary}
        </p>
        
        <div className="mt-auto pt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium text-blue-400 flex items-center gap-1">
            자세히 보기
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// 연락처 폼 버튼 컴포넌트
const ContactFormButton = () => (
  <Card className="h-full border-gray-800 bg-blue-900/10 hover:bg-blue-900/20 hover:border-blue-700 transition-all duration-300">
    <CardHeader>
      <CardTitle className="text-lg text-white">문의하기</CardTitle>
      <CardDescription className="text-gray-400">
        제품 문의, 견적 요청, 기술 지원 등 궁금한 사항은 아래 연락처로 문의해 주세요.
      </CardDescription>
    </CardHeader>
    
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <CheckCircleIcon className="w-4 h-4 text-blue-400" />
          <span>이메일: dhes@dhes.co.kr</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <CheckCircleIcon className="w-4 h-4 text-blue-400" />
          <span>전화: 02-6679-5025 (평일 09:00-18:00)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <CheckCircleIcon className="w-4 h-4 text-blue-400" />
          <span>카카오톡 채널: @대한플러스전자</span>
        </div>
      </div>
    </CardContent>
    
    <CardFooter>
      <div className="w-full flex flex-col gap-2">
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none">
          <a href="mailto:dhes@dhes.co.kr" className="flex items-center justify-center gap-2">
            <MailIcon className="w-4 h-4" />
            이메일로 문의하기
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full border-gray-700 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 hover:border-blue-700">
          <a href="https://pf.kakao.com/_daehanplus" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <MessageCircleIcon className="w-4 h-4" />
            카카오톡 채널 바로가기
          </a>
        </Button>
      </div>
    </CardFooter>
  </Card>
);

// 회사 정보 카드 컴포넌트
const CompanyInfoCard = () => (
  <Card className="h-full border-gray-800 bg-blue-900/10 hover:bg-blue-900/20 hover:border-blue-700 transition-all duration-300">
    <CardHeader>
      <div className="flex items-center gap-2">
        <CardTitle className="text-lg text-white">회사 정보</CardTitle>
        <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0">Since 1997</Badge>
      </div>
      <CardDescription className="text-gray-400">
        대한플러스전자는 25년 이상의 경험을 바탕으로 LED 드라이버 IC 및 반도체 부품 유통 서비스를 제공합니다.
      </CardDescription>
    </CardHeader>
    
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <BuildingIcon className="w-4 h-4 text-blue-400" />
          <span>사업자등록번호: 123-45-67890</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <TagIcon className="w-4 h-4 text-blue-400" />
          <span>업종: 전자부품 도매 및 수입</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <ClockIcon className="w-4 h-4 text-blue-400" />
          <span>영업시간: 평일 09:00 - 18:00</span>
        </div>
      </div>
    </CardContent>
    
    <CardFooter>
      <Button asChild variant="outline" className="w-full border-gray-700 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 hover:border-blue-700">
        <Link href="/about" className="flex items-center justify-center gap-2">
          <GlobeIcon className="w-4 h-4" />
          회사 소개 자세히 보기
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

// 최신 소식 섹션
const LatestNews = () => {
  const [news, setNews] = useState<NewsItem[]>(COMPANY_NEWS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setIsLoading(true);
        // 실제 환경에서는 Supabase에서 블로그 포스트를 가져옵니다
        const supabaseClient = createClient();
        
        const { data, error } = await supabaseClient
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) {
          throw new Error(error.message);
        }
        
        // 데이터가 있으면 블로그 포스트 형식으로 변환
        if (data && data.length > 0) {
          const blogPosts: NewsItem[] = data.map((post: any) => ({
            id: post.slug,
            title: post.title,
            date: new Date(post.created_at).toISOString().split('T')[0],
            summary: post.summary,
            category: post.category,
            image: post.image_url || "/images/placeholder.jpg",
            url: `/support/blog/${post.slug}`
          }));
          
          setNews(blogPosts);
        }
      } catch (error) {
        console.error("Failed to fetch latest news:", error);
        // 오류 발생 시 기본 뉴스 데이터 유지
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLatestNews();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">최신 소식</h3>
        <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
          <Link href="/support/blog" className="flex items-center gap-1">
            <span>모든 소식 보기</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // 로딩 상태일 때 스켈레톤 UI 표시
          [...Array(3)].map((_, i) => (
            <motion.div
              key={`skeleton-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              className="h-full"
            >
              <Card className="overflow-hidden border border-gray-800 transition-all duration-300 h-full">
                <div className="relative h-40 overflow-hidden bg-gray-900">
                  <div className="absolute top-3 right-3">
                    <div className="w-16 h-5 bg-gray-800 rounded-md"></div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="w-1/2 h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="w-full h-3 bg-gray-800 rounded mb-1"></div>
                  <div className="w-4/5 h-3 bg-gray-800 rounded mb-1"></div>
                  <div className="w-3/5 h-3 bg-gray-800 rounded"></div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="w-12 h-3 bg-gray-800 rounded"></div>
                  <div className="w-16 h-3 bg-gray-800 rounded"></div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          // 실제 뉴스 데이터 표시
          news.map((newsItem, index) => (
            <motion.div 
              key={newsItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="h-full"
            >
              <NewsCard {...newsItem} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default function ContactClient() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0 px-4 py-1.5 text-sm mb-6">
            CONTACT
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-100">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            제품 문의, 견적 요청, 기술 지원 등 대한플러스전자에 문의하실 내용이 있으시면 아래 연락처로 연락해 주세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8">
          <div className="md:col-span-4">
            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-white mb-4">연락처</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_METHODS.map((method, index) => (
                  <motion.div 
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ContactCard {...method} />
                  </motion.div>
                ))}
              </div>
              
              {/* 소셜 미디어 섹션 */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">소셜 미디어</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SOCIAL_MEDIA.map((social, index) => (
                    <motion.div 
                      key={social.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                    >
                      <ContactCard {...social} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-full"
            >
              <ContactFormButton />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="h-full"
            >
              <CompanyInfoCard />
            </motion.div>
          </div>
        </div>
        
        {/* 최신 소식 섹션 */}
        <LatestNews />
      </div>
    </section>
  );
} 