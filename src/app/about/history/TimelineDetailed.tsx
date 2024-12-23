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
  [EventType.Establishment]: <Building className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
  [EventType.Partnership]: <Briefcase className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
  [EventType.Exhibition]: <Users className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
  [EventType.Branch]: <Calendar className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
};

export default function TimelineDetailed({ timelineData }: { timelineData: TimelineItem[] }) {
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {timelineData.map((item, index) => (
                <li key={index} className="mb-10 ms-6">
                    {/* 아이콘 */}
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        {eventIcons[item.eventType]}
                    </span>

                    <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                        <div className="flex-1">
                            {/* 타이틀과 뱃지 */}
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <span
                                    className={`text-sm font-medium px-2.5 py-0.5 rounded ${
                                        item.eventType === EventType.Establishment ? "bg-blue-100 text-blue-600" :
                                        item.eventType === EventType.Partnership ? "bg-green-100 text-green-600" :
                                        item.eventType === EventType.Exhibition ? "bg-yellow-100 text-yellow-600" :
                                        "bg-purple-100 text-purple-600"
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
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {item.date}
                            </time>

                            {/* 설명 */}
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                {item.content.description}
                            </p>

                            {/* 관련 링크 */}
                            {item.content.description.includes("참석") && (
                                <a
                                    href="#"
                                    className="inline-flex items-center text-sm text-primary hover:underline mt-2"
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
                                        <div key={imgIndex} className="relative aspect-square">
                                            <Image
                                                src={image}
                                                alt={`${item.title} 이미지 ${imgIndex + 1}`}
                                                fill
                                                className="object-cover rounded-lg"
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
