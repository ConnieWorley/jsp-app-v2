-- US-S001 Ideal Company Quiz
-- Run order: 006
-- Applied to Supabase: 2026-06-26

create table public.ideal_company (
  user_id            uuid primary key references auth.users(id) on delete cascade,
  size_standard      text[] not null default '{}',
  industry_standard  text[] not null default '{}',
  industry_custom    text[] not null default '{}',
  culture_standard   text[] not null default '{}',
  culture_custom     text[] not null default '{}',
  values_standard    text[] not null default '{}',
  values_custom      text[] not null default '{}',
  dealbreakers       text[] not null default '{}',
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

alter table public.ideal_company enable row level security;

create policy "ideal_company_select_own"
  on public.ideal_company for select
  using (auth.uid() = user_id);

create policy "ideal_company_insert_own"
  on public.ideal_company for insert
  with check (auth.uid() = user_id);

create policy "ideal_company_update_own"
  on public.ideal_company for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "ideal_company_delete_own"
  on public.ideal_company for delete
  using (auth.uid() = user_id);
