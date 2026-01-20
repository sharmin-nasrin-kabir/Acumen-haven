-- Events Schema with Auto-Slug Generation and Admin Preview
-- This script sets up the events table with automatic unique slug generation
-- IT IS DESIGNED TO BE RUN MULTIPLE TIMES SAFELY.

-- 1. Create the events table if it doesn't exist
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
  slug text NULL UNIQUE, -- Make slug unique to prevent conflicts
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'Upcoming'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_chapter_check CHECK (chapter = ANY (ARRAY['US'::text, 'Bangladesh'::text])),
  CONSTRAINT events_status_check CHECK (status = ANY (ARRAY['Upcoming'::text, 'Past'::text]))
) TABLESPACE pg_default;

-- 1.1 Ensure all columns exist (in case table already existed but was missing columns)
DO $$
BEGIN
    -- Add status if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='status') THEN
        ALTER TABLE public.events ADD COLUMN status text NOT NULL DEFAULT 'Upcoming'::text;
        ALTER TABLE public.events ADD CONSTRAINT events_status_check CHECK (status = ANY (ARRAY['Upcoming'::text, 'Past'::text]));
    END IF;
    -- Add youtube_url if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='youtube_url') THEN
        ALTER TABLE public.events ADD COLUMN youtube_url text NULL;
    END IF;
    
    -- Add gallery_images if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='gallery_images') THEN
        ALTER TABLE public.events ADD COLUMN gallery_images text[] NULL DEFAULT '{}'::text[];
    END IF;

    -- Add slug if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='slug') THEN
        ALTER TABLE public.events ADD COLUMN slug text NULL;
    END IF;
END $$;

-- 1.2 Add unique constraint to slug if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'events_slug_unique'
    ) THEN
        ALTER TABLE public.events ADD CONSTRAINT events_slug_unique UNIQUE (slug);
    END IF;
END $$;

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_events_chapter ON public.events USING btree (chapter) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_events_is_published ON public.events USING btree (is_published) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events USING btree (slug) TABLESPACE pg_default;

-- 2. Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Public can view published events
DROP POLICY IF EXISTS "Public can view published events" ON public.events;
CREATE POLICY "Public can view published events" 
ON public.events FOR SELECT 
USING (is_published = true);

-- Admins can view ALL events (including unpublished for preview)
DROP POLICY IF EXISTS "Admins can view all events" ON public.events;
CREATE POLICY "Admins can view all events" 
ON public.events FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin 
    WHERE admin.id = auth.uid()
  )
);

-- Admins can manage events (INSERT, UPDATE, DELETE)
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

-- 4. Function to generate unique slug from title
CREATE OR REPLACE FUNCTION public.generate_unique_slug(p_title text, p_id uuid)
RETURNS text AS $$
DECLARE
    v_slug text;
    v_base_slug text;
    v_counter integer := 0;
    v_max_attempts integer := 100;
BEGIN
    -- Generate base slug from title
    v_base_slug := regexp_replace(lower(trim(p_title)), '[^a-z0-9\s-]', '', 'g');
    v_base_slug := regexp_replace(v_base_slug, '\s+', '-', 'g');
    v_base_slug := regexp_replace(v_base_slug, '-+', '-', 'g');
    v_base_slug := trim(both '-' from v_base_slug);
    
    -- If slug is empty or too short, use UUID
    IF v_base_slug IS NULL OR length(v_base_slug) < 3 THEN
        RETURN substring(p_id::text from 1 for 8);
    END IF;
    
    -- Limit slug length to avoid overly long URLs
    v_base_slug := substring(v_base_slug from 1 for 50);
    v_slug := v_base_slug;
    
    -- Check for uniqueness and add counter if needed
    WHILE EXISTS (SELECT 1 FROM public.events WHERE slug = v_slug AND id != p_id) AND v_counter < v_max_attempts LOOP
        v_counter := v_counter + 1;
        v_slug := v_base_slug || '-' || v_counter;
    END LOOP;
    
    -- If still not unique after max attempts, append part of UUID
    IF EXISTS (SELECT 1 FROM public.events WHERE slug = v_slug AND id != p_id) THEN
        v_slug := v_base_slug || '-' || substring(p_id::text from 1 for 8);
    END IF;
    
    RETURN v_slug;
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger function to auto-generate slug before insert/update
CREATE OR REPLACE FUNCTION public.handle_event_slug()
RETURNS trigger AS $$
BEGIN
    -- Only generate slug if it's NULL or empty
    IF NEW.slug IS NULL OR trim(NEW.slug) = '' THEN
        NEW.slug := public.generate_unique_slug(NEW.title, NEW.id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Function for updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create triggers
DROP TRIGGER IF EXISTS trigger_events_slug ON public.events;
CREATE TRIGGER trigger_events_slug
BEFORE INSERT OR UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.handle_event_slug();

DROP TRIGGER IF EXISTS trigger_events_updated_at ON public.events;
CREATE TRIGGER trigger_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 8. Update existing events with NULL slugs
UPDATE public.events 
SET slug = public.generate_unique_slug(title, id)
WHERE slug IS NULL OR trim(slug) = '';
