import ChatCanvas from '@/app/canvas/components/ChatCanvas'
import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { cookies } from 'next/headers'

export const runtime = 'edge'

export default async function Home() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  const user = session?.user
  const id = nanoid()

  return <ChatCanvas user={user} id={id} />
}
