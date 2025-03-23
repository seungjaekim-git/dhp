import { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import BlogDetailClient from "./BlogDetailClient";

type Props = {
  params: { slug: string };
};

// Generate the static metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "게시물을 찾을 수 없습니다 - 대한플러스전자",
      description: "요청하신 블로그 게시물을 찾을 수 없습니다.",
    };
  }
  
  return {
    title: `${post.title} - 대한플러스전자`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.image_url ? [post.image_url] : undefined,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
    },
  };
}

// Generate all possible static paths at build time
export function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

// This page will be statically generated at build time
export default async function BlogDetailPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  return <BlogDetailClient post={post} />;
} 