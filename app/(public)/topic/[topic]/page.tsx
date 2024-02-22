import { baseWidth } from "@/lib/config"
import { sanityQuery } from "@/lib/sanity/client"
import { getTopics } from "@/lib/sanity/queries"
import { cn } from "@/lib/shared-utils"
import { siteMetadata } from "@/lib/site.metadata"
import { Cluster } from "@/app/types/Cluster"
import { Metadata, Viewport } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { WithContext, WebPage } from "schema-dts"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

async function getTags() {
  const query = await sanityQuery(getTopics)
  // console.log(query)
  return query
}

export async function generateStaticParams() {
  const topics = await getTags() //deduped

  return topics.map((topic: Cluster) => ({
    topic: topic.slug
  }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {

  const clusters = await getTags() //deduped
  const { topic } = params
  const cluster: Cluster = clusters.find((p: Cluster) => p.slug === topic)

  if (!cluster) return { title: 'Issue not found!' }

  return {
    title: cluster.title,
    description: cluster.description,
    authors: [
      {
        name: siteMetadata.title,
        url: siteMetadata.siteUrl
      }
    ],
    openGraph: {
      locale: 'en_GB',
      title: cluster.title,
      type: 'article',
      url: siteMetadata.siteUrl + "/topic/" + params.topic,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=Blog: ${cluster.title}`,
      description: cluster.description,
      siteName: siteMetadata.title,
      authors: "Enric Trillo"
    },
    twitter: {
      card: 'summary_large_image',
      title: cluster.title,
      description: cluster.description,
      creator: '@ricobuilds',
      site: '@ricobuilds',
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${cluster.title}`,
    },
    robots: "index, follow"
  }
}

export default async function Page({ params }: { params: { topic: string } }) {

  const topics = await getTags() //deduped
  const { topic } = params

  if (!topics.find((p: Cluster) => p.slug === (topic))) return notFound()

  // if (topics.find((p: Cluster) => p.slug === topic && p.articles.length === 0)) return notFound()

  const cluster = topics.find((p: Cluster) => p.slug === topic)

  if (!cluster) {
    notFound()
  }

  const blogSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
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
      "name": "Enric",
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

  return (
    <main className={cn(baseWidth, "pt-32 mx-auto")}>
      <h1 className={cn(
        "text-4xl lg:text-6xl font-bold",
        "text-charkol",
      )}>{cluster?.title}</h1>
      <p>{cluster.description}</p>
      {/* <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2">
        { 
          // @ts-ignore
          cluster.articles.sort((a: Article, b: Article) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 8).map((item: Article) => (
            // Display title, link, etc
            <div key={item._id}>
              <Link href={`/blog/${item.slug}`} className="flex flex-col gap-2 p-1 rounded-lg focus:outline-celuria-400">
                <div className="relative">
                  <Image src={`${siteMetadata.siteUrl}/og?title=${item.name}`} width={1200} height={630} priority alt={item.name + "－ Promptoor"} className="border rounded-md" />
                </div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-obsidian-600">{item.snippet}.</p>
                <p className="flex flex-col">
                  <small className="font-light text-obsidian-600">{timeSince(item.publishedAt)}</small>
                </p>
              </Link>
            </div>
          ))}
      </div> */}
    </main>
  )
}