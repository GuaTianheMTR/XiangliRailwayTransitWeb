-- =====================================================
-- 香力城市交通管理网站 · Supabase 数据库脚本
-- 使用方法：在 Supabase 项目 SQL Editor 中粘贴并 Run（一次性）
-- =====================================================

-- ---------- 数据表 ----------
create table if not exists home (
  id int primary key default 1 check (id = 1),
  image text default '',
  intro_zh text default '',
  intro_en text default ''
);

create table if not exists members (
  id text primary key,
  name text not null unique
);

create table if not exists routes (
  id text primary key,
  name text not null,
  number text default '',
  type text default 'light_rail',
  color text default '#2457d6'
);

create table if not exists companies (
  id text primary key,
  name text not null,
  member_ids text[] default '{}',
  route_ids text[] default '{}'
);

-- ---------- 默认简介 ----------
insert into home (id, image, intro_zh, intro_en) values (
  1,
  '',
  '香力城市是一座以轨道交通闻名的现代化都市。城市内轨道交通线路纵横交错，覆盖全城各个角落，为市民提供便捷、高效、绿色的出行体验。欢迎来到香力城市，感受城市交通的魅力！',
  'Xiangli is a modern city famous for its rail transit. The rail transit lines crisscross the city and cover every corner, providing citizens with convenient, efficient and green travel. Welcome to Xiangli and experience the charm of urban transportation!'
) on conflict (id) do nothing;

-- ---------- 行级安全：所有人可读，禁止直接写入 ----------
alter table home enable row level security;
alter table members enable row level security;
alter table routes enable row level security;
alter table companies enable row level security;

drop policy if exists "public read home" on home;
drop policy if exists "public read members" on members;
drop policy if exists "public read routes" on routes;
drop policy if exists "public read companies" on companies;

create policy "public read home" on home for select using (true);
create policy "public read members" on members for select using (true);
create policy "public read routes" on routes for select using (true);
create policy "public read companies" on companies for select using (true);

-- ---------- 管理员密码校验（密码只在数据库函数内，客户端无法读取） ----------
create or replace function admin_login(pw text) returns boolean
language sql immutable as $$ select pw = 'xiangli9666' $$;

-- ---------- 成员：按名查找或创建（公开，任何人可注册） ----------
create or replace function member_resolve(p_name text)
returns json language plpgsql security definer as $$
declare
  v_id text;
  v_created boolean := false;
begin
  select id into v_id from members where name = p_name limit 1;
  if v_id is null then
    v_id := gen_random_uuid()::text;
    insert into members (id, name) values (v_id, p_name);
    v_created := true;
  end if;
  return json_build_object('id', v_id, 'name', p_name, 'created', v_created);
end $$;

