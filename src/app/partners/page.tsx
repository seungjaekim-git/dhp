import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const PartnersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 파트너 소개 문구 */}
      <h1 className="text-3xl font-bold mb-6 text-center">우리의 소중한 파트너사</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        혁신과 성장을 함께 이뤄나가는 파트너들을 소개합니다.
      </p>

      {/* 뉴스 캐러셀 */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>파트너사 최신 소식</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {/* 여기에 실제 뉴스 아이템을 추가하세요 */}
              <CarouselItem>뉴스 아이템 1</CarouselItem>
              <CarouselItem>뉴스 아이템 2</CarouselItem>
              <CarouselItem>뉴스 아이템 3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>

      {/* 파트너사 목록 */}
      <h2 className="text-2xl font-semibold mb-6">파트너사 목록</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 파트너사 카드 예시 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                {/* 아이콘 */}
              </div>
              파트너사 이름
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">파트너사에 대한 간단한 설명입니다.</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>설립연도: 2010년</span>
              <span>직원 수: 100+</span>
            </div>
          </CardContent>
        </Card>
        {/* 추가 파트너사 카드들... */}
      </div>
    </div>
  );
};

export default PartnersPage;