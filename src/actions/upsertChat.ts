"use server";
import { nanoid } from "../utils";
import { supabase } from "../supabase";
import { type Chat } from "../types";

export const upsertChat = async (chat: Chat) => {
  const { error } = await supabase.from(`chats`).upsert(
    {
      id: chat.chat_id || nanoid(),
      userId: chat.userId,
      payload: chat
    },
    {
      onConflict: `handle`
    }
  );
  if (error) {
    console.log(`upsertChat error`, error);
    return {
      error: `Unauthorized`
    };
  }
  return null;
};
