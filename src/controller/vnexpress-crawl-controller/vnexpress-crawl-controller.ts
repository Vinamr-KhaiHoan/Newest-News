import { VNEXPRESS_HOMEPAGE, VNEXPRESS_SUBJECT } from './type'
import axios from 'axios'
import cheerio from 'cheerio'

export async function crawlTest(subject: string): Promise<string> {
    subject = VNEXPRESS_SUBJECT.get(subject)

    const url = VNEXPRESS_HOMEPAGE + subject
    try {
        const { data } = await axios.get(url)
        const selector = cheerio.load(data)

        const searchResult = selector('body')
            .find('article .item-news full-thumb article-topstory')

        console.log(searchResult)
        return `searchResult`
    }
    catch (error) {

    }
}
