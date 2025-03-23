import { Building, Briefcase, Users, Calendar } from "lucide-react";

const eventIcons = {
    Establishment: <Building className="w-2.5 h-2.5 text-blue-400" />,
    Partnership: <Briefcase className="w-2.5 h-2.5 text-emerald-400" />,
    Exhibition: <Users className="w-2.5 h-2.5 text-amber-400" />,
    Branch: <Calendar className="w-2.5 h-2.5 text-purple-400" />,
};

export default function TimelineSimple({ timelineData }: { timelineData: any[] }) {
    return (
        <ol className="relative border-s border-gray-700">
            {timelineData.map((item, index) => (
                <li key={index} className="mb-10 ms-6">
                    {/* 아이콘 */}
                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-gray-900 ${
                        item.eventType === 'Establishment' ? 'bg-blue-500/30' :
                        item.eventType === 'Partnership' ? 'bg-emerald-500/30' :
                        item.eventType === 'Exhibition' ? 'bg-amber-500/30' :
                        'bg-purple-500/30'
                    }`}>
                        {eventIcons[item.eventType]}
                    </span>

                    {/* 타이틀과 설명 */}
                    <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">
                            {item.title}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                            {item.date}
                        </time>
                        {/* 뱃지 */}
                        <div className="flex flex-wrap gap-2">
                            {item.badges?.map((badge, badgeIndex) => (
                                <span
                                    key={badgeIndex}
                                    className={`text-sm font-medium px-2.5 py-0.5 rounded ${badge.bgColor} ${badge.textColor}`}
                                >
                                    {badge.text}
                                </span>
                            ))}
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
}
