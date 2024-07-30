import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select } from "@/components/ui/select"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4">
          <img src="/logo.svg" alt="Company Logo" className="h-8" />
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">제품</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">파트너사</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">회사 소개</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">뉴스</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">지원</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="검색..." className="w-64" />
            <Select>
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        <section className="mb-16">
          <div className="relative h-96 bg-blue-600 rounded-lg overflow-hidden">
            <img src="/banner-image.jpg" alt="Banner" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">최신 전자 부품 솔루션</h1>
                <Button variant="secondary" size="lg">자세히 보기</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">제품 카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['LED Driver IC', '다이오드', '전원 관리 IC', '센서', '케이블', '자동차 인증 전자부품'].map((category) => (
              <Card key={category} className="p-4 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-700">{category}</h3>
              </Card>
            ))}
          </div>
        </section>


        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">추천 제품</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((product) => (
              <Card key={product} className="overflow-hidden">
                <img src={`/product-${product}.jpg`} alt={`Product ${product}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">제품 이름</h3>
                  <p className="text-gray-600 text-sm">간단한 제품 설명이 들어갑니다.</p>
                  <Button className="mt-4 w-full">자세히 보기</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">파트너사</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3, 4, 5, 6].map((partner) => (
              <img key={partner} src={`/partner-${partner}.svg`} alt={`Partner ${partner}`} className="h-12" />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">회사 소개</h2>
            <p className="text-gray-600 mb-4">우리 회사는 최고 품질의 전자 부품을 제공하는 글로벌 리더입니다. 혁신적인 기술과 신뢰할 수 있는 서비스로 고객의 성공을 지원합니다.</p>
            <Button variant="outline">더 알아보기</Button>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">뉴스 및 이벤트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((news) => (
              <Card key={news} className="overflow-hidden">
                <img src={`/news-${news}.jpg`} alt={`News ${news}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">뉴스 제목</h3>
                  <p className="text-gray-600 text-sm">뉴스 내용의 요약이 들어갑니다.</p>
                  <Button variant="link" className="mt-2">자세히 보기</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <p>주소: 서울시 강남구 테헤란로 123</p>
            <p>전화: 02-1234-5678</p>
            <p>이메일: info@company.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">소셜 미디어</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">LinkedIn</a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">사이트맵</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">제품</a></li>
              <li><a href="#" className="hover:text-blue-400">파트너사</a></li>
              <li><a href="#" className="hover:text-blue-400">회사 소개</a></li>
              <li><a href="#" className="hover:text-blue-400">뉴스</a></li>
              <li><a href="#" className="hover:text-blue-400">지원</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">법적 고지</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">개인정보 처리방침</a></li>
              <li><a href="#" className="hover:text-blue-400">이용약관</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}