-- Admin Management Schema
-- This script sets up a dedicated table for administrative users.

-- 1. Create the admin table
CREATE TABLE IF NOT EXISTS public.admin (
  id uuid NOT NULL,
  email text NOT NULL,
  full_name text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT admin_pkey PRIMARY KEY (id),
  CONSTRAINT admin_email_key UNIQUE (email),
  CONSTRAINT admin_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_admin_email ON public.admin USING btree (email) TABLESPACE pg_default;

-- 2. Enable Row Level Security
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Admins can view their own data
CREATE POLICY "Admins can view their own data" 
ON public.admin FOR SELECT 
USING (auth.uid() = id);

-- 4. Function to sync email from auth.users to admin table if a user is added to admin
-- This is optional but helpful if you manually add IDs to the admin table
CREATE OR REPLACE FUNCTION public.handle_admin_sync()
RETURNS trigger AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    -- When a new ID is added to the admin table, ensure we pull the email from auth.users
    UPDATE public.admin
    SET email = (SELECT email FROM auth.users WHERE id = NEW.id)
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. INITIAL SETUP INSTRUCTIONS
-- To grant admin access to a specific email:
-- STEP 1: Create the user in Supabase Auth (via Dashboard > Auth > Users > Add User)
-- STEP 2: Get the ID of that user from the Auth table.
-- STEP 3: Run the following SQL (Replace 'USER_ID_HERE' with the actual UUID):

-- INSERT INTO public.admin (id, email) 
-- VALUES ('USER_ID_HERE', 'acumenhaven2025@gmail.com');

-- Password Management:
-- Password changes should be handled via Supabase Auth API (auth.updateUser).
-- The admin panel will call this API to update the security credentials.
