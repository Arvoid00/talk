"use server";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const auth = async (): Promise<Session | null> => {
  // Create a Supabase client configured to use cookies
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};
