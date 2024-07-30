import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Carousel from "@/container/carousel/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    BookOpenIcon,
    MessagesSquareIcon,
    Settings2Icon,
    TabletSmartphoneIcon,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
export default function PartnersSection() {
    return (
        <>
            {/* Hero */}
            <div className="container py-24 lg:py-32">
                {/* Grid */}
                <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                    <div className="lg:col-span-3">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            파트너사
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            <strong>대한플러스전자(주)</strong>는 전 세계 최고의 반도체 부품 제조사들과의 파트너십을 통해 고객에게 최고의 품질과 신뢰성을 제공하고 있습니다.
                            <br />저희 파트너사는 각기 다른 전문 분야에서 혁신적인 제품을 공급하며,
                            <br />저희는 그들의 우수한 기술력과 품질을 바탕으로 고객의 다양한 요구를 충족시키고 있습니다.
                        </p>
                        {/* 2. Macroblock 소개 문구
Macroblock은 LED 드라이버 IC 분야에서 세계적인 선두주자입니다. Macroblock의 제품은 뛰어난 성능과 신뢰성을 자랑하며, 고품질의 LED 조명과 디스플레이 솔루션을 제공합니다. 혁신적인 기술력으로 시장을 선도하는 Macroblock과 함께, 고객 여러분께 최상의 LED 드라이버 솔루션을 제공해드리겠습니다.

3. Zowie Technology Corporation 소개 문구
Zowie Technology Corporation은 반도체 테스트 솔루션의 글로벌 리더로, 고정밀 반도체 테스트 장비를 제공합니다. Zowie의 제품은 정확하고 효율적인 테스트를 통해 반도체의 품질을 보장하며, 고객의 요구에 맞춘 맞춤형 솔루션을 제공하여 생산성을 극대화합니다.

4. LLT 소개 문구
LLT는 고성능 전력 변환 솔루션을 전문으로 하는 회사로, 혁신적이고 효율적인 전력 관리 IC를 제공합니다. LLT의 제품은 높은 에너지 효율성과 신뢰성을 바탕으로 다양한 전력 관리 응용 분야에 적합합니다.

5. Morethanall 소개 문구
Morethanall은 첨단 반도체 소자의 제조사로, 다양한 전자 제품에 사용되는 고품질 부품을 생산합니다. Morethanall의 혁신적인 제품들은 전자 산업의 발전에 기여하며, 고객에게 최적의 성능을 제공합니다.

6. Kube Electronics 소개 문구
Kube Electronics는 다양한 전자 부품과 솔루션을 제공하는 전문 기업으로, 뛰어난 품질과 경쟁력 있는 가격으로 고객에게 가치를 제공합니다. Kube의 제품은 신뢰성과 성능을 중시하는 다양한 응용 분야에서 사용됩니다.

7. XLSEMI 소개 문구
XLSEMI는 전력 관리 IC의 선두주자로, 고효율 전력 솔루션을 제공합니다. XLSEMI의 제품은 에너지 절약과 성능 향상을 동시에 실현하여, 다양한 전자기기에 안정적이고 효율적인 전력 공급을 가능하게 합니다.

8. Powtech 소개 문구
Powtech는 전력 변환 및 관리 솔루션 분야에서 혁신적인 제품을 제공하는 기업입니다. Powtech의 고성능 전력 관리 IC는 다양한 전자 기기에 적용되어 높은 에너지 효율성과 신뢰성을 제공합니다.

9. GTM 소개 문구
GTM은 반도체 및 전자 부품의 글로벌 공급업체로, 첨단 기술과 우수한 품질로 인정받고 있습니다. GTM의 제품은 다양한 산업 분야에서 사용되며, 고객에게 최상의 솔루션을 제공합니다.

 */}
                        {/* <div className="mt-5 lg:mt-8 flex flex-col sm:items-center gap-2 sm:flex-row sm:gap-3">
                            <div className="w-full max-w-lg  lg:w-auto">
                                <Label className="sr-only">Search</Label>
                                <Input placeholder="Enter work email" type="email" />
                            </div>
                            <Button className="w-min">Request demo</Button>
                        </div> */}
                        {/* Brands */}

                        <div className="mt-6 lg:mt-12">
                            <span className="text-xs font-medium uppercase">Trusted by:</span>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-8">
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer  hover:scale-105">
                                    <div className="flex justify-center items-center mx-auto">
                                        <Image
                                            alt="macroblock"
                                            width={30}
                                            height={30}
                                            src="/svgs/macroblock-logo.svg" />
                                    </div>
                                </div>
                                {/* End Icon Block */}
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:border  hover:scale-105">
                                <div className="flex justify-center items-center mx-auto">
                                        <Image
                                            alt="macroblock"
                                            width={30}
                                            height={30}
                                            src="/svgs/zowie-logo.svg" />
                                    </div>
                                </div>
                                {/* End Icon Block */}
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:scale-105">
                                <div className="flex justify-center items-center mx-auto">
                                        <Image src="/svgs/GTM-logo.svg" alt="GTM" width={30} height={30} />
                                    </div>
                                </div>
                                {/* End Icon Block */}
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:scale-105">
                                <div className="flex justify-center items-center mx-auto">
                                    <Image src="/svgs/xlsemi-logo.svg" alt="XLSEMI" width={30} height={30} />
                                    
                                    </div>
                                </div>
                                {/* End Icon Block */}
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:scale-105">
                                <div className="flex justify-center items-center mx-auto">
                                        <Image
                                            alt="Morethanall"
                                            width={30}
                                            height={30}
                                            src="/svgs/morethanall-logo.svg" />
                                    </div>
                                </div>
                                {/* End Icon Block */}
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:scale-105">
                                <div className="flex justify-center items-center mx-auto">
                                        <Image
                                            alt="Powtech"
                                            width={30}
                                            height={30}
                                            src="/svgs/powtech-logo.svg" />
                                    </div>
                                </div>
                                {/* End Icon Block */}
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:scale-105">
                                <div className="flex justify-center items-center">
                                        <Image
                                            alt="Kube Electronics"
                                            width={30}
                                            height={30}
                                            src="/svgs/kube-logo.svg" />
                                    </div>
                                </div>
                                {/* End Icon Block */}
                                {/* Icon Block */}
                                <div className="text-center rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:scale-105">
                                    <div className="flex justify-center items-center mx-auto">
                                        <Image
                                            alt="LLT"
                                            width={30}
                                            height={30}
                                            src="/svgs/llt-logo.svg" />
                                    </div>
                                </div>
                                {/* End Icon Block */}
                            </div>

                        </div>
                        {/* End Brands */}
                    </div>
                    {/* End Col */}

                    <div className="lg:col-span-4 mt-10 lg:mt-0">
                        <Carousel>

                        </Carousel>
                        {/* <Card className="w-full rounded-xl">
                            <CardHeader>
                                <CardTitle>Macroblock</CardTitle>
                                <CardDescription>Macroblock은 LED 드라이버 IC 분야에서 세계적인 선두주자입니다. Macroblock의 제품은 뛰어난 성능과 신뢰성을 자랑하며, 고품질의 LED 조명과 디스플레이 솔루션을 제공합니다. 혁신적인 기술력으로 시장을 선도하는 Macroblock과 함께, 고객 여러분께 최상의 LED 드라이버 솔루션을 제공해드리겠습니다.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src="/images/led_driver_ic_category_banner.png"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button className="grow" variant="outline">제품 검색</Button>
                                <Separator orientation="vertical" className="mx-4"></Separator>
                                <Button className="grow">제조사 소개</Button>
                            </CardFooter>
                        </Card> */}
                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}
            </div>
            {/* End Hero */}
        </>
    );
}
