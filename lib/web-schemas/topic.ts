import type { CollectionPage, WebPage, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";

export const topicSchema: WithContext<CollectionPage> = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "AI Articles",
  "description": "Collection of articles related to AI.",
  "url": "https://yourwebsite.com/topic/ai",
}