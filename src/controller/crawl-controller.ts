import axios from 'axios'
import cheerio from 'cheerio'
import { ResponseInput, FACEBOOK_SEND_MESSAGE_URL, FACEBOOK_VERIFIED_TOKEN } from './types'
import { crawlVietcetera } from './vietceteta-crawl-controller/vietcetera-crawl-controller'
import { crawlVnexpress } from './vnexpress-crawl-controller/vnexpress-crawl-controller'

export async function crawlAll(subject: string): Promise<string[]> {
    let url: string[] = []

    const vietceteraUrl = await crawlVietcetera(subject)
    if (vietceteraUrl) {
        url.push(vietceteraUrl)
    }

    const vnexpressUrl = await crawlVnexpress(subject)
    if (vnexpressUrl) {
        url.push(vnexpressUrl)
    }


    return url
}


export async function sendMessage(data: ResponseInput): Promise<void> {
    console.log(`post data`)

    const url = `${FACEBOOK_SEND_MESSAGE_URL}=${FACEBOOK_VERIFIED_TOKEN}`
    console.log(`url: `, url, `data `, data)
    const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" }
    })
}
