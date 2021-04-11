import { VNEXPRESS_HOMEPAGE, VNEXPRESS_SUBJECT } from './type'
import axios from 'axios'
import cheerio from 'cheerio'

export async function crawlVnexpress(subject: string): Promise<string> {
    subject = VNEXPRESS_SUBJECT.get(subject)
    if (subject === null) {
        return null
    }

    const url = VNEXPRESS_HOMEPAGE + subject
    try {
        const { data } = await axios.get(url)
        const selector = cheerio.load(data)

        const searchResult = selector('body')
            .find('section[class="section section_topstory section_topstory_folder"] > div[class="container flexbox"]')
            .find('div[class="col-left-top"] > div[class="wrapper-topstory-folder wrapper-topstory-folder-v2 flexbox width_common"]')
            .find('article[class="item-news full-thumb article-topstory"] > div[class="thumb-art"]')
            .find('a').attr('href')

        console.log(searchResult)
        return searchResult
    }
    catch (error) {
        console.log(error)
    }
}
