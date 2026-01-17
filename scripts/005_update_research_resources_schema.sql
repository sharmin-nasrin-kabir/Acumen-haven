-- Update research table to remove content and featured_image, add pdf_file and paper_link
ALTER TABLE public.research 
DROP COLUMN IF EXISTS content,
DROP COLUMN IF EXISTS featured_image;

ALTER TABLE public.research 
ADD COLUMN IF NOT EXISTS pdf_file text,
ADD COLUMN IF NOT EXISTS paper_link text;

-- Update resources table to remove content, featured_image, and file_url, add pdf_file
ALTER TABLE public.resources 
DROP COLUMN IF EXISTS content,
DROP COLUMN IF EXISTS featured_image,
DROP COLUMN IF EXISTS file_url;

ALTER TABLE public.resources 
ADD COLUMN IF NOT EXISTS pdf_file text;

-- Create function to generate random password
CREATE OR REPLACE FUNCTION generate_random_password(length integer DEFAULT 12)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    result text := '';
    i integer;
BEGIN
    FOR i IN 1..length LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$;
