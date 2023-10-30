import { Database } from '@/lib/db_types'
import { getURL } from '@/lib/helpers'
import { stripe } from '@/lib/stripe'
import { createOrRetrieveCustomer } from '@/lib/supabase-admin'
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
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

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw Error('Could not get user')
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || ''
      })

      if (!customer) throw Error('Could not get customer')
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/settings/plan`
      })
      return new Response(JSON.stringify({ url }), {
        status: 200
      })
    } catch (err: any) {
      console.log(err)
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      )
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    })
  }
}
