'use client'

import { getPersonas } from '@/app/actions'
import { processSearchResult, searchTheWeb } from '@/app/chat-functions'
import { AlertAuth } from '@/components/alert-auth'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'
import { Model, models } from '@/constants/models'
import { Persona } from '@/constants/personas'
import { SmolTalkMessage } from '@/lib/types'
import { usePersonaStore } from '@/lib/usePersonaStore'
import { cn, nanoid } from '@/lib/utils'
import {
  Editor,
  TLGeoShape,
  Tldraw,
  createShapeId,
  useEditor
} from '@tldraw/tldraw'
import '@tldraw/tldraw/editor.css'
import '@tldraw/tldraw/ui.css'
import { ChatRequest, FunctionCallHandler } from 'ai'
import { UseChatOptions, useChat, type Message } from 'ai/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

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

  /* ========================================================================== */
  /* Handle searchTheWeb function call                                          */
  /* ========================================================================== */

  if (functionCall.name === 'searchTheWeb') {
    if (functionCall.arguments) {
      const parsedFunctionCallArguments = JSON.parse(functionCall.arguments)
      const results = await searchTheWeb(parsedFunctionCallArguments.query)
      return (functionResponse = {
        messages: [
          ...chatMessages,
          {
            id: nanoid(),
            name: 'searchTheWeb',
            role: 'function' as const,
            content: JSON.stringify({
              query: parsedFunctionCallArguments.query,
              results:
                results ||
                'Sorry, I could not find anything on the internet about that.'
            })
          }
        ]
      })
    }
  }

  /* ========================================================================== */
  /* Handle processSearchResult function call                                   */
  /* ========================================================================== */

  if (functionCall.name === 'processSearchResult') {
    const parsedFunctionCallArguments = JSON.parse(functionCall.arguments)
    const processedContent = await processSearchResult(
      parsedFunctionCallArguments.id
    )

    const { title, url, id, publishedDate, author, score } =
      parsedFunctionCallArguments

    return (functionResponse = {
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
            results: processedContent
          })
        }
      ]
    })
  }
}

/* ========================================================================== */
/* Chat Component                                                             */
/* ========================================================================== */

export function Chat({ user, id, initialMessages, className }: ChatProps) {
  const { persona, setPersonas } = usePersonaStore()

  const [model, setModel] = useState<Model>(models[0])

  const { messages, append, reload, stop, isLoading, input, setInput, error } =
    useSmolTalkChat({
      initialMessages,
      id,
      body: {
        id,
        model: model,
        persona: persona
      },
      // SWYXTODO: check this 401 issue?
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      experimental_onFunctionCall: functionCallHandler
    })

  useEffect(() => {
    const fetchPersonas = async () => {
      const result = (await getPersonas(user)) as Persona[]
      setPersonas(result)
    }
    fetchPersonas()
  }, [setPersonas, user])

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
        user={user}
      />
    </>
  )
}

// The tldraw component shares its App instance via its onMount callback prop.

// The App instance is tldraw's "god object". You can use the app to do
// just about everything that's possible in tldraw. Internally, the canvas
// component and all shapes, tools, and UI components use this instance to
// send events, observe changes, and perform actions.

export default function ChatCanvas({
  user,
  id,
  initialMessages,
  className
}: ChatProps) {
  const { persona, setPersonas } = usePersonaStore()

  const [model, setModel] = useState<Model>(models[0])

  const { messages, append, reload, stop, isLoading, input, setInput, error } =
    useSmolTalkChat({
      initialMessages,
      id,
      body: {
        id,
        model: model,
        persona: persona
      },
      // SWYXTODO: check this 401 issue?
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      experimental_onFunctionCall: functionCallHandler
    })

  useEffect(() => {
    const fetchPersonas = async () => {
      const result = (await getPersonas(user)) as Persona[]
      setPersonas(result)
    }
    fetchPersonas()
  }, [setPersonas, user])

  const isAuthError = error?.message.includes('Unauthorized')

  return (
    <div>
      <CanvasEditor messages={messages} />
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length > 0 ? (
          <>
            {/* <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} /> */}
          </>
        ) : !isLoading ? (
          <EmptyScreen setInput={setInput} />
        ) : null}
      </div>
      {isAuthError && <AlertAuth />}
      <div className="relative z-10">
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
      </div>
    </div>
  )
}

