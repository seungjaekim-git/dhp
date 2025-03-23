import { SupportConfig } from "./types";

export const supportConfig: SupportConfig = {
  title: "고객지원",
  link: "/support",
  seo: {
    title: "고객지원 | 대한플러스전자",
    description: "대한플러스전자의 고객지원 서비스",
    keywords: ["고객지원", "문의", "기술지원"]
  },
  inquiry: {
    title: "문의",
    link: "/support/inquiry",
    seo: {
      title: "문의 | 대한플러스전자",
      description: "대한플러스전자에 문의하기",
      keywords: ["문의", "질문", "연락처"]
    },
    items: [
      {
        title: "제품 문의",
        link: "/support/inquiry/product",
        seo: {
          title: "제품 문의 | 대한플러스전자",
          description: "제품 관련 문의하기",
          keywords: ["제품문의", "제품정보", "지원"]
        }
      },
      // 추가 문의 항목...
    ]
  },
  contact: {
    title: "연락처",
    link: "/support/contact",
    seo: {
      title: "연락처 | 대한플러스전자",
      description: "대한플러스전자 연락처 정보",
      keywords: ["연락처", "전화번호", "이메일"]
    },
    items: [
      {
        title: "본사",
        link: "/support/contact/headquarter",
        seo: {
          title: "본사 연락처 | 대한플러스전자",
          description: "대한플러스전자 본사 연락처",
          keywords: ["본사", "위치", "주소"]
        }
      },
      // 추가 연락처 항목...
    ]
  },
  resources: {
    title: "자료",
    link: "/support/resources",
    seo: {
      title: "자료 | 대한플러스전자",
      description: "대한플러스전자 관련 자료",
      keywords: ["자료", "다운로드", "문서"]
    },
    items: [
      {
        title: "데이터시트",
        link: "/support/resources/datasheet",
        seo: {
          title: "데이터시트 | 대한플러스전자",
          description: "제품 데이터시트 모음",
          keywords: ["데이터시트", "사양", "기술문서"]
        }
      },
      {
        title: "블로그",
        link: "/support/blog",
        seo: {
          title: "블로그 | 대한플러스전자",
          description: "대한플러스전자 최신 소식 및 기술 블로그",
          keywords: ["블로그", "뉴스", "소식", "기술정보"]
        }
      },
      // 추가 자료 항목...
    ]
  }
}; 