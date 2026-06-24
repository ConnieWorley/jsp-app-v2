-- US-S005 Storybank
-- Run order: 004
-- Applied to Supabase: 2026-06-24

create table public.stories (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  title        text not null,
  situation    text not null,
  task         text not null,
  action       text not null,
  result       text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index stories_user_id_idx on public.stories (user_id);

alter table public.stories enable row level security;

create policy "stories_select_own"
  on public.stories for select
  using (auth.uid() = user_id);

create policy "stories_insert_own"
  on public.stories for insert
  with check (auth.uid() = user_id);

create policy "stories_update_own"
  on public.stories for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "stories_delete_own"
  on public.stories for delete
  using (auth.uid() = user_id);
