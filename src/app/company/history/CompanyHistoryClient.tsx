'use client';

import { useState } from "react";
import TimelineDetailed from "./TimelineDetailed";
import TimelineSimple from "./TimelineSimple";
import DropdownFilters from "./DropdownFilters";

export default function CompanyHistoryClient({ timelineData }: { timelineData: any[] }) {
    const [viewMode, setViewMode] = useState<string>("detailed");
    const [sortMode, setSortMode] = useState<string>("descending");

    const sortedTimelineData = [...timelineData].sort((a, b) => {
        const aYear = parseInt(a.title.split('.')[0]);
        const bYear = parseInt(b.title.split('.')[0]);
        return sortMode === "descending" ? bYear - aYear : aYear - bYear;
    });

    return (
        <main className="container mx-auto px-4 lg:px-16 py-8">
            <DropdownFilters
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortMode={sortMode}
                setSortMode={setSortMode}
            />
            {viewMode === "detailed" ? (
                <TimelineDetailed timelineData={sortedTimelineData} />
            ) : (
                <TimelineSimple timelineData={sortedTimelineData} />
            )}
        </main>
    );
}
