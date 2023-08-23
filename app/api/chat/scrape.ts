import { Database } from '@/lib/db_types'
import { insertArtifact } from '@/lib/supabase-admin'
import { Artifact } from '@/lib/types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import axios from 'axios'
import { cookies } from 'next/headers'

const cheerio = require('cheerio')

export async function scrapePage(url: string, chatId: string) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore
  })

  if (!url) {
    throw new Error('URL is required')
  }

  console.log('scraping...')
  console.log(url)
  if (!url) {
    return new Response('URL is required', {
      status: 400
    })
  }

  try {
    // Fetching the HTML
    const { data } = await axios.get(url)

    // Loading HTML to Cheerio
    const $ = cheerio.load(data)

    // console log the response in a pretty way for the console
    const html = $.html()
    console.log(html)

    console.log('analyzing page data...')
    // get opengraph data
    const ogTitle = $('meta[property="og:title"]').attr('content')
    const ogDescription =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content')
    const ogImage =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="image"]').attr('content')
    const ogUrl =
      $('meta[property="og:url"]').attr('content') ||
      $('meta[name="url"]').attr('content')
    const title = $('title').text() || ogTitle
    const favicon =
      $('link[rel="shortcut icon"]').attr('href') ||
      $('link[rel="icon"]').attr('href') ||
      new URL(url).origin + '/favicon.ico'

    // strip out html tags, javascript and convert to newlines when necessary and only export text
    const body = $('body')
      .text()
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
      .replace(/<\/div>/gm, '\n')
      .replace(/<\/li>/gm, '\n')
      .replace(/<li>/gm, '  *  ')
      .replace(/<\/ul>/gm, '\n')
      .replace(/<\/p>/gm, '\n')
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<[^>]+>/gm, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&#39;/gi, "'")
      .replace(/(.)\n(?!\n)/g, '$1 ')
      // replace many tabs and spaces in a row into 1 tab
      .replace(/\s\s+/g, '\t')
      .trim()

    const metadata = {
      title: title,
      og: {
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
        url: ogUrl
      },
      favicon: favicon
    }

    console.log(metadata)

    console.log(body)

    // strip any analytics and social media tracking tags from url
    const parsedUrl = new URL(url)
    const cleanUrl = parsedUrl.origin + parsedUrl.pathname
    console.log('clean url: ' + cleanUrl)

    const artifact: Artifact = await insertArtifact({
      canonical_url: cleanUrl,
      text_content: body,
      ai_score: 1,
      title: title,
      favicon: favicon
    })

    await supabase
      .from('submissions')
      .insert({
        chat_id: chatId,
        submitted_url: url,
        meta: metadata,
        artifact_id: artifact?.id
      })
      .single()
      .throwOnError()

    console.log('done.')
    return new Response(JSON.stringify({ statusCode: 200, success: true }), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ statusCode: 500, error }), {
      status: 500
    })
  }
}
