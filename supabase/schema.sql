-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,          -- e.g. 'Academic & Research', 'Technology'
  description text not null,
  image_url text,
  link text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  published boolean default true,
  created_at timestamptz default now()
);

-- Row Level Security -----------------------------------------------------

alter table projects enable row level security;
alter table reviews enable row level security;

-- Anyone (including logged-out visitors) can read.
create policy "Public can read projects"
  on projects for select
  using (true);

create policy "Public can read published reviews"
  on reviews for select
  using (published = true);

-- Only a logged-in (authenticated) user can write. Since this site has a
-- single admin account, "authenticated" effectively means "the admin".
create policy "Authenticated can insert projects"
  on projects for insert
  to authenticated
  with check (true);

create policy "Authenticated can update projects"
  on projects for update
  to authenticated
  using (true);

create policy "Authenticated can delete projects"
  on projects for delete
  to authenticated
  using (true);

create policy "Authenticated can insert reviews"
  on reviews for insert
  to authenticated
  with check (true);

create policy "Authenticated can update reviews"
  on reviews for update
  to authenticated
  using (true);

create policy "Authenticated can delete reviews"
  on reviews for delete
  to authenticated
  using (true);

-- After running this, create your one admin user via:
-- Supabase Dashboard > Authentication > Users > Add user
-- (Do NOT build a public sign-up page for this project.)
