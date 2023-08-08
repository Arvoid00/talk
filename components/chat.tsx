'use client'

import { useChat, type Message, UseChatOptions } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import { Model, models } from '@/constants/models'
import { AlertAuth } from './alert-auth'
import { SmolTalkMessage } from '@/lib/types'
import { Session } from '@supabase/supabase-js'
import { ChatRequest, FunctionCallHandler } from 'ai'
import { nanoid } from '@/lib/utils'
import { searchTheWeb } from '@/lib/functions/search-the-web'
import { processSearchResult } from '@/lib/functions/process-search-results'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  userId?: string
}

function useSmolTalkChat(
  opts: UseChatOptions & {
    initialMessages?: SmolTalkMessage[] // overriding just to fit our needs
  }
) {
  const { initialMessages, ...rest } = opts
  return useChat({
    ...rest,
    initialMessages: initialMessages?.map(message => ({
      ...message
    }))
  })
}

/* ========================================================================== */
/* Function Call Handler                                                      */
/* ========================================================================== */

const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall
) => {
  let functionResponse: ChatRequest

  // if you skip the function call and return nothing, the `function_call`
  // message will be sent to the client for it to handle
  if (functionCall.name === 'searchTheWeb') {
    if (functionCall.arguments) {
      const parsedFunctionCallArguments = JSON.parse(functionCall.arguments)
      console.log('🔵 called searchTheWeb: ', functionCall.arguments)

      // You now have access to the parsed arguments here (assuming the JSON was valid)
      // If JSON is invalid, return an appropriate message to the model so that it may retry?
      console.log(parsedFunctionCallArguments)
      const results = await searchTheWeb(functionCall.arguments.query as string)
      console.log('🟢 results: ', results)

      // Generate function messages to keep in conversation context.
      // @ts-ignore
      // const newMessages = createFunctionCallMessages(results)
      // console.log('🟠 newMessages: ', newMessages)

      return functionResponse = {
        messages: [
          ...chatMessages,
          {
            id: nanoid(),
            name: 'searchTheWeb',
            role: 'function' as const,
            content: JSON.stringify({
              query: functionCall.arguments.query,
              results: results || 'Sorry, I could not find anything on the internet about that.'
            })
          }
        ]
      }
    } else if (functionCall.name === 'processSearchResult') {
      console.log('🔵 called processSearchResult: ', functionCall.arguments)

      // @ts-ignore
      const processedResults = await processSearchResult(functionCall.arguments)
      console.log('🟢 processedResults: ', processedResults)

      // Generate function messages to keep conversation context.
      // @ts-ignore
      // const newMessages = createFunctionCallMessages(processedResults)
      // console.log('🟠 newMessages: ', newMessages)

      const { title, url, id, publishedDate, author, score } =
        functionCall.arguments

      return functionResponse = {
        messages: [
          ...chatMessages,
          {
            id: nanoid(),
            name: 'processSearchResult',
            role: 'function' as const,
            content: JSON.stringify({
              link: {
                title: title,
                url: url,
                publishedDate: publishedDate || null,
                author: author || null,
                score: score || null,
                id: id
              },
              results: processedResults
            })
          }
        ]
      }
    }
  }
}
export function Chat({ userId, id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )

  const [model, setModel] = useState<Model>(models[0])

  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const { messages, append, reload, stop, isLoading, input, setInput, error } =
    useSmolTalkChat({
      initialMessages,
      id,
      body: {
        id,
        //   previewToken
        previewToken,
        model: model
      },
      // SWYXTODO: check this 401 issue?
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      experimental_onFunctionCall: functionCallHandler
    })

  const isAuthError = error?.message.includes('Unauthorized')

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length > 0 ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : !isLoading ? (
          <EmptyScreen setInput={setInput} />
        ) : null}
      </div>
      {isAuthError && <AlertAuth />}
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        setModel={setModel}
        model={model}
        userId={userId}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
