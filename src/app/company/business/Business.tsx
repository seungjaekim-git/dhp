"use client";

import { Button } from "@/components/ui/button";

export default function Business({ data }: { data: any[] }) {
    return (
        <main className="container mx-auto px-4 lg:px-16 py-8">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div
                            className={`h-48 bg-gradient-to-r ${item.gradient} relative`}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full opacity-80"
                                />
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <Button variant="outline" className="w-full">
                                자세히 보기
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
