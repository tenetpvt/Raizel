-- ==========================================
-- RAIZEL DATABASE SCHEMA & ROW LEVEL SECURITY
-- ==========================================

-- 1. Create Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  level integer default 1 not null,
  xp integer default 0 not null,
  stardust integer default 0 not null,
  streak_count integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create User Attributes Table
create table if not exists public.user_attributes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  attribute_type text not null check (attribute_type in ('intellect', 'strength', 'discipline', 'vitality')),
  level integer default 1 not null,
  xp integer default 0 not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, attribute_type)
);

-- 3. Create Quests Table
create table if not exists public.quests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  attribute_type text not null check (attribute_type in ('intellect', 'strength', 'discipline', 'vitality')),
  intensity text not null default 'Medium' check (intensity in ('Low', 'Medium', 'High')),
  xp_reward integer not null default 45,
  stardust_reward integer not null default 12,
  is_completed boolean not null default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

alter table public.profiles enable row level security;
alter table public.user_attributes enable row level security;
alter table public.quests enable row level security;

-- Profiles Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- User Attributes Policies
create policy "Users can view own attributes"
  on public.user_attributes for select
  using (auth.uid() = user_id);

create policy "Users can insert own attributes"
  on public.user_attributes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own attributes"
  on public.user_attributes for update
  using (auth.uid() = user_id);

-- Quests Policies
create policy "Users can view own quests"
  on public.quests for select
  using (auth.uid() = user_id);

create policy "Users can insert own quests"
  on public.quests for insert
  with check (auth.uid() = user_id);

create policy "Users can update own quests"
  on public.quests for update
  using (auth.uid() = user_id);

create policy "Users can delete own quests"
  on public.quests for delete
  using (auth.uid() = user_id);

-- ==========================================
-- AUTOMATIC PROFILE & ATTRIBUTES ON SIGN UP
-- ==========================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Insert profile
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );

  -- Seed initial 4 attributes
  insert into public.user_attributes (user_id, attribute_type) values
    (new.id, 'intellect'),
    (new.id, 'strength'),
    (new.id, 'discipline'),
    (new.id, 'vitality');

  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
