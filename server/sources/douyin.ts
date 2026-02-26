interface Res {
  data: {
    trending_list: {
      sentence_id: string
      word: string
      hot_value: string
    }[]
  }
}

export default defineSource(async () => {
  const url = "https://aweme.snssdk.com/aweme/v1/hot/search/list/"
  const res: Res = await myFetch(url)
  return res.data.trending_list.map((k) => {
    return {
      id: k.sentence_id,
      title: k.word,
      url: `https://www.douyin.com/hot/${k.sentence_id}`,
      hot: Number(k.hot_value),
    }
  })
})
