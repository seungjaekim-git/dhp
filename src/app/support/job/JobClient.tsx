"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 채용공고 타입 정의
interface JobPostingProps {
  id: string;
  title: string; 
  department: string;
  location: string;
  type: string;
  experience: string;
  deadline: string;
  description: string;
}

// 더미 채용공고 데이터
const dummyJobs: JobPostingProps[] = [
  {
    id: "1",
    title: "IoT 소프트웨어 개발자",
    department: "IoT사업부",
    location: "서울 강남구",
    type: "정규직",
    experience: "경력 3년 이상",
    deadline: "2024-02-29",
    description: "산업용 IoT 플랫폼 개발 및 유지보수를 담당할 개발자를 모집합니다."
  },
  {
    id: "2", 
    title: "임베디드 시스템 엔지니어",
    department: "R&D센터",
    location: "경기 성남시",
    type: "정규직",
    experience: "신입/경력",
    deadline: "2024-02-25",
    description: "스마트 센서 제품의 펌웨어 개발을 담당할 엔지니어를 모집합니다."
  },
  {
    id: "3",
    title: "제품 기획자(PM)",
    department: "제품기획팀",
    location: "서울 강남구",
    type: "정규직",
    experience: "경력 5년 이상",
    deadline: "2024-03-15",
    description: "산업용 IoT 제품의 기획 및 로드맵 수립을 담당할 PM을 모집합니다."
  }
];

// 채용공고 카드 컴포넌트
const JobCard = ({ job }: { job: JobPostingProps }) => (
  <Card className="w-full hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.department}</p>
        </div>
        <Badge variant="secondary">{job.type}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm mb-4">{job.description}</p>
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        <span>📍 {job.location}</span>
        <span>•</span>
        <span>💼 {job.experience}</span>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">마감일: {job.deadline}</span>
      <Button>지원하기</Button>
    </CardFooter>
  </Card>
);

export default function JobClient() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // 검색 필터링
  const filteredJobs = dummyJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">채용정보</h1>
        <p className="text-muted-foreground">
          대한플러스전자와 함께 성장할 인재를 기다립니다.
        </p>
      </div>

      {/* 검색바 */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="채용공고 검색..."
            className="pl-10"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 채용공고 목록 */}
      <div className="grid gap-6">
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
