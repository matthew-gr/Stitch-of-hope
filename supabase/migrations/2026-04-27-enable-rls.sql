-- One-time migration: enable Row-Level Security on the three public tables.
-- Run this once in Supabase → SQL Editor on your existing project.
-- After running, the Supabase dashboard "rls_disabled_in_public" warning clears.
--
-- Why this is safe for our app:
--   The Next.js server uses the service_role key, which bypasses RLS.
--   We never call Supabase from the browser, so locking down anon access
--   has no effect on the live site.

alter table site_content enable row level security;
alter table products       enable row level security;
alter table submissions    enable row level security;

-- Sanity check (optional) — should return all three with rowsecurity = true:
-- select schemaname, tablename, rowsecurity
-- from pg_tables
-- where schemaname = 'public'
--   and tablename in ('site_content', 'products', 'submissions');
