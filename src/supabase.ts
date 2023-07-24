import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "./types/Database";

export const supabase = createServerActionClient<Database>({ cookies });
