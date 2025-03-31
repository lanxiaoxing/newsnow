import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const response: any = await myFetch("https://www.smzdm.com/jingxuan/")
  const $ = cheerio.load(response)
  const $main = $("#feed-main-list > li > div > div.z-feed-content > h5.feed-block-title")
  const news: NewsItem[] = []
  $main.each((_, el) => {
    const $el = $(el)
    const $a = $el.find("a")
    const url = $a.attr("href")
    const title = $a.text()
    if (url && title) {
      news.push({
        url,
        title,
        id: url,
      })
    }
  })
  return news
})
