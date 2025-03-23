import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a singleton Supabase client
let client: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (client) return client;

  // Fall back to public URL and anon key
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-public-anon-key';

  client = createSupabaseClient(supabaseUrl, supabaseKey);
  return client;
} 