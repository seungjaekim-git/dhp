import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <div className="container px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                    <div className="rounded-lg h-64 overflow-hidden">
                        <img alt="content" className="object-cover object-center h-full w-full" src="https://dummyimage.com/1200x500"/>
                    </div>
                    <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="flex flex-col items-center text-center justify-center">
                                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">대표이사 <strong>김영구</strong></h2>
                                <div className="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                                <p className="text-base">고객의 성공이</p>
                                <p> 우리의 성공이다</p>
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <p className="leading-relaxed text-lg mb-4">안녕하세요. 저희 회사를 방문해 주신 여러분께 진심으로 감사드립니다.

저희 회사는 고객 여러분의 필요와 기대에 부응하는 고품질 전자 부품을 제공하기 위해 최선을 다하고 있습니다. 끊임없는 혁신과 도전을 통해 전자 부품 산업의 선두 주자로 자리매김하고 있으며, 항상 고객의 목소리에 귀 기울여 여러분의 성공적인 비즈니스를 지원하고 있습니다.

저희는 글로벌 시장에서의 경쟁력을 갖추고, 세계 각지의 고객들에게 최상의 솔루션을 제공하고자 합니다. 국제적인 비전과 현지화된 전략을 통해 고객 여러분과 함께 성장해 나가겠습니다. 또한, 저희 회사는 단순한 전자 부품 공급을 넘어, 사회적 책임을 다하는 기업이 되기 위해 노력하고 있습니다. 지속 가능한 발전과 환경 보호를 위해 최선을 다하며, 더 나은 사회를 만드는 데 기여하고자 합니다.

앞으로도 지속적인 발전과 성장을 위해 노력할 것을 약속드리며, 여러분의 변함없는 신뢰와 성원을 부탁드립니다. 많은 관심과 격려를 부탁드립니다. 감사합니다.

대표이사 김영구</p>
                            <a className="text-green-500 inline-flex items-center">Learn More
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}