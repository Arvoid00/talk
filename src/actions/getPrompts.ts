"use server";
import { type User } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../supabase";
import type { Prompt } from "../types";

export const getPrompts = async (
  user: User
): Promise<
  | Prompt[]
  | {
      error: string;
    }
> => {
  try {
    const { data } = await supabase
      .from(`prompts`)
      .select(`id, prompt_name, prompt_body`)
      .eq(`user_id`, user.id);

    const prompts: Prompt[] =
      data && data.length > 0
        ? data
        : [{ id: null, prompt_name: ``, prompt_body: `` }];

    return prompts;
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log(`get prompts error`, error);
    return {
      error: `Unauthorized`
    };
  }
};
