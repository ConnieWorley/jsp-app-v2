-- US-S003 Resume Library
-- Run order: 007
-- Applied to Supabase: 2026-06-26

-- 1) Create the private resumes bucket with file size + MIME type guards.
--    on conflict do nothing makes this safely re-runnable if the bucket already exists.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  5242880,  -- 5 MB
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
) on conflict (id) do nothing;

-- 2) Metadata table — one row per uploaded resume.
--    storage_path is the file's location within the 'resumes' bucket.
--    The 3-per-user cap is enforced client-side (the wizard hides the upload form at 3).
create table public.resumes (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  label             text not null,
  original_filename text not null,
  storage_path      text not null unique,
  file_size_bytes   bigint not null,
  mime_type         text not null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index resumes_user_id_idx on public.resumes(user_id);

-- 3) RLS on the resumes table — owner-only, matches the pattern from previous migrations.
alter table public.resumes enable row level security;

create policy "resumes_select_own"
  on public.resumes for select
  using (auth.uid() = user_id);

create policy "resumes_insert_own"
  on public.resumes for insert
  with check (auth.uid() = user_id);

create policy "resumes_update_own"
  on public.resumes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "resumes_delete_own"
  on public.resumes for delete
  using (auth.uid() = user_id);

-- 4) RLS on storage.objects for this bucket — owner can only touch objects under their own user_id folder.
--    Path scheme: <user_id>/<uuid>.<ext>. (storage.foldername(name))[1] returns the first folder = the user_id.
create policy "resumes_storage_select_own"
  on storage.objects for select
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "resumes_storage_insert_own"
  on storage.objects for insert
  with check (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "resumes_storage_update_own"
  on storage.objects for update
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "resumes_storage_delete_own"
  on storage.objects for delete
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
