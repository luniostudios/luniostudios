import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export interface Project {
  id: string;
  image_url: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  github: string;
  demo: string;
  created_at: string;
}