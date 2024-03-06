import { Article } from "@/app/types/Article"
import { Topic } from "@/app/types/Topic"
import { sanityQuery } from "@/lib/sanity/utils"
import { siteMetadata } from "@/lib/site.metadata"
import RSS from "rss"

export async function GET() {
  const posts: Article[] = await sanityQuery(`*[_type == "article"] | order(publishedAt desc){
    _id,
    title,
    description,
    publishedAt,
    "slug": slug.current,
    "tag": tag->{title},
    "author": author->{name}
  }`)
  const topics: Topic[] = await sanityQuery(`*[_type == "topic"]{
    title
  }`)

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
    // @ts-ignore
    categories: [...topics
      // @ts-ignore
      .sort((a, b) => {
        // @ts-ignore
        if (a.title < b.title) {
          return -1;
        }
        // @ts-ignore
        if (a.title > b.title) {
          return 1;
        }
      })
      .map((tag) => (tag.title))]
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title as string,
      guid: post._id,
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      date: post.publishedAt as string,
      description: post.description as string ?? null,
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