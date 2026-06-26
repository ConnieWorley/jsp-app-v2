-- US-S007 Elevator Pitch
-- Run order: 008
-- Applied to Supabase: 2026-06-26

create table public.elevator_pitch (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  pitch        text,
  quiz_answers jsonb not null default '{}'::jsonb,
  deferred_at  timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.elevator_pitch enable row level security;

create policy "elevator_pitch_select_own"
  on public.elevator_pitch for select
  using (auth.uid() = user_id);

create policy "elevator_pitch_insert_own"
  on public.elevator_pitch for insert
  with check (auth.uid() = user_id);

create policy "elevator_pitch_update_own"
  on public.elevator_pitch for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "elevator_pitch_delete_own"
  on public.elevator_pitch for delete
  using (auth.uid() = user_id);
