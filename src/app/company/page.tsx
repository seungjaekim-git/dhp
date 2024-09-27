import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timeline } from "./timeline";

export default function CompanyPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 히어로 섹션 */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/images/company-hero.jpg"
          alt="회사 전경"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">혁신을 만드는 사람들</h1>
          <p className="text-xl mb-8">우리는 더 나은 미래를 위해 기술을 혁신합니다</p>
          <Button variant="secondary" size="lg">자세히 알아보기</Button>
        </div>
      </section>

      {/* 미션 & 비전 섹션 */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">우리의 미션과 비전</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>미션</CardTitle>
              </CardHeader>
              <CardContent>
                <p>기술을 통해 일상을 더 편리하고 안전하게 만듭니다</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>비전</CardTitle>
              </CardHeader>
              <CardContent>
                <p>모든 사람이 쉽고 안전하게 기술의 혜택을 누리는 세상</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">핵심 가치</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>혁신</CardTitle>
              </CardHeader>
              <CardContent>
                <p>끊임없는 도전과 창의적인 사고</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>신뢰</CardTitle>
              </CardHeader>
              <CardContent>
                <p>고객과 파트너와의 굳건한 신뢰 관계</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>성장</CardTitle>
              </CardHeader>
              <CardContent>
                <p>지속적인 학습과 발전</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 연혁 섹션 */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">회사 연혁</h2>
          <Timeline data={[
            {
              title: "2023",
              content: (
                <div>
                  <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                    글로벌 시장 진출: 아시아 및 유럽 시장 확장
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Image
                      src="/images/global-expansion-1.jpg"
                      alt="아시아 시장 진출"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                      src="/images/global-expansion-2.jpg"
                      alt="유럽 시장 진출"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                  </div>
                </div>
              ),
            },
            {
              title: "2020",
              content: (
                <div>
                  <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                    주요 기술 특허 획득: AI 기반 보안 시스템 특허 등록
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <Image
                      src="/images/ai-security-patent.jpg"
                      alt="AI 보안 시스템 특허"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                  </div>
                </div>
              ),
            },
            {
              title: "2015",
              content: (
                <div>
                  <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                    회사 설립: 혁신적인 기술 스타트업으로 시작
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Image
                      src="/images/company-founding-1.jpg"
                      alt="회사 설립 사진 1"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                      src="/images/company-founding-2.jpg"
                      alt="회사 설립 사진 2"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                  </div>
                </div>
              ),
            },
          ]} />
        </div>
      </section>

      {/* 파트너사 로고 클라우드 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">파트너사</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={`/images/partner-logo-${index}.png`}
                  alt={`파트너사 로고 ${index}`}
                  width={150}
                  height={75}
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">함께 미래를 만들어갈 동료를 찾습니다</h2>
          <p className="text-xl mb-8">우리와 함께 혁신적인 기술로 세상을 변화시키고 싶으신가요?</p>
          <Button variant="secondary" size="lg">채용 정보 보기</Button>
        </div>
      </section>
    </div>
  );
}
