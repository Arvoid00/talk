import { auth } from '@/auth';
import { Database } from '@/lib/db_types';
import { ServerActionResult } from '@/lib/types';
import { nanoid } from '@/lib/utils';
import { createRouteHandlerClient, type User } from '@supabase/auth-helpers-nextjs';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { cookies } from 'next/headers';
import { Configuration, OpenAIApi } from 'smolai';
import { Prompt, getPrompts } from '../../actions';

import { envs } from '@/constants/envs';
import Metaphor from 'metaphor-node';

import { processSearchResult, processSearchResultSchema } from "./functions/process-search-results";
import { searchTheWeb, searchTheWebSchema } from "./functions/search-the-web";

import PromptBuilder from './prompt-builder';

export const runtime = 'edge'

const metaphorKey = envs.METAPHOR_API_KEY
export const metaphor = new Metaphor(metaphorKey)

const functionSchema = [
  searchTheWebSchema,
  processSearchResultSchema
]

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore
  })

  const json = await req.json()
  const { messages, previewToken, model } = json
  const currentDate = new Date();

  console.log('chat/route POST', json)

  const userId = (await auth({ cookieStore }))?.user.id

  const promptBuilder = new PromptBuilder()
  const systemPrompt = {
    role: 'system',
    content: promptBuilder
      .addTemplate('intro')
      .addTemplate('tone')
      .addTemplate('webSearch', { date: currentDate.toISOString() })
      .addTemplate('outro')
      .build()
  }

  let storedPrompts: Awaited<ServerActionResult<Prompt[]>>
  if (userId) {
    // @ts-ignore
    storedPrompts = await getPrompts({ id: userId } as User)
    // @ts-ignore
    if (storedPrompts[0].id !== null || storedPrompts.error === undefined) {
      // @ts-ignore
      console.log('storedPrompts', storedPrompts)
      // @ts-ignore
      systemPrompt = storedPrompts?.[0]?.prompt_body
    }
  }

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const configuration = new Configuration({
    apiKey: previewToken || envs.OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)

  const res = await openai.createChatCompletion({
    model: model.id || 'gpt-3.5-turbo',
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

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
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
      console.log('🔴 payload: ', payload)
      // Insert chat into database.
      await supabase.from('chats').upsert({ id, payload }).throwOnError()
    },
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      // if you skip the function call and return nothing, the `function_call`
      // message will be sent to the client for it to handle
      if (name === 'searchTheWeb') {
        console.log('🔵 called searchTheWeb: ', args)

        const results = await searchTheWeb(args.query as string)
        console.log('🟢 results: ', results)

        try {
          JSON.stringify(results);
        } catch (e) {
          console.error('Serialization error: ', e);
        }

        if (results === undefined) {
          return 'Sorry, I could not find anything on the internet about that.'
        }

        // Generate function messages to keep in conversation context.
        // @ts-ignore
        const newMessages = createFunctionCallMessages(results)

        return openai.createChatCompletion({
          messages: [...messages, ...newMessages],
          stream: true,
          model: 'gpt-4-0613',
          functions: functionSchema
        })
      }
      if (name === 'processSearchResult') {
        console.log('🔵 called processSearchResult: ', args)

        // @ts-ignore
        const processedResults = await processSearchResult(args)
        console.log('🟢 processedResults: ', processedResults)

        // Generate function messages to keep conversation context.
        // @ts-ignore
        const newMessages = createFunctionCallMessages(processedResults)
        console.log('🟠 newMessages: ', newMessages)

        return openai.createChatCompletion({
          messages: [...messages, ...newMessages],
          stream: true,
          model: 'gpt-4-0613',
          functions: functionSchema
        })
      }
    }
  })

  return new StreamingTextResponse(stream)
}
