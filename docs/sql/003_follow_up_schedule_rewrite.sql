-- US-S009 Follow-Up Schedule (rewrite)
-- Run order: 003
-- Applied to Supabase: 2026-06-24
--
-- Supersedes 002_follow_up_schedule.sql. The original 3-column model was
-- too simple — we need five offsets covering the full job-application journey
-- (apply, outreach, then three escalating follow-ups on the outreach).
-- A separate Networking Follow-Up Schedule is tracked in the backlog.

drop table if exists public.follow_up_schedule;

create table public.follow_up_schedule (
  user_id                       uuid primary key references auth.users(id) on delete cascade,
  apply_offset_days             integer not null default 1,
  outreach_offset_days          integer not null default 2,
  first_followup_offset_days    integer not null default 3,
  second_followup_offset_days   integer not null default 7,
  third_followup_offset_days    integer not null default 7,
  created_at                    timestamptz not null default now(),
  updated_at                    timestamptz not null default now(),
  constraint follow_up_schedule_apply_positive            check (apply_offset_days          > 0),
  constraint follow_up_schedule_outreach_positive         check (outreach_offset_days       > 0),
  constraint follow_up_schedule_first_followup_positive   check (first_followup_offset_days  > 0),
  constraint follow_up_schedule_second_followup_positive  check (second_followup_offset_days > 0),
  constraint follow_up_schedule_third_followup_positive   check (third_followup_offset_days  > 0)
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
