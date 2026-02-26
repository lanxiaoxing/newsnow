import { rss2json } from "../utils/rss2json"

export default defineSource(async () => {
  const baseURL = "http://feed.smzdm.com"
  const res = await rss2json(baseURL)
  const items = res?.items || []
  return items.map((k: any) => ({
    id: k.id || k.link,
    title: k.title,
    url: k.link,
    pubDate: k.created,
  }))
})
