"use server";
import { type Chat } from "../types";
import { supabase } from "../supabase";

export const getChat = async (id: string): Promise<Chat> => {
  const { data } = await supabase
    .from(`chats`)
    .select(`payload`)
    .eq(`id`, id)
    .maybeSingle();

  return (data?.payload as Chat) ?? null;
};
