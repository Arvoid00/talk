"use server";
import { nanoid } from "../utils";
import { supabase } from "../supabase";
import { type Chat } from "../types";

export const upsertChat = async (chat: Chat) => {
  const { error } = await supabase.from(`chats`).upsert({
    id: chat.chat_id || nanoid(),
    user_id: chat.userId,
    payload: chat
  });
  if (error) {
    console.log(`upsertChat error`, error);
    return {
      error: `Unauthorized`
    };
  }
  return null;
};
