-- Add Contact Information and Social Media to Events
-- Run this in Supabase SQL Editor

-- Add contact email and social media columns
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS social_facebook text,
ADD COLUMN IF NOT EXISTS social_twitter text,
ADD COLUMN IF NOT EXISTS social_instagram text,
ADD COLUMN IF NOT EXISTS social_linkedin text;

-- Set default contact emails based on chapter
UPDATE public.events 
SET contact_email = CASE 
    WHEN chapter = 'US' THEN 'us@acumenhaven.org'
    WHEN chapter = 'Bangladesh' THEN 'bangladesh@acumenhaven.org'
    ELSE 'info@acumenhaven.org'
END
WHERE contact_email IS NULL;
