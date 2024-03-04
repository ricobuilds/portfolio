import { Article } from "@/app/types/Article"
import { Topic } from "@/app/types/Topic"
import { fetchAllArticles, fetchTopics } from "@/lib/sanity/queries"
import { siteMetadata } from "@/lib/site.metadata"
import RSS from "rss"

export async function GET() {
  const posts: Article[] = await fetchAllArticles()
  const tags: Topic[] = await fetchTopics()

  const feed = new RSS({
    title: `${siteMetadata.title}'s Blog`,
    description: `Top news & insights around AI Gaming and the Metaverse, by the founder of Metasyde.`,
    site_url: siteMetadata.siteUrl,
    feed_url: `${siteMetadata.siteUrl}/rss`,
    managingEditor: `${siteMetadata.title}`,
    webMaster: `${siteMetadata.title}`,
    copyright: `Copyright © ${new Date().getFullYear()} Enric Trillo (${siteMetadata.siteUrl})`,
    language: "en",
    pubDate: new Date(),
    categories: [...tags
      // @ts-ignore
      .sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
      })
      .map((tag) => (tag.title))]
  })

  posts.forEach((post) => {
    feed.item({
      title: post.name!,
      guid: post._id,
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      date: post.publishedAt!,
      description: post.snippet! ?? null,
      categories: post.tag ? [post.tag.title] : [],
      author: post.author?.name ?? undefined
    })
  })

  return new Response(feed.xml({
    indent: true
  }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    }
  })
}