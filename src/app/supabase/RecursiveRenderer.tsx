// components/RecursiveRenderer.tsx
import React from 'react';

interface RecursiveRendererProps {
  data: any;
  level?: number;
}

const capitalizeWords = (text: string) =>
  text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const RecursiveRenderer: React.FC<RecursiveRendererProps> = ({ data, level = 0 }) => {
  // Array 렌더링
  if (Array.isArray(data)) {
    return (
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-1.5 text-left font-medium text-gray-600" style={{width: '80px'}}>Index</th>
              <th className="px-3 py-1.5 text-left font-medium text-gray-600">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-1.5 text-gray-600">{index}</td>
                <td className="px-3 py-1.5 text-gray-600">
                  <RecursiveRenderer data={item} level={level + 1} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 객체 렌더링
  if (data && typeof data === 'object') {
    return (
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-1.5 text-left font-medium text-gray-600" style={{width: '200px'}}>Key</th>
              <th className="px-3 py-1.5 text-left font-medium text-gray-600">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-1.5 font-medium text-gray-700">
                  {capitalizeWords(key)}
                </td>
                <td className="px-3 py-1.5 text-gray-600">
                  {typeof value === 'object' && value !== null ? (
                    <RecursiveRenderer data={value} level={level + 1} />
                  ) : (
                    String(value)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 기본 값 렌더링
  return <span className="text-gray-600">{String(data)}</span>;
};

export default RecursiveRenderer;
