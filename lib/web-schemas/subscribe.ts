import type { WebPage, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";

const subscribeSchema: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  mainEntity: {
    '@type': "SubscribeAction",
    name: "Astronomik Insights Weekly Newsletter",
    target: {
      '@type': "EntryPoint",
      "url": "https://enrictrillo.com/subscribe",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
      ]
    }
  }
}

export { subscribeSchema }