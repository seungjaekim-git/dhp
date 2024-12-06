"use client";

import { ChevronRightIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CompanyHero({
    data,
    carouselItems,
}: {
    data: any;
    carouselItems: any;
}) {
    return (
        <section className="flex flex-col items-center justify-center bg-gray-50 py-16">
            {/* Text Content */}
            <div className="container mx-auto px-6 lg:px-12 text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {data.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6">
                    {data.subtitle}
                </p>
                <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-6">
                    {data.description}
                </p>
                <a
                    href={data.link.href}
                    className="inline-flex items-center text-lg font-medium text-primary gap-2 hover:underline underline-offset-4"
                >
                    {data.link.text}
                    <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
            </div>

            {/* Swiper Carousel */}
            <div className="relative w-3/4 max-w-3xl">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop
                    className="rounded-xl overflow-hidden shadow-lg"
                >
                    {carouselItems.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center justify-center bg-white text-center p-8 lg:p-12">
                                <h2 className="text-xl font-bold mb-4">{item.name}</h2>
                                <p className="text-base text-gray-600 mb-4">{item.quote}</p>
                                <img
                                    src={item.backgroundImage}
                                    alt={item.name}
                                    className="w-full h-48 object-cover rounded-md shadow-md"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
