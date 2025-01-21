import BlogClient from "./BlogClient";
import { BlogCardProps } from "./BlogCard";

// 더미 데이터 30개
const dummyBlogs: BlogCardProps[] = [
  // 제품소식
  {
    id: "1",
    title: "새로운 IoT 센서 제품 라인업 출시 안내",
    description: "산업용 IoT 센서의 새로운 기준을 제시할 신제품을 소개합니다. 더욱 향상된 정확도와 신뢰성으로 스마트 팩토리의 혁신을 이끌어갑니다.",
    category: "제품소식",
    thumbnail: "/images/blog/iot-sensors.jpg",
    author: "김기술",
    publishDate: "2024-01-15", 
    readTime: "5분",
    views: 1234,
    comments: 23
  },
  {
    id: "2", 
    title: "스마트 홈 허브 2.0 업데이트 소식",
    description: "더욱 강력해진 스마트 홈 허브의 새로운 기능을 소개합니다. 에너지 효율화와 편의성이 대폭 개선되었습니다.",
    category: "제품소식",
    thumbnail: "/images/blog/smart-home.jpg",
    author: "이스마트",
    publishDate: "2024-01-20",
    readTime: "4분",
    views: 892,
    comments: 15
  },
  // 기술블로그
  {
    id: "3",
    title: "엣지 컴퓨팅 기술의 현재와 미래",
    description: "산업 현장에서 실시간 데이터 처리의 중요성이 커지면서 주목받는 엣지 컴퓨팅 기술의 발전 방향을 살펴봅니다.",
    category: "기술블로그",
    thumbnail: "/images/blog/edge-computing.jpg",
    author: "박엣지",
    publishDate: "2024-01-18",
    readTime: "8분",
    views: 2103,
    comments: 45
  },
  {
    id: "4",
    title: "머신러닝 모델 최적화 전략",
    description: "제한된 리소스에서 최상의 성능을 끌어내는 머신러닝 모델 최적화 기법을 공유합니다.",
    category: "기술블로그",
    thumbnail: "/images/blog/ml-optimization.jpg",
    author: "정머신",
    publishDate: "2024-01-22",
    readTime: "10분",
    views: 1567,
    comments: 32
  },
  // 시장분석
  {
    id: "5",
    title: "2024년 산업용 IoT 시장 전망",
    description: "글로벌 산업용 IoT 시장의 트렌드와 성장 전망을 분석합니다. 주요 성장 동력과 도전 과제를 살펴봅니다.",
    category: "시장분석",
    thumbnail: "/images/blog/market-analysis.jpg",
    author: "한시장",
    publishDate: "2024-01-25",
    readTime: "7분",
    views: 3421,
    comments: 56
  },
  {
    id: "6",
    title: "스마트팩토리 도입 현황 보고서",
    description: "국내 제조업체의 스마트팩토리 도입 현황과 성과를 분석한 보고서입니다.",
    category: "시장분석",
    thumbnail: "/images/blog/smart-factory-report.jpg",
    author: "최분석",
    publishDate: "2024-01-28",
    readTime: "6분",
    views: 2876,
    comments: 41
  },
  // 기술가이드
  {
    id: "7",
    title: "IoT 센서 설치 및 운영 가이드",
    description: "IoT 센서의 올바른 설치 방법과 효율적인 운영을 위한 상세 가이드를 제공합니다.",
    category: "기술가이드",
    thumbnail: "/images/blog/sensor-guide.jpg",
    author: "윤가이드",
    publishDate: "2024-01-30",
    readTime: "12분",
    views: 4532,
    comments: 89
  },
  {
    id: "8",
    title: "데이터 수집 시스템 구축 가이드",
    description: "효율적인 데이터 수집 시스템 구축을 위한 단계별 가이드와 모범 사례를 소개합니다.",
    category: "기술가이드",
    thumbnail: "/images/blog/data-collection.jpg",
    author: "송데이터",
    publishDate: "2024-02-01",
    readTime: "15분",
    views: 3298,
    comments: 67
  },
  // 이벤트
  {
    id: "9",
    title: "2024 스마트팩토리 컨퍼런스 개최 안내",
    description: "최신 스마트팩토리 기술과 트렌드를 공유하는 연례 컨퍼런스에 여러분을 초대합니다.",
    category: "이벤트",
    thumbnail: "/images/blog/conference.jpg",
    author: "김이벤트",
    publishDate: "2024-02-05",
    readTime: "3분",
    views: 1876,
    comments: 28
  },
  {
    id: "10",
    title: "IoT 개발자 해커톤 대회",
    description: "창의적인 IoT 솔루션을 발굴하는 개발자 해커톤 대회를 개최합니다.",
    category: "이벤트",
    thumbnail: "/images/blog/hackathon.jpg",
    author: "박해커",
    publishDate: "2024-02-08",
    readTime: "4분",
    views: 2143,
    comments: 35
  },
  // 회사소식
  {
    id: "11",
    title: "2024년 신입사원 공개채용 안내",
    description: "함께 성장할 열정 가득한 신입사원을 모집합니다. 다양한 직무에서 여러분의 도전을 기다립니다.",
    category: "회사소식",
    thumbnail: "/images/blog/recruitment.jpg",
    author: "인사팀",
    publishDate: "2024-02-10",
    readTime: "5분",
    views: 5234,
    comments: 95
  },
  {
    id: "12",
    title: "글로벌 지사 확장 소식",
    description: "동남아시아 시장 진출을 위한 싱가포르 지사 설립 소식을 알려드립니다.",
    category: "회사소식",
    thumbnail: "/images/blog/global-expansion.jpg",
    author: "대외협력팀",
    publishDate: "2024-02-12",
    readTime: "4분",
    views: 3567,
    comments: 48
  }
];

export default function BlogPage() {
  return (
    <div className="container py-8 mx-auto">
      <BlogClient blogs={dummyBlogs} />
    </div>
  );
}
