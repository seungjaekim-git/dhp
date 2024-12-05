import { Timeline } from "@/components/ui/timeline";
import { ExternalLink } from "lucide-react";

export default function TimelineDetailed({ timelineData }: { timelineData: any[] }) {
    return (
        <Timeline
            data={timelineData.map((item) => ({
                title: item.title,
                content: (
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg">
                        <p className="text-gray-600 dark:text-gray-300">{item.content.description}</p>
                        {item.image && (
                            <img
                                src={item.image}
                                alt={`${item.title} 이미지`}
                                className="mt-4 w-full h-48 object-cover rounded-lg"
                            />
                        )}
                        {item.content.description.includes("참석") && (
                            <a
                                href="#"
                                className="inline-flex items-center text-sm text-primary hover:underline"
                            >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                관련 뉴스 보기
                            </a>
                        )}
                    </div>
                ),
            }))}
        />
    );
}
