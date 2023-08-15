// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { ChatMessageActions } from '@/components/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import {
  IconCheck,
  IconOpenAI,
  IconSpinner,
  IconUser
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { ArrowDownIcon } from '@radix-ui/react-icons'

export interface ChatMessageProps {
  message: Message
  functionCallString?: string
}

const RenderFunctionMessage = ({ message }: ChatMessageProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (message.name === 'searchTheWeb') {
    const parsedContent = JSON.parse(message.content)?.results

    return (
      <ul className="list-decimal space-y-4 list-inside">
        {parsedContent?.results?.map((result: any) => (
          <li key={result.id}>
            <span className="font-medium">{result.title}</span>:{' '}
            <Link target="_blank" className="underline" href={result.url}>
              {result.url}
            </Link>
          </li>
        ))}
      </ul>
    )
  } else if (message.name === 'processSearchResult') {
    const result = JSON.parse(message.content)?.results
    const link = JSON.parse(message.content)?.link

    return (
      <div className="">
        <div
          className={cn(
            `transition-all duration-300 overflow-hidden`,
            isOpen ? 'max-h-screen' : 'max-h-36'
          )}
        >
          <Link href={result.url} target="_blank" className="font-medium">
            {result?.title}
          </Link>
          :
          <p className="whitespace-pre-line text-muted-foreground">
            {result.extract
              .replace(/(<([^>]+)>)/gi, ' ')
              .trim()
              .replace(/\n\s*\n\s*\n/g, '\n\n')}
          </p>
        </div>
        {!isOpen && (
          <div className="absolute -mb-8 h-24 justify-center shadow-lg from-[#18181a] bg-gradient-to-t to-transparent bg-opacity-0 items-end bottom-0 left-0 right-0 flex">
            <Button onClick={() => setIsOpen(!isOpen)} className="mb-4">
              Show more <ArrowDownIcon className="ml-1" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  return <></>
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
      content = 'Reading top result...'
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
        ) : message.role === 'function' ? (
          <RenderFunctionMessage message={message} />
        ) : (
          <MemoizedReactMarkdown
            linkTarget={'_blank'}
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
