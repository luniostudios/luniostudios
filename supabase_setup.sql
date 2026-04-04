-- Create projects table for LUNIO Studios
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  github TEXT,
  demo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);