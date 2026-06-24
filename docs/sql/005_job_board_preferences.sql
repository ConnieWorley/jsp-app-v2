-- US-S006 Job Board Preferences
-- Run order: 005
-- Applied to Supabase: 2026-06-24

create table public.job_board_preferences (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  standard_boards  text[] not null default '{}',
  custom_boards    jsonb not null default '[]'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.job_board_preferences enable row level security;

create policy "job_board_preferences_select_own"
  on public.job_board_preferences for select
  using (auth.uid() = user_id);

create policy "job_board_preferences_insert_own"
  on public.job_board_preferences for insert
  with check (auth.uid() = user_id);

create policy "job_board_preferences_update_own"
  on public.job_board_preferences for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "job_board_preferences_delete_own"
  on public.job_board_preferences for delete
  using (auth.uid() = user_id);
