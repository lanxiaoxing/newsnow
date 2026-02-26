import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const baseURL = "https://readhub.cn/daily/"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const $main = $(".style_list__UO_gs .style_title__OBXz_")
  const news: NewsItem[] = []

  $main.each((_, el) => {
    const $el = $(el)
    const $a = $el.find("a")
    const url = $a.attr("href")!
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
