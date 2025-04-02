import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const response: any = await myFetch("https://www.washingtonpost.com/", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    },
  })
  const $ = cheerio.load(response)
  const $main = $("#main-content > div.multi-table-chain > div.chain > div.table-in-grid > div.card > div.left.wrap-text > div.card-left.card-text > div.headline > h2 ")
  const news: NewsItem[] = []
  $main.each((_, el) => {
    const $el = $(el)
    const $a = $el.find("a")
    const url = $a.attr("href")
    const title = $a.find("span").text()
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
