import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function DropdownFilters({
    viewMode,
    setViewMode,
    sortMode,
    setSortMode,
}: {
    viewMode: string;
    setViewMode: (value: string) => void;
    sortMode: string;
    setSortMode: (value: string) => void;
}) {
    return (
        <div className="flex justify-between mb-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" />
                        {viewMode === "detailed" ? "자세히 보기" : "간단히 보기"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>보기 모드</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
                        <DropdownMenuRadioItem value="detailed">자세히 보기</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="simple">간단히 보기</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" />
                        {sortMode === "descending" ? "최신순" : "오래된순"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>정렬 순서</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortMode} onValueChange={setSortMode}>
                        <DropdownMenuRadioItem value="descending">최신순</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="ascending">오래된순</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
