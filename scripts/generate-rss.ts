import { writeFileSync } from 'fs'
import RSS from "rss"
import { siteMetadata } from '@/lib/site.metadata'
import { getAllPosts } from '@/lib/mdx'
import { MDXArticle } from '@/app/types/Article'

async function generateRssFeed() {
  const feedOptions = {
    title: siteMetadata.title,
    description: "Top insights & developments in disruptive technologies to thrive in your profession and business in an AI-driven world.",
    site_url: siteMetadata.siteUrl,
    feed_url: `${siteMetadata.siteUrl}/rss.xml`,
    language: "en",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()},${siteMetadata.title}`,
  }

  const feed = new RSS(feedOptions)

  const allPosts: MDXArticle[] = await getAllPosts()

  allPosts.forEach((p) => {
    feed.item({
      guid: `${siteMetadata.siteUrl}/blog/${p.slug}`,
      title: p.title,
      url: `${siteMetadata.siteUrl}/blog/${p.slug}`,
      date: p.date,
      description: p.description,
      categories: p.tags,
      author: p.author
    })
  })

  writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}

generateRssFeed()
  .then(() => console.log('RSS feed generated successfully'))
  .catch((err) => {
    console.error('An error occurred while generating RSS feed:', err)
    process.exit(1)
  })