import { CompanyConfig } from "./types";

export const companyConfig: CompanyConfig = {
  title: "회사소개",
  link: "/about",
  seo: {
    title: "회사소개 | 대한플러스전자",
    description: "대한플러스전자(주)의 회사 소개 및 정보",
    keywords: ["회사소개", "대한플러스전자", "기업정보"] 
  },
  items: [
    {
      title: "회사 소개",
      link: "/about",
      seo: {
        title: "회사 소개 | 대한플러스전자",
        description: "대한플러스전자(주) 소개",
        keywords: ["회사소개", "대한플러스전자", "기업정보"]
      }
    },
    {
      title: "인사말",
      link: "/about/greeting",
      seo: {
        title: "인사말 | 대한플러스전자",
        description: "대한플러스전자 CEO 인사말",
        keywords: ["인사말", "CEO", "비전"]
      }
    },
    {
      title: "연혁",
      link: "/about/history",
      seo: {
        title: "연혁 | 대한플러스전자",
        description: "대한플러스전자 회사 연혁",
        keywords: ["연혁", "회사역사", "발전과정"]
      }
    },
    {
      title: "찾아오시는 길",
      link: "/about/location",
      seo: {
        title: "찾아오시는 길 | 대한플러스전자",
        description: "대한플러스전자 오시는 길 안내",
        keywords: ["오시는길", "주소", "위치"]
      }
    }
  ]
}; 