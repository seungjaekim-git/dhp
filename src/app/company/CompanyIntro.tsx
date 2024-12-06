"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CompanyIntro({ data }: { data: any }) {
    return (
        <section className="mt-4">
            <div className="flex flex-col lg:flex-row gap-4 justify-center">
                <div className="flex-1"></div>
                <div className="flex-none p-4">
                    <div className="sticky top-0 w-full text-2xl font-bold">대한플러스전자 (주)</div>
                </div>
                <div className="flex-[2_1_30%] px-4">
                    <div className="flex flex-col gap-2">
                        {data.paragraphs.map((paragraph: string, index: number) => (
                            <div key={index} className="flex-1 p-4">
                                {paragraph}
                            </div>
                        ))}
                        <div className="flex-1 gap-2 my-8">
                            <Button className="relative h-12 px-8 rounded-3xl bg-[#3d3a4e] overflow-hidden cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-3xl before:bg-gradient-to-r before:from-[rgba(150,93,233,1)] before:to-[rgba(99,88,238,1)] before:scale-x-0 before:origin-left hover:before:scale-x-100 active:scale-110 before:transition-all before:duration-475">
                                <span className="relative z-10 text-white font-semibold">
                                    {data.buttonText}
                                </span>
                                <span className="relative z-10 ml-2">
                                    <Download className="w-5 fill-white" />
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex-1"></div>
            </div>
        </section>
    );
}
