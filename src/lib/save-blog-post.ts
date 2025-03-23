import fs from 'fs';
import path from 'path';
import { BlogPost } from './blog';
import 'server-only';

// This is a server-side utility to save blog posts as markdown files
// It can be used in Next.js server actions

export async function saveBlogPost(post: Omit<BlogPost, 'html'>): Promise<{ success: boolean; slug: string; error?: string }> {
  try {
    const contentDir = path.join(process.cwd(), 'content/blog');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    // Generate frontmatter
    const frontMatter = `---
title: "${post.title}"
summary: "${post.summary}"
category: "${post.category}"
author: "${post.author || '운영자'}"
image_url: "${post.image_url}"
created_at: "${post.created_at}"
updated_at: "${post.updated_at}"
is_published: ${post.is_published}
---

${post.content}
`;

    // Save to file
    const filePath = path.join(contentDir, `${post.slug}.md`);
    fs.writeFileSync(filePath, frontMatter, 'utf8');
    
    return { success: true, slug: post.slug };
  } catch (error) {
    console.error('Error saving blog post:', error);
    return { 
      success: false, 
      slug: post.slug,
      error: error instanceof Error ? error.message : 'Unknown error saving blog post' 
    };
  }
} 