export async function getTimelineData() {
    // 실제 데이터 가져오기 (예: 파일, API 등)
    const timelineData = await import("./timelineData.json");
    return timelineData.default;
}