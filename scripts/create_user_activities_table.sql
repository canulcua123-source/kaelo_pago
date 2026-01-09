-- Create user_activities table to track user performance
create table if not exists public.user_activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  route_id uuid references public.routes(id),
  distance_km numeric not null default 0,
  duration_seconds integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_activities enable row level security;

-- Create policies
create policy "Users can view their own activities"
  on public.user_activities for select
  using (auth.uid() = user_id);

create policy "Users can insert their own activities"
  on public.user_activities for insert
  with check (auth.uid() = user_id);

-- Force schema cache reload
notify pgrst, 'reload schema';
