import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "블로그 - 대한플러스전자",
  description: "대한플러스전자의 최신 제품 소식, 기술 정보, 회사 소식을 확인하세요.",
};

// This function is called at build time to pre-render the page
export default function BlogPage() {
  // Get posts and categories at build time
  const posts = getAllPosts();
  const categories = getAllCategories();
  
  return <BlogClient initialPosts={posts} initialCategories={categories} />;
}
