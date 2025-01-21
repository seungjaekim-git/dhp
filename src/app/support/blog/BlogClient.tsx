"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlogCard, { BlogCardProps } from "./BlogCard";

// 검색 컴포넌트
const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
    <Input
      type="text"
      placeholder="블로그 검색..."
      className="pl-10"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

// 카테고리 필터 컴포넌트
const CategoryFilter = ({ onCategoryChange }: { onCategoryChange: (category: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState("전체");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// 페이지네이션 컴포넌트
const Pagination = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center gap-2">
    <Button
      variant="outline"
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
    >
      이전
    </Button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <Button
        key={page}
        variant={currentPage === page ? "default" : "outline"}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Button>
    ))}
    <Button
      variant="outline"
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      다음
    </Button>
  </div>
);

export default function BlogClient({ blogs }: { blogs: BlogCardProps[] }) {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = (query: string) => {
    const filtered = blogs.filter(blog => 
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    const filtered = blogs.filter(blog => 
      category === "전체" || blog.category === category
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export const categories = ["전체", "제품소식", "기술블로그", "시장분석", "기술가이드", "이벤트", "회사소식"];
