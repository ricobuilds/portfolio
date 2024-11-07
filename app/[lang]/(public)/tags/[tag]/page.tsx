import { cn, convertDate } from "@/lib/shared-utils"
import Link from "next/link"
import { baseWidth } from "@/constants"
import { MDXArticle } from "@/app/types/Article"
import Image from "next/image"
import { extractSlug, formatTag, getAllPosts } from "@/lib/mdx"
import { generateMetadata as genMetadata } from "@/lib/seo"
import data from "@/tag-data.json"
import { notFound } from "next/navigation"
import { BlogCard } from "@/components/blog-card"
import { Locale } from "@/constants/i18n.config"

export async function generateStaticParams() {

  const tags = Object.keys(data)

  return tags.map((slug) => ({
    tag: slug
  }))
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<any> {

  const tag = params.tag.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  const metadata = genMetadata({
    title: `${tag} Articles`,
    description: `Discover Enric Trillo's latest ${tag}-related blog posts. Stay updated with articles, insights, and resources to thrive in the AI-driven world.`,
    keywords: "disruptive technology, full stack developer, blog, tech insights"
  })
  return metadata
}

export default async function Tag({ params }: { params: { tag: string, lang: Locale} }) {

  const posts: MDXArticle[] = getAllPosts()
  const formattedTag = formatTag(params.tag)
  const filtered = posts.filter((p) => p.tags?.some(tag => formatTag(tag) === formattedTag))

  return (
    <>
      {/* <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} /> */}
      <main className="w-full px-6">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">Posts tagged {`"${params.tag}"`}</h1>
            {
              filtered.length > 0 ? (
                <ul className="grid w-full gap-8 md:grid-cols-2">
                  {
                    filtered.map((post) => (
                      <li key={post.slug}>
                        <BlogCard post={post} lang={params.lang} />
                      </li>
                    ))
                  }
                </ul>
              ) : notFound()
            }
          </div>
        </div>
      </main>
    </>
  )
}