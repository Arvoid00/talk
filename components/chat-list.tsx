import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { SmolTalkMessage } from '@/lib/types'
import { nanoid } from 'nanoid'

export interface ChatList {
  messages: Message[]
  isLoading?: boolean
  atLimit?: boolean
}

// TODO: Put this somewhere else
const limitMessage: SmolTalkMessage = {
  id: nanoid(),
  role: 'assistant',
  assistantMessageType: 'error',
  assistantMessageDetails: 'rate-limit',
  content:
    'You have reached the rate limit for your plan level. Please try again later.'
}

export function ChatList({ messages, isLoading }: ChatList) {
  if (!messages.length) {
    return null
  }

  const isWaitingForResponse =
    messages[messages.length - 1].role === 'user' && isLoading
  return (
    <div className="relative mx-auto max-w-2xl px-4 md:px-8">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <ChatMessage message={message} />
            {/* {index < messages.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )} */}
          </div>
        )
      })}
    </div>
  )
  {
    isWaitingForResponse && (
      <div className="mt-4 flex items-center justify-center md:mt-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-500"></div>
      </div>
    )
  }
}
