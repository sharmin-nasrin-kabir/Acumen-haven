-- CMS Database Schema for Acumen Haven
-- This script sets up tables to manage home page and global site content via the admin panel.

-- 1. Site Settings (Key-Value for simple texts/flags)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Hero Slides
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image text NOT NULL,
  title text NOT NULL,
  link text NOT NULL,
  alt text,
  color_class text DEFAULT 'from-emerald-500 to-emerald-600',
  bg_color_class text DEFAULT 'bg-emerald-500',
  order_index int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Impact Stats (Making a Real Difference)
CREATE TABLE IF NOT EXISTS public.impact_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL, -- e.g. "200+"
  label text NOT NULL,  -- e.g. "Teachers Trained"
  description text NOT NULL,
  order_index int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- 4. SDG Alignment
CREATE TABLE IF NOT EXISTS public.sdg_alignment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sdg_number text NOT NULL, -- e.g. "13"
  title text NOT NULL,
  description text NOT NULL,
  icon_name text, -- lucide icon name
  order_index int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- 5. Voices of Change (Testimonials)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  image text,
  order_index int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- 6. Footer & Navigation Links
CREATE TABLE IF NOT EXISTS public.site_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL, -- 'header', 'quick_links', 'programs', 'legal'
  label text NOT NULL,
  href text NOT NULL,
  order_index int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS for all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sdg_alignment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_links ENABLE ROW LEVEL SECURITY;

-- Public SELECT policies (ISR/SSR capability)
DO $$ 
BEGIN
  -- site_settings
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select site_settings') THEN
    CREATE POLICY "Public select site_settings" ON public.site_settings FOR SELECT USING (true);
  END IF;
  
  -- hero_slides
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select hero_slides') THEN
    CREATE POLICY "Public select hero_slides" ON public.hero_slides FOR SELECT USING (true);
  END IF;

  -- impact_stats
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select impact_stats') THEN
    CREATE POLICY "Public select impact_stats" ON public.impact_stats FOR SELECT USING (true);
  END IF;

  -- sdg_alignment
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select sdg_alignment') THEN
    CREATE POLICY "Public select sdg_alignment" ON public.sdg_alignment FOR SELECT USING (true);
  END IF;

  -- testimonials
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select testimonials') THEN
    CREATE POLICY "Public select testimonials" ON public.testimonials FOR SELECT USING (true);
  END IF;

  -- site_links
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select site_links') THEN
    CREATE POLICY "Public select site_links" ON public.site_links FOR SELECT USING (true);
  END IF;
END $$;

-- Admin-only modification policies (using the 'admin' table we created earlier)
-- Note: auth.uid() must exist in public.admin table

DO $$ 
DECLARE
  tables text[] := ARRAY['site_settings', 'hero_slides', 'impact_stats', 'sdg_alignment', 'testimonials', 'site_links'];
  t text;
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Admin full access %I" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "Admin full access %I" ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM public.admin WHERE id = auth.uid()))', t, t);
  END LOOP;
END $$;

-- 7. INITIAL DATA SEED (Optional but helpful to start with current content)
-- Top Bar Info
INSERT INTO public.site_settings (key, value) VALUES 
('top_bar', '{"email": "contact@acumenhaven.com", "status": "501(c)(3) Status: Applied", "slogan": "Youth-led. Climate-focused. Impact-driven."}')
ON CONFLICT (key) DO NOTHING;

-- Hero Slides
INSERT INTO public.hero_slides (title, link, image, color_class, bg_color_class, order_index) VALUES
('Transport & Mobility', '/programs/transport-mobility', '/hero-transport-mobility.png', 'from-blue-500 to-blue-600', 'bg-blue-500', 1),
('Education & Youth Empowerment', '/programs/education-empowerment', '/hero-education-youth.png', 'from-emerald-500 to-emerald-600', 'bg-emerald-500', 2)
ON CONFLICT DO NOTHING;
