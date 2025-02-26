import 'server-only'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const auth = async ({
  cookieStore
}: {
  cookieStore: ReturnType<typeof cookies>
}) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  // Create a Supabase client configured to use cookies
  // const supabase = createServerComponentClient({
  //   cookies: () => cookieStore
  // })

  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}
