import type { NewsItem } from "@shared/types"

interface WeatherData {
  message: string
  status: number
  date: string
  time: string
  cityInfo: {
    city: string
    citykey: string
    parent: string
    updateTime: string
  }
  data: {
    shidu: string
    pm25: number
    pm10: number
    quality: string
    wendu: string
    ganmao: string
    forecast: Array<{
      date: string
      high: string
      low: string
      ymd: string
      week: string
      sunrise: string
      sunset: string
      aqi: number
      fx: string
      fl: string
      type: string
      notice: string
    }>
  }
}

export default defineSource({
  wuhan: async () => {
    // 武汉实时天气和7天预报
    try {
      // 使用SOJSON免费天气API - 武汉城市编码: 101200101
      const url = "http://t.weather.sojson.com/api/weather/city/101200101"
      const weatherData: WeatherData = await myFetch(url)

      if (weatherData.status !== 200) {
        throw new Error(`Weather API returned status: ${weatherData.status}`)
      }

      const items: NewsItem[] = []

      // 添加当前天气概况
      items.push({
        id: "current-weather",
        title: `武汉现在 ${weatherData.data.wendu}°C ${weatherData.data.quality}`,
        url: "https://www.weather.com.cn/weather/101200101.shtml",
        extra: {
          info: `湿度${weatherData.data.shidu} PM2.5: ${weatherData.data.pm25}`,
          date: new Date().getTime(),
        },
      })

      // 添加今日全天概况
      const today = weatherData.data.forecast[0]
      const tempLow = today.low.replace("低温 ", "").replace("℃", "")
      const tempHigh = today.high.replace("高温 ", "").replace("℃", "")
      items.push({
        id: "current-detail",
        title: `今日整体 ${today.type} ${tempLow}~${tempHigh}°C`,
        url: "https://www.weather.com.cn/weather/101200101.shtml",
        extra: {
          info: `${today.notice} 日出${today.sunrise} 日落${today.sunset}`,
          date: new Date().getTime(),
        },
      })

      // 添加后续7天预报
      weatherData.data.forecast.forEach((day, index) => {
        if (index === 0) return // 跳过今天，上面已经单独加了详情
        const dLow = day.low.replace("低温 ", "").replace("℃", "")
        const dHigh = day.high.replace("高温 ", "").replace("℃", "")
        const tempRange = `${dLow}~${dHigh}°C`
        const title = `${day.week} ${day.date} ${day.type} ${tempRange}`

        items.push({
          id: `forecast-${index}`,
          title,
          url: "https://www.weather.com.cn/weather15d/101200101.shtml",
          extra: {
            info: `${day.notice} 风力${day.fx}${day.fl}`,
            date: new Date(day.ymd).getTime(),
          },
        })
      })

      return items
    } catch (error) {
      console.error("Failed to fetch Wuhan weather:", error)

      // 备用：返回静态天气信息
      return [{
        id: "weather-error",
        title: "武汉天气数据暂时无法获取",
        url: "https://www.weather.com.cn/weather/101200101.shtml",
        extra: {
          info: "请稍后重试",
          date: new Date().getTime(),
        },
      }]
    }
  },
})
