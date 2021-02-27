import axios from 'axios'
import cheerio from 'cheerio'
import { Request, Response } from 'express'
import { Subject, VIETCETERA_HOMEPAGE } from './types'

export async function execute(req: Request, res: Response): Promise<Response> {
    let subject = req.query.subject as string

    if (!Subject.has(subject)) {
        return res.status(500).json({
            message: "Xin loi chatbot ko ho tro chuyen muc nay."
        })
    }

    subject = Subject.get(subject)

    const url = VIETCETERA_HOMEPAGE + subject
    try {
        const { data } = await axios.get(url)
        const selector = cheerio.load(data)

        const searchResult = selector("body")
            .find("div[id='__next'] > main[class='layout-content ant-layout-content'] > div[class='wrap-content'] > div[class='category-page']")
            .find("div[id='listNewArticle'] > div[id='listPopularArticleMobile'] > div[class='ant-card verticle-card verticle-card-md ant-card-bordered']")
            .find("div[class='ant-card-body']").find('a').attr('href')

        return res.status(200).json({ url: `https://vietcetera.com/vn/chuyen-muc` + searchResult })

    }
    catch (error) {
        console.log(error)
    }
}
