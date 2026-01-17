-- Add slug fields to blogs and events tables for SEO-friendly URLs

-- Add slug field to blogs table
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS slug text;

-- Add slug field to events table  
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS slug text;

-- Create unique indexes for slugs
CREATE UNIQUE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title text)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$;

-- Update existing blogs with slugs
UPDATE public.blogs 
SET slug = generate_slug(title) || '-' || substring(id::text, 1, 8)
WHERE slug IS NULL;

-- Update existing events with slugs
UPDATE public.events 
SET slug = generate_slug(title) || '-' || substring(id::text, 1, 8)
WHERE slug IS NULL;

-- Function to auto-generate slug on insert/update for blogs
CREATE OR REPLACE FUNCTION auto_generate_blog_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title) || '-' || substring(NEW.id::text, 1, 8);
  END IF;
  
  -- Ensure slug uniqueness
  WHILE EXISTS (SELECT 1 FROM public.blogs WHERE slug = NEW.slug AND id != NEW.id) LOOP
    NEW.slug := NEW.slug || '-' || floor(random() * 1000)::text;
  END LOOP;
  
  RETURN NEW;
END;
$$;

-- Function to auto-generate slug on insert/update for events
CREATE OR REPLACE FUNCTION auto_generate_event_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title) || '-' || substring(NEW.id::text, 1, 8);
  END IF;
  
  -- Ensure slug uniqueness
  WHILE EXISTS (SELECT 1 FROM public.events WHERE slug = NEW.slug AND id != NEW.id) LOOP
    NEW.slug := NEW.slug || '-' || floor(random() * 1000)::text;
  END LOOP;
  
  RETURN NEW;
END;
$$;

-- Create triggers for auto-generating slugs
DROP TRIGGER IF EXISTS blogs_auto_slug ON public.blogs;
CREATE TRIGGER blogs_auto_slug
  BEFORE INSERT OR UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_blog_slug();

DROP TRIGGER IF EXISTS events_auto_slug ON public.events;
CREATE TRIGGER events_auto_slug
  BEFORE INSERT OR UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_event_slug();
