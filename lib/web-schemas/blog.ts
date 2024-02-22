import type { Article, Person, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";

export const blogSchema: WithContext<Article> = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Title of Your Article",
  "description": "Description of your article.",
  "datePublished": "2024-02-21T08:00:00Z",
  "dateModified": "2024-02-21T08:00:00Z",
  "author": {
    "@type": "Person",
    "name": siteMetadata.title
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourwebsite.com/logo.png",
      // "width": 600,
      // "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": siteMetadata.siteUrl + "/blog/article-slug"
  }
}