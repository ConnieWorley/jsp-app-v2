-- US-S002 Role Target Profile
-- Run order: 001
-- Applied to Supabase: 2026-06-22

create table public.role_targets (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  job_title       text not null,
  salary_min      integer,
  salary_target   integer,
  salary_currency text not null default 'USD',
  location_modes  text[] not null default '{}',
  locations       text[] not null default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index role_targets_user_id_idx on public.role_targets (user_id);

alter table public.role_targets enable row level security;

create policy "role_targets_select_own"
  on public.role_targets for select
  using (auth.uid() = user_id);

create policy "role_targets_insert_own"
  on public.role_targets for insert
  with check (auth.uid() = user_id);

create policy "role_targets_update_own"
  on public.role_targets for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "role_targets_delete_own"
  on public.role_targets for delete
  using (auth.uid() = user_id);