-- ---------- 首页 ----------
create or replace function admin_save_home(pw text, p_image text, p_intro_zh text, p_intro_en text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  insert into home (id, image, intro_zh, intro_en) values (1, p_image, p_intro_zh, p_intro_en)
  on conflict (id) do update set
    image = excluded.image,
    intro_zh = excluded.intro_zh,
    intro_en = excluded.intro_en;
  return json_build_object('ok', true);
end $$;

-- ---------- 公司 ----------
create or replace function admin_create_company(pw text, p_id text, p_name text, p_member_ids text[], p_route_ids text[])
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  insert into companies (id, name, member_ids, route_ids) values (p_id, p_name, coalesce(p_member_ids, '{}'), coalesce(p_route_ids, '{}'));
  return json_build_object('ok', true);
end $$;

create or replace function admin_update_company(pw text, p_id text, p_name text, p_member_ids text[], p_route_ids text[])
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  update companies set name = p_name, member_ids = coalesce(p_member_ids, '{}'), route_ids = coalesce(p_route_ids, '{}') where id = p_id;
  return json_build_object('ok', true);
end $$;

create or replace function admin_delete_company(pw text, p_id text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  delete from companies where id = p_id;
  return json_build_object('ok', true);
end $$;

-- ---------- 线路 ----------
create or replace function admin_create_route(pw text, p_id text, p_name text, p_number text, p_type text, p_color text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  insert into routes (id, name, number, type, color) values (p_id, p_name, p_number, p_type, p_color);
  return json_build_object('ok', true);
end $$;

create or replace function admin_update_route(pw text, p_id text, p_name text, p_number text, p_type text, p_color text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  update routes set name = p_name, number = p_number, type = p_type, color = p_color where id = p_id;
  return json_build_object('ok', true);
end $$;

create or replace function admin_delete_route(pw text, p_id text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  delete from routes where id = p_id;
  update companies set route_ids = array_remove(route_ids, p_id);
  return json_build_object('ok', true);
end $$;

-- ---------- 成员（管理员管理） ----------
create or replace function admin_create_member(pw text, p_id text, p_name text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  if exists (select 1 from members where name = p_name) then raise exception 'name exists'; end if;
  insert into members (id, name) values (p_id, p_name);
  return json_build_object('ok', true);
end $$;

create or replace function admin_update_member(pw text, p_id text, p_name text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  if exists (select 1 from members where name = p_name and id <> p_id) then raise exception 'name exists'; end if;
  update members set name = p_name where id = p_id;
  return json_build_object('ok', true);
end $$;

create or replace function admin_delete_member(pw text, p_id text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  delete from members where id = p_id;
  update companies set member_ids = array_remove(member_ids, p_id);
  return json_build_object('ok', true);
end $$;

-- ---------- 聊天消息 ----------
create table if not exists messages (
  id text primary key,
  member_id text not null,
  member_name text not null,
  content text not null,
  created_at timestamptz default now()
);

alter table messages add column if not exists attachments jsonb default '[]'::jsonb;
alter table messages add column if not exists mentions text[] default '{}';

alter table messages enable row level security;

drop policy if exists "public read messages" on messages;
create policy "public read messages" on messages for select using (true);

-- 发送消息：必须是已注册成员（按 member_id 校验），支持附件与 @；清除旧的 2 参数版本避免歧义
drop function if exists chat_send(text, text);
create or replace function chat_send(p_member_id text, p_content text, p_attachments jsonb, p_mention_ids text[])
returns json language plpgsql security definer as $$
declare
  v_name text;
  v_content text;
  v_id text;
begin
  v_content := btrim(coalesce(p_content, ''));
  if length(v_content) = 0 and coalesce(jsonb_array_length(p_attachments), 0) = 0 then
    raise exception 'empty message';
  end if;
  if length(v_content) > 4000 then v_content := left(v_content, 4000); end if;
  select name into v_name from members where id = p_member_id;
  if v_name is null then raise exception 'not registered'; end if;
  v_id := gen_random_uuid()::text;
  insert into messages (id, member_id, member_name, content, attachments, mentions)
  values (v_id, p_member_id, v_name, v_content, coalesce(p_attachments, '[]'::jsonb), coalesce(p_mention_ids, '{}'));
  return json_build_object('ok', true, 'id', v_id);
end $$;

-- 管理员删除消息
create or replace function admin_delete_message(pw text, p_id text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  delete from messages where id = p_id;
  return json_build_object('ok', true);
end $$;

-- ---------- @ 提及与未读状态 ----------
create table if not exists member_state (
  member_id text primary key,
  last_seen timestamptz default now()
);

alter table member_state enable row level security;

create or replace function chat_seen(p_member_id text)
returns json language plpgsql security definer as $$
begin
  insert into member_state (member_id, last_seen) values (p_member_id, now())
  on conflict (member_id) do update set last_seen = now();
  return json_build_object('ok', true);
end $$;

create or replace function chat_unread(p_member_id text)
returns json language plpgsql security definer as $$
declare
  v_last timestamptz;
  v_count int;
begin
  select last_seen into v_last from member_state where member_id = p_member_id;
  if v_last is null then v_last := 'epoch'::timestamptz; end if;
  select count(*) into v_count from messages
    where p_member_id = any(mentions)
      and member_id <> p_member_id
      and created_at > v_last;
  return json_build_object('count', v_count);
end $$;

-- ---------- AI 配置（密钥只在数据库，客户端读不到） ----------
create table if not exists ai_config (
  id int primary key default 1 check (id = 1),
  enabled boolean default true,
  model text default 'glm-4-flash',
  base_url text default 'https://open.bigmodel.cn/api/paas/v4',
  system_prompt text default '你是“香力AI”，香力城市交通管理网站的官方智能助手。你非常熟悉 MTR（我的世界铁路模组）以及香力城市、香速铁道、各运营公司、线路类型（轻轨、高速列车、城际列车、市域快车、地铁、公交、捷运、普速列车、轮渡）等相关信息。请用简体中文、友好而专业地回答用户关于香力城市交通的问题，并在用户询问建设线路建议时给出实用、合理、有创意的规划建议。回答尽量简洁清晰。',
  api_key text default '',
  temperature numeric default 0.7
);

insert into ai_config (id) values (1) on conflict (id) do nothing;

alter table ai_config enable row level security;

create or replace function admin_get_ai_config(pw text)
returns json language plpgsql security definer as $$
declare c ai_config%rowtype;
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  select * into c from ai_config where id = 1;
  return json_build_object(
    'enabled', c.enabled,
    'model', c.model,
    'base_url', c.base_url,
    'system_prompt', c.system_prompt,
    'temperature', c.temperature,
    'has_custom_key', (c.api_key is not null and length(c.api_key) > 0)
  );
end $$;

create or replace function admin_set_ai_config(pw text, p_enabled boolean, p_model text, p_base_url text, p_system_prompt text, p_temperature numeric, p_api_key text)
returns json language plpgsql security definer as $$
begin
  if not admin_login(pw) then raise exception 'unauthorized'; end if;
  update ai_config set
    enabled = coalesce(p_enabled, enabled),
    model = coalesce(nullif(p_model, ''), model),
    base_url = coalesce(nullif(p_base_url, ''), base_url),
    system_prompt = coalesce(p_system_prompt, system_prompt),
    temperature = coalesce(p_temperature, temperature),
    api_key = case when p_api_key is null or p_api_key = '' then api_key else p_api_key end
  where id = 1;
  return json_build_object('ok', true);
end $$;

-- ---------- 附件存储 ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'chat-files', 'chat-files', true, 10485760,
  array[
    'image/png','image/jpeg','image/webp','image/gif',
    'application/pdf',
    'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain','text/csv','application/zip'
  ]
)
on conflict (id) do update set
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "chat files public read" on storage.objects;
create policy "chat files public read" on storage.objects
  for select using (bucket_id = 'chat-files');

drop policy if exists "chat files anon upload" on storage.objects;
create policy "chat files anon upload" on storage.objects
  for insert to anon with check (bucket_id = 'chat-files');
