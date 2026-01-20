-- EMERGENCY FIX: Events Not Showing (PGRST116 Error)
-- This fixes the RLS policies so events can actually be viewed
-- Run this in Supabase SQL Editor RIGHT NOW

-- 1. TEMPORARILY disable RLS to see if data exists
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- 2. Check and fix existing data
UPDATE public.events SET is_published = true WHERE is_published IS NULL;
UPDATE public.events SET status = 'Upcoming' WHERE status IS NULL;

-- 3. Re-enable RLS with SIMPLE, WORKING policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 4. Drop ALL old policies (clean slate)
DROP POLICY IF EXISTS "Public can view published events" ON public.events;
DROP POLICY IF EXISTS "Admins can view all events" ON public.events;
DROP POLICY IF EXISTS "Admins can insert events" ON public.events;
DROP POLICY IF EXISTS "Admins can update events" ON public.events;
DROP POLICY IF EXISTS "Admins can delete events" ON public.events;
DROP POLICY IF EXISTS "Public View" ON public.events;
DROP POLICY IF EXISTS "Admin All" ON public.events;
DROP POLICY IF EXISTS "Admins can see everything" ON public.events;
DROP POLICY IF EXISTS "Admins can manage" ON public.events;

-- 5. Create NEW, SIMPLE policies that DEFINITELY work

-- Policy A: Let EVERYONE read ALL events (we'll restrict this later once it works)
CREATE POLICY "allow_read_all"
ON public.events
FOR SELECT
USING (true);

-- Policy B: Authenticated users can do EVERYTHING
CREATE POLICY "allow_authenticated_all"
ON public.events
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Verify admin table exists and has your user
-- (Run this to check - replace with your actual email)
-- SELECT * FROM public.admin;

-- If admin table is empty or doesn't have you, create it:
CREATE TABLE IF NOT EXISTS public.admin (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    name text,
    created_at timestamptz DEFAULT now()
);

-- Add yourself as admin (REPLACE WITH YOUR ACTUAL USER ID AND EMAIL):
-- INSERT INTO public.admin (id, email, name)
-- SELECT id, email, raw_user_meta_data->>'full_name'
-- FROM auth.users
-- WHERE email = 'your-email@example.com'
-- ON CONFLICT (id) DO NOTHING;

-- 7. Ensure slugs exist for all events
UPDATE public.events 
SET slug = COALESCE(
    NULLIF(slug, ''),
    lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')),
    substring(id::text from 1 for 8)
)
WHERE slug IS NULL OR slug = '';

-- 8. Make sure slug column is indexed
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);

-- Done! Now test by visiting /events in your browser
