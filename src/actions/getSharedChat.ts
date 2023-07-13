"use server";
import { type Chat } from "../types";
import { supabase } from "../supabase";

export const getSharedChat = async (id: string): Promise<unknown> => {
  const { data } = await supabase
    .from(`chats`)
    .select(`payload`)
    .eq(`id`, id)
    .not(`payload->sharePath`, `is`, null)
    .maybeSingle();

  return (data?.payload as Chat) ?? null;
};
