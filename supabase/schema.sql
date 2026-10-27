-- Apply to the chosen Supabase project after inspecting its existing tables.
create table public.sloth_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  version integer not null default 1 check (version > 0),
  updated_at timestamptz not null default now()
);

alter table public.sloth_workspaces enable row level security;
revoke all on public.sloth_workspaces from anon;
grant select, insert, update on public.sloth_workspaces to authenticated;

create policy "Read own Sloth workspace" on public.sloth_workspaces
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Create own Sloth workspace" on public.sloth_workspaces
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own Sloth workspace" on public.sloth_workspaces
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
