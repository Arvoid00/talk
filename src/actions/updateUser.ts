"use server";
/* eslint-disable no-console */
import { type User } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../supabase";
import type { PromptGroups } from "../types";

export const updateUser = async ({
  values,
  user
}: {
  values: { [x: string]: any };
  user: User;
}) => {
  try {
    // userData will update auth.users table
    const userData = {
      username: values.username,
      email: values.email
    };

    // promptData will update public.prompts table
    const promptData = Object.keys(values).reduce<{ [key: string]: string }>(
      (result, key) => {
        if (key.startsWith(`prompt_`)) {
          result[key] = values[key];
        }
        return result;
      },
      {}
    );

    // Un-flatten the prompt data
    const promptGroups = Object.entries(promptData).reduce<PromptGroups>(
      (hash, [key, value]) => {
        const [field, index] = key.split(`_`).slice(1);
        if (typeof hash[index] === `undefined`) {
          Object.assign(hash, { [index]: {} });
        }
        Object.assign(hash[index], {
          [field as "id" | "name" | "body"]: value
        });
        return hash;
      },
      {}
    );

    // console.log('promptGroups', promptGroups)
    for await (let key of Object.keys(promptGroups)) {
      let prompt = promptGroups[key];
      if (prompt.id) {
        const { data, error } = await supabase
          .from(`prompts`)
          .update({
            prompt_name: prompt.name,
            prompt_body: prompt.body
          })
          .eq(`id`, prompt.id);

        if (error) {
          console.log(`Error updating prompt:`, error);
        } else {
          console.log(`Updated prompt:`, data);
        }
      } else {
        const { data, error } = await supabase.from(`prompts`).insert({
          user_id: user.id,
          prompt_name: prompt.name,
          prompt_body: prompt.body
        });

        if (error) {
          console.log(`Error inserting prompt:`, error);
        } else {
          console.log(`Inserted prompt:`, data);
        }
      }
    }

    if (userData.email) {
      await supabase
        .from(`auth.users`)
        .update({ email: userData.email })
        .eq(`id`, user.id);
    }

    if (userData.username) {
      await supabase
        .from(`auth.users`)
        .update({ user_name: userData.username })
        .eq(`id`, user.id);
    }

    return {
      data: {
        user: {
          ...user,
          ...userData
        },
        prompts: promptData
      }
    };
  } catch (error: unknown) {
    console.log(`update user error`, error);
    return {
      error: `Unauthorized`
    };
  }
};
