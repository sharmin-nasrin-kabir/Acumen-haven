-- Create profiles table for user management with roles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  first_name text,
  last_name text,
  role text default 'user' check (role in ('user', 'admin', 'super_admin')),
  auto_approve_blogs boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS policies for profiles
create policy "profiles_select_own" on public.profiles 
  for select using (auth.uid() = id);

create policy "admin_select_all_profiles" on public.profiles 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

create policy "profiles_insert_own" on public.profiles 
  for insert with check (auth.uid() = id);

create policy "admin_update_profiles" on public.profiles 
  for update using (
    auth.uid() = id or 
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

create policy "super_admin_delete_profiles" on public.profiles 
  for delete using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Create blogs table
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  excerpt text,
  featured_image text,
  author_id uuid not null references public.profiles(id) on delete cascade,
  status text default 'draft' check (status in ('draft', 'pending', 'approved', 'rejected')),
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for blogs
alter table public.blogs enable row level security;

-- RLS policies for blogs
create policy "blogs_select_published" on public.blogs 
  for select using (status = 'approved');

create policy "author_select_own_blogs" on public.blogs 
  for select using (author_id = auth.uid());

create policy "admin_select_all_blogs" on public.blogs 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

create policy "author_insert_blogs" on public.blogs 
  for insert with check (author_id = auth.uid());

create policy "author_update_own_blogs" on public.blogs 
  for update using (author_id = auth.uid());

create policy "admin_update_all_blogs" on public.blogs 
  for update using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

create policy "admin_delete_blogs" on public.blogs 
  for delete using (
    author_id = auth.uid() or
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

-- Create resources table
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text,
  category text,
  featured_image text,
  file_url text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for resources
alter table public.resources enable row level security;

-- RLS policies for resources
create policy "resources_select_published" on public.resources 
  for select using (is_published = true);

create policy "admin_manage_resources" on public.resources 
  for all using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

-- Create research table
create table if not exists public.research (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text,
  category text,
  featured_image text,
  publication_date date,
  authors text[],
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for research
alter table public.research enable row level security;

-- RLS policies for research
create policy "research_select_published" on public.research 
  for select using (is_published = true);

create policy "admin_manage_research" on public.research 
  for all using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

-- Create contact submissions table
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'responded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for contact submissions
alter table public.contact_submissions enable row level security;

-- RLS policies for contact submissions
create policy "admin_manage_contact_submissions" on public.contact_submissions 
  for all using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

-- Create function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', null),
    coalesce(new.raw_user_meta_data ->> 'last_name', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Create trigger for new user registration
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create triggers for updated_at
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger blogs_updated_at before update on public.blogs
  for each row execute function public.handle_updated_at();

create trigger resources_updated_at before update on public.resources
  for each row execute function public.handle_updated_at();

create trigger research_updated_at before update on public.research
  for each row execute function public.handle_updated_at();
