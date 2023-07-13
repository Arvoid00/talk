"use server";
import { supabase } from "../supabase";
import { type Chat } from "../types";

export const getChats = async (userId?: string | null): Promise<Chat[]> => {
  if (!userId) {
    return [];
  }

  try {
    const { data } = await supabase
      .from(`chats`)
      .select(`payload`)
      .order(`payload->createdAt`, { ascending: false })
      .throwOnError();

    return (data?.map((entry) => entry.payload) as Chat[]) ?? [];
  } catch (error: unknown) {
    return [];
  }
};
