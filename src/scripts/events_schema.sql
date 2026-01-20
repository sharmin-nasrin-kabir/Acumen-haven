-- Events Schema
-- This script sets up the events table and associated RLS policies.

-- 1. Create the events table
CREATE TABLE IF NOT EXISTS public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NULL,
  date date NOT NULL,
  time text NULL,
  location text NULL,
  chapter text NOT NULL DEFAULT 'Bangladesh'::text,
  category text NULL,
  banner_image text NULL,
  gallery_images text[] NULL DEFAULT '{}'::text[],
  registration_link text NULL,
  youtube_url text NULL,
  slug text NULL,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_chapter_check CHECK (chapter = ANY (ARRAY['US'::text, 'Bangladesh'::text]))
) TABLESPACE pg_default;

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_events_chapter ON public.events USING btree (chapter) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_events_is_published ON public.events USING btree (is_published) TABLESPACE pg_default;

-- 2. Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Use DO block to create policies only if they don't exist, or drop them first.
-- Dropping first is cleaner for updates.

DROP POLICY IF EXISTS "Public can view published events" ON public.events;
CREATE POLICY "Public can view published events" 
ON public.events FOR SELECT 
USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
CREATE POLICY "Admins can manage events" 
ON public.events FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin 
    WHERE admin.id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin 
    WHERE admin.id = auth.uid()
  )
);

-- 4. Functon and Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_events_updated_at ON public.events;
CREATE TRIGGER trigger_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
