-- US-S009 Follow-Up Schedule
-- Run order: 002
-- Applied to Supabase: (fill in after running)

create table public.follow_up_schedule (
  user_id              uuid primary key references auth.users(id) on delete cascade,
  first_offset_days    integer not null default 3,
  second_offset_days   integer not null default 7,
  third_offset_days    integer not null default 14,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  constraint follow_up_schedule_first_positive  check (first_offset_days  > 0),
  constraint follow_up_schedule_second_positive check (second_offset_days > 0),
  constraint follow_up_schedule_third_positive  check (third_offset_days  > 0)
);

alter table public.follow_up_schedule enable row level security;

create policy "follow_up_schedule_select_own"
  on public.follow_up_schedule for select
  using (auth.uid() = user_id);

create policy "follow_up_schedule_insert_own"
  on public.follow_up_schedule for insert
  with check (auth.uid() = user_id);

create policy "follow_up_schedule_update_own"
  on public.follow_up_schedule for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "follow_up_schedule_delete_own"
  on public.follow_up_schedule for delete
  using (auth.uid() = user_id);
