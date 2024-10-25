import Image from "next/image"

import Carousel from "@/components/custom/carousel"

// TODO : React Alice Carousel 적용
export default function PartnersSection() {
    const mainItems = [
        {
            id: "macroblock",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="macroblock" width={100} height={100} src="/svgs/macroblock-logo.svg" />
                    <p className="text-center">
                        Macroblock은 LED 드라이버 IC 분야에서 세계적인 선두주자입니다. Macroblock의 제품은 뛰어난 성능과 신뢰성을 자랑하며, 고품질의 LED 조명과 디스플레이 솔루션을 제공합니다. 혁신적인 기술력으로 시장을 선도하는 Macroblock과 함께, 고객 여러분께 최상의 LED 드라이버 솔루션을 제공해드리겠습니다.
                    </p>
                </div>
            )
        },
        {
            id: "zowie",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="zowie" width={100} height={100} src="/svgs/zowie-logo.svg" />
                    <p className="text-center">
                        Zowie Technology Corporation은 반도체 테스트 솔루션의 글로벌 리더로, 고정밀 반도체 테스트 장비를 제공합니다. Zowie의 제품은 정확하고 효율적인 테스트를 통해 반도체의 품질을 보장하며, 고객의 요구에 맞춘 맞춤형 솔루션을 제공하여 생산성을 극대화합니다.
                    </p>
                </div>
            )
        },
        {
            id: "llt",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="LLT" width={100} height={100} src="/svgs/llt-logo.svg" />
                    <p className="text-center">
                        LLT는 고성능 전력 변환 솔루션을 전문으로 하는 회사로, 혁신적이고 효율적인 전력 관리 IC를 제공합니다. LLT의 제품은 높은 에너지 효율성과 신뢰성을 바탕으로 다양한 전력 관리 응용 분야에 적합합니다.
                    </p>
                </div>
            )
        },
        {
            id: "morethanall",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="Morethanall" width={100} height={100} src="/svgs/morethanall-logo.svg" />
                    <p className="text-center">
                        Morethanall은 첨단 반도체 소자의 제조사로, 다양한 전자 제품에 사용되는 고품질 부품을 생산합니다. Morethanall의 혁신적인 제품들은 전자 산업의 발전에 기여하며, 고객에게 최적의 성능을 제공합니다.
                    </p>
                </div>
            )
        },
        {
            id: "kube",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="Kube Electronics" width={100} height={100} src="/svgs/kube-logo.svg" />
                    <p className="text-center">
                        Kube Electronics는 다양한 전자 부품과 솔루션을 제공하는 전문 기업으로, 뛰어난 품질과 경쟁력 있는 가격으로 고객에게 가치를 제공합니다. Kube의 제품은 신뢰성과 성능을 중시하는 다양한 응용 분야에서 사용됩니다.
                    </p>
                </div>
            )
        },
        {
            id: "xlsemi",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="XLSEMI" width={100} height={100} src="/svgs/xlsemi-logo.svg" />
                    <p className="text-center">
                        XLSEMI는 전력 관리 IC의 선두주자로, 고효율 전력 솔루션을 제공합니다. XLSEMI의 제품은 에너지 절약과 성능 향상을 동시에 실현하여, 다양한 전자기기에 안정적이고 효율적인 전력 공급을 가능하게 합니다.
                    </p>
                </div>
            )
        },
        {
            id: "powtech",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="Powtech" width={100} height={100} src="/svgs/powtech-logo.svg" />
                    <p className="text-center">
                        Powtech는 전력 변환 및 관리 솔루션 분야에서 혁신적인 제품을 제공하는 기업입니다. Powtech의 고성능 전력 관리 IC는 다양한 전자 기기에 적용되어 높은 에너지 효율성과 신뢰성을 제공합니다.
                    </p>
                </div>
            )
        },
        {
            id: "gtm",
            content: (
                <div className="flex flex-col items-center gap-4">
                    <Image alt="GTM" width={100} height={100} src="/svgs/GTM-logo.svg" />
                    <p className="text-center">
                        GTM은 반도체 및 전자 부품의 글로벌 공급업체로, 첨단 기술과 우수한 품질로 인정받고 있습니다. GTM의 제품은 다양한 산업 분야에서 사용되며, 고객에게 최상의 솔루션을 제공합니다.
                    </p>
                </div>
            )
        }
    ];

    const thumbItems = mainItems.map(item => ({
        id: item.id,
        content: (
            <div className="flex items-center justify-center h-full">
                <Image 
                    alt={item.id} 
                    width={50} 
                    height={50} 
                    src={`/svgs/${item.id}-logo.svg`}
                />
            </div>
        )
    }));

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
                            <strong>서비스이름(주)</strong>는 전 세계 최고의 반도체 부품 제조사들과의 파트너십을 통해 고객에게 최고의 품질과 신뢰성을 제공하고 있습니다.
                            <br />저희 파트너사는 각기 다른 전문 분야에서 혁신적인 제품을 공급하며,
                            <br />저희는 그들의 우수한 기술력과 품질을 바탕으로 고객의 다양한 요구를 충족시키고 있습니다.
                        </p>

                        
                    </div>
                    {/* End Col */}

                    <div className="lg:col-span-4 mt-10 lg:mt-0">
                        <Carousel 
                            mainItems={mainItems}
                            thumbItems={thumbItems}
                            orientation="horizontal"
                        />
                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}
            </div>
            {/* End Hero */}
        </>
    );
}
