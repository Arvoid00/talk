"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "../supabase";
import { auth } from "../auth";

export const clearChats = async (): Promise<{
  error: string;
}> => {
  try {
    const session = await auth();
    await supabase
      .from(`chats`)
      .delete()
      .eq(`user_id`, session?.user.id)
      .throwOnError();
    revalidatePath(`/`);
    return redirect(`/`);
  } catch (error: unknown) {
    console.log(`clear chats error`, error);
    return {
      error: `Unauthorized`
    };
  }
};
