import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// This is a utility to help migrate blog posts from Supabase to markdown files

async function migrateSupabaseBlogsToMarkdown() {
  // Initialize Supabase client (this should be run in a script context, not in browser)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch all blog posts from Supabase
  const { data: posts, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts from Supabase:', error);
    return;
  }

  // Create the content directory if it doesn't exist
  const contentDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  // Convert each post to a markdown file
  for (const post of posts) {
    const frontMatter = `---
title: "${post.title}"
summary: "${post.summary}"
category: "${post.category}"
author: "${post.author || '운영자'}"
image_url: "${post.image_url || '/images/placeholder.jpg'}"
created_at: "${post.created_at}"
updated_at: "${post.updated_at || post.created_at}"
is_published: ${post.is_published !== false}
---

${post.content}
`;

    const filePath = path.join(contentDir, `${post.slug}.md`);
    fs.writeFileSync(filePath, frontMatter, 'utf8');
    console.log(`Created markdown file for "${post.title}" at ${filePath}`);
  }

  console.log(`Migration complete. ${posts.length} posts migrated to markdown files.`);
}

// This function can be called from a script
export default migrateSupabaseBlogsToMarkdown; 