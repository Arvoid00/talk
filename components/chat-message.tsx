// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { ChatMessageActions } from '@/components/chat-message-actions';
import { MemoizedReactMarkdown } from '@/components/markdown';
import { CodeBlock } from '@/components/ui/codeblock';
import {
  IconCheck,
  IconOpenAI,
  IconSpinner,
  IconUser
} from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  message: Message
  functionCallString?: string
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const renderFunctionCall = () => {
    if (message.function_call) {
      const functionCallString =
        typeof message.function_call === 'string'
          ? message.function_call
          : JSON.stringify(message.function_call)
    }
    return null
  }

  let content = message.content

  if (message.function_call) {
    if (message.function_call.name === 'searchTheWeb') {
      content = 'Searching the web...'
    } else if (message.function_call.name === 'processSearchResult') {
      content = 'Reading a result...'
    }
  }

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' && <IconUser />}
        {message.role === 'assistant' && !message.function_call && (
          <IconOpenAI />
        )}
        {message.role === 'assistant' && message.function_call && <IconCheck />}
        {message.role === 'function' && <IconSpinner />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {message.role === 'function' && message.function_call ? (
          renderFunctionCall()
        ) : (
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == '▍') {
                    return (
                      <span className="mt-1 animate-pulse cursor-default">
                        ▍
                      </span>
                    )
                  }

                  children[0] = (children[0] as string).replace('`▍`', '▍')
                }

                const match = /language-(\w+)/.exec(className || '')

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
            }}
          >
            {content}
          </MemoizedReactMarkdown>
        )}
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
