const cheerio = require('cheerio')
import { auth } from '@/auth'
import { Database } from '@/lib/db_types'
import { insertArtifact } from '@/lib/supabase-admin'
import { Artifact } from '@/lib/types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import chrome from 'chrome-aws-lambda'
import { cookies } from 'next/headers'
import puppeteer from 'puppeteer-core'

/** The code below determines the executable location for Chrome to
 * start up and take the screenshot when running a local development environment.
 *
 * If the code is running on Windows, find chrome.exe in the default location.
 * If the code is running on Linux, find the Chrome installation in the default location.
 * If the code is running on MacOS, find the Chrome installation in the default location.
 * You may need to update this code when running it locally depending on the location of
 * your Chrome installation on your operating system.

 via https://www.contentful.com/blog/2021/03/17/puppeteer-node-open-graph-screenshot-for-socials/
*/

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const getOptions = async () => {
  let options
  if (process.env.NODE_ENV === 'production') {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  } else {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    }
  }
  return options
}

const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore
  })

  const userId = (await auth({ cookieStore }))?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  console.log('environment mode: ' + process.env.NODE_ENV)

  console.log('scraping...')

  const json = await req.json()

  const url = json.url
  const chatId = json.chatId
  const properties = json.properties || []
  const delay = json.delay || 4000

  console.log(url)
  if (!url) {
    return new Response('URL is required', {
      status: 400
    })
  }

  if (req.method === 'POST') {
    try {
      console.log('configuring chrome...')
      const options = await getOptions()

      console.log('launching browser...')
      const browser = await puppeteer.launch(options)

      console.log('opening new page...')
      const page = await browser.newPage()

      console.log('setting request interception...')
      await page.setRequestInterception(true)
      page.on('request', request => {
        const reqType = request.resourceType()
        if (reqType === 'document') {
          request.continue()
        } else if (process.env.NODE_ENV === 'development') {
          request.continue()
        } else {
          console.log('block request type: ' + request.resourceType())
          request.abort()
        }
      })

      console.log('navigating to ' + url + '...')
      await page
        .goto(url, { timeout: 10000, waitUntil: 'networkidle0' })
        .then(async response => {
          console.log('url loaded') //WORKS FINE
        })
        .catch(async err => {
          console.log('url not loaded') //WORKS FINE
          console.log(err)
        })

      if (process.env.NODE_ENV === 'development') {
        await sleep(4000)
        console.log('add delay for javascript update')
      }

      console.log('get page content...')

      const html =
        process.env.NODE_ENV === 'development'
          ? await page.content()
          : await page.evaluate(() => {
              return document.querySelector('body')?.innerHTML
            })

      console.log('parse html...')
      const $ = cheerio.load(html)

      console.log('analyzing page data...')
      // get opengraph data
      const ogTitle = $('meta[property="og:title"]').attr('content')
      const ogDescription = $('meta[property="og:description"]').attr('content')
      const ogImage = $('meta[property="og:image"]').attr('content')
      const ogUrl = $('meta[property="og:url"]').attr('content')
      const title = $('title').text()
      const favicon = $('link[rel="shortcut icon"]').attr('href')

      // strip out html tags, convert to newlines when necessary and only export text and href links
      const body = $('body')
        .text()
        .replace(/(<([^>]+)>)/gi, '\n')
        .replace(/\n{3,}/g, '\n')
        .trim()

      console.log('closing browser...')
      await browser.close()

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
      return new Response(JSON.stringify({ statusCode: 200, html }), {
        status: 200
      })
    } catch (error) {
      return new Response(JSON.stringify({ statusCode: 500, error }), {
        status: 500
      })
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    })
  }
}
