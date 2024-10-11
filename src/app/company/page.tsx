"use client"
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timeline } from "./timeline";

export default function CompanyPage() {
  return (
    <main className="flex-1">
      {/* CEO 인사말 섹션 */}
      <section id="section-1" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">CEO 인사말</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image
              src="/images/ceo.jpg"
              alt="CEO 사진"
              width={300}
              height={300}
              className="rounded-full mb-8 md:mb-0 md:mr-8"
            />
            <div>
              <p className="text-lg mb-4">
                안녕하세요. 저희 회사를 방문해 주신 여러분께 진심으로 감사드립니다. 저희는 고객 여러분의 필요와 기대에 부응하는 고품질 전자 부품을 제공하기 위해 최선을 다하고 있습니다. 끊임없는 혁신과 도전을 통해 전자 부품 산업의 선두 주자로 자리매김하고 있으며, 항상 고객의 목소리에 귀 기울여 여러분의 성공적인 비즈니스를 지원하고 있습니다.
              </p>
              <p className="text-right font-bold">대표이사 김영구</p>
            </div>
          </div>
        </div>
      </section>

      {/* 미션 & 비전 & 핵심 가치 섹션 */}
      <section id="section-2" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">미션 & 비전 & 핵심 가치</h2>
          <div className="grid md:grid-cols-3 gap-8">
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
            <Card>
              <CardHeader>
                <CardTitle>핵심 가치</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  <li>혁신: 끊임없는 도전과 창의적인 사고</li>
                  <li>신뢰: 고객과 파트너와의 굳건한 신뢰 관계</li>
                  <li>성장: 지속적인 학습과 발전</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 회사 연혁 섹션 */}
      <section id="section-3" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">회사 연혁</h2>
          <Timeline />
        </div>
      </section>

      {/* 사업 영역과 파트너사 섹션 */}
      <section id="section-4" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">사업 영역과 파트너사</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">사업 영역</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>전자 부품 제조</li>
                <li>IoT 솔루션 개발</li>
                <li>AI 기반 보안 시스템</li>
                <li>스마트 홈 기기 생산</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">주요 파트너사</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="flex items-center justify-center bg-white p-4 rounded-lg shadow">
                    <Image
                      src={`/images/partner-logo-${index}.png`}
                      alt={`파트너사 로고 ${index}`}
                      width={100}
                      height={50}
                      objectFit="contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
