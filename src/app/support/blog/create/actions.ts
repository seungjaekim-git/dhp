'use server';

import { revalidatePath } from 'next/cache';
import { BlogPost } from '@/lib/blog';
import { saveBlogPost } from '@/lib/save-blog-post';

export async function createBlogPostAction(formData: FormData): Promise<{ success: boolean; slug?: string; error?: string }> {
  try {
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const isPublishedStr = formData.get('isPublished') as string;
    const isPublished = isPublishedStr === 'true';
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-6);
    
    const timestamp = new Date().toISOString();
    
    const post: Omit<BlogPost, 'html'> = {
      slug,
      title,
      summary,
      content,
      category,
      author: '운영자',
      image_url: imageUrl || '/images/news-1.jpg',
      created_at: timestamp,
      updated_at: timestamp,
      is_published: isPublished
    };
    
    const result = await saveBlogPost(post);
    
    if (result.success) {
      // Revalidate the blog page to reflect the new post
      revalidatePath('/support/blog');
      return { success: true, slug: result.slug };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error creating blog post' 
    };
  }
} 