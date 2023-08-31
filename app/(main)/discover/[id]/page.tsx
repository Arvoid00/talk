import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getArtifact } from '@/app/actions'
import { auth } from '@/auth'
import { Chat } from '@/components/chat'
import { cookies } from 'next/headers'
import { Message } from 'ai'
import { nanoid } from 'nanoid'

export const runtime = 'edge'
export const preferredRegion = 'home'

export interface DiscoverPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: DiscoverPageProps): Promise<Metadata> {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    return {}
  }

  const artifact = await getArtifact(params.id)
  return {
    title: artifact?.title?.toString().slice(0, 50) ?? 'Discover'
  }
}

export default async function DiscoverPage({ params }: DiscoverPageProps) {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    redirect(`/sign-in?next=/discover/${params.id}`)
  }

  const artifact = await getArtifact(params.id)

  if (!artifact) {
    notFound()
  }

  return (
    <Chat
      user={session?.user}
      initialMessages={[
        {
          content: artifact.text_content,
          id: nanoid(),
          role: 'system'
        } as Message
      ]}
    />
  )
}
