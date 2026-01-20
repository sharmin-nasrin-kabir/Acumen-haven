-- FINAL EVENTS SCHEMA WITH PROPER RLS AND AUTO-SLUG
-- Run this ONCE in Supabase SQL Editor

-- 1. Ensure all columns exist
DO $$ 
BEGIN
    -- Add status column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'events' AND column_name = 'status'
    ) THEN
        ALTER TABLE public.events ADD COLUMN status text NOT NULL DEFAULT 'Upcoming'::text;
    END IF;
    
    -- Add slug column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'events' AND column_name = 'slug'
    ) THEN
        ALTER TABLE public.events ADD COLUMN slug text;
    END IF;
END $$;

-- 2. Add constraints
ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_status_check;
ALTER TABLE public.events ADD CONSTRAINT events_status_check 
    CHECK (status = ANY (ARRAY['Upcoming'::text, 'Past'::text]));

ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_slug_unique;
ALTER TABLE public.events ADD CONSTRAINT events_slug_unique UNIQUE (slug);

-- 3. Update existing data
UPDATE public.events 
SET status = 'Upcoming' 
WHERE status IS NULL;

UPDATE public.events 
SET is_published = false 
WHERE is_published IS NULL;

-- Update slugs for existing events (only if null)
UPDATE public.events 
SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

-- 4. Auto-slug function (only sets slug if admin didn't provide one)
CREATE OR REPLACE FUNCTION public.handle_event_slug()
RETURNS trigger AS $$
BEGIN
    -- Only auto-generate if slug is empty
    IF NEW.slug IS NULL OR trim(NEW.slug) = '' THEN
        -- Create slug from title
        NEW.slug := lower(regexp_replace(trim(NEW.title), '[^a-zA-Z0-9]+', '-', 'g'));
        NEW.slug := trim(both '-' from NEW.slug);
        
        -- If still empty, use part of ID
        IF NEW.slug = '' THEN
            NEW.slug := substring(NEW.id::text from 1 for 8);
        END IF;
        
        -- Make unique by appending number if needed
        DECLARE
            base_slug text := NEW.slug;
            counter int := 1;
        BEGIN
            WHILE EXISTS (
                SELECT 1 FROM public.events 
                WHERE slug = NEW.slug AND id != NEW.id
            ) LOOP
                NEW.slug := base_slug || '-' || counter;
                counter := counter + 1;
            END LOOP;
        END;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create trigger
DROP TRIGGER IF EXISTS trigger_events_slug ON public.events;
CREATE TRIGGER trigger_events_slug
    BEFORE INSERT OR UPDATE ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_event_slug();

-- 6. RLS Policies (Perfect and Error-Free)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public can view published events
DROP POLICY IF EXISTS "Public can view published events" ON public.events;
CREATE POLICY "Public can view published events"
    ON public.events
    FOR SELECT
    USING (is_published = true);

-- Policy 2: Authenticated admins can view all events (for preview)
DROP POLICY IF EXISTS "Admins can view all events" ON public.events;
CREATE POLICY "Admins can view all events"
    ON public.events
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin
            WHERE admin.id = auth.uid()
        )
    );

-- Policy 3: Admins can insert events
DROP POLICY IF EXISTS "Admins can insert events" ON public.events;
CREATE POLICY "Admins can insert events"
    ON public.events
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin
            WHERE admin.id = auth.uid()
        )
    );

-- Policy 4: Admins can update events
DROP POLICY IF EXISTS "Admins can update events" ON public.events;
CREATE POLICY "Admins can update events"
    ON public.events
    FOR UPDATE
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

-- Policy 5: Admins can delete events
DROP POLICY IF EXISTS "Admins can delete events" ON public.events;
CREATE POLICY "Admins can delete events"
    ON public.events
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin
            WHERE admin.id = auth.uid()
        )
    );

-- 7. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events (slug);
CREATE INDEX IF NOT EXISTS idx_events_chapter ON public.events (chapter);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events (status);
CREATE INDEX IF NOT EXISTS idx_events_is_published ON public.events (is_published);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events (date);
