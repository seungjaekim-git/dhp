// app/roadmap/page.tsx
import { getRoadMapData } from "./getRoadMapData";
import RoadMapClient from "./RoadMapClient";

export default async function RoadMapPage() {
    const data = await getRoadMapData();

    return <RoadMapClient data={data} />;
}
