import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const response: any = await myFetch("https://www.guozaoke.com/", {
    responseType: "text",
  })
  const $ = cheerio.load(response)
  const $main = $("div.topics > div.topic-item > div.main > h3.title")
  const news: NewsItem[] = []
  $main.each((_, el) => {
    const $el = $(el)
    const $a = $el.find("a")
    const url = new URL($a.attr("href")!, "https://www.guozaoke.com").toString()
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
