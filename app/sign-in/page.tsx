import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <div className="mb-4 text-center text-xl font-semibold">
          <Link href="https://smol.ai">smol.ai</Link>
        </div>
        <div className="mb-6 text-center">
          {`We ask everyone to sign in to chat. It's just to confirm you're
            real.`}
          {/* For a genuine chat experience, please log in first. */}
        </div>
        {/* <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              E-mail address or phone number
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full rounded-md border p-2"
            />
          </div> */}
        {/* <div className="mb-4">
            <label htmlFor="remember" className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="mr-2"
              />
              Remember me
            </label>
          </div> */}
        {/* <button className="mb-4 w-full rounded-md bg-black py-2 text-white hover:bg-gray-700">
            Sign in
          </button> */}

        <LoginButton />
        {/* <div className="text-center">
            Not a member yet?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </div> */}
      </div>
    </div>
  )
}
