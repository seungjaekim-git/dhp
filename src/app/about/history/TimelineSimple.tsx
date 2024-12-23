import { Building, Briefcase, Users, Calendar } from "lucide-react";

const eventIcons = {
    Establishment: <Building className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
    Partnership: <Briefcase className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
    Exhibition: <Users className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
    Branch: <Calendar className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />,
};

export default function TimelineSimple({ timelineData }: { timelineData: any[] }) {
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {timelineData.map((item, index) => (
                <li key={index} className="mb-10 ms-6">
                    {/* 아이콘 */}
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        {eventIcons[item.eventType]}
                    </span>

                    {/* 타이틀과 설명 */}
                    <div>
                        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {item.title}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {item.date}
                        </time>
                        {/* 뱃지 */}
                        {item.badges?.map((badge, badgeIndex) => (
                            <span
                                key={badgeIndex}
                                className={`text-sm font-medium px-2.5 py-0.5 rounded ${badge.bgColor} ${badge.textColor}`}
                            >
                                {badge.text}
                            </span>
                        ))}
                    </div>
                </li>
            ))}
        </ol>
    );
}
