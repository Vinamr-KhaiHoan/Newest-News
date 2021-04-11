import axios from 'axios'
import cheerio from 'cheerio'
import { VIETCETERA_HOMEPAGE, Subject } from './type'

export async function crawlVietcetera(subject: string): Promise<string> {
    subject = Subject.get(subject)

    const url = VIETCETERA_HOMEPAGE + subject
    try {
        const { data } = await axios.get(url)
        const selector = cheerio.load(data)

        const searchResult = selector("body")
            .find("div[id='__next'] > main[class='layout-content ant-layout-content'] > div[class='wrap-content'] > div[class='category-page']")
            .find("div[id='listNewArticle'] > div[id='listPopularArticleMobile'] > div[class='ant-card verticle-card verticle-card-md ant-card-bordered']")
            .find("div[class='ant-card-body']").find('a').attr('href')

        if (!searchResult) {
            return `we don't support this type.`
        }

        return `vietcetera.com` + searchResult

    }
    catch (error) {
        console.log(error)
    }
}
