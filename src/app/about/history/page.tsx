import HistoryLayout from "./HistoryLayout";
import { CalendarDays } from "lucide-react";

export default function HistoryPage() {
  const timelineData = [
    {
      title: "대한플러스전자 창립",
      date: "1997년 11월",
      content: {
        description: "대한플러스전자 회사 설립",
      },
      eventType: "Establishment",
      badges: [
        { text: "창립", bgColor: "bg-blue-100", textColor: "text-blue-600" }
      ],
      isLatest: false
    },
    {
      title: "Macroblock (LED Driver IC) 대리점 체결",
      date: "1999년 8월",
      content: {
        description: "한국 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "법인전환",
      date: "2001년 11월",
      content: {
        description: "대한플러스전자 법인 전환",
      },
      eventType: "Establishment",
      badges: [
        { text: "법인", bgColor: "bg-blue-100", textColor: "text-blue-600" }
      ],
      isLatest: false
    },
    {
      title: "Korea Electronic Parts & Equipment 전시회 참석",
      date: "2002년 4월",
      content: {
        description: "전자부품 전시회 참석",
      },
      eventType: "Exhibition",
      badges: [
        { text: "전시회", bgColor: "bg-yellow-100", textColor: "text-yellow-600" }
      ],
      isLatest: false
    },
    {
      title: "LED EXPO 참석",
      date: "2002년 5월 / 2003년 5월",
      content: {
        description: "LED 전시회 참석",
      },
      eventType: "Exhibition",
      badges: [
        { text: "전시회", bgColor: "bg-yellow-100", textColor: "text-yellow-600" }
      ],
      isLatest: false
    },
    {
      title: "Wonsemi (LED) 대리점 체결",
      date: "2004년 8월",
      content: {
        description: "LED 제품 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "Zowie (Diode) 대리점 체결",
      date: "2006년 6월",
      content: {
        description: "다이오드 제품 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "GTM (FET Voltage Regulator) 대리점 체결",
      date: "2008년 5월",
      content: {
        description: "FET 전압 조절기 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "POWTECH (LED Driver IC) 대리점 체결",
      date: "2008년 5월",
      content: {
        description: "LED 드라이버 IC 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "LED RGB Cluster R&D 부천지사 설립",
      date: "2009년 12월",
      content: {
        description: "부천지사 설립",
      },
      eventType: "Branch",
      badges: [
        { text: "지사", bgColor: "bg-purple-100", textColor: "text-purple-600" }
      ],
      isLatest: false
    },
    {
      title: "BPS (LED Driver IC) 대리점 체결",
      date: "2010년 4월",
      content: {
        description: "LED 드라이버 IC 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "LED EXPO & OLED EXPO 참석",
      date: "2012년 2월",
      content: {
        description: "LED 및 OLED 전시회 참석",
      },
      eventType: "Exhibition",
      badges: [
        { text: "전시회", bgColor: "bg-yellow-100", textColor: "text-yellow-600" }
      ],
      isLatest: false
    },
    {
      title: "KOSIGN 2014 참석",
      date: "2014년 연중",
      content: {
        description: "KOSIGN 2014 전시회 참석",
      },
      eventType: "Exhibition",
      badges: [
        { text: "전시회", bgColor: "bg-yellow-100", textColor: "text-yellow-600" }
      ],
      isLatest: false
    },
    {
      title: "LLT (Waterproof connectors) 대리점 체결",
      date: "2014년 연중",
      content: {
        description: "방수 커넥터 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "XLSEMI (LED Driver IC) 대리점 체결",
      date: "2018년 연중",
      content: {
        description: "LED 드라이버 IC 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "MORETHANALL (Waterproof connectors) 대리점 체결",
      date: "2018년 연중",
      content: {
        description: "방수 커넥터 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: false
    },
    {
      title: "Kube Electronics AG (Sensor) 대리점 체결",
      date: "2018년 연중",
      content: {
        description: "센서 제품 대리점 체결",
      },
      eventType: "Partnership",
      badges: [
        { text: "대리점", bgColor: "bg-green-100", textColor: "text-green-600" }
      ],
      isLatest: true
    }
  ];

  return (
    <HistoryLayout timelineData={timelineData} />
  );
}
