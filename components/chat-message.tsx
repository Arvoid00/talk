// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
'use client'

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { ChatMessageActions } from '@/components/chat-message-actions'
import LinkPreview from '@/components/link-preview'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { Card } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/codeblock'
import {
  IconCheck,
  IconClose,
  IconOpenAI,
  IconSpinner,
  IconUser
} from '@/components/ui/icons'
import { extractUniqueUrls } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from './ui/button'

export interface ChatMessageProps {
  message: Message
  functionCallString?: string
}

const ShowMoreButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    style={{
      boxShadow: '0 4px 2px -2px transparent'
    }}
    className="absolute inset-x-0 bottom-0 flex h-40 items-end justify-center bg-gradient-to-t from-[#f9f9fa] to-transparent shadow-lg dark:from-[#18181a]"
  >
    <Button
      variant={'outline'}
      onClick={onClick}
      className="mb-4 bg-background"
    >
      Show more <ArrowDownIcon className="ml-1" />
    </Button>
  </div>
)

const RenderFunctionMessage = ({ message }: ChatMessageProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (message.name === 'searchTheWeb') {
    // console.log('/components/chat-message.tsx > RenderFunctionMessage > message >', message)
    const parsedContent = JSON.parse(message.content)?.results

    return (
      <div className="prose dark:prose-invert">
        <div
          className={cn(
            `overflow-hidden transition-all duration-300`,
            isOpen ? 'max-h-screen' : 'max-h-72'
          )}
        >
          <div>These are the top search results:</div>
          <ul className="list-decimal">
            {parsedContent?.results?.map((result: any) => (
              <li key={result.id}>
                <span className="font-medium">{result.title}</span>:{' '}
                <Link target="_blank" className="underline" href={result.url}>
                  {result.url}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {!isOpen && <ShowMoreButton onClick={() => setIsOpen(true)} />}
      </div>
    )
  } else if (message.name === 'processSearchResult') {
    const result = JSON.parse(message.content)?.results
    const link = JSON.parse(message.content)?.link
    const extract = result?.extract
      ?.replace(/(<([^>]+)>)/gi, ' ')
      .trim()
      ?.replace(/\n\s*\n\s*\n/g, '\n\n')

    if (!extract) {
      return 'There was an issue processing the latest search result. Please try again.'
    }

    return (
      <div className="prose dark:prose-invert">
        <div
          className={cn(
            `overflow-hidden transition-all duration-300`,
            isOpen ? 'max-h-screen' : 'max-h-72'
          )}
        >
          <Link href={result?.url} target="_blank" className="font-medium">
            {result?.title}
          </Link>
          :<p className="whitespace-pre-line">{extract}</p>
        </div>
        {!isOpen && <ShowMoreButton onClick={() => setIsOpen(true)} />}
      </div>
    )
  }

  return <></>
}

type MessageAuthor = 'user' | 'assistant' | 'fnCall' | 'fnResponse' | 'error'

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const getAuthorType = (message: Message) => {
    if (message.role === 'assistant') {
      if (message.name === 'rate-limit') return 'error'
      if (message.function_call) return 'fnCall'
      return 'assistant'
    }

    if (message.role === 'user') return 'user'
    if (message.role === 'function') return 'fnResponse'

    return 'assistant'
  }

  const authorIcon = {
    user: <IconUser />,
    assistant: <IconOpenAI />,
    fnCall: <IconSpinner />,
    fnResponse: <IconCheck />,
    error: <IconClose />
  } as const

  const renderFunctionCall = () => {
    if (message.function_call) {
      const functionCallString =
        typeof message.function_call === 'string'
          ? message.function_call
          : JSON.stringify(message.function_call)
    }
    return null
  }

  const { content, messageAuthor, messageIcon } = useMemo(() => {
    let parsedMessage, content, messageAuthor, messageIcon

    try {
      parsedMessage = JSON.parse(message.content)
    } catch (e) {
      // Normal message; not a JSON string
    }

    if (parsedMessage && parsedMessage.assistantType === 'error') {
      messageAuthor = 'error'
      content = parsedMessage.content
      messageIcon = authorIcon['error']
    } else {
      const authorType = getAuthorType(parsedMessage || message)

      messageAuthor = authorType

      if (authorType === 'fnCall') {
        if (message.function_call.name === 'searchTheWeb') {
          content = 'Doing some research...'
        } else if (message.function_call.name === 'processSearchResult') {
          content = 'Reading something I found...'
        }
      } else {
        content = (parsedMessage || message).content
      }

      messageIcon = authorIcon[authorType]
    }

    return { content, messageAuthor, messageIcon }
  }, [message])

  const urls = useMemo(() => extractUniqueUrls(content), [content])

  const renderMessage = useMemo(() => {
    return (
      <>
        {message.role === 'function' && message.function_call ? (
          renderFunctionCall()
        ) : message.role === 'function' ? (
          <RenderFunctionMessage message={message} />
        ) : (
          <>
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
            <div className="grid grid-cols-2 gap-4">
              {urls?.map(url => (
                <LinkPreview
                  key={url}
                  openInNewTab={true}
                  showLoader={true}
                  url={url}
                />
              ))}
            </div>
          </>
        )}
      </>
    )
  }, [message])

  return (
    <Card
      className={cn(
        'group relative mb-4 flex items-start p-4 md:-ml-12',
        messageAuthor === 'user'
          ? 'bg-gray-100 dark:border-gray-700/30 dark:bg-muted'
          : '',
        messageAuthor === 'error' ? 'bg-red-200 dark:bg-red-900' : ''
      )}
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
        {/* Render Icon */}
        {messageIcon}
      </div>
      <div className="relative ml-4 flex-1 space-y-4 px-1">
        {renderMessage}
        <ChatMessageActions message={message} />
      </div>
    </Card>
  )
}
