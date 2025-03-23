import { ExternalLink, Calendar, Briefcase, Building, Users } from "lucide-react";
import Image from "next/image";

interface Badge {
  text: string;
  bgColor: string;
  textColor: string;
}

interface TimelineItem {
  title: string;
  date: string;
  content: {
    description: string;
  };
  badges?: Badge[];
  images?: string[];
  eventType: EventType;
}

enum EventType {
  Establishment = "Establishment",
  Partnership = "Partnership",
  Exhibition = "Exhibition",
  Branch = "Branch",
}

const eventIcons = {
  [EventType.Establishment]: <Building className="w-2.5 h-2.5 text-blue-400" />,
  [EventType.Partnership]: <Briefcase className="w-2.5 h-2.5 text-emerald-400" />,
  [EventType.Exhibition]: <Users className="w-2.5 h-2.5 text-amber-400" />,
  [EventType.Branch]: <Calendar className="w-2.5 h-2.5 text-purple-400" />,
};

export default function TimelineDetailed({ timelineData }: { timelineData: TimelineItem[] }) {
    return (
        <ol className="relative border-s border-gray-700">
            {timelineData.map((item, index) => (
                <li key={index} className="mb-10 ms-6">
                    {/* 아이콘 */}
                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-gray-900 ${
                        item.eventType === EventType.Establishment ? 'bg-blue-500/30' :
                        item.eventType === EventType.Partnership ? 'bg-emerald-500/30' :
                        item.eventType === EventType.Exhibition ? 'bg-amber-500/30' :
                        'bg-purple-500/30'
                    }`}>
                        {eventIcons[item.eventType]}
                    </span>

                    <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                        <div className="flex-1">
                            {/* 타이틀과 뱃지 */}
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold text-white">
                                    {item.title}
                                </h3>
                                <span
                                    className={`text-sm font-medium px-2.5 py-0.5 rounded ${
                                        item.eventType === EventType.Establishment ? "bg-blue-500/20 text-blue-400" :
                                        item.eventType === EventType.Partnership ? "bg-emerald-500/20 text-emerald-400" :
                                        item.eventType === EventType.Exhibition ? "bg-amber-500/20 text-amber-400" :
                                        "bg-purple-500/20 text-purple-400"
                                    }`}
                                >
                                    {item.eventType}
                                </span>
                                {item.badges?.map((badge, badgeIndex) => (
                                    <span
                                        key={badgeIndex}
                                        className={`text-sm font-medium px-2.5 py-0.5 rounded ${badge.bgColor} ${badge.textColor}`}
                                    >
                                        {badge.text}
                                    </span>
                                ))}
                            </div>

                            {/* 날짜 */}
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                {item.date}
                            </time>

                            {/* 설명 */}
                            <p className="text-base font-normal text-gray-300">
                                {item.content.description}
                            </p>

                            {/* 관련 링크 */}
                            {item.content.description.includes("참석") && (
                                <a
                                    href="#"
                                    className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 hover:underline mt-2 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    관련 뉴스 보기
                                </a>
                            )}
                        </div>

                        {/* 이미지 그리드 */}
                        {item.images && item.images.length > 0 && (
                            <div className="mt-4 md:mt-0 md:w-1/3">
                                <div className="grid grid-cols-2 gap-2">
                                    {item.images.map((image, imgIndex) => (
                                        <div key={imgIndex} className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                                            <Image
                                                src={image}
                                                alt={`${item.title} 이미지 ${imgIndex + 1}`}
                                                fill
                                                className="object-cover rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}
