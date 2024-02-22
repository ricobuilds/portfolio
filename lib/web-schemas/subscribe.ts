import type { WebPage, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";

export const subscribeSchema: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  "name": "Subscribe Page",
  "description": "Description of the Subscribe page.",
  "url": siteMetadata.siteUrl+"/subscribe",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteMetadata.siteUrl
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Subscribe",
      "item": siteMetadata.siteUrl+"/subscribe",
    }]
  },
}