'use server'
import 'server-only'

import { Database } from '@/lib/db_types'
import {
  createServerActionClient,
  type User
} from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { Persona } from '@/constants/personas'
import { Artifact, type Chat } from '@/lib/types'

function nanoid() {
  return Math.random().toString(36).slice(2) // random id up to 11 chars
}

export async function upsertChat(chat: Chat) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })

  const { error } = await supabase.from('chats').upsert({
    id: chat.id || nanoid(),
    user_id: chat.userId,
    payload: chat.toString() // must stringify or JSON type complains. TODO: check that this JSON.parses properly.
  })
  if (error) {
    console.log('upsertChat error', error)
    return {
      error: 'Unauthorized'
    }
  } else {
    return null
  }
}

export async function getArtifacts() {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })

    const { data } = await supabase.from('artifacts').select()
    // .order('created_at', { ascending: false })
    // .throwOnError()

    return (data as Artifact[]) ?? []
  } catch (error) {
    console.log('get artifacts error', error)
    return []
  }
}

export async function getArtifact(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('artifacts')
    .select('title, favicon, canonical_url, text_content')
    .eq('id', id)
    .maybeSingle()

  return (data as Artifact) ?? null
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    const { data } = await supabase
      .from('chats')
      .select('payload')
      .order('payload->createdAt', { ascending: false })
      .eq('user_id', userId)
      .throwOnError()

    return (data?.map(entry => entry.payload) as unknown as Chat[]) ?? []
  } catch (error) {
    return []
  }
}

export async function getChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('chats')
    .select('payload')
    .eq('id', id)
    .maybeSingle()

  return (data?.payload as unknown as Chat) ?? null
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    await supabase.from('chats').delete().eq('id', id).throwOnError()

    revalidatePath('/')
    return revalidatePath(path)
  } catch (error) {
    return {
      error: 'Unauthorized'
    }
  }
}

export async function clearChats() {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })

    const userId = (await supabase.auth.getUser())?.data?.user?.id

    if (!userId) {
      return {
        error: 'Unauthorized'
      }
    }

    await supabase.from('chats').delete().eq('user_id', userId).throwOnError()
    revalidatePath('/')
    return revalidatePath('/')
  } catch (error) {
    console.log('clear chats error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function getSharedChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('chats')
    .select('payload')
    .eq('id', id)
    .not('payload->sharePath', 'is', null)
    .maybeSingle()

  return (data?.payload as unknown as Chat) ?? null
}

export async function shareChat(chat: Chat) {
  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  await supabase
    .from('chats')
    .update({ payload: payload as any })
    .eq('id', chat.id)
    .throwOnError()

  return payload
}

export async function getIsSubscribed(user: User) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })

    const { data, error } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', user.id)
      .filter('status', 'in', '("active", "trialing")')
      .is('deleted_at', null)
      .maybeSingle()
  } catch (error) {
    console.log('get is subscribed error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function getPersonas(user: User) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })

    const { data, error } = await supabase
      .from('personas')
      .select('id, name, body, emoji')
      .order('created_at', { ascending: true })
      .eq('user_id', user.id)
      .is('deleted_at', null)

    const personas: Persona[] = data || []

    return personas
  } catch (error) {
    console.log('get personas error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function getPersonaById(user: User, persona: Persona) {
  try {
    if (!persona?.id) {
      return null
    }

    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })

    const { data, error } = await supabase
      .from('personas')
      .select('id, name, body, emoji')
      .eq('user_id', user.id)
      .eq('id', persona.id)
      .is('deleted_at', null)
      .maybeSingle()

    const storedPersona: Persona | null = data || null

    return storedPersona
  } catch (error) {
    console.log('get persona by ID error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function createOrUpdatePersona({
  values,
  user
}: {
  values: { [x: string]: any }
  user: User
}) {
  try {
    // userData will update auth.users table
    const personaData = {
      id: values.id,
      name: values.name,
      body: values.body,
      emoji: values.emoji
    }

    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })

    let result

    if (personaData.id) {
      console.log('update persona', personaData)
      result = await supabase
        .from('personas')
        .update({
          user_id: user.id,
          name: personaData.name,
          body: personaData.body,
          emoji: personaData.emoji
        })
        .eq('id', personaData.id)
        .is('deleted_at', null)
        .select()
    } else {
      result = await supabase
        .from('personas')
        .insert({
          user_id: user.id,
          name: personaData.name,
          body: personaData.body,
          emoji: personaData.emoji
        })
        .eq('user_id', user.id)
        .select()
    }
    const { data: personaResponse, error } = result

    if (error) {
      console.log('Error updating or adding persona:', error)
    }

    return {
      data: {
        personas: personaResponse
      }
    }
  } catch (error) {
    console.log('update persona error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function removePersona({ id, user }: { id: string; user: User }) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })

    const { data: personaResponse, error } = await supabase
      .from('personas')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.log('Error deleting persona:', error)
    }

    return {
      data: {
        personas: personaResponse
      }
    }
  } catch (error) {
    console.log('remove persona error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function updateUser({
  values,
  user
}: {
  values: { [x: string]: any }
  user: User
}) {
  try {
    // userData will update auth.users table
    const userData = {
      username: values.username,
      email: values.email
    }

    if (userData.email) {
      const cookieStore = cookies()
      const supabase = createServerActionClient<Database>({
        cookies: () => cookieStore
      })

      await supabase.auth.updateUser({ email: userData.email })
    }

    // TODO: update username
    // if (userData.username) {
    //   const cookieStore = cookies()
    //   const supabase = createServerActionClient<Database>({
    //     cookies: () => cookieStore
    //   })

    //   await supabase.auth.updateUser({
    //     data: { user_name: userData.username }
    //   })
    // }

    return {
      data: {
        user: {
          ...user,
          ...userData
        }
      }
    }
  } catch (error) {
    console.log('update user error', error)
    return {
      error: 'Unauthorized'
    }
  }
}
