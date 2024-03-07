import { StructuredData } from "@/app/components/structured-data"
import { Topic } from "@/app/types/Topic"
import { baseWidth } from "@/lib/config"
import { sanityQuery } from "@/lib/sanity/utils"
import { cn } from "@/lib/shared-utils"
import { siteMetadata } from "@/lib/site.metadata"
import { Metadata } from "next"
import { Kanit } from "next/font/google"
import Link from "next/link"
import { ItemList, WithContext } from "schema-dts"

const title = "Browse AI Gaming & Metaverse Topics"
const description = "Stay up to date with the latest in marketing and browse through hundreds of marketing articles, videos, and resources."

export const metadata: Metadata = {
  title,
  description
}

const schema: WithContext<ItemList> = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "url": siteMetadata.siteUrl + "/topic",
  "name": "Topics",
  "description": description,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": siteMetadata.siteUrl + "/ar-vr",
      "name": "AR + VR"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": siteMetadata.siteUrl + "/ai",
      "name": "Artificial Intelligence"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": siteMetadata.siteUrl + "/blockchain",
      "name": "Blockchain"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "url": siteMetadata.siteUrl + "/gaming",
      "name": "Gaming"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "url": siteMetadata.siteUrl + "/haptic",
      "name": "Haptic"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "url": siteMetadata.siteUrl + "/metaverse",
      "name": "Metaverse"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "url": siteMetadata.siteUrl + "/robotics",
      "name": "Robotics"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "url": siteMetadata.siteUrl + "/web",
      "name": "Web"
    },
  ]
}

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export default async function Topics() {
  const topics: Topic[] = await sanityQuery(`*[_type == "topic"]{
    _id,
    title,
    description,
    "slug": slug.current
  }`)

  return (
    <>
      <StructuredData data={schema} />
      <main className="w-full px-6">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">Topics</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {
                // @ts-ignore
                topics.sort((a, b) => {
                  // @ts-ignore
                  if (a?.title < b?.title) {
                    return -1;
                  }
                  // @ts-ignore
                  if (a?.title > b?.title) {
                    return 1;
                  }
                }).map((topic) => (
                  <div key={topic._id} className="p-3 bg-obsidian-100 hover:ring-2 hover:ring-offset-4">
                    <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>{topic.title}</h2>
                    <p className="mb-6 text-obsidian-500">{topic.description}</p>
                    <Link href={`/topic/${topic.slug}`}>
                      <button className="w-full py-2 text-center text-white bg-charkol">See all articles</button>
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}