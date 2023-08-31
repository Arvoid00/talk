import { getIsSubscribed, getPersonaById } from '@/app/actions'
import { Database } from '@/lib/db_types'
import {
  createRouteHandlerClient,
  type User
} from '@supabase/auth-helpers-nextjs'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { cookies } from 'next/headers'
import 'server-only'
import { Configuration, OpenAIApi } from 'smolai'
import { functionSchema, SmolTalkMessage, type UserKvData } from 'lib/types'

import { auth } from '@/auth'
import { Persona } from '@/constants/personas'
import { nanoid } from '@/lib/utils'
import { kv } from '@vercel/kv'
// import { z } from 'zod'
// import { zValidateReq } from '@/lib/validate'

import { getURL } from '@/lib/helpers'
import { ChatCompletionFunctions } from 'smolai'
import PromptBuilder from './prompt-builder'
import { TransformStream } from 'stream/web'
import { scrapePage } from '@/app/api/chat/scrape'
import { FREE_LIMIT, PAID_LIMIT, WINDOW_SIZE } from '@/constants/rate-limits'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore
  })

  const json = await req.json()
  const { messages, previewToken, model, persona } = json

  const currentDate = new Date()

  const user = (await auth({ cookieStore }))?.user
  const userId = user?.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  /* ========================================================================== */
  /* Rate Limiter                                                               */
  /* ========================================================================== */

  // Constants for rate limiting
           // Requests per hour
  const now = Date.now()

  const defaultKvData: UserKvData = {
    userWindowStart: now,
    userMsgCount: 0
  }

  const userRateLimit = await getIsSubscribed(user)
    ? PAID_LIMIT
    : FREE_LIMIT

  // Hack to reset kv data for testing
  // let userKvData = defaultKvData;

  let userKvData: UserKvData | null = await kv.get(userId);
  if (userKvData === null) userKvData = defaultKvData;

  console.log('/api/chat/route.tsx > userKvData', userKvData)

  const isWithinWindow = now - userKvData.userWindowStart < WINDOW_SIZE;

  if (isWithinWindow && userKvData.userMsgCount >= userRateLimit) {
    return new Response('Too many requests', { status: 429 });
  } else {
    userKvData.userMsgCount++;
    await kv.set(userId, userKvData);
  }

  console.log('/api/chat/route.tsx > userKvData', userKvData)

  /* End Rate Limiter --------------------------------------------------------- */

  /*
   * Create the system prompt from modular templates in prompts.json.
   */
  const promptBuilder = new PromptBuilder()
    .addTemplate('intro')
    .addTemplate('tone')
    .addTemplate('webSearch', { date: currentDate })
    .addTemplate('outro')

  if (userId && persona?.id) {
    const storedPersona = await getPersonaById(
      { id: userId } as User,
      { id: persona.id } as Persona
    )

    // @ts-ignore
    if (storedPersona?.error) {
      // @ts-ignore
      console.error(storedPersona.error)
      return
    }

    // @ts-ignore
    if (storedPersona?.id !== null) {
      promptBuilder.addTemplate('customPersona', {
        // @ts-ignore
        personaName: storedPersona.prompt_name,
        // @ts-ignore
        personaBody: storedPersona.prompt_body
      })
    }
  }

  const systemPrompt = {
    role: 'system',
    content: promptBuilder.build()
  }

  const configuration = new Configuration({
    apiKey: previewToken || process.env.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)

  const res = await openai.createChatCompletion({
    model: model.id || 'gpt-4-0613',
    messages: [
      systemPrompt,
      // personaPrompts,
      ...messages
    ],
    functions: functionSchema,
    temperature: 0.5,
    stream: true
  })

  for (const [key, value] of Object.entries(res.headers)) {
    console.log(key + ': ' + value)
  }

  let id = json.id ?? nanoid()
  const title = json.messages[0].content.substring(0, 100)
  const createdAt = Date.now()
  const path = `/chat/${id}`
  let payload = {
    id,
    title,
    userId,
    createdAt,
    path,
    // TODO: store persona at the chat level
    // otherwise we don't know what the prompt
    // is at the time of sending the message
    messages: [...messages]
  }

  const checkIfChatExists = async (chatId: string) => {
    const { data } = await supabase
      .from('chats')
      .select('id')
      .eq('id', chatId)
      .single()

    return data?.id ? true : false
  }

  const extractUrlArray = async (content: string) => {
    const regex = /https?:\/\/\S+/gi
    const found = messages[0]?.content?.match(regex)
    console.log(found)

    if (found && found.length > 0) {
      found.map((url: string) => {
        console.log('✅', url) // Output the first URL found
      })

      return found
    } else {
      console.log('No URL found')
      return null
    }
  }

  // if this is the first message in a chat,
  // check if the chat id already exists
  if (messages?.length === 1) {
    // while loop to check if chat id exists
    // if it does, generate a new id
    while (await checkIfChatExists(id)) {
      id = nanoid()
      payload = {
        ...payload,
        id,
        path: `/chat/${id}`
      }
    }

    await supabase.from('chats').insert({ id, payload }).throwOnError()

    // extract the first url from the first message
    const extractedUrls = await extractUrlArray(messages[0]?.content)

    if (extractedUrls) {
      // create multiple submissions
      extractedUrls.map(async (url: string) => {
        await scrapePage(url, id)
          .then(res => res.json())
          .then(data => data)
          .catch(err => console.error(err))

        // length of string divided by 4 is the number of tokens
      })
    }
  } else {
    await supabase.from('chats').update({ payload }).eq('id', id).throwOnError()
  }

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      console.log(payload)

      // Insert chat into database.
      await supabase.from('chats').upsert({ id, payload }).throwOnError()
    }
  })

  return new StreamingTextResponse(stream)
}
