import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define the type for our blog post
export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  html: string; // Rendered HTML content
  category: string;
  author: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Get the slugs of all available posts
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return fileName.replace(/\.md$/, '');
  });
}

// Get all categories from the posts
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categoriesSet = new Set<string>();
  
  posts.forEach(post => {
    if (post.category) {
      categoriesSet.add(post.category);
    }
  });
  
  return Array.from(categoriesSet);
}

// Generate a slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-6);
}

// Get all posts
export function getAllPosts(): BlogPost[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Convert the content to HTML
    const processedContent = remark()
      .use(html)
      .processSync(matterResult.content)
      .toString();

    // Combine the data with the slug
    return {
      slug,
      html: processedContent,
      content: matterResult.content,
      ...(matterResult.data as Omit<BlogPost, 'slug' | 'content' | 'html'>)
    };
  });

  // Sort posts by date
  return allPostsData
    .filter(post => post.is_published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Convert the content to HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Return the post data
    return {
      slug,
      html: contentHtml,
      content: matterResult.content,
      ...(matterResult.data as Omit<BlogPost, 'slug' | 'content' | 'html'>)
    };
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    return null;
  }
}

// Save a new post
export function savePost(post: Omit<BlogPost, 'id' | 'contentHtml'>): boolean {
  try {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    const fullPath = path.join(postsDirectory, `${post.slug}.md`);
    
    // Prepare the front matter
    const data = {
      title: post.title,
      summary: post.summary,
      category: post.category,
      image_url: post.image_url,
      author: post.author,
      created_at: post.created_at,
      updated_at: post.updated_at,
      is_published: post.is_published
    };
    
    // Create the markdown content with front matter
    const content = matter.stringify(post.content, data);
    
    // Write the file
    fs.writeFileSync(fullPath, content);
    
    return true;
  } catch (error) {
    console.error('Error saving post:', error);
    return false;
  }
} 