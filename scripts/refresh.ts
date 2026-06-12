import sources from "../shared/sources.json"

Promise.all(Object.keys(sources).map(id =>
  fetch(`https://news.myproject2026.xyz/api/s?id=${id}`),
)).catch(console.error)
