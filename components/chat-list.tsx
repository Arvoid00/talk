import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { SmolTalkMessage } from '@/lib/types';
import { nanoid } from 'nanoid';

export interface ChatList {
  messages: Message[]
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

export function ChatList({ messages }: ChatList) {

  if (!messages.length) {
    return null
  }

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
}
