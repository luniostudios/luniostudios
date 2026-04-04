import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

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