export interface BlogPost {
  id: number;
  title: string;
  content: string;
  contentHtml?: string; // HTML content processed from markdown
  summary: string;
  image_url: string;
  category: string;
  author: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  slug: string;
}

export interface BlogCardProps {
  post: BlogPost;
} 