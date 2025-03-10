/**
 * 값이 존재하는지 확인하는 유틸리티 함수
 */
export const hasValue = (value: any) => value !== null && value !== undefined;

/**
 * 값 범위를 포맷팅하는 유틸리티 함수
 */
export const formatValue = (min: any, max: any, typ: any, unit: string = "") => {
  if (hasValue(typ)) return `${typ} ${unit}`.trim();
  if (hasValue(min) && hasValue(max)) return `${min} ~ ${max} ${unit}`.trim();
  if (hasValue(min)) return `최소 ${min} ${unit}`.trim();
  if (hasValue(max)) return `최대 ${max} ${unit}`.trim();
  return null;
};

/**
 * 날짜 포맷팅 유틸리티 함수
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * 카테고리별 한글명 매핑
 */
export const categoryKoreanMap = {
  news_event: '뉴스/이벤트',
  notice: '공지사항',
  tech_blog: '기술 블로그',
  discontinued: '단종 안내',
  product_launch: '신제품 출시'
};

/**
 * 카테고리별 색상 매핑
 */
export const categoryColorMap = {
  news_event: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800',
  notice: 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800',
  tech_blog: 'bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800',
  discontinued: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800',
  product_launch: 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800'
}; 