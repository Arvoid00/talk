'use client'

import { FlowChatList } from '@/app/(main)/flow/[id]/components/flow-chat-list'
import { getPersonas } from '@/app/actions'
import { AlertAuth } from '@/components/alert-auth'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Model, models } from '@/constants/models'
import { Persona } from '@/constants/personas'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { SmolTalkMessage } from '@/lib/types'
import { usePersonaStore } from '@/lib/usePersonaStore'
import { cn } from '@/lib/utils'
import { UseChatOptions, useChat, type Message } from 'ai/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[] | SmolTalkMessage[]
  id?: string
  user: any
}

function useSmolTalkChat(
  opts: UseChatOptions & {
    initialMessages?: SmolTalkMessage[] // overriding just to fit our needs
  }
) {
  const { initialMessages, ...rest } = opts
  return useChat({
    ...rest,
    api: '/talk/api/chat',
    initialMessages: initialMessages?.map(message => ({
      ...message
    }))
  })
}

/* ========================================================================== */
/* Chat Component                                                             */
/* ========================================================================== */

export function FlowChat({ user, id, initialMessages, className }: ChatProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const { persona, setPersonas } = usePersonaStore()
  // const [atLimit, setAtLimit] = useState(false)
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const router = useRouter()

  const [model, setModel] = useState<Model>(models[0])

  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')

  const {
    messages,
    append,
    reload,
    stop,
    isLoading,
    input,
    setInput,
    error,
    data
  } = useSmolTalkChat({
    initialMessages,
    id,
    body: {
      id,
      previewToken,
      model: model,
      persona: persona
    },
    // SWYXTODO: check this 401 issue?
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText)
      }
    }
  })

  console.log('data: ', data)

  useEffect(() => {
    const fetchPersonas = async () => {
      const result = (await getPersonas(user)) as Persona[]
      setPersonas(result)
    }
    fetchPersonas()
  }, [setPersonas, user])

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions() // Initialize dimensions

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const { width, height } = dimensions

  const isAuthError = error?.message.includes('Unauthorized')

  console.log('messages', messages)

  const MENU_BAR_HEIGHT = 70

  return (
    <>
      <div
        // className={cn('pb-[200px] pt-4 md:pt-10', className)}
        style={{ width: `${width}px`, height: `${height - MENU_BAR_HEIGHT}px` }}
      >
        {messages.length > 0 ? (
          <>
            {!!width && !!height && (
              <FlowChatList messages={messages} isLoading={isLoading} />
            )}
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
        user={user}
      />
      {/* @ts-ignore */}
      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        {/* @ts-ignore */}
        <DialogContent>
          <DialogHeader>
            {/* @ts-ignore */}
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            {/* @ts-ignore */}
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
