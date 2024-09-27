import { Partner } from '../types/partner'; // Partner 타입 정의가 필요합니다

export async function getpartnersList(): Promise<Partner[]> {
  try {
    const response = await fetch('/api/partners');
    
    if (!response.ok) {
      throw new Error('파트너 목록을 가져오는데 실패했습니다');
    }

    const data: Partner[] = await response.json();
    return data;
  } catch (error) {
    console.error('파트너 목록 조회 중 오류 발생:', error);
    throw error;
  }
}

