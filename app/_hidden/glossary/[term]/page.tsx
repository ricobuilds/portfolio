import { components } from "@/components/portable"
import { PortableText } from "@portabletext/react"
import { sanityQuery } from "@/lib/sanity/utils"
import { Metadata, Viewport } from "next"
import { Term as TermType} from "@/app/types/Term"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import Link from "next/link"
import Image from "next/image"
import { Kanit } from "next/font/google"
import { Article, BlogPosting, BreadcrumbList, WithContext } from "schema-dts"
import { StructuredData } from "@/components/structured-data"

const heroFont = Kanit({
  subsets: ['latin'],
  weight: "800",
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export async function generateStaticParams() {
  const terms: TermType[] = await sanityQuery(`*[_type == "term"] | order(publishedAt desc){
    "slug": slug.current,
  }`)

  return terms.map((term) => ({
    term: term.slug
  }))
}

export async function generateMetadata({ params }: { params: { term: string } }): Promise<Metadata> {

  const { term } = params

  const post = await sanityQuery(`*[_type == "term" && slug.current == "${term}"][0]{
    title,
    description,
    content,
    _updatedAt,
    publishedAt,
    }`)

  if (!post) return { title: 'Issue not found!' }

  return {
    title: `What's Dis Tech? ${post.title} for Noobs`,
    description: post.description,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/glossary/${term}`,
    },
    authors: [
      {
        name: siteMetadata.title,
        url: siteMetadata.siteUrl
      }
    ],
    openGraph: {
      locale: 'en_GB',
      title: post.title,
      type: 'article',
      url: siteMetadata.siteUrl + "/glossary/" + term,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3001"}/og?title=${post.title}`,
      description: post.description,
      siteName: siteMetadata.title,
      authors: siteMetadata.title
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@ricobuilds',
      site: siteMetadata.siteUrl,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3001"}/og?title=${post.title}`,
    },
    robots: "index, follow",
  }
}

export default async function Term({ params }: { params: { term: string } }) {
  const { term } = params
  const post: TermType = await sanityQuery(`*[_type == "term" && slug.current == "${term}"][0]{
    title,
    description,
    content,
    _updatedAt
  }`)

  const schema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteMetadata.siteUrl + "/glossary/" + post.slug
    },
    "headline": post.title,
    "description": post.description,
    // "datePublished": post.publishedAt,
    "dateModified": post._updatedAt,
    "author": {
      "@type": "Person",
      "name": siteMetadata.title,
      "url": siteMetadata.siteUrl
    },
    "image": "https://www.mysite.com/path-to-article-image.jpg",
    "url": `${siteMetadata.siteUrl}/glossary/${post.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Enric Trillo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourwebsite.com/logo.png",
        // "width": 600,
        // "height": 60
      }
    }
  }

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
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
        "name": "Glossary",
        "item": siteMetadata.siteUrl + "/glossary",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": siteMetadata.siteUrl + "/glossary/" + post.slug,
      },
    ]
  }

  return (
    <>
      <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} />
      <main id="glossary-term" className="relative flex-1 w-full px-6 mx-auto">
        <div className="w-full max-w-[970px] mx-auto">
          <section id="header" className="w-full mx-auto">
            <div id="meta" className="flex flex-col w-full gap-2 mt-20">
              <h1 className={cn(
                "text-4xl lg:text-5xl",
                heroFont.className,
                "text-charkol",
              )}>{post.title}</h1>
              <p itemProp="description" className="max-w-3xl text-xl text-obsidian-400">
                {post.description ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ipsa omnis ratione"}
              </p>
            </div>
          </section>
          <hr className="max-w-3xl mt-10"/>
          <section id="content" className="max-w-3xl mt-8">
            <article>
              <PortableText value={post?.content} components={components} />
            </article>
          </section>
        </div>
      </main>
    </>
  )
}