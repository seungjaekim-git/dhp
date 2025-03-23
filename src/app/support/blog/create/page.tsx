import { Metadata } from "next";
import { getAllCategories } from "@/lib/blog";
import CreateBlogClient from "./CreateBlogClient";

export const metadata: Metadata = {
  title: "블로그 작성 - 대한플러스전자",
  description: "새로운 블로그 게시글을 작성합니다.",
};

export default function CreateBlogPage() {
  // Get categories at build time
  const categories = getAllCategories();
  
  return <CreateBlogClient initialCategories={categories} />;
} 