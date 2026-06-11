import { it, expect } from "vitest"
import guozaoke from "../server/sources/guozaoke"

it("fetches and parses guozaoke items correctly", async () => {
  const news = await guozaoke()
  expect(news).toBeInstanceOf(Array)
  expect(news.length).toBeGreaterThan(0)
  for (const item of news) {
    expect(item.title).toBeTruthy()
    expect(item.url).toMatch(/^https:\/\/www\.guozaoke\.com\/t\/\d+$/)
    expect(item.id).toBe(item.url)
    if (item.extra?.info) {
      expect(item.extra.info).toMatch(/^\d+ 回复$/)
    }
  }
})
