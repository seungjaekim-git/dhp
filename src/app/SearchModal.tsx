'use client';

import { useEffect, useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Search, ArrowRight } from 'lucide-react';
import { useSearchStore } from '@/store/SearchStore';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';

export function SearchModal() {
  const router = useRouter();
  const { isOpen, searchQuery, setIsOpen, setSearchQuery } = useSearchStore();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('전체');
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    useSearchStore.persist.rehydrate();

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    const updateViewportHeight = () => setViewportHeight(window.innerHeight);

    document.addEventListener('keydown', down);
    window.addEventListener('resize', updateViewportHeight);

    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, [setIsOpen]);

  useEffect(() => {
    const fetchSearchData = async () => {
      // 제품 데이터 가져오기
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) {
        console.error('데이터 가져오기 오류:', productsError);
        return;
      }

      // 임시 제품 카테고리 데이터
      const mockDivisions = [
        { id: 1, name: 'LED Driver IC', description: 'LED 조명 제어를 위한 드라이버 IC' },
        { id: 2, name: 'Power IC', description: '전력 관리 및 변환 IC' },
        { id: 3, name: 'MCU', description: '마이크로컨트롤러 유닛' }
      ];

      // 임시 제조사 데이터
      const mockManufacturers = [
        { id: 1, name: 'Silicon Labs', description: '고성능 반도체 제조사' },
        { id: 2, name: 'Texas Instruments', description: '아날로그 및 임베디드 프로세싱 전문 기업' },
        { id: 3, name: 'STMicroelectronics', description: '유럽 최대의 반도체 제조사' }
      ];

      // 임시 제품 용도 데이터
      const mockApplications = [
        { id: 1, name: '실내조명', description: '가정 및 사무실용 조명 솔루션' },
        { id: 2, name: '자동차 조명', description: '자동차 내/외부 조명 시스템' },
        { id: 3, name: '산업용 조명', description: '공장 및 산업 시설용 조명' }
      ];

      const formattedResults = [
        {
          group: '제품',
          items: products.map((product) => ({
            id: product.id,
            title: product.part_number,
            href: `/products/detail/${product.id}`,
            description: product.name
          }))
        },
        {
          group: '카테고리',
          items: mockDivisions.map((div) => ({
            id: div.id,
            title: div.name,
            href: `/products/${div.name.toLowerCase().replace(/ /g, '-')}`,
            description: div.description
          }))
        },
        {
          group: '제조사',
          items: mockManufacturers.map((mfr) => ({
            id: mfr.id,
            title: mfr.name,
            href: `/partners/${mfr.name.toLowerCase().replace(/ /g, '-')}`,
            description: mfr.description
          }))
        },
        {
          group: '용도',
          items: mockApplications.map((app) => ({
            id: app.id,
            title: app.name,
            href: `/applications/${app.name.toLowerCase().replace(/ /g, '-')}`,
            description: app.description
          }))
        }
      ];

      setSearchResults(formattedResults);
    };

    fetchSearchData();
  }, []);

  const filteredResults = searchResults
    .filter(group => selectedGroup === '전체' || group.group === selectedGroup)
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(group => group.items.length > 0);

  const groupButtons = ['전체', '제품', '카테고리', '제조사', '기술서', '용도'];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="hidden">검색</DialogTitle>
      <DialogContent
        className="max-w-3xl p-0 gap-0 rounded-lg shadow-md min-h-[80vh]"
      >
        <Command className="rounded-lg border shadow-md flex flex-col">
          {/* 검색 입력창 */}
          <div className="flex items-center border-b px-3 py-2">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <CommandInput
              placeholder="제품명, 제조사 등을 검색하세요..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex-grow focus:outline-none"
            />
          </div>

          {/* 그룹 필터 버튼 */}
          <div className="border-b p-2 overflow-x-auto">
            {groupButtons.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  selectedGroup === group
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* 검색 결과 */}
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            {filteredResults.length > 0 ? (
              filteredResults.map((group) => (
                <CommandGroup key={group.group} heading={group.group}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.title}
                      className={`flex items-center justify-between px-4 py-3 hover:bg-accent rounded-md cursor-pointer transition-all duration-200 ${
                        selectedItem === item.id ? 'bg-accent' : ''
                      }`}
                      onSelect={() => {
                        setSelectedItem(item.id);
                        router.push(item.href);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="font-medium">{item.title}</div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              <CommandEmpty>
                <div className="text-center py-6">
                  <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                  <p className="text-sm text-muted-foreground mt-1">다른 검색어로 시도해보세요.</p>
                </div>
              </CommandEmpty>
            )}
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
