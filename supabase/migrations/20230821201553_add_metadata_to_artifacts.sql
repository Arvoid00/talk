alter table "public"."artifacts" add column "favicon" text;

alter table "public"."artifacts" add column "title" text;

create policy "Allow authenticated read-only access." on artifacts for select to authenticated;

ALTER TABLE chats REPLICA IDENTITY FULL;