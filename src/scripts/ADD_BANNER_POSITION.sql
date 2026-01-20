-- Add banner_position column to events table
-- Run this in Supabase SQL Editor

ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS banner_position text DEFAULT 'center center';

-- Update existing events to have default position
UPDATE public.events 
SET banner_position = 'center center' 
WHERE banner_position IS NULL;
