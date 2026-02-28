import { rss2json } from "../utils/rss2json"

export default defineSource(async () => {
  const url = "https://feeds.bbci.co.uk/news/rss.xml"
  const res = await rss2json(url)
  const items = res?.items || []

  return items.map((item: any) => ({
    id: item.link || item.id,
    title: item.title,
    url: item.link,
    pubDate: item.created,
  }))
})
