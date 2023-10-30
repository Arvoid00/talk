import 'server-only'

import { Database } from '@/lib/db_types'
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  console.log('requestUrl', request.url)

  if (code) {
    const cookieStore = cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          }
        }
      }
    )
    await supabase.auth.exchangeCodeForSession(code)
  }

  console.log('requestUrl.origin', requestUrl.origin)
  // URL to redirect to after sign in process completes

  // fix for production app redirect
  if (process.env.VERCEL_ENV === 'production') {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL as string)
  }

  return NextResponse.redirect(requestUrl.origin)
}
