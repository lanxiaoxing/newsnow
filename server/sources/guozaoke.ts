import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const response: string = await myFetch("https://www.guozaoke.com/", {
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
    },
  })
  if (!response) return []

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