const CanvasEditor = ({ messages }: { messages: any[] }) => {
  const handleMount = (editor: Editor) => {
    editor.selectAll()
    editor.deleteShapes()

    const id = createShapeId('hello')

    editor.focus()

    // Create a shape
    editor.createShapes([
      {
        id,
        type: 'geo',
        x: 0,
        y: 0,
        props: {
          geo: 'rectangle',
          dash: 'draw',
          w: 600,
          color: 'blue',
          size: 's',
          font: 'sans',
          text: 'welcome to smol talk'
        }
      }
    ])

    // Clear the selection
    editor.selectNone()

    // Zoom the camera to fit both shapes
    editor.zoomToContent()
  }

  return (
    <div className="tldraw__editor">
      <Tldraw
        persistenceKey="api-example"
        onMount={handleMount}
        autoFocus={false}
      >
        <InsideOfEditorContext messages={messages} />
      </Tldraw>
    </div>
  )
}

// Another (sneakier) way to access the current app is through React context.
// The Tldraw component provides the context, so you can add children to
// the component and access the app through the useEditor hook.

const InsideOfEditorContext = ({ messages }: { messages: any[] }) => {
  const [chatIds, setChatIds] = useState<string[]>([])
  const editor = useEditor()

  useEffect(() => {
    if (messages.length === 0 || !editor) return

    editor.focus()

    // delete hello shape
    const helloId = createShapeId('hello')
    editor.deleteShapes([helloId])

    // get latest message
    const latestMessage = messages[messages.length - 1]
    const previousMessage = messages[messages.length - 2]

    console.log('latest', latestMessage)
    console.log('previous', previousMessage)

    let latestMessageShape = editor.getShapeById<TLGeoShape>(latestMessage.id)!
    const latestMessageId = createShapeId(latestMessage.id)

    let previousMessageShape
    if (previousMessage) {
      const previousMessageId = createShapeId(previousMessage.id)

      previousMessageShape = editor.getShapeById<TLGeoShape>(previousMessageId)!
    }

    if (latestMessageShape) {
      // update latest message bubble
      editor.updateShapes([
        {
          id: latestMessageId,
          type: 'geo',
          x: previousMessageShape ? previousMessageShape.x : 0,
          y: previousMessageShape
            ? previousMessageShape.props?.h +
              previousMessageShape.props?.growY +
              previousMessageShape.y +
              40
            : 0,
          props: {
            text: latestMessage.content
          }
        }
      ])
    } else {
      // create latest message bubble
      editor.createShapes([
        {
          id: latestMessageId,
          type: 'geo',
          x: previousMessageShape ? previousMessageShape.x : 0,
          y: previousMessageShape
            ? previousMessageShape.props?.h +
              previousMessageShape.props?.growY +
              previousMessageShape.y +
              40
            : 0,
          props: {
            geo: 'rectangle',
            dash: 'draw',
            w: 600,
            ...(latestMessage.role === 'user' && {
              color: 'grey',
              fill: 'solid'
            }),
            size: 's',
            font: 'sans',
            text: latestMessage.content
          }
        }
      ])
      latestMessageShape = editor.getShapeById<TLGeoShape>(latestMessageId)!
    }

    if (previousMessage) {
      // draw a line connecting the two shapes
      const id = createShapeId(previousMessage.id + '_' + latestMessage.id)
      const previousMessageId = createShapeId(previousMessage.id)
      editor.createShapes([
        {
          id,
          type: 'arrow',
          props: {
            start: {
              type: 'binding',
              boundShapeId: previousMessageId,
              normalizedAnchor: {
                x: 0.5,
                y: 1
              },
              isExact: true
            },
            end: {
              type: 'binding',
              boundShapeId: latestMessageId,
              normalizedAnchor: {
                x: 0.5,
                y: 0
              },
              isExact: true
            }
          }
        }
      ])
    }

    // setChatIds(prev => [...prev, id])

    editor.select(latestMessageId)

    editor.zoomToSelection({ duration: 300 })

    // Clear the selection
    editor.selectNone()

    // // set the camera to center the latest content in the middle of the screen
    // editor.setCamera(
    //   latestMessageShape.x + latestMessageShape.props.w / 2,
    //   latestMessageShape.y + latestMessageShape.props.h / 2
    // )
  }, [messages, editor])

  //   useEffect(() => {
  //     let i = 0

  //     const interval = setInterval(() => {
  //       const selection = [...editor.selectedIds]
  //       editor.selectAll()
  //       editor.setProp('color', i % 2 ? 'blue' : 'light-blue')
  //       editor.setSelectedIds(selection)
  //       i++
  //     }, 1000)

  //     return () => {
  //       clearInterval(interval)
  //     }
  //   }, [editor])

  return null
}
