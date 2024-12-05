import { getTimelineData } from "@/lib/getTimelineData";
import CompanyHistoryClient from "./CompanyHistoryClient";

export default async function CompanyHistoryPage() {
    const timelineData = await getTimelineData(); // 데이터 가져오기

    return <CompanyHistoryClient timelineData={timelineData} />;
}
