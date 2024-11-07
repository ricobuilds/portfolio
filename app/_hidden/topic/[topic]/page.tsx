import { baseWidth } from "@/constants"
import { cn } from "@/lib/shared-utils"
import { siteMetadata } from "@/lib/site.metadata"
import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { WithContext, WebPage } from "schema-dts"
import { StructuredData } from "@/components/structured-data"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export async function generateStaticParams() {
  const topics: any = []

  return topics.map((topic: any) => ({
    topic: topic.slug
  }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {

  // const clusters = await fetchTopics() //deduped
  const { topic } = params
  const cluster: any = []

  if (!cluster) return { title: 'Page not found' }

  return {
    title: cluster.title,
    description: cluster.description,
    alternates: {
      canonical: siteMetadata.siteUrl + "/topic/" + params.topic,
    },
    openGraph: {
      locale: 'en_GB',
      title: cluster.title,
      type: 'website',
      url: siteMetadata.siteUrl + "/topic/" + params.topic,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3001"}/base-og.png`,
      description: cluster.description,
      siteName: siteMetadata.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: cluster.title,
      description: cluster.description,
      creator: '@ricobuilds',
      site: '@ricobuilds',
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3001"}/base-og.png`,
    },
    robots: "index, follow"
  }
}

export const revalidate = 3600

export default async function Page({ params }: { params: { topic: string } }) {

  const { topic } = params

  const cluster: any = []
  if (!cluster) {
    notFound()
  }

  const topicSchema: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    "name": cluster.title,
    "description": cluster.description ?? "",
    "url": siteMetadata.siteUrl + "/topic/" + cluster.slug,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteMetadata.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Topics",
          "item": siteMetadata.siteUrl + "/topic",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": cluster.title,
          "item": siteMetadata.siteUrl + "/topic/" + cluster.slug,
        }
      ]
    },
  }

  // const topicBreadcrumbSchema: WithContext<BreadcrumbList> = {
  //   "@context": "https://schema.org",
  //   "@type": "BreadcrumbList",
  //   "itemListElement": [
  //     {
  //       "@type": "ListItem",
  //       "position": 1,
  //       "name": "Home",
  //       "item": siteMetadata.siteUrl
  //     },
  //     {
  //       "@type": "ListItem",
  //       "position": 2,
  //       "name": cluster.title,
  //       "item": siteMetadata.siteUrl + "/topic/" + cluster.slug,
  //     }
  //   ]
  // }

  return (
    <>
      <StructuredData data={topicSchema} />
      {/* <StructuredData data={topicBreadcrumbSchema} /> */}
      <main className={cn(baseWidth, "pt-20 mx-auto flex-1 px-6")}>
        <h1 className={cn(
          "text-4xl lg:text-6xl font-bold lowercase",
          "text-charkol",
        )}><span className="mr-2">/</span>{cluster?.title}</h1>
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
    </>
  )
}