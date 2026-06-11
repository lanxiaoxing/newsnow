import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const response: any = await myFetch("https://www.guozaoke.com/")
  const $ = cheerio.load(response)
  const $topicItems = $("div.topics > div.topic-item")
  const news: NewsItem[] = []
  $topicItems.each((_, el) => {
    const $item = $(el)
    const $a = $item.find("div.main > h3.title > a")
    const rawHref = $a.attr("href")
    if (!rawHref) return
    const cleanHref = rawHref.split("#")[0]
    const url = new URL(cleanHref, "https://www.guozaoke.com").toString()
    const title = $a.text().trim()
    const replyCountText = $item.find("div.count").text().trim()
    const info = replyCountText ? `${replyCountText} 回复` : ""
    if (url && title) {
      news.push({
        url,
        title,
        id: url,
        extra: {
          info: info || undefined,
        },
      })
    }
  })
  return news
})
