"use server";
import { type Chat } from "../types";
import { supabase } from "../supabase";

export const shareChat = async (chat: Chat): Promise<Chat> => {
  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  };

  await supabase
    .from(`chats`)
    .update({ payload })
    .eq(`id`, chat.id)
    .throwOnError();

  return payload;
};
