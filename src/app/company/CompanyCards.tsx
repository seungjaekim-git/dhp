"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Building, UserCircle2, Cpu, ChevronRight, ExternalLink } from "lucide-react";

const icons = {
    CalendarDays,
    Building,
    UserCircle2,
    Cpu,
};

export default function CompanyCards({ cards }: { cards: any[] }) {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => {
                        const Icon = icons[card.icon];
                        return (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative"
                            >
                                {/* 상단 아이콘 링크 */}
                                <Link
                                    href={card.link.href}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-primary"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </Link>

                                {/* 아이콘과 제목 */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {card.title}
                                    </h3>
                                </div>

                                {/* 설명 */}
                                <p className="text-wrap text-gray-600 text-sm mb-4 line-clamp-2">
                                    {card.description}
                                </p>

                                {/* 하단 버튼 */}
                                <Button className="w-full mt-8">
                                    <ChevronRight className="mr-2" /> {card.link.text}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
