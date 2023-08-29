import { type UseChatHelpers } from 'ai/react'

import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { Model } from '@/constants/models'
import { toast } from 'react-hot-toast'
import { kv } from '@vercel/kv';

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  setModel: (model: Model) => void
  model: Model
  user?: any
  atLimit?: boolean
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  setModel,
  model,
  messages,
  user,
  atLimit
}: ChatPanelProps) {

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50% lg:pl-72">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-3xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          {atLimit && <p className='text-xs text-red-500'>You&apos;ve reached the rate limit for this model. Please try again later.</p>}
          <PromptForm
            user={user}
            onSubmit={async value => {
              const response = await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            setModel={setModel}
            model={model}
          />

          {/* <FooterText className="hidden sm:block" /> */}
        </div>
      </div>
    </div>
  )
}
