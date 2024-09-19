import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { 년도: '2019', 매출: 4000, 순이익: 2400 },
  { 년도: '2020', 매출: 3000, 순이익: 1398 },
  { 년도: '2021', 매출: 5000, 순이익: 3800 },
  { 년도: '2022', 매출: 7000, 순이익: 4300 },
  { 년도: '2023', 매출: 8500, 순이익: 5200 },
];

const BrandOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>브랜드 개요</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            우리 브랜드는 혁신적인 기술과 뛰어난 품질로 전자 부품 시장을 선도하고 있습니다. 
            지속적인 연구 개발과 고객 중심의 서비스로 글로벌 시장에서 높은 평가를 받고 있으며, 
            환경 친화적인 제품 개발에도 힘쓰고 있습니다.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>주요 성과</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="년도" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="매출" fill="#8884d8" />
              <Bar dataKey="순이익" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>주요 제품군</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              <li>LED 드라이버 IC</li>
              <li>전원관리 IC</li>
              <li>센서</li>
              <li>커넥터</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>글로벌 네트워크</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              아시아, 유럽, 북미 등 전 세계 20개국 이상에 판매 네트워크를 구축하고 있으며, 
              현지 기술 지원 센터를 통해 신속하고 효율적인 고객 서비스를 제공하고 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandOverview;




