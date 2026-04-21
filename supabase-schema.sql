-- Supabase SQL Editor'de çalıştırın.
-- Bu script anket yanıtlarını saklayacak tabloyu oluşturur.

create table if not exists public.responses (
  id bigserial primary key,
  ad text not null,
  soyad text not null,
  tc text not null unique,
  answers jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_responses_tc on public.responses(tc);
create index if not exists idx_responses_created on public.responses(created_at);

-- Güvenlik: Row Level Security'yi kapalı bırakıyoruz çünkü sunucu
-- service_role anahtarıyla bağlanıyor. İsterseniz açıp sadece
-- service_role'e izin veren policy ekleyebilirsiniz:
--
-- alter table public.responses enable row level security;
-- create policy "service only" on public.responses
--   for all using (auth.role() = 'service_role');
