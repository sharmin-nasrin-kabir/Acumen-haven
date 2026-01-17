-- Fix events table to match frontend expectations
-- This script aligns the database schema with the frontend interface

-- Add missing gallery_images field
ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery_images text[];

-- Rename image_url to banner_image to match frontend expectations
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'image_url') THEN
        ALTER TABLE events RENAME COLUMN image_url TO banner_image;
    END IF;
END $$;

-- Change date field from TIMESTAMP to DATE and add separate time field handling
-- First, let's ensure we have the right structure
ALTER TABLE events ALTER COLUMN date TYPE date USING date::date;

-- Update existing sample data to ensure consistency
UPDATE events SET 
    banner_image = COALESCE(banner_image, 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg'),
    gallery_images = ARRAY[]::text[]
WHERE gallery_images IS NULL;

-- Add RLS policies for events table to match other tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published events
CREATE POLICY "events_select_published" ON events 
  FOR SELECT USING (is_published = true);

-- Allow admins to manage all events
CREATE POLICY "admin_manage_events" ON events 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Create updated_at trigger for events
CREATE TRIGGER events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_events_chapter_date ON events(chapter, date);
