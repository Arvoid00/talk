import { Database } from '@/lib/db_types'
// import { type Message } from 'ai'
import { ChatCompletionFunctions } from 'smolai'

export type Product = Database['public']['Tables']['products']['Row']
export type Price = Database['public']['Tables']['prices']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Customer = Database['public']['Tables']['customers']['Row']
export type Persona = Database['public']['Tables']['personas']['Row']
// export type Chat = Database['public']['Tables']['chats']['Row']
export type Submission = Database['public']['Tables']['submissions']['Row']
export type Artifact = Database['public']['Tables']['artifacts']['Row']

// NOTE: Updating SmolTalkMessage to reflect our new definition (below)
// export type SmolTalkMessage = Message & {
//   messageAuthor_id?: string
// }

// TODO refactor and remove unneccessary duplicate data.
// export interface Chat extends Record<string, any> {
//   chat_id: string
//   title: string
//   createdAt: number
//   userId: string
//   path: string
//   messages: SmolTalkMessage[]
//   sharePath?: string // Refactor to use RLS
// }

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export type PromptTemplateValues = {
  date?: Date
  personaName?: string
  personaBody?: string
}

export type TemplateFunction = (values?: PromptTemplateValues) => string

/**
 * Process search results metaphor function.
 */
export const processSearchResultSchema: ChatCompletionFunctions = {
  name: 'processSearchResult',
  description:
    'Read the contents of the first or next search result and return it along with the remaining search results.',
  parameters: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'The title of the search result.'
      },
      url: {
        type: 'string',
        description: 'The URL of the search result.'
      },
      publishedDate: {
        type: 'string',
        description: 'The date the search result was published.'
      },
      author: {
        type: 'string',
        description: 'The author of the search result.'
      },
      score: {
        type: 'number',
        descripion:
          'Relevance score of the search result on a scale of 0 to 1, with 1 being the most relevant.'
      },
      id: {
        type: 'string',
        description: 'Unique identifier for the search result.'
      }
    },
    required: ['title', 'url', 'id']
  }
}

/**
 * Search the web metaphor function.
 */
export const searchTheWebSchema: ChatCompletionFunctions = {
  name: 'searchTheWeb',
  description:
    'Perform a web search and returns the top 20 search results based on the search query.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The query to search for.'
      }
    },
    required: ['query']
  }
}

/**
 * Tuple of all metaphor functions.
 */
export const functionSchema = [searchTheWebSchema, processSearchResultSchema]

export interface UserKvData {
  userMsgCount: number
  userWindowStart: Date
}

// export type MessageAuthor =
//   | 'user'
//   | 'assistant'
//   | 'fnCall'
//   | 'fnResponse'
//   | 'error'

export type ID = string

export interface Author {
  id: ID
  userId?: ID
  personaId: ID
  createdAt: Date
  deletedAt?: Date
}

export interface FunctionCall {
  name: string
  arguments: string
}

export interface BaseMessage {
  id: string
  chatId?: string
  fromAuthor?: Author
  toAuthor?: Author
  role: 'user' | 'assistant' | 'function' | 'system'
  functionCall?: FunctionCall
  content: string
  createdAt?: Date
  deletedAt?: Date
}

export type AssistantMessage = BaseMessage & {
  role: 'assistant'
  assistantMessageType: 'log' | 'error'
  assistantMessageDetails: string
}

export type SmolTalkMessage = BaseMessage | AssistantMessage

export interface Chat {
  id: ID
  userId: string
  title: string
  messages: SmolTalkMessage[]
  path: string
  sharePath?: string // Refactor to use RLS
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
