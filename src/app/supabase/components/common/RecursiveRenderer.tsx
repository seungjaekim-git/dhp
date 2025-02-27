import React from 'react';

interface RecursiveRendererProps {
  data: any;
  level?: number;
  maxDepth?: number;  // 최대 렌더링 깊이 추가
}

const capitalizeWords = (text: string) =>
  text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const RecursiveRenderer: React.FC<RecursiveRendererProps> = ({ 
  data, 
  level = 0,
  maxDepth = 5  // 무한루프 방지를 위한 최대 깊이 설정
}) => {
  // 너무 깊은 중첩 방지
  if (level >= maxDepth) {
    return <span className="text-yellow-500">데이터 깊이가 너무 깊습니다</span>;
  }
  
  // ... existing code ...
}

export default RecursiveRenderer; 