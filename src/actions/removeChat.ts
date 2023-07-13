"use server";
import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";

export const removeChat = async ({
  id,
  path
}: {
  id: string;
  path: string;
}) => {
  try {
    await supabase.from(`chats`).delete().eq(`id`, id).throwOnError();

    revalidatePath(`/`);
    revalidatePath(path);
  } catch (error: unknown) {
    return {
      error: `Unauthorized`
    };
  }
};
